import React, { useEffect, useState } from "react";
import fetchWrapper from "../server/fetchWrapper";
import { User } from "../models/Types";
import {
  Button,
  TextField,
  Container,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import NavBar from "../components/NavBar";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Profile = () => {
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

  console.log(showPassword);

  return (
    <>
      <NavBar />
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Profile Settings
        </Typography>
        {message && <Typography color="primary">{message}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            fullWidth
            margin="normal"
            value={form.username}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
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
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Profile;
