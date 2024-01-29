const app = require('./app');
const { sequelize } = require('./models');

const port = process.env.API_PORT || 3001;

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('\n\nConnection to database has been established successfully.\n');
    console.log(`App listening on port ${port}\n`);
  } catch (error) {
    console.error('\n\nUnable to connect to the database: ', error, '\n\n');
  }
});
