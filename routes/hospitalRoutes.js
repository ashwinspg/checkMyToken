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
            contact_number,
            _user: req.user.id
        });

        req.user.basicInfo = true;

        await hospital.save();
        const user = await req.user.save();

        res.send(user);
    });
};