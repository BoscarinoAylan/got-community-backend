const Sequelize = require('sequelize');

const database = require('../core/database');
const User = require('../user/model');

const Post = database.define('post', {
    id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    title: {
        allowNull: false,
        type: Sequelize.STRING(140),
        validate: {
            len: [2, 140]
        }
    },
    body: {
        allowNull: false,
        type: Sequelize.TEXT,
        validate: {
            len: [2, 10000]
        }
    }
});

User.hasMany(Post, { foreignKey: 'authorId' });
Post.belongsTo(User, { as: 'author', foreignKey: 'authorId' });

module.exports = Post;