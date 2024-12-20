const express = require('express');
const router = express.Router();
const EventoController = require('../controllers/EventoController');
const authMiddleware = require('../middlewares/auth');

/**
 * @swagger
 * /eventos/criar:
 *   post:
 *     summary: Cria um novo evento
 *     tags: [Eventos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               data_evento:
 *                 type: string
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 *       400:
 *         description: Erro na requisição
 */

// criar um evento
router.post('/criar', authMiddleware, EventoController.criar);

/**
 * @swagger
 * /eventos:
 *   get:
 *     summary: Lista todos os eventos
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: Lista de eventos retornada com sucesso
 */

// listar eventos
router.get('/', EventoController.listarEventos);

/**
 * @swagger
 * /eventos/{eventoId}:
 *   put:
 *     summary: Atualiza um evento existente
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               data_evento:
 *                 type: string
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       403:
 *         description: Acesso negado (somente o criador ou admin pode atualizar o evento)
 *       404:
 *         description: Evento não encontrado
 */

// atualizar evento (somente admin ou quem criou o evento)
router.put('/:eventoId', authMiddleware, EventoController.atualizar);

/**
 * @swagger
 * /eventos/{eventoId}:
 *   delete:
 *     summary: Exclui um evento existente
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento a ser excluído
 *     responses:
 *       200:
 *         description: Evento excluído com sucesso
 *       403:
 *         description: Acesso negado (somente o criador ou admin pode excluir o evento)
 *       404:
 *         description: Evento não encontrado
 */

// excluir evento (somente admin ou quem criou o evento)
router.delete('/:eventoId', authMiddleware, EventoController.excluir);

module.exports = router;
