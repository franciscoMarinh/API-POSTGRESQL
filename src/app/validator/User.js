var { Validator } = require('jsonschema');
var v = new Validator()

var userSchema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
        },
        "email": {
            "type": "string",
            "format": "email"
        },
        "password": {
            "type": "string",
            "minLength": 6,
            "maxLength": 18
        }
    },
    "additionalProperties": false
};

function validate(data, required = ['name', 'email', 'password']) {
    return v.validate(data, { ...userSchema, required })
}

module.exports = validate