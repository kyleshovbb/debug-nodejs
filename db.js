const Sequelize = require("sequelize");

const config = require("./common/config");

const sequelize = new Sequelize(
  config.DATABASE_NAME,
  config.DATABASE_USERNAME,
  config.DATABASE_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    logging: false,
    operatorsAliases: Sequelize.Op,
    port: config.DATABASE_PORT,
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

module.exports = sequelize;
