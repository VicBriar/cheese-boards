const {sequelize, DataTypes} = require('./models/db')
const User = require('./models/User')
const Board = require('./models/Board')
const Cheese = require('./models/Cheese')

User.hasMany(Board);
Board.belongsTo(User);

const Cheese_Board = sequelize.define('Cheese_Board',{selfGranted: DataTypes.BOOLEAN},{timestamps: false});
Cheese.belongsToMany(Board, {through: Cheese_Board})
Board.belongsToMany(Cheese, {through: Cheese_Board})


module.exports = {
    User,
    Board,
    Cheese,
    sequelize
};