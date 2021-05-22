const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

module.exports = {
  PORT: process.env.PORT || 4000,
  DATABASE_HOST: process.env.DATABASE_HOST || "localhost",
  DATABASE_PORT: process.env.DATABASE_PORT || 5433,
  DATABASE_NAME: process.env.DATABASE_NAME || "gamedb",
  DATABASE_DIALECT: process.env.DATABASE_DIALECT || "postgres",
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || "postgres",
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || "ghastb0i",
};
