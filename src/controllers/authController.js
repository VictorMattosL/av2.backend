const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { nome, email, senha, perfil } = req.body;
    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ erro: 'Email já cadastrado' });

    const user = await User.create({ nome, email, senha, perfil });
    res.status(201).json({ mensagem: 'Usuário criado com sucesso!', id: user._id });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ erro: 'Usuário não encontrado' });

    const senhaOk = await user.compararSenha(senha);
    if (!senhaOk) return res.status(401).json({ erro: 'Senha incorreta' });

    const token = jwt.sign(
      { id: user._id, perfil: user.perfil },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token, perfil: user.perfil, nome: user.nome });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};