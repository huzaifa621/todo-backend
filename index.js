const express = require("express");
const cors = require("cors");
const todoRouter = require("./routes/todo.route");
const connection = require("./configs/db");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/todo", todoRouter);

app.listen(8080, async () => {
   try {
      await connection;
      console.log("http://localhost:8080");
   } catch (err) {
      console.log("Error while starting the server", err);
   }
});
