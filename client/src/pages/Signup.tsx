import { Button, TextField, InputAdornment, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import fetchWrapper from "../server/fetchWrapper";
import { User } from "../models/Types";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signup = () => {
  const [form, setForm] = useState<User>({
    email: "",
    password: "",
    username: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    console.log(form);

    try {
      const response = await fetchWrapper.post("/api/auth/register", form);
      console.log("RESPONSE", response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setForm({ email: "", username: "", password: "" });
  }, []);

  return (
    <div className="flex justify-center mt-10">
      <div className="flex justify-center items-center p-10 flex-col gap-4 w-[30%] border-1">
        <TextField
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          size="small"
          fullWidth
          placeholder="User Name"
        />
        <TextField
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          type="email"
          size="small"
          fullWidth
          placeholder="Email"
        />
        <TextField
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          type={showPassword ? "text" : "password"}
          size="small"
          fullWidth
          placeholder="Password"
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
        <div className="flex justify-start items-end ml-48">
          <Button onClick={handleSubmit} variant="contained">
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
