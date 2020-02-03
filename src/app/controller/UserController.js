const { User } = require('../models')


class UserController {
    async get(req, res, next) {

    }
    async post(req, res, next) {
        try {
            const user = await User.create(req.body)
            res.json(user)
        } catch (error) {
            res.sendStatus(400)
        }
    }
}

module.exports = new UserController()