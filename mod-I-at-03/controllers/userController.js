const { User } = require('../models/user');
const sequelize = require('../database');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar todos os usuários' });
        }
    },

    createUser: async (req, res) => {
        const { username, password, email } = req.body;
        try {
            const user = await User.create({ username, password, email });
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar um novo usuário' });
        }
    },

    getUserById: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findByPk(id);
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar o usuário pelo ID' });
        }
    },

    updateUser: async (req, res) => {
        const { id } = req.params;
        const { username, password, email } = req.body;
        try {
            await User.update({ username, password, email }, { where: { id } });
            const updatedUser = await User.findByPk(id);
            res.json(updatedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar o usuário' });
        }
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            await User.destroy({ where: { id } });
            res.json({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar o usuário' });
        }
    }
};

module.exports = userController;
