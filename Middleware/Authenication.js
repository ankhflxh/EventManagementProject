const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authToken = req.cookies.jwt
    
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
            
            next();
        }
    )
}

module.exports = auth;