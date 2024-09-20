import mongoose, { models, Schema } from "mongoose";

const todoSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
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
    status: {
      type: String,
      default: "Todo",
    },
  },
  { timestamps: true }
);

const Todo = models.Todo || mongoose.model("Todo", todoSchema);
export default Todo;
