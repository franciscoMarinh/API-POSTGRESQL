const jsen = require('jsen');

const schema = {
    type: 'object',
    additionalProperties: false,
    properties: {
        name: {
            type: 'string',
            minLength: 5,
            invalidMessage: 'Invalid username',
            requiredMessage: 'Username is required'
        },
        email: {
            type: 'string',
            format: 'email'
        },
        password: {
            type: 'string',
            minLength: 6,
            maxLength: 18,
            requiredMessage: 'Please insert one password',
            invalidMessage: 'Invalid password'
        },
    },
};

required = ['name', 'email', 'password']

function validate(data, requiredAll = true) {
    let validator;
    if (requiredAll) validator = jsen({ ...schema, required })
    validator = jsen(schema)
    return validator(data)
}

module.exports = validate