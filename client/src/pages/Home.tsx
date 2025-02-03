import { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import fetchWrapper from "../app/fetchWrapper";
import NavBar from "../components/NavBar";
import { Task } from "../models/Types";
import Autocomplete from "@mui/material/Autocomplete";
import PieChartComponent from "../components/PieChart";

const taskStatuses = ["Pending", "In Progress", "Completed"];

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [status, setStatus] = useState({
    completed: 0,
    pending: 0,
    progress: 0,
  });
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
  });

  const handleSubmit = async () => {
    try {
      await fetchWrapper.post("/api/tasks", form);
      alert(`Task added successfully`);
      setForm({ title: "", description: "", dueDate: "", status: "Pending" });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetchWrapper.get("/api/tasks");
        setTasks(response.data);
        setStatus(
          (status.completed = response.data?.filter(
            (task: Task) => task.status === "Completed",
          ).length),
        );
        setStatus(
          (status.pending = response.data?.filter(
            (task: Task) => task.status === "Pending",
          ).length),
        );
        setStatus({
          ...status,
          progress: response.data?.filter(
            (task: Task) => task.status === "In Progress",
          ).length,
        });
      } catch (error) {
        console.error(error);
      }
    };
    getTasks();
  }, []);

  console.log("STATUS", tasks);

  return (
    <div>
      <NavBar />
      <div className=" h-screen flex justify-center  flex-cols items-center">
        <div className="flex gap-12">
          <div className="flex flex-col gap-8 justify-center">
            <div>
              <Box
                width={400}
                height={100}
                bgcolor="white"
                border="1px solid pink"
                borderRadius={2}
              >
                <h1 className="bg-red-300 p-2 rounded-lg text-center font-bold text-black text-xl">
                  Registered Tasks
                </h1>
                <h1 className="text-center  text-black text-xl mt-3">
                  {" "}
                  Total: {tasks.length}
                </h1>
              </Box>
            </div>
            <div>
              <PieChartComponent
                completed={status.completed}
                pending={status.pending}
                progress={status.progress}
              />
            </div>
          </div>
          <div className="flex border border-1 border-pink-400 rounded-xl  bg-stone-300 text-black w-[80%] p-20">
            <div className="flex justify-center  items-center flex-col gap-4 w-[100%] ">
              <h1 className=" text-center text-4xl text-indigo-400 flex flex-wrap">
                TASK MANAGEMENT APP
              </h1>
              <h1 className="flex justify-center text-4xl text-red-400">
                ADD TODO
              </h1>
              <div className="flex gap-24 items-center">
                <h2>Title </h2>
                <TextField
                  size="small"
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  type="text"
                  style={{ width: "400px" }}
                  value={form.title}

                  // fullWidth
                />
              </div>
              <div className="flex gap-12 items-center">
                <h1>Description</h1>
                <TextField
                  size="small"
                  style={{ width: "400px" }}
                  className="py-20"
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  value={form.description}
                />
              </div>
              <div className="flex gap-16 items-center">
                <h1>DueDate</h1>
                <TextField
                  size="small"
                  type="date"
                  style={{ width: "400px" }}
                  value={form.dueDate}
                  onChange={(e) =>
                    setForm({ ...form, dueDate: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-20 items-center">
                <h1>Status</h1>
                <Autocomplete
                  size="small"
                  disablePortal
                  options={taskStatuses}
                  value={form.status}
                  onChange={(event, newValue) =>
                    setForm({ ...form, status: newValue as string })
                  }
                  sx={{ width: 400 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Status" />
                  )}
                />
              </div>

              <div className="flex justify-start items-end ml-48">
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  size="medium"
                  style={{
                    backgroundColor: "red",
                    color: "lime",
                    paddingRight: "40px",
                    paddingLeft: "40px",
                    marginLeft: "220px",
                  }}
                >
                  ADD
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
