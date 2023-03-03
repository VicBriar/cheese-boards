const {sequelize, DataTypes} = require('./db')

const Board = sequelize.define("board",{
    title: DataTypes.STRING,
    description: DataTypes.STRING
},{timestamps: false});

module.exports = Board