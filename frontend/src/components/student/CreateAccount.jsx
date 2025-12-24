import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { AppContext } from "../../context/AppContext";

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setInLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, email, password },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("User Register Successfully");
        navigate("/sign-in");
        console.log(data)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 6,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <Typography sx={{ fontWeight: "bold", fontSize: 26 }}>IMDb</Typography>
        <Divider orientation="vertical" flexItem />
        <Typography sx={{ fontWeight: "bold", fontSize: 26 }}>
          Sign Up
        </Typography>
      </Box>

      <Box
        sx={{
          width: 360,
          border: "1px solid #ddd",
          borderRadius: 2,
          p: 3,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3 }}>
          Create account
        </Typography>

        <form onSubmit={handleClick}>
          <Typography sx={{ fontSize: 14, fontWeight: "bold", mb: 0.5 }}>
            Your name
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="First and last name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            sx={{ mb: 2 }}
          />

          <Typography sx={{ fontSize: 14, fontWeight: "bold", mb: 0.5 }}>
            Email
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            sx={{ mb: 2 }}
          />
          {/* Password */}
          <Typography sx={{ fontSize: 14, fontWeight: "bold", mb: 0.5 }}>
            Password
          </Typography>
          <TextField
            fullWidth
            size="small"
            type="password"
            placeholder="At least 6 characters"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            sx={{ mb: 1 }}
          />

          {/* Password Info */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Typography sx={{ fontSize: 13 }}>
              Passwords must be at least 6 characters.
            </Typography>
          </Box>
          <Button
          type="submit"
            fullWidth
            sx={{
              backgroundColor: "#ffd814",
              color: "#000",
              fontWeight: "bold",
              borderRadius: "999px",
              py: 1,
              mb: 2,
              "&:hover": {
                backgroundColor: "#f7ca00",
              },
            }}
          >
            Create your Account
          </Button>
        </form>

        {/* Terms */}
        <Typography sx={{ fontSize: 12, color: "#555" }} py={2}>
          By creating an account, you agree{" "}
          <Link href="#" underline="hover">
            Conditions of Use
          </Link>{" "}
          and{" "}
          <Link href="#" underline="hover">
            Privacy Notice
          </Link>
          .
        </Typography>
        <Divider orientation="horizontal" flexItem />
        <Typography sx={{ fontSize: 16, color: "#555" }} py={2}>
          Already have an account{" "}
          <Link to={"/sign-in"} underline="hover">
            Signin
          </Link>{" "}
        </Typography>
      </Box>
    </Box>
  );
};

export default CreateAccount;
