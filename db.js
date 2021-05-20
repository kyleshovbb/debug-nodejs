const Sequelize = require('sequelize');

const config = require('./common/config');

const sequelize = new Sequelize(config.DATABASE_NAME, config.DATABASE_USERNAME, config.DATABASE_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: Sequelize.Op,
    port: config.DATABASE_PORT,
})

sequelize.authenticate().then(
    function success() {
        console.log("Connected to DB");
    },

    function fail(err) {
        console.log(`Error: ${err}`);
    }
)

module.exports = sequelize