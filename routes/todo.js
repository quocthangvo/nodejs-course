const express = require("express");
const todoController = require("../controllers/todoController");
const todoSchema = require("../validations/todoSchema");
const validator = require("../middlewares/validator");
const jwtAuth = require("../middlewares/jwtAuth");
const router = express.Router();

//quy tắc tạo restful API , tạo 1 todo content
router.post(
  "/",
  validator(todoSchema.createTodoSchema),
  jwtAuth,
  todoController.createTodo
);
//lấy data từ server về
router.get("/", todoController.getTodo);
// xóa
router.delete(
  "/:id",
  validator(todoSchema.idSchema, "params"),
  todoController.deleteTodoById
);
//update
router.patch(
  "/:id",
  validator(todoSchema.idSchema, "params"),
  todoController.updateTodo
);

module.exports = router;
