const { User } = require('../models')
const UserSchema = require('../validator/User')
const ErrorHandle = require('../helpers/ErrorHandle')

class UserController {
    async get(req, res, next) {
        try {
            const { id } = req.user
            const user = await User.findByPk(id)
            return res.json(user)
        } catch (error) {
            return next(error)
        }
    }

    async post(req, res, next) {
        try {
            const validator = UserSchema(req.body)
            if (!validator.valid) throw new ErrorHandle(validator.errors[0].message, 403)

            const { email } = req.body

            if (await User.findOne({ where: { email } })) throw new ErrorHandle("Usuario ja está cadastrado", 403)
            const user = await User.create(req.body)

            return res.json({ user, token: await user.genToken() })
        } catch (error) {
            return next(error)
        }
    }

    async put(req, res, next) {
        try {
            const validator = UserSchema(req.body, false)
            if (!validator.valid) throw new ErrorHandle(validator.errors[0].message, 403)
            const { id } = req.user
            const user = await User.findByPk(id)
            user.set(req.body)
            await user.save()
            return res.json(user)
        } catch (error) {
            return next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const validator = UserSchema(req.body, false)
            if (!validator.valid) throw new ErrorHandle(validator.errors[0].message, 403)
            const { id } = req.user
            const user = await User.findByPk(id)
            await user.destroy()
            return res.sendStatus(200)
        } catch (error) {
            return next(error)
        }
    }

}

module.exports = new UserController()