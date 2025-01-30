const Task = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const createTask = async (req, res) => {
  const { title, description, dueDate, status } = req.body;

  try {
    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      dueDate,
      status,
    });
    console.log("TASK", task);

    if (task) {
      return res.status(201).json(task);
    } else {
      res.status(400).json({ message: "Failed to create task" });
    }
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateTask = async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Ensure the task belongs to the logged-in user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    // Convert dueDate to a Date object if it exists
    if (dueDate) {
      if (typeof dueDate === "string") {
        task.dueDate = new Date(dueDate);
      } else {
        task.dueDate = dueDate;
      }
    }

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Ensure the task belongs to the logged-in user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await task.deleteOne();
    res.json({ message: "Task removed" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { getTasks, createTask, updateTask, deleteTask };
