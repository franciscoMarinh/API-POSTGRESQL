const app = require('../../src/app')
const request = require('supertest')
const truncate = require('../utils/truncate')
const factory = require('../factories')
const { User } = require('../../src/app/models')

describe('User routes', () => {
    beforeEach(async () => {
        return await truncate()
    })

    test('Cadastrando usuario valido', async () => {
        const user = await factory.build('User', {
            password: "123456789"
        })
        const { email, name, password } = user.dataValues
        const response = await request(app).post('/register').send({
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
        response = await request(app).post('/register').send(user.dataValues)
        expect(response.statusCode).toEqual(403)
        //Senha invalida
        user = await factory.build('User', {
            password: "1234"
        })
        response = await request(app).post('/register').send(user.dataValues)
        expect(response.statusCode).toEqual(403)
    })

    test('retorna status 403 após tentar cadastrar com Email Já cadastrado', async () => {
        let response
        let user
        // Cria o usuario
        user = await factory.create('User', {
            email: "franc1sc15@gmail.com"
        })
        //Tenta criar novamente com o mesmo E-mail
        user = {
            email: "franc1sc15@gmail.com",
            password: "123456789",
            name: "francisco"
        }
        response = await request(app).post('/register').send(user)
        expect(response.statusCode).toEqual(403)
    })

    test('Atualização de dados do usuario', async () => {
        let user = await factory.create('User', {
            password: "123456789"
        })
        let token = await user.genToken()
        let response;
        //Faz uma atualização valida do usuario criado
        response = await request(app).put('/user')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "Francisco"
            })

        expect(response.body.name).toEqual("Francisco")
        //Faz uma atualização invalida do usuario criado
        response = await request(app).put('/user')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: 1
            })

        expect(response.statusCode).toBe(403)

    })

    test('Excluindo um usuario', async () => {
        let user = await factory.create('User', {
            password: "123456789"
        })
        let token = await user.genToken()
        let response = await request(app).delete('/user')
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)

        let userDeleted = await User.findByPk(user.dataValues.id)

        expect(userDeleted).toBeNull()
    })

    test('Gerando token do usuario a partir da rota', async () => {
        let user = await factory.create('User', {
            password: "123456789"
        })
        const { email } = user.dataValues

        let response = await request(app).post('/auth')
            .send({
                email,
                password: "123456789"
            })

        expect(response.body).toHaveProperty('token')
    })

})