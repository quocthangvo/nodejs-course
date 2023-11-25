require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./database/connect");
const Todo = require("./models/Todo");
const todoRouter = require("./routes/todo");
const authRouter = require("./routes/auth");
const app = express();
const { env } = require("./config/env");
const PORT = env.PORT;

//express json
app.use(express.json());
app.use(morgan("dev")); // dùng để tìm method,
//connect DB
connectDB().then(() => {
  console.log("connected databsae successfully");
});
app.use("/todo", todoRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log("server is running on port ${PORT}");
});
