const Comentario = require('../models/Comentario');
const Evento = require('../models/Evento');
const Usuario = require('../models/Usuario');

module.exports = {
  // listar comentarios de um evento
  async listarComentarios(req, res) {
    const { eventoId } = req.params;

    try {
      const comentarios = await Comentario.findAll({ where: { Evento_idEvento: eventoId } });
      res.status(200).json(comentarios);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar comentários' });
    }
  },

  // criar novo comentario
  async criar(req, res) {
    const { conteudo, eventoId } = req.body;

    if (!conteudo || !eventoId) {
      return res.status(400).json({ error: 'Conteúdo e eventoId são obrigatórios' });
    }

    try {
      const usuarioId = req.userId; // O id do usuário vem do token JWT

      // Verifique se o evento existe
      const evento = await Evento.findByPk(eventoId);
      if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }

      // Criar o comentário
      const comentario = await Comentario.create({
        conteudo,
        Evento_idEvento: eventoId,
        Usuario_idUsuario: usuarioId,
        data_hora_comentario: new Date()
      });

      res.status(201).json(comentario);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar o comentário' });
    }
  },

  // Apagar comentário
  async excluir(req, res) {
    const { comentarioId } = req.params;
    const usuarioId = req.userId; // O id do usuário vem do token JWT

    try {
      // Verificar se o comentário existe
      const comentario = await Comentario.findByPk(comentarioId);
      if (!comentario) {
        return res.status(404).json({ error: 'Comentário não encontrado' });
      }

      // Verificar se o usuário é o administrador ou quem criou o comentário
      if (comentario.Usuario_idUsuario !== usuarioId) {
        const usuario = await Usuario.findByPk(usuarioId);
        if (usuario.tipo_usuario !== 'admin') {
          return res.status(403).json({ error: 'Você não tem permissão para excluir este comentário' });
        }
      }

      // Excluir comentário
      await comentario.destroy();
      res.status(200).json({ message: 'Comentário excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir comentário' });
    }
  },
};
