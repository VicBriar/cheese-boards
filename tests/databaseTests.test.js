const {User, Board, Cheese, sequelize } = require('../index')
const {UserData,BoardData,CheeseData} = require('../seedData/seedData')
const {Op} = require('sequelize')

describe('Database init & model creation; basic crud', () => {
    beforeAll(async () => {
        await sequelize.sync({force: true})
    })

    
    test('User CRUD',async () => {
        let testUser = await User.create({
            name: "cheeseLord",
            email: "TheCheeseLord@cheeseKingdom.com"
        })
        //creation
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
        testBoard = await Board.findByPk(id)

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

//jest doesn't allow me to create variables with async methods inside define; it has to be done inside a test. Many of my tests reference variables created by other tests. These variables can't be passed between tests, tests also cannot be nested. This means to keep things dry, I had to make one BIG test for lots of behaviours. I used comments to seperate each actual 'test'
describe('seed database for associations', () => {

    beforeAll(async () => {
        await sequelize.sync()
        //create users and boards from data
        await User.bulkCreate(UserData).then(() => {console.log('User data seeded')},(err) => {console.error(err)})
        await Board.bulkCreate(BoardData).then(() => {console.log('Board data seeded')},(err) => {console.error(err)})
        //find created users & boards
        let users = await User.findAll()
        let boards = await Board.findAll()
       //assign users their boards
        for(let i = 0; i < users.length; i++){
            await users[i].addBoard(boards[i],{through: {selfGranted: false}});
        }
        // create variables for boards 
        let smells = boards[0]
        let frenchCheeses = boards[1]
        let secret = boards[2]
        //create variables for cheeses; the first 3 are joke cheeses for the first board, the cheese after are meant to be assigned to multiple boards to test associated relationships
        let smellChz = CheeseData.slice(0,3)
        let yumChz = CheeseData.slice(3)
        //assigning funny cheese to funny board
        for(let i = 0; i < smellChz.length; i++){
            await smells.createCheese(smellChz[i],{through: {selfGranted: false}});
        }
        //assigning every yum cheese to frenchCheeses
        for(let i = 0; i < yumChz.length; i++){
            await frenchCheeses.createCheese(yumChz[i],{through: {selfGranted: false}})
        }
        //writing my changes
        await smells.save()
        await frenchCheeses.save()
        //getting yumChz a different way
        let cheeses = await Cheese.findAll({
            where: {
                id: {
                    [Op.gte]: 4
                }
            }
        })
        //adding yumChz to secret board with different method (for pracitce & testing)
        await secret.addCheeses(cheeses,{through: {selfGranted: false}});
        //writing changes
        await secret.save()
        await sequelize.sync()
    });

    test('User to Board relationship & eager loading', async () => {
        //init values to use
        let users = await User.findAll();
        let boards = await Board.findAll();
        let twitch = users[0]
        let Brie_a_Gouda_Person = users[1]
        let brieBoard = boards[3]

        //adding the unassigned board to twitch user
        await twitch.addBoard(brieBoard,{through: {selfGranted: false}})
        //writing changes to database
        await twitch.save()
        await brieBoard.save()
        //updating my instance to reflect database & eagerloading
        users = await User.findAll({include: Board})
        twitch = users[0]
        //updating my instance of brieBoard
        await brieBoard.reload()
        let fk = brieBoard.UserId
       
//~~~~~~~~~~  a user can have many boards
        expect(twitch["boards"].length).toBe(2)
        expect(twitch.boards[0].title).toBe(brieBoard.title)
        expect(twitch.boards[0].id).toBe(brieBoard.id)
        
        //this makes sure if I reassign ownership, the board doesn't keep it's old foreign key to twitch
        await Brie_a_Gouda_Person.addBoard(brieBoard,{through: {selfGranted: false}})
        await brieBoard.reload()
//~~~~~~~~~~  a board cannot have multiple users
        expect(brieBoard.UserId).not.toBe(fk)
    })

    test('Board to Cheese relationships & eager loading', async () => {
//TEST 0;  Board association & loading ---------------------------------------------------------------------------
        //✨ eager loading ✨
        let boards = await Board.findAll({include: Cheese});
        let smells = boards[0]

//~~~~~~~~~~ a board can have many cheeses
        expect(smells.cheeses.length).toBeGreaterThan(1)
//~~~~~~~~~~ a board can be loaded with its cheeses
        expect(smells.cheeses[0]).toBeInstanceOf(Cheese)

//TEST 1; Cheese association & loading ---------------------------------------------------------------------------
        //making new board with lots of cheese to eager load
        let tastee = await Board.create({
            title: "tastee",
            description: "the cheese i want to eat everyday",
            cheeses: [{
                type: "riccota",
                description: "soft! tangy! great with dill weed!!",
                rating: 5,
                Cheese_Board: {selfGranted: true}
            },
            {
                type: "shoe cheese",
                description: "best with old socks",
                rating: 5,
                Cheese_Board: {selfGranted: true}
            },
            {
                type: "very very old mayonaise",
                description: "best with ketchup & aged fries",
                rating: 5,
                Cheese_Board: {selfGranted: true}
            }
            ],
        }, 
        {include: Cheese});
        
        let riccota = await Cheese.findOne({
            where: {type: "riccota"},
            include: Board
        }) 
        //assign riccota to another board
        await smells.addCheese(riccota,{through: {selfGranted: false}})
        //make sure my riccotta is matching what the database has
        await riccota.reload()

//~~~~~~~~~~ a cheese can be loaded with it's board data
        expect(riccota.boards).toBeDefined()
//~~~~~~~~~~ a cheese can be on many boards
        expect(riccota.boards.length).toBeGreaterThan(1)

//TEST 2; User association & loading, Board-user loading---------------------------------------------------------------------------
        //getting twitch user with boards
        let twitch = await User.findOne({
            where: {name: "Twitch",
                    id: 2},
            include: Board
        })
        await twitch.addBoard(tastee)
        await twitch.save()
        tastee = await Board.findOne({
            where: {title: "tastee"},
            include: User
        })
        await twitch.reload()

//~~~~~~~~~~ a user can be loaded with their boards
        expect(twitch.boards).toBeDefined()
//~~~~~~~~~~ a user can have many boards
        expect(twitch.boards.length).toBeGreaterThan(1)        
//~~~~~~~~~~  a board can be loaded with it's user
        expect(tastee.User).toBeDefined()



})
})