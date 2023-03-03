const {User, Board, Cheese, sequelize } = require('../index')

describe('Database init & model creation; basic crud', () => {
    beforeAll(async () => {
        await sequelize.sync({force: true})
    })

    //creation
    test('User CRUD',async () => {
        let testUser = await User.create({
            name: "cheeseLord",
            email: "TheCheeseLord@cheeseKingdom.com"
        })

        expect(testUser.name).toBe("cheeseLord")
        expect(testUser.email).toBe("TheCheeseLord@cheeseKingdom.com")
        expect(testUser.id).toBeDefined()

        //update
        testUser.name = "Cheese King"
        let id = testUser.id
        await testUser.save();
        testUser = await User.findByPk(id);
        
        expect(testUser.name).toBe("Cheese King")

        //delete (long live the king!)
        await testUser.destroy()
        testUser = await User.findByPk(id);
        
        expect(testUser).toBeFalsy()

    })
    test('Board CRUD',async () => {
        //creation
        let testBoard = await Board.create({
            title: "Cheeses for a king",
            description: "the finest cheeses"
        })

        expect(testBoard.title).toBe("Cheeses for a king")
        expect(testBoard.description).toBe("the finest cheeses")
        expect(testBoard).toBeDefined()

        //update
        testBoard.title = "Cheeses for ME"
        let id = testBoard.id
        await testBoard.save();
        testBoard = await Board.findByPk(id);

        expect(testBoard.title).toBe("Cheeses for ME")

        //delete (melting cheesy kingdom)
        await testBoard.destroy()
        testBoard = await Board.findByPk(id)

        expect(testBoard).toBeFalsy()
    })

    test('Cheese CRUD',async () => {
        //creation
        let testCheese = await Cheese.create({
            type: "american",
            description: "tastes like plastic",
            rating: -1
        })

        expect(testCheese.type).toBe("american")
        expect(testCheese.description).toBe("tastes like plastic")
        expect(testCheese.rating).toBe(-1)
        expect(testCheese).toBeDefined()

        //update
        testCheese.type = "American"
        testCheese.description = "Yep, still hate it"
        let id = testCheese.id
        await testCheese.save()
        testCheese = await Cheese.findByPk(id)

        expect(testCheese.type).toBe("American")
        expect(testCheese.description).toBe("Yep, still hate it")

        //delete (good riddance)
        await testCheese.destroy()
        testCheese = await Cheese.findByPk(id)

        expect(testCheese).toBeFalsy()
    })
    
    
})
describe('seed database for associations', () => {

    // beforeAll(async () => {

    // })
})