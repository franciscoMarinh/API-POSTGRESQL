const jwt = require('jsonwebtoken')
const { promisify } = require('util')

class AuthController {
    async auth(req, res, next) {
        try {
            const { authorization } = req.headers
            if (!authorization) return res.sendStatus(401)
            const [, token] = authorization.split(' ')
            const promise = promisify(jwt.verify)
            const { id } = await promise(token, process.env.JWT_SECRET);
            req.user = {
                id
            }
            next()
        } catch (error) {
            return res.sendStatus(401)
        }
    }
}


module.exports = new AuthController().auth