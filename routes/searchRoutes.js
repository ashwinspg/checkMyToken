const doctorsDAO = require('../daos/doctors');

module.exports = app => {
    app.get('/search/:doctorId', async (req, res) => {
        try{
            const doctor = await doctorsDAO.findById(req.params.doctorId);
            if (doctor == null) {
                console.error(`Requesting doctorId ${req.params.doctorId} is not found`)
                res.status(400).render('search_error')
            }

            res.render('doctor_status', {
                hospital_name: doctor._hospital.name,
                hospital_location: doctor._hospital.location,
                hospital_contact_number: doctor._hospital.contact_number,
                doctor_name: doctor.name,
                doctor_status: doctor.status,
                doctor_token_number: doctor.token_number
            });
        } catch(err){
            console.error("Error while performing /auth/google/callback route:", err)
            res.status(500).render('error');
        }
    });
};