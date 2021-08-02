const categoryRouter = require('./category');
const itemRouter = require('./item');

function route(app){
    app.use('/categories', categoryRouter);

    app.use('/items', itemRouter);
}

module.exports = route;