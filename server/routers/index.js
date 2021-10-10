const categoryRouter = require('./category');
const itemRouter = require('./item');
const userRouter = require('./user');

function route(app){
    //RESTful API standard
    app.use('/', categoryRouter); //baseURL
    app.use('/', itemRouter);
    app.use('/', userRouter);
}

module.exports = route;