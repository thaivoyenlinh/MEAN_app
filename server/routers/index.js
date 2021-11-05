const categoryRouter = require('./category');
const itemRouter = require('./item');
const userRouter = require('./user');
const orderRouter = require('./order');

function route(app){
    //RESTful API standard
    app.use('/', categoryRouter); //baseURL
    app.use('/', itemRouter);
    app.use('/', userRouter);
    app.use('/', orderRouter);
}

module.exports = route;