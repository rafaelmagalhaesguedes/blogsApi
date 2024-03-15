//
// Barrel Routes
const { Router } = require('express');

const loginRouter = require('./login.router');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const postRouter = require('./post.router');

const routers = Router();

routers.use('/login', loginRouter);
routers.use('/user', userRouter);
routers.use('/categories', categoryRouter);
routers.use('/post', postRouter);

module.exports = routers;