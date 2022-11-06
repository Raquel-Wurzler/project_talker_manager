// Crie um middleware de validação para "Token"
// Deve ter o token de autenticação nos headers, no campo authorization.
// Um token válido é composto por exatamente 16 caracteres
// Caso o token não seja encontrado retorne um código de status 401
// Caso o token seja inválido retorne um código de status 401

const validateToken = (req, res, next) => {
  const token = req.header('Authorization'); 
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
   return next();
};

module.exports = { validateToken };
