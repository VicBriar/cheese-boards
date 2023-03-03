const {sequelize, DataTypes} = require('./db')

const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING
})

module.exports = User;