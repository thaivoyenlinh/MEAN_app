const mongoose = require("mongoose");
const dotenv = require("dotenv");

// config path (see the URL in .env_example file)
const configPath = process.cwd().replace("/server", "");
dotenv.config({ path: `${configPath}/.env` });

//Set up default mongoose connection
async function connect() {
  try {
    await mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Connect database successful!");
  } catch (error) {
    console.log("Connect database failure!");
  }
}

module.exports = { connect };
