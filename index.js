const {sequelize} = require('./models/db')
const User = require('./models/User')
const Board = require('./models/Board')
const Cheese = require('./models/Cheese')


module.exports = {
    User,
    Board,
    Cheese,
    sequelize
};