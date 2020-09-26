const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const pool = require('../db/database')
const txnUtils = require('../utils/transactions')
const usersDAO = require('../daos/users')
const doctorDTO = require('../dtos/doctors')
const doctorsDAO = require('../daos/doctors')

module.exports = app => {
    app.post('/api/hospital/doctors', requireLogin, requireCredits, async (req, res) => {
        const client = await pool.connect();
        shouldAbort = txnUtils.shouldAbort(client);
        try{
            await client.query('BEGIN');
            await doctorsDAO.save(client, new doctorDTO(null, req.user._hospital.id, req.body.name, false, null));
            await usersDAO.updateCredit(client, req.user.id, req.user.credits - 1);
            await client.query('COMMIT');

            req.user.credits = req.user.credits - 1
            res.send(req.user);
        } catch (err) {
            shouldAbort(err);
            res.status(500).send({
                error: err.message
            });
        } finally {
            client.release();
        }
    });

    app.get('/api/hospital/doctors', requireLogin, async (req, res) => {
        try{
            const doctors = await doctorsDAO.listDoctors(req.user.id);
            res.send(doctors);
        } catch (err) {
            res.status(500).send({
                error: err.message
            });
        }
    });

    app.get('/api/hospital/doctors/:doctorId', requireLogin, async (req, res) => {
        try{
            const doctor = await doctorsDAO.findById(req.params.doctorId);
            if (doctor == null) {
                console.error(`Requesting doctorId ${req.params.doctorId} is not found`)
                res.status(400).render('search_error')
            }

            res.send(doctor);
        } catch (err) {
            res.status(500).send({
                error: err.message
            });
        }
    });

    app.post('/api/hospital/doctors/:doctorId', requireLogin, async (req, res) => {
        try{
            const doctor = await doctorsDAO.updateStatus(req.params.doctorId, req.body.status, req.body.token_number);
            res.send({
                _id: doctor.id,
                _hospital: doctor.hospital_id,
                name: doctor.name,
                status: doctor.status,
                token_number: doctor.token_number
            });
        } catch (err) {
            res.status(500).send({
                error: err.message
            });
        }
    });
};