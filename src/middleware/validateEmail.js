const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!email) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!email.match(regex)) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  return next();
};

module.exports = { validateEmail };
