'use strict';
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ErrorHandle = require('../helpers/ErrorHandle')
const { promisify } = require('util')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeSave(user) {
        const salt = bcrypt.genSaltSync()
        return user.password = bcrypt.hashSync(user.password, salt)
      }
    },
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  //Refaturar para funções asincronas  o metodo ispassword e o beforeSave
  User.prototype.isPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }

  User.prototype.genToken = async function () {
    const promise = promisify(jwt.sign)
    return await promise({ id: this.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
  }

  User.findByCredentials = async (email, password) => {
    const user = await User.findOne({ where: { email } })

    if (!user) throw new ErrorHandle('Usuario não encontrado !!', 403)
    if (!user.isPassword(password)) throw new ErrorHandle('Senha incorreta !!', 403)

    return user
  }

  return User;
};