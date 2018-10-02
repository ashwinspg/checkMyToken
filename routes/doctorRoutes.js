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
console.log("asf");
        req.user.credits -= 1;
        const user = await req.user.save();

        res.send(user);
    });

    app.get('/api/hospital/doctors', requireLogin, async (req, res) => {
        const hospital = await Hospital.findOne({ _user:  req.user.id });
        const doctors = await Doctor.find({ _hospital:  hospital._id });

        res.send(doctors);
    });
};