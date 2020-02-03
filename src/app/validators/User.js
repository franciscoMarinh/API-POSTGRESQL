const yup = require('yup');

let schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email(),
    password: yup.string().required().min(6).max(18),
    updatedAt: yup.date().default(function () {
        return new Date();
    }),
    createdAt: yup.date().default(function () {
        return new Date();
    }),
});

module.exports = schema