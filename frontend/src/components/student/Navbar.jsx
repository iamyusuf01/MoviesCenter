import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import Search from "./Search";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, isAdmin } = useContext(AppContext);
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/logout"
      );
      if (data.success) {
        toast.success(data.message);
        setIsLoggedIn(false);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#121212",
        paddingX: 2,
      }}
    >
      <Toolbar sx={{ display: "flex", gap: 2 }}>
        <Button
          onClick={() => navigate("/")}
          sx={{
            backgroundColor: "#f5c518",
            color: "#000",
            fontWeight: "bold",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "20px",
          }}
        >
          IMDb
        </Button>
        <Button
          startIcon={<MenuIcon />}
          sx={{ color: "#fff", textTransform: "none" }}
        >
          Menu
        </Button>
        <Search />

        {/* Right Side */}
        <Button sx={{ color: "#fff", textTransform: "none" }}>IMDbPro</Button>

        {isAdmin ? (
          <Button
            onClick={() => navigate("/admin")}
            // startIcon={<TurnedInNotIcon />}
            sx={{ color: "#fff", textTransform: "none" }}
          >
            Admin Panel
          </Button>
        ) : (
          <Button
            startIcon={<TurnedInNotIcon />}
            sx={{ color: "#fff", textTransform: "none" }}
          >
            Watchlist
          </Button>
        )}

        {!isLoggedIn ? (
          <Button
            onClick={() => navigate("/sign-in")}
            sx={{ color: "#fff", textTransform: "none" }}
          >
            SignIn
          </Button>
        ) : (
          <Button
            onClick={logoutUser}
            sx={{ color: "#fff", textTransform: "none" }}
          >
            Logout
          </Button>
        )}

        {/* <Button sx={{ color: "#fff", textTransform: "none" }}>
          EN
        </Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
