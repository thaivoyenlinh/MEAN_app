// const { Router } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require("body-parser");
const path = require('path')
const multer = require('multer');
const upload = multer({ dest: "public/files" });

// const port = 4100

const dotenv = require('dotenv');
//* dotenv configuration
dotenv.config({ path: '../.env' });

const route = require('./routers/index');

//! *ERROR: Access to XMLHttpRequest at 'http://localhost:4100/categories' from origin 'http://localhost:4200' 
//! has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
const cors = require('cors');

//databse connection
const connectDatabase = require('./config/database')
connectDatabase.connect();

// app.use(morgan('combined'))
if(process.env.NODE_ENV == 'development'){
	app.use(morgan('dev'));
}

//! *FIX: use cors to allow Cross-Origin Resource Sharing (CORS)
app.use(cors());

//! midleware, parsing body request
app.use(
	express.urlencoded({
		extended: true,
	}),
);
app.use(express.json());

app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

route(app);

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })
if(!module.parent){
	app.listen(process.env.SERVER_PORT, process.env.HOSTNAME, () => {
		console.info(`Server running at http://${process.env.HOSTNAME}:${process.env.SERVER_PORT}`)
	});
}