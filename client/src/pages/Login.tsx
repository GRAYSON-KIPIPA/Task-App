import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import fetchWrapper from "../app/fetchWrapper";
import { useNavigate } from "react-router-dom";
import { User } from "../models/Types";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const Login = () => {
  const theme = useTheme();
  const [form, setForm] = useState<User>({ email: "", password: "" });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetchWrapper.post("/api/auth/login", form);
      localStorage.setItem("authToken", response.data.token);
      setForm({ email: "", password: "" });
      navigate("/home");
    } catch (error) {
      console.error(error);
      setError(true);
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10  ">
      <h1 className="text-3xl m-3">Login Form</h1>
      <div
        className={`flex justify-center items-center p-10 flex-col gap-4 w-[30%] border-1 rounded-md shadow-md ${
          theme.palette.mode === "dark"
            ? "bg-gray-800 text-white"
            : "bg-white text-black"
        }`}
      >
        <TextField
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          type="email"
          size="medium"
          fullWidth
          placeholder="Email"
          sx={{
            input: { color: theme.palette.mode === "dark" ? "#fff" : "#000" },
            label: { color: theme.palette.mode === "dark" ? "#bbb" : "#555" },
          }}
        />
        <TextField
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          type={showPassword ? "text" : "password"}
          size="medium"
          fullWidth
          placeholder="Password"
          InputProps={{
            style: {
              color: theme.palette.mode === "dark" ? "white" : "black",
              backgroundColor:
                theme.palette.mode === "dark" ? "lightgray" : "#fff",
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            input: { color: theme.palette.mode === "dark" ? "#fff" : "#000" },
            label: { color: theme.palette.mode === "dark" ? "#bbb" : "#555" },
          }}
        />
        <p>
          {error && (
            <span className="text-red-500 text-xs">
              Wrong email or password
            </span>
          )}
        </p>
        <div className="flex justify-start items-end ml-48">
          <Button onClick={handleSubmit} variant="contained">
            Login
          </Button>
        </div>
      </div>
      <div>
        <Typography className="text-sm py-4">
          Don't have an account? go to{" "}
          <a className="text-blue-500 text-bold" href="/register">
            Signup
          </a>
        </Typography>
      </div>
    </div>
  );
};

export default Login;
