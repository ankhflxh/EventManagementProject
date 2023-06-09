const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authToken = req?.header('Authorization')?.split(' ')[1];
    
    if (!authToken) {
        return res.status(401).send(" PLEASE LOGIN ")
    }
    jwt.verify(
        authToken,
        process.env.SECRET_KEY,
        (err, decoded) => {
            if (err) {
                return res.status(401).send(" PLEASE LOGIN ")
            }
            req.client = decoded
            req.token = authToken
            next();
        }
    )
}

module.exports = auth;