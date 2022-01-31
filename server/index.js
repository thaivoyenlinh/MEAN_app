const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");

const dotenv = require("dotenv");
//* dotenv configuration
dotenv.config({ path: "../.env" });

const route = require("./routers");

//! *ERROR: Access to XMLHttpRequest at 'http://localhost:4100/categories' from origin 'http://localhost:4200'
//! has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
const cors = require("cors");

const logger = require('./config/logger');

//static file configuration to access public folder in server
app.use(express.static(path.join(__dirname, "public")));

//databse connection
const connectDatabase = require("./config/database");
connectDatabase.connect();

// app.use(morgan('combined'))
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

//! *FIX: use cors to allow Cross-Origin Resource Sharing (CORS)
app.use(cors());

//! midleware, parsing body request
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

route(app);

if (!module.parent) {
  app.listen(process.env.SERVER_PORT, process.env.HOSTNAME, () => {
    logger.info(`Server running at http://${process.env.HOSTNAME}:${process.env.SERVER_PORT}`);
  });
}
