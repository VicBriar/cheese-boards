const {User, Board, Cheese, sequelize } = require('../index')

describe('Database init & model creation', async () => {
    beforeall(async () => {
        await sequelize.sync({force: true;})
    })
})