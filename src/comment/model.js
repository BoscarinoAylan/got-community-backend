const Sequelize = require('sequelize');

const database = require('../core/database');
const Post = require('../post/model');
const User = require('../user/model');

const Comment = database.define('comment', {
    id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    body: {
        allowNull: false,
        type: Sequelize.TEXT,
        validate: {
            len: [10, 500]
        }
    }
});

User.hasMany(Comment, { foreignKey: 'authorId' });
Comment.belongsTo(User, { as: 'author', foreignKey: 'authorId' });

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

module.exports = Comment;