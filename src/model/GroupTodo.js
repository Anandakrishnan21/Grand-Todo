import mongoose, { models, Schema } from "mongoose";

const groupTodoSchema = new Schema(
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
    members: [{
      email: {
        type: String,
        required: true,
      },
      progress: {
        type: String,
        default: "todo",
      },
    }],
    groupName:{
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const GroupTodo = models.GroupTodo || mongoose.model("Group Todo", groupTodoSchema);
export default GroupTodo;