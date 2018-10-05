const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Doctor = mongoose.model('doctors');
const Hospital = mongoose.model('hospitals');

module.exports = app => {
    app.get('/search/:doctorId', async (req, res) => {
        const doctorId = req.params.doctorId;
        const doctor = await Doctor.findById(doctorId);
        const hospital = await Hospital.findById(doctor._hospital);
        res.render('doctor_status', {
            hospital_name: hospital.name,
            hospital_location: hospital.location,
            hospital_contact_number: hospital.contact_number,
            doctor_name: doctor.name,
            doctor_status: doctor.status,
            doctor_token_number: doctor.token_number
        });
    });
};