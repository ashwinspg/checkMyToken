const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const config = require('./config/config');
const pool = require('./db/database');

require('./services/passport');

pool.query('SELECT NOW()', (err, res) => {
    if (err != null) {
        console.error(err)
        process.exit(1)
    }

    console.log("Database Connected...")
    init()
})

function init(){
    const app = express();

    app.use(bodyParser.json());
    app.use(
        cookieSession({
            maxAge: 30 * 24 * 60 * 60 * 1000,
            keys: [config.cookieKey]
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    app.set('view engine', 'pug');
    app.set('views', './views');

    require('./routes/authRoutes')(app);
    require('./routes/billingRoutes')(app);
    require('./routes/hospitalRoutes')(app);
    require('./routes/doctorRoutes')(app);
    require('./routes/searchRoutes')(app);

    if(process.env.NODE_ENV === 'production'){
        // Express will serve up production assets
        // like our main.js file, or main.css file!
        app.use(express.static('client/build'));

        // Express will serve up the index.html file
        // if it doesn't recognize the route
        const path = require('path');
        app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });
    }

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
}