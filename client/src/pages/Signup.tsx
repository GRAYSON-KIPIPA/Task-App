import { Button, TextField, InputAdornment, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import fetchWrapper from "../server/fetchWrapper";
import { User } from "../models/Types";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Signup = () => {
  const theme = useTheme();
  console.log(theme);
  const navigate = useNavigate();
  const [form, setForm] = useState<User>({
    email: "",
    password: "",
    username: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    console.log(form);

    try {
      await fetchWrapper.post("/api/auth/register", form);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setForm({ email: "", username: "", password: "" });
  }, []);

  return (
    <div className="flex justify-center flex-col items-center mt-10">
      <h1 className="text-3xl m-4 ">Registration Form</h1>
      <form
        className={`flex justify-center items-center p-10 flex-col gap-4 w-[30%] border-1 rounded-md shadow-md ${
          theme.theme === "dark"
            ? "bg-gray-800 text-white"
            : "bg-white text-black"
        }`}
      >
        {/* Username Field */}
        <TextField
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          size="small"
          fullWidth
          placeholder="User Name"
          className={theme.theme === "dark" ? "bg-gray-700 text-white" : ""}
          InputProps={{
            style: {
              color: theme.theme === "dark" ? "white" : "black",
              backgroundColor: theme.theme === "dark" ? "#333" : "#fff",
            },
          }}
        />

        {/* Email Field */}
        <TextField
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          type="email"
          size="small"
          fullWidth
          placeholder="Email"
          className={theme.theme === "dark" ? "bg-gray-700 text-white" : ""}
          InputProps={{
            style: {
              color: theme.theme === "dark" ? "white" : "black",
              backgroundColor: theme.theme === "dark" ? "lightgray" : "#fff",
            },
          }}
        />

        {/* Password Field */}
        <TextField
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          type={showPassword ? "text" : "password"}
          size="small"
          fullWidth
          placeholder="Password"
          className={theme.theme === "dark" ? "bg-gray-700 text-white" : ""}
          InputProps={{
            style: {
              color: theme.theme === "dark" ? "white" : "black",
              backgroundColor: theme.theme === "dark" ? "#333" : "#fff",
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  style={{
                    color: theme.theme === "dark" ? "white" : "black",
                    backgroundColor: theme.theme === "dark" ? "#333" : "#fff",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Sign-Up Button */}
        <div className="flex justify-start items-end ml-48">
          <Button
            onClick={handleSubmit}
            variant="contained"
            style={{
              backgroundColor: theme.theme === "dark" ? "#444" : "#1976d2",
              color: theme.theme === "dark" ? "white" : "white",
            }}
          >
            Sign up
          </Button>
        </div>
      </form>
      <h1 className="py-4">
        Already have an Account ?
        <a href="/" className="text-blue-400 cursor-pointer underline ">
          {" "}
          Go to Login
        </a>
      </h1>
    </div>
  );
};

export default Signup;
