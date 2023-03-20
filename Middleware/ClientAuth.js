const role = require('../data')
function authClient(req, res,next){
    if (req.client == null){
        res.status(403)
        return res.send('you need to Login ')
    }
    next()
}

function authRole(role){
    return (req, res, next) => {
        if (req.client.role !== role){
            res.status(401)
            return res.send('PERMISSION DENIED')
        }
    }
    next()
}
module.exports = {
    authClient,
    authRole
}