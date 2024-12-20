const express = require('express');
const router = express.Router();
const ComentarioController = require('../controllers/ComentarioController');
const authMiddleware = require('../middlewares/auth');

/**
 * @swagger
 * /comentarios/criar:
 *   post:
 *     summary: Cria um novo comentário em um evento
 *     tags: [Comentários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               conteudo:
 *                 type: string
 *               eventoId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Comentário criado com sucesso
 *       400:
 *         description: Erro na requisição
 */

// criar comentário
router.post('/criar', authMiddleware, ComentarioController.criar);

/**
 * @swagger
 * /comentarios/{eventoId}:
 *   get:
 *     summary: Lista todos os comentários de um evento
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de comentários retornada com sucesso
 *       404:
 *         description: Evento não encontrado ou não possui comentários
 */

// listar comentarios
router.get('/:eventoId', ComentarioController.listarComentarios);

/**
 * @swagger
 * /comentarios/{id}:
 *   delete:
 *     summary: Exclui um comentário
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comentário excluído com sucesso
 *       404:
 *         description: Comentário não encontrado
 */

// excluir um comentario
router.delete('/:comentarioId', authMiddleware, ComentarioController.excluir);

module.exports = router;
