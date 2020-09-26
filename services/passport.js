const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const config = require('../config/config');
const userDTO = require('../dtos/users')
const usersDAO = require('../daos/users')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    usersDAO.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy({
        clientID: config.googleClientID,
        clientSecret: config.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const existingUser = await usersDAO.findById(profile.id);
            if(existingUser) {
                return done(null, existingUser);
            }
            
            const user = await usersDAO.save(new userDTO(profile.id, null));
            return done(null, user);
        } catch(err){
            return done("Error performing passport handler: " + err, null)
        }
    })
);
