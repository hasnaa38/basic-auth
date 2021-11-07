'use strict';

require('dotenv').config();
/* Without requiring dotenv, code: 'ERR_INVALID_ARG_TYPE' error will occur */

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

const { Sequelize, DataTypes } = require('sequelize');

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: { 
            require: true,
            rejectUnauthorized: false,
        }
    }
} : {};

let sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

// require the schema
const user = require('./user');

module.exports = {
    db: sequelize,
    user: user(sequelize, DataTypes),
}