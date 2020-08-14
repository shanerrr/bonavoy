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

const Trip = db.define('Trip', {
    trip_name:{
        type:DataTypes.STRING(50),
        allowNull:false,
        unique:false,
    },
    cost:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
    },
    participants:{
        type:DataTypes.STRING(50),
        allowNull:false,
    },
    //destinations


});

module.exports = Trip;
