const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authToken = req.cookies.jwt;
    
    if (!authToken) {
        return res.status(401).send("log in!!!")
    }
    jwt.verify(
        authToken,
        process.env.secret_key,
        (err, decoded) => {
            if (err) {
                return res.status(401).send("log in!!!")
            }
            // console.log(decoded)
            next();
        }
    )
}

module.exports = auth;