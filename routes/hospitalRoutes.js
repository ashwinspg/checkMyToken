const requireLogin = require('../middlewares/requireLogin');
const hospitalDTO = require('../dtos/hospitals')
const hospitalsDAO = require('../daos/hospitals')

module.exports = app => {
    app.post('/api/hospital', requireLogin, async (req, res) => {
        try{
            const { name, location, contact_number } = req.body;
            hospital = new hospitalDTO(
                null,
                req.user.id,
                name,
                location,
                contact_number
            )
            req.user._hospital = await hospitalsDAO.save(hospital);
            res.send(req.user);
        } catch (err) {
            console.error("Error performing /api/hospital handler: ", err)
            res.status(500).send({
                error: err.message
            });
        }
    });
};