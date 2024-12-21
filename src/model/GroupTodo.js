import mongoose, { models, Schema } from "mongoose";

const groupTodoSchema = new Schema(
  {
    groupId: {
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
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Todo",
    },
    notificationTime: {
      type: String,
      required: true,
    },
    members: [
      {
        email: {
          type: String,
          required: true,
        },
        progress: {
          type: String,
          default: "Todo",
        },
      },
    ],
  },
  { timestamps: true }
);

const GroupTodo =
  models.GroupTodo || mongoose.model("GroupTodo", groupTodoSchema);
export default GroupTodo;
