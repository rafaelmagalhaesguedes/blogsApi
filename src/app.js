const express = require('express');
const routes = require('./routes/login.routes');

const app = express();
app.use(express.json());
app.use(routes);

app.get('/', (_request, response) => response.send('Healthy check OK!'));

module.exports = app;
