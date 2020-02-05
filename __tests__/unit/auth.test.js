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
<<<<<<< HEAD
        const response = await request(app).get('/user')
            .set('authorization', `Bearer ${token}`)
=======
        const response = await request.get('/user')
            .set('Authorization', `Bearer ${token}`)
            
>>>>>>> e06839acf41cbb7709811658762e97116c5d266d
        expect(response.statusCode).toBe(200)
        expect(response.body.email).toEqual(user.dataValues.email)
    })

    test('Verificando rejeição de token incorreto', async () => {
        const wrongToken = jwt.sign({ id: 20 }, 'wrongToken')
<<<<<<< HEAD
        const response = await request(app).get('/user')
            .set('authorization', `Bearer ${wrongToken}`)

=======
        const response = await request.get('/user')
            .set('Authorization', `Bearer ${wrongToken}`)
>>>>>>> e06839acf41cbb7709811658762e97116c5d266d
        expect(response.status).toBe(401)
    })

})