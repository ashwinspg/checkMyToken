var stripe = require('stripe')

var requireLogin = require('../middlewares/requireLogin');
var config = require('../config/config');
const usersDAO = require('../daos/users')
const pool = require('../db/database')

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        try{
            await stripe(config.stripeSecretKey).charges.create({
                amount: 500,
                currency: 'usd',
                description: '$5 for 5 credits',
                source: req.body.id
            });
            
            const client = await pool.connect()
            const user = await usersDAO.updateCredit(client, req.user.id, req.user.credits + 5);                
            req.user.credits = user.credits
            res.send(req.user);
        } catch (err) {
            console.error("Error while performing /api/stripe route:", err)
            res.status(500).send({
                error: err.message
            });
        }
    });
};