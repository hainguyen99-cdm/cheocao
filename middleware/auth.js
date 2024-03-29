const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next)=>{


    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader
    if(!token) return res.sendStatus(401)

    try {
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(403)
    }
}
module.exports = verifyToken;