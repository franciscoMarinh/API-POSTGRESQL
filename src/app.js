const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const Ratelimit = require('./app/middlewares/RateLimit')

require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})


class AppController {
    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
    }
    middlewares() {
        this.app.set('json spaces', 4)
        this.app.set('trust proxy', 1)

        this.app.use(Ratelimit)
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(cors())
        this.app.use(helmet())
        this.app.use(compression())
    }

    routes() {
        this.app.use(require('./app/routes'))
    }
}

module.exports = new AppController().app