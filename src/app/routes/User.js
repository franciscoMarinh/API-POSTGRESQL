const routes = require('express').Router()
const UserController = require('../controller/UserController')
const auth = require('../middlewares/auth')

routes.post('/register', UserController.post)
routes.post('/auth', UserController.authByCredentials)

routes.get('/user', auth, UserController.get)
routes.put('/user', auth, UserController.put)
routes.delete('/user', auth, UserController.delete)

module.exports = routes