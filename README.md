![logo](https://user-images.githubusercontent.com/44912347/202296600-c5f247d6-9616-49db-88f0-38433429d781.jpg)

# Cheese Boards

**PROJECT TASK**: You are a Software Engineer for a large cheese shop, and your team is tasked with creating a database for the new Cheese Board Organizer app. The company also has front-end developers, so no UI code is needed for now. Your main task is creating the database connection!

Since we won’t have a front-end, and we don’t build web APIs until next week, this “project” might not feel too much like a project. The final product will be similar to what we’ve done so far: A test file that inserts data and verifies the data is able to be accessed correctly.  

We’ll have 3 database models:
- `User`
- `Board`
- `Cheese`

## Connection to Sequelize
Now that we have the project setup on your computer, let’s get to work coding it out! Use the following as a guide.

### Install Dependencies
- Install the `sqlite3`, `sequelize`, and `jest` npm packages.

### Create Sequelize Connection
- Create a file for your database connection and connect to your database using sequelize.

### Define Models
Create the models in the project, per these definitions:

**User**
- `name` string
- `email` string

**Board**
- `type` string
- `description` string
- `rating` number

**Cheese**
- `title` string
- `description` string

### Tests
- To run the tests, run `npm test`
- Create tests based on the code above to check that your tables are created and that you can insert data into them.

### Commit & Push
- `git add .`, `git commit -m “somemessage”`, and `git push` so we can see your work!

## Associations
We now need to associate the models with one another according to the specifications provided below.

### Users/Boards Association
Associate the `User` and `Board` models with a One-to-Many relationship
- Multiple Boards can be added to a User.
- Add test(s) to account for the association.

### Boards/Cheeses Association
Associate the Board and Cheese models with a Many-to-Many relationship.
- A Board can have many Cheeses
- A Cheese can be on many Boards
- Add test(s) to account for the association.

### Eager Loading
Write another test(s) that verify one or more of these:
- A board can be loaded with its cheeses
- A user can be loaded with its boards
- A cheese can be loaded with its board data

### Commit & Push
- `git add .`, `git commit -m “somemessage”`, and `git push` so we can see your work!
