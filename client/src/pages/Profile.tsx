import React, { useEffect, useState } from "react";
import fetchWrapper from "../app/fetchWrapper";
import { User } from "../models/Types";
import {
  Button,
  TextField,
  Container,
  Typography,
  InputAdornment,
  IconButton,
  Avatar,
} from "@mui/material";
import NavBar from "../components/NavBar";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { deepOrange } from "@mui/material/colors";

const Profile = () => {
  const theme = useTheme();
  const [form, setForm] = useState<User>({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetchWrapper.get("/api/auth/profile");
        setForm({
          username: response.data.username,
          email: response.data.email,
          password: response.data.password,
        });
        console.log("USER PROFILE", response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetchWrapper.put("/api/auth/profile", form);
      setMessage("Profile updated successfully!");
      console.log("Updated Profile:", response.data);
    } catch (error) {
      console.error("Update error:", error);
      setMessage("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const initials = form["username"]
    ?.split(" ")
    .map((word) => word[0])
    .join("");

  console.log(showPassword);

  return (
    <>
      <NavBar />
      <Container maxWidth="sm">
        <Typography className="text-center p-2" variant="h4" gutterBottom>
          Profile Settings
        </Typography>
        <div className="flex justify-center items-center">
          <Avatar sx={{ width: 100, height: 100, bgcolor: deepOrange[500] }}>
            <span className="text-4xl">{initials}</span>
          </Avatar>
        </div>
        {message && <Typography color="primary">{message}</Typography>}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
        >
          <TextField
            label="Username"
            name="username"
            fullWidth
            margin="normal"
            value={form.username}
            onChange={handleChange}
            sx={{
              input: { color: theme.palette.mode === "dark" ? "#fff" : "#000" },
              label: { color: theme.palette.mode === "dark" ? "#bbb" : "#555" },
            }}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
            sx={{
              input: { color: theme.palette.mode === "dark" ? "#fff" : "#000" },
              label: { color: theme.palette.mode === "dark" ? "#bbb" : "#555" },
            }}
          />
          <TextField
            name="password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
            InputProps={{
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            className="mt-4"
          >
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Profile;
