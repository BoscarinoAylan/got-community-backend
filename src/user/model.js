const Sequelize = require('sequelize');

const database = require('../core/database');

const User = database.define('user', {
    id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2, 255]
        }
    },
    email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(40),
        validate: {
            len: [2, 255]
        } 
    },
    salt: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2, 255]
        },
    },
    hash: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2, 255]
        }
    }
});

// User.hasMany(Post, { foreignKey: 'authorId' });
// Post.belongsTo(User, { as: 'author', foreignKey: 'authorId' });
 
module.exports = User;