const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  if (!Number.isInteger(age)) {
    return res.status(400).json({ message: 'Deve ser um número inteiro' });
  }
  return next();
};

module.exports = {
  validateAge,
};
