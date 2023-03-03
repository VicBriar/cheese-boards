const {User, Board, Cheese, sequelize } = require('../index')

const smells = ({
        title: "smells",
        description: "These cheeses smell really good when left out in the sun for a while",
        cheeses: [{
            title: "my cheese",
            description: "its MINE, I LICKED it.",
            rating: 0,
        Cheese_Board: {selfGranted: true}
        }],
        },
        {include: Cheese})

module.exports = smells;