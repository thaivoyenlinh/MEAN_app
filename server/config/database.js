const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require('./logger');

// config path (see the URL in .env_example file)
const configPath = process.cwd().replace("/server", "");
dotenv.config({ path: `${configPath}` });

//Set up default mongoose connection
async function connect() {
  try {
    await mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    logger.info('Connect database successful!');
  } catch (error) {
    logger.error(`Connect database failure. Message: ${error.message}. Stack: ${error.stack}`);
  }
}

module.exports = { connect };
