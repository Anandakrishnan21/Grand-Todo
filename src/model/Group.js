import mongoose, { models, Schema } from "mongoose";

const groupSchema = new Schema(
  {
    group: {
      type: String,
      required: true,
    },
    members: {
      type: Array,
      required: true,
    },
    admin: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Group = models.Group || mongoose.model("Group", groupSchema);
export default Group;
