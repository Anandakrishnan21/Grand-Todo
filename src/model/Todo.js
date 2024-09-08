import mongoose, { models, Schema } from "mongoose";

const todoSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    tags: { type: String },
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
    due: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = models.Todo || mongoose.model("Todo", todoSchema);
export default Todo;
