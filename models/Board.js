const {sequelize, DataTypes} = require('./db')

const Board = sequelize.define("Boards",{
    title: DataTypes.STRING,
    description: DataTypes.STRING
},{timestamps: false});

module.exports = Board