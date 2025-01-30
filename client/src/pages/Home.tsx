import { useState } from "react";
import { Button, TextField } from "@mui/material";
import fetchWrapper from "../server/fetchWrapper";
import NavBar from "../components/NavBar";

import Autocomplete from "@mui/material/Autocomplete";

const taskStatuses = ["Pending", "In Progress", "Completed"];

const Home = () => {
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
  return (
    <div>
      <NavBar />
      <div className="bg-pink-200 h-screen flex justify-center flex-cols items-center">
        <div className="flex justify-center bg-gray-300 w-[80%] h-[50%] ">
          <div className="flex justify-center items-center p-10 flex-col gap-4 w-[50%] ">
            <h1 className="flex justify-center text-4xl text-red-400">
              ADD TODO
            </h1>
            <div className="flex gap-24 items-center">
              <h2>Title </h2>
              <TextField
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                type="text"
                size="small"
                style={{ width: "400px" }}
                value={form.title}

                // fullWidth
              />
            </div>
            <div className="flex gap-12 items-center">
              <h1>Description</h1>
              <TextField
                style={{ width: "400px" }}
                className="py-20"
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                size="medium"
                value={form.description}
              />
            </div>
            <div className="flex gap-16 items-center">
              <h1>DueDate</h1>
              <TextField
                type="date"
                style={{ width: "400px" }}
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              />
            </div>
            <div className="flex gap-18 items-center">
              <h1>Status</h1>
              <Autocomplete
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
  );
};

export default Home;
