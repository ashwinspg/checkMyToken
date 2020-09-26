const common = require('../utils/common')

module.exports = (req, res, next) => {
    if(common.isNull(req.user)){
        return res.status(401).send({ error: 'You must log in!' });
    }

    next();
}