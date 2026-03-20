const User = require('../models/user');
const jwt = require('jsonwebtoken');

const registrar = async (req, res) => {
  try {
    const { nome, email, senha, perfil } = req.body;

    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) return res.status(400).json({ erro: 'Email já cadastrado' });

    const usuario = await User.create({ nome, email, senha, perfil });

    res.status(201).json({ mensagem: 'Usuário criado com sucesso', id: usuario._id });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(401).json({ erro: 'Credenciais inválidas' });

    const senhaCorreta = await usuario.compararSenha(senha);
    if (!senhaCorreta) return res.status(401).json({ erro: 'Credenciais inválidas' });

    const token = jwt.sign(
      { id: usuario._id, perfil: usuario.perfil },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, usuario: { id: usuario._id, nome: usuario.nome, perfil: usuario.perfil } });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

module.exports = { registrar, login };
