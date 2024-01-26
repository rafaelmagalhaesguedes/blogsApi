const app = require('./app');
const sequelize = require('./models');

const port = process.env.API_PORT || 3001;

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    console.log(`App listening on port ${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
