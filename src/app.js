const express = require('express')


class AppController {
    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
    }
    middlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
    }

    routes() {
        this.app.use(require('./routes'))
    }
}

module.exports = new AppController().app