const routes = require('express').Router()
const UserController = require('../controller/UserController')
const auth = require('../middlewares/auth')

routes.post('/user', UserController.post)

routes.get('/user', auth, UserController.get)
routes.put('/user', auth, UserController.put)

module.exports = routes