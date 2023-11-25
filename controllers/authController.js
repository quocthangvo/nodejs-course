const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { env } = require("../config/env");
const register = async (req, res) => {
  //unique ko trùng
  const { username, email, password } = req.body;
  //check email
  const isExistedEmail = await User.findOne({ email });
  if (isExistedEmail) {
    return res.status(409).json({
      // email đã tồn tại lỗi 409 (conflict)
      success: false,
      message: "email is already existed",
    });
  }

  const salt = bcrypt.genSaltSync(12); // thêm mã hóa 12 từ
  const hashedPasword = bcrypt.hashSync(password);
  console.log(hashedPasword);
  // Sync chờ chạy xong dòng này mới tới dòng tiếp, ko có thì sẽ chạy 2 dòng cùng 1 lúc

  const newUser = new User({
    username,
    email,
    password: hashedPasword,
  });
  await newUser.save();
  res.status(201).json({
    success: true,
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
    // 401 là lỗi người dùng ko đăng nhập , đăng nhập sai user, password
  }
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  // tạo json web token
  const token = jwt.sign(
    { username: user.username, id: user._id, email: user.email },
    env.SECRET_KEY,
    { expiresIn: env.EXPIRED_IN }
  );

  res.json({
    success: true,
    token,
  });
};

module.exports = {
  register,
  login,
};
