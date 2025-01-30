const mongoose = require("mongoose");
const { stringify } = require("querystring");

const taskSchema = new mongoose.Schema({
  user: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: false },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  reminderTime: { type: Date, required: false },
});

module.exports = mongoose.model("Task", taskSchema);
