const jwt = require('jsonwebtoken');

const auth = (res, req, next) => {
    const authToken = req.cookies.jwt;
    
    if (!authToken) {
        return res.status(401).send("Kindly log in")
    }
    jwt.verify(
        authToken,
        process.env.SECRET_KEY,
        (err, decoded) => {
            if (err) {
                return res.status(401).send("Kindly log in")
            }
            // console.log(decoded)
            next();
        }
    )
}

module.exports = auth;