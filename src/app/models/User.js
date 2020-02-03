'use strict';
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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

  User.prototype.isPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }

  User.prototype.genToken = async function () {
    return await jwt.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
  }

  return User;
};