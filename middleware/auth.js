const { verify } = require('jsonwebtoken')
const jwt = require('jsonwebtoken')

module.exports = function(req,res,next) {

    // get token
    const token = req.header('x-auth-token')

    // If not token
    if(!token) {
        return res.status(401).json({message: 'No Token, Unauthorized'})
    }

    // veryfy token
    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET)
        
        req.user = decoded.user // payload
        next()

    } catch (err) {
        res.status(401).json({message: 'invalid token'})
    }
}
