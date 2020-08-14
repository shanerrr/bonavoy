const {Sequelize, DataTypes} = require("sequelize");

// connect to database
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host:process.env.DB_HOST,
    dialect:'mysql',
    port:process.env.DB_PORT,
    pool: {
        max: 5,
        min: 1,
        idle: 60000,
    },
})

