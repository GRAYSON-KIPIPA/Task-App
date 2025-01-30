const cron = require("node-cron");
const Task = require("./models/Task");
const User = require("./models/User");
const sendReminderEmail = require("./emailService");

cron.schedule("0 0 12 1/1 * * *", async () => {
  try {
    const now = new Date();
    const upcomingTasks = await Task.find({
      dueDate: { $lte: new Date(now.getTime() + 60 * 60 * 1000) }, //Task due 1hr
      completed: false,
    }).populate("user");

    for (const task of upcomingTasks) {
      if (task.user.email) {
        await sendReminderEmail(task.user.email, task);
      }
    }
  } catch (error) {
    console.error("Error scheduling reminders:", error);
  }
});
console.log("Task reminder scheduler started...");
