const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const pool = require('../db/database')
const txnUtils = require('../utils/transactions')
const usersDAO = require('../daos/users')
const hospitalsDAO = require('../daos/hospitals')
const doctorDTO = require('../dtos/doctors')
const doctorsDAO = require('../daos/doctors')

module.exports = app => {
    app.post('/api/hospital/doctors', requireLogin, requireCredits, async (req, res) => {
        console.log(req)
        const client = await pool.connect()
        shouldAbort = txnUtils.shouldAbort(client)
        try{
            await client.query('BEGIN')
            await doctorsDAO.save(client, new doctorDTO(null, req.user._hospital.id, req.body.name, false, null));
            await usersDAO.updateCredit(client, req.user.id, req.user.credits - 1)
            await client.query('COMMIT')
            res.send(req.user);
        } catch (err) {
            shouldAbort(err)
            res.send({
                error: err
            })
        } finally {
            client.release()
        }
    });

    app.get('/api/hospital/doctors', requireLogin, async (req, res) => {
        const doctors = await doctorsDAO.findByUserId(req.user.id)

        res.send(doctors);
    });

    app.get('/api/hospital/doctors/:doctorId', requireLogin, async (req, res) => {
        const doctorId = req.params.doctorId;
        const doctor = await doctorsDAO.findById(doctorId);

        res.send(doctor);
    });

    app.post('/api/hospital/doctors/:doctorId', requireLogin, async (req, res) => {
        const { status, token_number } = req.body;
        const doctorId = req.params.doctorId;
        const doctorStatus = await doctorsDAO.findByIdAndUpdate(doctorId, {
            status,
            token_number
        },{ new: true });
        res.send(doctorStatus);
    });
};