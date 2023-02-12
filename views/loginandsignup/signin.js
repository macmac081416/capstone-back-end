const User = sequelize.define('User', {
    email: Sequelize.STRING,
    password: Sequelize.STRING,
  });
  

  app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
   
    User.findOne({ where: { email, password } })
      .then(user => {
        if (user) {
          res.status(200).json({ message: 'Login successful' })
          {window.location="/home"}
          ;
        } else {
          res.status(401).json({ message: 'Invalid email or password' })
          {window.location="/signin"}
          ;
        }
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
      });
  });