const { Router } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 4100
const connectDatabase = require('./config/database')
const route = require('./routers/index');

//! *ERROR: Access to XMLHttpRequest at 'http://localhost:4100/categories' from origin 'http://localhost:4200' 
//! has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
const cors = require('cors')

connectDatabase.connect();

app.use(morgan('combined'))

//! *FIX: use cors to allow Cross-Origin Resource Sharing (CORS)
app.use(cors);

//! midleware, parsing body request
app.use(
	express.urlencoded({
		extended: true,
	}),
);
app.use(express.json());

route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})