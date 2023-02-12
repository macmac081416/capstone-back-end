
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});


const User = sequelize.define('User', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});


app.post('/submit-form', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  User.create({
    firstName,
    lastName,
    email,
    password,
  })
    .then(() => {
      res.status(200).json({ message: 'User created successfully' });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Error creating user' });
    });
});

