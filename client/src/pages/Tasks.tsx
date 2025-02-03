import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import fetchWrapper from "../app/fetchWrapper";
import { Button, TextField, Autocomplete } from "@mui/material";
import { Task } from "../models/Types";
const taskStatuses = ["Pending", "In Progress", "Completed"];

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const tasksPerPage = 3; // Number of tasks per page

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetchWrapper.get("/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getTasks();
  }, []);

  const handleTaskChange = (id: string, field: string, value: unknown) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, [field]: value || "" } : task,
      ),
    );
  };

  const updateTask = async (id: string) => {
    const taskToUpdate: Task | undefined = tasks.find(
      (task) => task._id === id,
    );
    try {
      const response = await fetchWrapper.put(`/api/tasks/${id}`, {
        title: taskToUpdate?.title,
        description: taskToUpdate?.description,
        dueDate: taskToUpdate?.dueDate,
        status: taskToUpdate?.status,
      });
      console.log("Task updated:", response);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await fetchWrapper.delete(`/api/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(tasks.length / tasksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex gap-5 flex-wrap justify-center my-2">
        {currentTasks.map((task) => (
          <div
            key={task._id}
            className="flex mt-10 rounded-xl bg-stone-100 justify-center items-center p-10 border-pink-500 flex-col gap-8 w-[30%] border-1"
          >
            {/* Title Input */}
            <TextField
              size="small"
              fullWidth
              value={task.title}
              onChange={(e) =>
                handleTaskChange(task._id, "title", e.target.value)
              }
            />

            {/* Description Input */}
            <TextField
              size="small"
              fullWidth
              value={task.description}
              onChange={(e) =>
                handleTaskChange(task._id, "description", e.target.value)
              }
            />
            {task.dueDate && (
              <TextField
                type="date"
                size="small"
                fullWidth
                value={
                  task.dueDate
                    ? new Date(task.dueDate).toISOString().split("T")[0]
                    : ""
                } // ✅ Convert Date to string
                onChange={(e) =>
                  handleTaskChange(task._id, "dueDate", e.target.value)
                }
              />
            )}

            <Autocomplete
              disablePortal
              options={taskStatuses}
              value={task.status}
              onChange={(_, newValue) =>
                handleTaskChange(task._id, "status", newValue)
              }
              sx={{ width: 320 }}
              size="small"
              renderInput={(params) => <TextField {...params} label="Status" />}
            />

            {/* Buttons */}
            <div className="flex justify-between w-full">
              <Button
                size="small"
                onClick={() => updateTask(task._id)}
                variant="contained"
              >
                Edit & save
              </Button>
              <Button
                size="small"
                style={{ backgroundColor: "red" }}
                onClick={() => deleteTask(task._id)}
                variant="contained"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 my-4">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          variant="contained"
        >
          Previous
        </Button>
        <span>Page {currentPage}</span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(tasks.length / tasksPerPage)}
          variant="contained"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Tasks;
