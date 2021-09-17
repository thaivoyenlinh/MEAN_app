const categoryRouter = require('./category');
const itemRouter = require('./item');

function route(app){
    // app.use('/categories', categoryRouter);
    //RESTful API standard
    app.use('/', categoryRouter); //baseURL
    app.use('/', itemRouter);
}

module.exports = route;