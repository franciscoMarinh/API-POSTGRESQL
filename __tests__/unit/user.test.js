const truncate = require('../utils/truncate')
const factory = require('../factories')
const jwt = require('jsonwebtoken')

describe('User', () => {

    beforeEach(async () => {
        await truncate()
    })

    test('Verificando se a senha está correta', async () => {
        const user = await factory.create('User', {
            password: "123456789"
        })
        expect(user.isPassword("123456789")).toEqual(true)
    })
    test('Verificando uma senha incorreta', async () => {
        const user = await factory.create('User', {
            password: "123456789"
        })
        expect(user.isPassword("1234567899")).toEqual(false)
    })
    test('Gerando um JWT Valido e comparando o decoded', async () => {
        const user = await factory.create('User', {
            password: "123456789"
        })
        const token = await user.genToken()
        expect(token).toBeDefined()

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        expect(decoded.id).toEqual(user.id)

    })

})