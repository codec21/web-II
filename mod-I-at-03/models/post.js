const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
});

Post.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Post);

module.exports = Post;