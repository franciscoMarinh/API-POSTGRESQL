const app = require('../../src/app')
const request = require('supertest')(app)
const truncate = require('../utils/truncate')
const factory = require('../factories')

describe('User routes', () => {
    beforeEach(async () => {
        await truncate()
    })
    test('', async () => {

        const user = await factory.build('User',{
            password: "123456789"
        })
        delete user.dataValues.id

        const response = await request.post('/user').send(user.dataValues)

        expect(response.statusCode).toEqual(200)
    })
})