const routes = require('express').Router()
const UserController = require('./app/controller/UserController')


routes.post('/users', (req, res) => {
    res.sendStatus(200)
})





module.exports = routes