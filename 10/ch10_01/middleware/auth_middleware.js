const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    let token;
    if(req.header.authorization) {
        token = req.header.authorization.split(' ')[1]; 
        // Bearer xxxxxxx
    }
    if(!token) return res.sendStatus(401);
    jwt.verify(token, 'access', (err, user) => {
        if(err) return res.sendStatus(401);
        req.user = user; // id, email 
        next();
    });
}

module.exports = {
    authenticate,
}