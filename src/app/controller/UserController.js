const { User } = require('../models')

class UserController {
    async get(req, res) {
        try {
            const user = await User.findAll({})
            res.json(user)
        } catch (error) {
            res.sendStatus(400)
        }
    }
    async post(req, res) {
        try {
            console.log(req.body)
            const result = await User.create(req.body)
            res.sendStatus(200)
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }
    }
}

module.exports = new UserController()