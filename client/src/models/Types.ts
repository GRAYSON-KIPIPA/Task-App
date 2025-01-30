export interface Task {
  title: string;
  description: string;
  _id: string;
  user: string;
  dueDate: Date;
  status: string;
  reminderTime: Date;
}

export interface User {
  username?: string;
  email: string;
  password: string;
}
