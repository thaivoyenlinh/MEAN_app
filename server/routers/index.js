const categoryRouter = require('./category');

function route(app){
    app.use('/categories', categoryRouter)
}

module.exports = route;