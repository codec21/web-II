const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
  idUsuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  senha: DataTypes.STRING,
  tipo_usuario: DataTypes.ENUM('admin', 'user')
}, {
  tableName: 'Usuario',
  timestamps: false
});

module.exports = Usuario;