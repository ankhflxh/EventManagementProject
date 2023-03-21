function authRole(role){
    return (req, res, next) => {
        if (req.client._doc.role !== role){
            res.status(401)
            return res.send('PERMISSION DENIED')
        }
        next()
    }
    
}
module.exports = {
    authRole
}