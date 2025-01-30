const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // set this in .env
    pass: process.env.EMAIL_PASS,
  },
});

const sendReminderEmail = async (to, task) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Task Reminder",
    text: `Reminder: Your task "${task.title}" is due on ${task.dueDate}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reminder sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
