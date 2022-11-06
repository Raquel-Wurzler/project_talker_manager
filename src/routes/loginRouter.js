// Crie o endpoint POST /login
// O endpoint deverá receber no corpo da requisição os campos email e password e retornar um token aleatório de 16 caracteres. Deve ter as validações de email e password
const express = require('express');
const generateToken = require('../utils/generateToken');
const { validateEmail } = require('../middleware/validateEmail');
const { validatePassword } = require('../middleware/validatePassword');

const loginRouter = express.Router();

loginRouter.post('/login',
  validateEmail,
  validatePassword,
  (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const token = generateToken();
      return res.status(200).json({ token });
    }
    return res.status(404).json({ message: 'Obrigatório preencher email e senha' });
  } catch (error) {
    return res.status(500).json({ message: `${error.message}` });
  }
});

module.exports = loginRouter;
