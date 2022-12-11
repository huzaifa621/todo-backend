const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
   title: String,
   status: Boolean,
});

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = TodoModel;
