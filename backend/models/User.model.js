const { Sequelize, DataTypes } = require("sequelize");

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
});

//---------- User Model ----------
const User = db.define('User', {
    email:{
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: true,
    },
    firstname:{
        type: DataTypes.STRING(32),
        allowNull: false,
    },
    hash:{
        type: DataTypes.STRING(256),
        allowNull: false,
    },
});

// create table on remote db
(async () => {
    await db.sync({ force: false }); // TODO: turn to false for production
})();

module.exports = User;