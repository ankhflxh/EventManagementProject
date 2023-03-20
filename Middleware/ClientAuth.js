function authRole(role){
    return (req, res, next) => {
        if (req.client.role !== role){
            res.status(401)
            return res.send('PERMISSION DENIED')
        }
        next()
    }
    
}
module.exports = {
    
    authRole
}