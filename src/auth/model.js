const Sequelize = require('sequelize');
const database = require('../core/database');

const BlackList = database.define('blacklist', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    token: {
        allowNull: false,
        type: Sequelize.STRING(512),
        validate: {
            len: [2, 512]
        }
    }
});

module.exports = BlackList;