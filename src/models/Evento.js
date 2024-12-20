const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./Usuario');

const Evento = sequelize.define('Evento', {
  idEvento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  titulo: DataTypes.STRING,
  descricao: DataTypes.TEXT,
  data_evento: DataTypes.DATEONLY,
  hora_evento: DataTypes.TIME,
  banner_url: DataTypes.STRING
}, {
  tableName: 'Evento',
  timestamps: false
});

Evento.belongsTo(Usuario, { foreignKey: 'Usuario_idUsuario' });
module.exports = Evento;
