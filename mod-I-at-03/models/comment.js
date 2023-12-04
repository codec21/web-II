const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');
const Post = require('./post');

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    content: DataTypes.TEXT,
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
});

Comment.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
Comment.belongsTo(Post, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Comment);
Post.hasMany(Comment);

module.exports = Comment;