const app = require("./app");
const mongoose = require("mongoose");
const { config } = require("./config");
const port = 5000;

const bootstrap = async () => {
  try {
    await mongoose.connect(config.database_url);
    console.log("database connected");
    app.listen(port, () => {
      console.log("app running on port ", port);
    });
  } catch (error) {
    console.log("database connection error");
  }
};

bootstrap();