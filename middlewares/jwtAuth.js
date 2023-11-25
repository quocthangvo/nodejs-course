const jwt = require("jsonwebtoken");

const jwtAuth = (req, res, next) => {
  const headerToken = req.headers.authorization;

  if (!headerToken && !headerToken.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  const token = headerToken.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    // đúng token "secret-key thì trả về user đã đăng kí"
    const user = jwt.verify(token, env.SECRET_KEY);
    req.user = user;
    next();
  } catch (error) {
    // trả về false
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

module.exports = jwtAuth;
