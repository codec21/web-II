const Evento = require('../models/Evento');
const Usuario = require('../models/Usuario');

module.exports = {
  // listar todos os eventos
  async listarEventos(req, res) {
    try {
      const eventos = await Evento.findAll();
      res.status(200).json(eventos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar eventos' });
    }
  },

  // criar evento
  async criar(req, res) {
    const { titulo, descricao, data_evento, hora_evento, banner_url } = req.body;
    const usuarioId = req.userId; // id via token JWT

    try {
      const evento = await Evento.create({
        titulo,
        descricao,
        data_evento,
        hora_evento,
        banner_url,
        Usuario_idUsuario: usuarioId,
      });

      res.status(201).json(evento);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar evento' });
    }
  },

  // atualizar evento
  async atualizar(req, res) {
    const { eventoId } = req.params;
    const { titulo, descricao, data_evento, hora_evento, banner_url } = req.body;
    const usuarioId = req.userId; // O id do usuário vem do token JWT

    try {
      // Verificar se o evento existe
      const evento = await Evento.findByPk(eventoId);
      if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }

      // Verificar se o usuário é o administrador ou quem criou o evento
      if (evento.Usuario_idUsuario !== usuarioId) {
        const usuario = await Usuario.findByPk(usuarioId);
        if (usuario.tipo_usuario !== 'admin') {
          return res.status(403).json({ error: 'Você não tem permissão para alterar este evento' });
        }
      }

      // Atualizar o evento
      evento.titulo = titulo || evento.titulo;
      evento.descricao = descricao || evento.descricao;
      evento.data_evento = data_evento || evento.data_evento;
      evento.hora_evento = hora_evento || evento.hora_evento;
      evento.banner_url = banner_url || evento.banner_url;

      await evento.save();

      res.status(200).json(evento);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar evento' });
    }
  },

  // excluir evento
  async excluir(req, res) {
    const { eventoId } = req.params;
    const usuarioId = req.userId; // ----

    try {
      // Verificar se o evento existe
      const evento = await Evento.findByPk(eventoId);
      if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }

      // Verificar se o usuário é o administrador ou quem criou o evento
      if (evento.Usuario_idUsuario !== usuarioId) {
        const usuario = await Usuario.findByPk(usuarioId);
        if (usuario.tipo_usuario !== 'admin') {
          return res.status(403).json({ error: 'Você não tem permissão para excluir este evento' });
        }
      }

      // Excluir o evento
      await evento.destroy();
      res.status(200).json({ message: 'Evento excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir evento' });
    }
  },
};
