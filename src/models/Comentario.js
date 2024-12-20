const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./Usuario');
const Evento = require('./Evento');

const Comentario = sequelize.define('Comentario', {
  idComentario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  conteudo: DataTypes.TEXT,
  data_hora_comentario: DataTypes.DATE
}, {
  tableName: 'Comentario',
  timestamps: false
});

Comentario.belongsTo(Usuario, { foreignKey: 'Usuario_idUsuario' });
Comentario.belongsTo(Evento, { foreignKey: 'Evento_idEvento' });
module.exports = Comentario;
