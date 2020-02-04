const app = require('../../src/app')
const request = require('supertest')(app)
const truncate = require('../utils/truncate')
const factory = require('../factories')

describe('User routes', () => {
    beforeEach(async () => {
        await truncate()
    })

    test('Cadastrando usuario valido', async () => {
        const user = await factory.build('User', {
            password: "123456789"
        })
        const { email, name, password } = user.dataValues
        const response = await request.post('/user').send({
            email,
            name,
            password
        })

        expect(response.statusCode).toEqual(200)
    })

    test('retorna status 403 após cadastrar usuario com Email e Senha invalidas', async () => {
        let response
        let user
        //Email invalido
        user = await factory.build('User', {
            password: "123456789",
            email: "franc1sc15"
        })
        response = await request.post('/user').send(user.dataValues)
        expect(response.statusCode).toEqual(403)
        //Senha invalida
        user = await factory.build('User', {
            password: "1234"
        })
        response = await request.post('/user').send(user.dataValues)
        expect(response.statusCode).toEqual(403)
    })

    test('retorna status 403 após tentar cadastrar com Email Já cadastrado', async () => {
        let response
        let user
        // Cria o usuario
        user = await factory.create('User', {
            email: "franc1sc15@gmail.com"
        })
        //Tenta criar novamente
        user = {
            email: "franc1sc15@gmail.com",
            password: "123456789",
            name: "francisco"
        }
        response = await request.post('/user').send(user)
        expect(response.statusCode).toEqual(403)
    })
    test('Atualizando dados do usuario', async () => {
        const user = await factory.create('User', {
            password: "123456789"
        })
        const token = await user.genToken()

        const response = await request.put('/user')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "Francisco",
                id: "heeeey"
            })
        expect(response.status).toEqual(403)
    })

})