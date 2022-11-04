const express = require('express');
const generateToken = require('../utils/generateToken');
// const path = require('path');
// const { readingFiles } = require('../utils/readingFiles');

// const talkerPath = path.join(__dirname, '../talker.json');

const loginRouter = express.Router();

loginRouter.post('/login', (req, res) => {
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
