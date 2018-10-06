const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Doctor = mongoose.model('doctors');
const Hospital = mongoose.model('hospitals');

module.exports = app => {
    app.post('/api/hospital/doctors', requireLogin, requireCredits, async (req, res) => {
        const { name } = req.body;

        const hospital = await Hospital.findOne({ _user:  req.user.id });

        const doctor = new Doctor({
            name,
            _hospital: hospital._id
        });

        await doctor.save();

        req.user.credits -= 1;
        const user = await req.user.save();

        res.send(user);
    });

    app.get('/api/hospital/doctors', requireLogin, async (req, res) => {
        const hospital = await Hospital.findOne({ _user:  req.user.id });
        const doctors = await Doctor.find({ _hospital:  hospital._id });

        res.send(doctors);
    });

    app.get('/api/hospital/doctors/:doctorId', requireLogin, async (req, res) => {
        const doctorId = req.params.doctorId;
        const doctor = await Doctor.findById(doctorId);

        res.send(doctor);
    });

    app.post('/api/hospital/doctors/:doctorId', requireLogin, async (req, res) => {
        const { status, token_number } = req.body;
        const doctorId = req.params.doctorId;
        const doctor = await Doctor.findById(doctorId);
        doctor.status = status;
        doctor.token_number = token_number;
        const doctorStatus = await doctor.save();
        res.send(doctorStatus);
    });
};