import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
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
            className="cursor-pointer"
            variant="h6"
            component="div"
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
