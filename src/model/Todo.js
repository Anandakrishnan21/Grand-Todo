import { models, Schema } from "mongoose";

const todoSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  assignee: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  notify: {
    type: String,
  },
});

const Todo = models.Todo || mongoose.model("Todo", todoSchema);
export default Todo;
