exports.env = {
  PORT: process.env.PORT || 3000,
  SECRET_KEY: process.env.SECRET_KEY || "123456",
  MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/nodejs-course",
  EXPIRED_IN: "1d",
};
