const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "CheeseBoardsDataBase.sqlite"
})

module.exports = {
    sequelize,
    DataTypes
}