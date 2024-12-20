const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  async login(req, res) {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ error: 'Senha incorreta' });

    const token = jwt.sign({ id: usuario.idUsuario }, process.env.JWT_SECRET);
    res.json({ token });
  },

  async criar(req, res) {
    const { nome, email, senha, tipo_usuario } = req.body;

    // validacao de usuario
    if (!nome || !email || !senha || !tipo_usuario) {
      return res.status(400).json({ error: 'Preencha todos os campos obrigatórios' });
    }

    // Criptografia da senha com Bcrypt
    const senhaHash = await bcrypt.hash(senha, 10);

    try {
      const usuario = await Usuario.create({
        nome,
        email,
        senha: senhaHash,
        tipo_usuario
      });

      res.status(201).json(usuario);  // Retorna o usuário criado
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar o usuário' });
    }
  }
};
