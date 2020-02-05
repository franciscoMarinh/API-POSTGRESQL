const truncate = require('../utils/truncate')
const factory = require('../factories')
const jwt = require('jsonwebtoken')
const app = require('../../src/app')
const request = require('supertest')

describe('User', () => {

    beforeEach(async () => {
        return await truncate()
    })

    test('Verificando se o usuario com o token valido acessa as rotas', async () => {
        const user = await factory.create('User', {
            password: "123456789"
        })
        const token = await user.genToken()
        const response = await request(app).get('/user')
            .set('authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
    })
    test('Verificando rejeição de token incorreto', async () => {
        const wrongToken = jwt.sign({ id: 20 }, 'wrongToken')
        const response = await request(app).get('/user')
            .set('authorization', `Bearer ${wrongToken}`)

        expect(response.status).toBe(401)
    })

})