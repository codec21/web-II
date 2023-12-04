const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('s_quero_passar', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb'
});
module.exports = sequelize;