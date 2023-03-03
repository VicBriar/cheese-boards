const {sequelize, DataTypes} = require('./db')

const Cheese = sequelize.define("Cheese", {
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    rating: DataTypes.INTEGER
}, {timestamps: false});

module.exports = Cheese;