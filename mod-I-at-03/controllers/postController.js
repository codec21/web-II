const { Post } = require('../models/post');
const sequelize = require('../database');

const postController = {
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.findAll();
            res.json(posts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar todos os posts' });
        }
    },

    createPost: async (req, res) => {
        const { title, content, user_id } = req.body;
        try {
            const post = await Post.create({ title, content, user_id });
            res.json(post);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar um novo post' });
        }
    },

    getPostById: async (req, res) => {
        const { id } = req.params;
        try {
            const post = await Post.findByPk(id);
            res.json(post);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar o post pelo ID' });
        }
    },

    updatePost: async (req, res) => {
        const { id } = req.params;
        const { title, content } = req.body;
        try {
            await Post.update({ title, content }, { where: { id } });
            const updatedPost = await Post.findByPk(id);
            res.json(updatedPost);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar o post' });
        }
    },

    deletePost: async (req, res) => {
        const { id } = req.params;
        try {
            await Post.destroy({ where: { id } });
            res.json({ message: 'Post deletado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar o post' });
        }
    }
};

module.exports = postController;