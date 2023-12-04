const { Comment } = require('../models/comment');
const sequelize = require('../database');

const commentController = {
    getAllComments: async (req, res) => {
        try {
            const comments = await Comment.findAll();
            res.json(comments);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar todos os comentários' });
        }
    },

    createComment: async (req, res) => {
        const { content, user_id, post_id } = req.body;
        try {
            const comment = await Comment.create({ content, user_id, post_id });
            res.json(comment);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar um novo comentário' });
        }
    },

    getCommentById: async (req, res) => {
        const { id } = req.params;
        try {
            const comment = await Comment.findByPk(id);
            res.json(comment);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar o comentário pelo ID' });
        }
    },

    updateComment: async (req, res) => {
        const { id } = req.params;
        const { content } = req.body;
        try {
            await Comment.update({ content }, { where: { id } });
            const updatedComment = await Comment.findByPk(id);
            res.json(updatedComment);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar o comentário' });
        }
    },

    deleteComment: async (req, res) => {
        const { id } = req.params;
        try {
            await Comment.destroy({ where: { id } });
            res.json({ message: 'Comentário deletado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar o comentário' });
        }
    }
};

module.exports = commentController;