const passport = require('passport');

const common = require('../utils/common')

module.exports = app => {
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );
    
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            try{
                if(common.isNull(req.user._hospital)){
                    res.redirect('/hospital/new');
                }else{
                    res.redirect('/hospital/doctors');
                }
            } catch (err) {
                console.error("Error performing /auth/google/callback route:", err)
                res.status(500).send({
                    error: err.message
                });
            }
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};