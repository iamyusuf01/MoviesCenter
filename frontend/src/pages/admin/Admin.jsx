import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const drawerWidth = 240;

const Admin = () => {
  const { setIsLoggedIn, isAdmin, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/v1/user/logout"
      );
      if (data.success) {
        toast.success(data.success);
        setIsLoggedIn(false);
        navigate("/sign-in");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    isAdmin && (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {/* Top Bar */}
        <AppBar
          position="fixed"
          sx={{ zIndex: 1201, backgroundColor: "#121212" }}
        >
          <Toolbar sx={{ direction: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" noWrap>
              <Link to={"/"}>Home</Link>
            </Typography>
            <Typography variant="h6" noWrap>
              Admin Panel
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#1e1e1e",
              color: "#fff",
            },
          }}
        >
          <Toolbar />
          <List>
            {/* <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/admin/dashboard")}>
                <ListItemIcon sx={{ color: "#fff" }}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem> */}

            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/admin/add-movie")}>
                <ListItemIcon sx={{ color: "#fff" }}>
                  <MovieIcon />
                </ListItemIcon>
                <ListItemText primary="Add Movie" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/admin/movies")}>
                <ListItemIcon sx={{ color: "#fff" }}>
                  <MovieIcon />
                </ListItemIcon>
                <ListItemText primary="Movies" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={logoutUser}>
                <ListItemIcon sx={{ color: "#fff" }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "#f5f5f5",
            p: 3,
            // ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    )
  );
};

export default Admin;
