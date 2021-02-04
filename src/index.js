const express = require("express");
const cors = require("cors");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json()); //Setting This line means express will automatically parse incoming JSON to an object so we can access it in our request handlers.
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

const Task = require("./models/task");
const User = require("./models/user");
