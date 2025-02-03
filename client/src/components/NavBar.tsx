import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#78350F" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            onClick={() => navigate("/home")}
            className="cursor-pointer text-3xl"
            // variant="h6"
            component="p"
            sx={{ flexGrow: 1 }}
          >
            HOME
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <Button onClick={() => navigate("/home")} color="inherit">
            ADD-TODO
          </Button>
          <Button onClick={() => navigate("/tasks")} color="inherit">
            LIST-TODO
          </Button>
          <Button onClick={() => navigate("/profile")} color="inherit">
            PROFILE
          </Button>
          <Button onClick={handleLogout} color="inherit">
            LOGOUT
          </Button>
          <Button
            variant="contained"
            onClick={toggleTheme}
            startIcon={theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            className={theme}
          >
            {/* {theme === "light" ? "Dark Mode" : "Light Mode"} */}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
