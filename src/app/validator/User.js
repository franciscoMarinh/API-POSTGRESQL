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

required = ['name', 'email', 'password']

function validate(data, requiredAll = true) {
    if (requiredAll) return v.validate(data, { ...userSchema, required })
    return v.validate(data, userSchema)
}

module.exports = validate