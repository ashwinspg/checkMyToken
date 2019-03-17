const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Doctor = mongoose.model('doctors');
const Hospital = mongoose.model('hospitals');

module.exports = app => {
    app.post('/api/hospital/doctors', requireLogin, requireCredits, async (req, res) => {
        const { name } = req.body;
        const hospital = await Hospital.findById(req.user._hospital)

        const doctor = new Doctor({
            name,
            _hospital: req.user._hospital
        });

        hospital._doctors.push(doctor);

        req.user.credits -= 1;

        await Promise.all([req.user.save(), doctor.save(), hospital.save()]);

        res.send(req.user);
    });

    app.get('/api/hospital/doctors', requireLogin, async (req, res) => {
        const hospital = await Hospital.findById(req.user._hospital)
                                .populate('_doctors');

        res.send(hospital._doctors);
    });

    app.get('/api/hospital/doctors/:doctorId', requireLogin, async (req, res) => {
        const doctorId = req.params.doctorId;
        const doctor = await Doctor.findById(doctorId);

        res.send(doctor);
    });

    app.post('/api/hospital/doctors/:doctorId', requireLogin, async (req, res) => {
        const { status, token_number } = req.body;
        const doctorId = req.params.doctorId;
        const doctorStatus = await Doctor.findByIdAndUpdate(doctorId, {
            status,
            token_number
        },{ new: true });
        res.send(doctorStatus);
    });
};