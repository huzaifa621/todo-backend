const { Router } = require("express");
const TodoModel = require("../models/todo.model");

const todoRouter = Router();

/*
 * Route standards
 *
 * 1. / [GET] -> get all todos data
 * 2. /id [GET] -> get todo w.r.t id
 * 3. / [POST] -> add todo
 * 4. / [EDIT] -> edit todo w.r.t id
 * 5. /id [DELETE] -> delete todo w.r.t id
 */

todoRouter.get("/", async (req, res) => {
   try {
      const todos = await TodoModel.find();
      return res.status(200).json({ todos });
   } catch (err) {
      return res
         .status(500)
         .json({ error: true, message: "Error while getting todos" });
   }
});

todoRouter.get("/:id", async (req, res) => {
   try {
      const { id } = req.params;
      const todo = await TodoModel.findById(id);
      return res.status(200).json({ todo });
   } catch (err) {
      return res.status(500).json({
         error: true,
         message: "Error while getting a particular todo",
      });
   }
});

todoRouter.post("/", async (req, res) => {
   try {
      const todo = new TodoModel(req.body);
      await todo.save();
      const todos = await TodoModel.find();
      res.status(200).json({ message: "Todo added successfully" });
   } catch (err) {
      res.status(500).json({
         error: true,
         message: "Error while adding todos",
      });
   }
});

todoRouter.patch("/:id", async (req, res) => {
   try {
      const { id } = req.params;
      await TodoModel.updateOne({ _id: id }, { $set: { ...req.body } });
      const updatedTodo = await TodoModel.findById(id);
      res.status(200).json({ todo: updatedTodo });
   } catch (err) {
      res.status(500).json({
         error: true,
         message: "Error while editing the todo",
      });
   }
});

todoRouter.delete("/:id", async (req, res) => {
   try {
      const { id } = req.params;
      await TodoModel.deleteOne({ _id: id });
      return res.status(200).json({ message: "Todo removed successfully" });
   } catch (err) {
      return res
         .status(500)
         .json({ error: true, message: "Error while removing todo" });
   }
});

module.exports = todoRouter;
