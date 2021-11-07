'use strict';

const user = (sequelize, DataTypes) => sequelize.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    }
});

// exporting the model/schema for creating the Food table
module.exports = user;