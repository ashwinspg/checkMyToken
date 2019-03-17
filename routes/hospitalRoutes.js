const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Hospital = mongoose.model('hospitals');

module.exports = app => {
    app.post('/api/hospital', requireLogin, async (req, res) => {
        const { name, location, contact_number } = req.body;

        const hospital = new Hospital({
            name,
            location,
            contact_number
        });

        req.user._hospital = hospital;
        
        await Promise.all([hospital.save(), req.user.save()]);

        res.send(req.user);
    });
};