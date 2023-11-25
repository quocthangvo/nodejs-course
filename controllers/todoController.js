const { default: mongoose } = require("mongoose");
const Todo = require("../models/Todo");
const jwt = require("jsonwebtoken");
const createTodo = async (req, res) => {
  const { content } = req.body;

  //req.Authentication
  const headerToken = req.headers.authorization;
  if (headerToken && headerToken.startsWith("Bearer ")) {
    const token = headerToken.split(" ")[1];
    const user = jwt.verify(token, "secret-key");
    console.log(user);
  } else {
    return res.status(401).json({
      success: false,
    });
  }

  const newTodo = new Todo({
    content,
  });
  await newTodo.save();
  res.status(201).json({
    success: true,
    user: req.user,
  });
};
//
const getTodo = async (req, res) => {
  const todos = await Todo.find();
  res.json({
    success: true,
    data: todos,
  });
};
const deleteTodoById = async (req, res) => {
  const { id } = req.params;
  //check id is ObjectId
  const isObjectId = mongoose.Types.ObjectId.isValid(id);
  console.log(isObjectId);

  await Todo.findByIdAndDelete(id);
  res.json({
    success: true,
  });
};
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const result = await Todo.findByIdAndUpdate(id, { content }, { new: true });
  // findOneAndUpdate thì sẽ có thêm {_id: } , còn findIdAndUpdate thì ko
  res.json({
    success: true,
    result,
  });
};
module.exports = {
  createTodo,
  getTodo,
  deleteTodoById,
  updateTodo,
};
