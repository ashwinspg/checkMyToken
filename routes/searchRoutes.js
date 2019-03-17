const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Doctor = mongoose.model('doctors');
const Hospital = mongoose.model('hospitals');

module.exports = app => {
    app.get('/search/:doctorId', async (req, res) => {
        const doctorId = req.params.doctorId;
        try{
            const doctor = await Doctor.findById(doctorId)
                                    .populate('_hospital');
            res.render('doctor_status', {
                hospital_name: doctor._hospital.name,
                hospital_location: doctor._hospital.location,
                hospital_contact_number: doctor._hospital.contact_number,
                doctor_name: doctor.name,
                doctor_status: doctor.status,
                doctor_token_number: doctor.token_number
            });
        } catch(err){
            res.status(400).render('error');
        }
    });
};