const Sequelize = require("sequelize");

const config = require("./common/config");

const sequelize = new Sequelize(
  config.DATABASE_NAME,
  config.DATABASE_USERNAME,
  config.DATABASE_PASSWORD,
  {
    port: config.DATABASE_PORT,
    host: config.DATABASE_HOST,
    dialect: config.DATABASE_DIALECT,
    logging: false,
    operatorsAliases: Sequelize.Op,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

const db = {
  Sequelize,
  sequelize,
};

db.Game = sequelize.import("./models/game.model");
db.User = sequelize.import("./models/user.model");

module.exports = db;
