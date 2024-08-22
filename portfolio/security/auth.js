const jwt  = require('jsonwebtoken')

module.exports = (req,res, next) =>{
    const token = req.header('x-auth-token')

    if(!token)
        res.status(200).json({ "message" : "Token no encontrado"})
    else
        next()
}