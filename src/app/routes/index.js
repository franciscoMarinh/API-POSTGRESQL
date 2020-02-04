const fs = require('fs')
const path = require('path')
const routes = require('express').Router()
const basename = path.basename(__filename)
const ErrorMiddleware = require('../middlewares/ErrorMiddleware')

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        routes.use(require(`${__dirname}/${file}`))
    });

routes.use(ErrorMiddleware)

module.exports = routes