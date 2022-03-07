const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  console.log(req)
  if (!authHeader)
    res.status(401).json({ error: "Not authenticated." })
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecretsecret');
  } catch (err) {
    res.status(500).json({ error: "Erorr." })
  }
  if (!decodedToken)
    res.status(401).json({ error: "Not authenticated." })
  req.userId = decodedToken.userId;
  next();
};
