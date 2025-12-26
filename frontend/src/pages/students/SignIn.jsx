import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const SignIn = () => {
  const { backendUrl, isLoggedIn, setIsLoggedIn, getUserData, setIsAdmin  } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/api/v1/user/login",  {
        email,
        password,
      }, {withCrendential: true});
      if(data.success){
        setIsAdmin(data.user?.role === "admin");
        setIsLoggedIn(true)
        getUserData()
        toast.success(data.message)
        navigate('/')
      } else {
        toast.error(data.message)
      }

      console.log(data);
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
          account
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
        <Typography variant="h6" sx={{ mb: 2 }}>
          Sign in to IMDb using your account
        </Typography>

        {/* Input */}
        <form onSubmit={loginUser}>
          <Typography sx={{ fontSize: 14, fontWeight: "bold", mb: 0.5 }}>
            Enter your email
          </Typography>

          <TextField
            fullWidth
            size="small"
            placeholder="Enter your Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            sx={{ mb: 2 }}
          />
          <Typography sx={{ fontSize: 14, fontWeight: "bold", mb: 0.5 }}>
            Enter password
          </Typography>

          <TextField
            fullWidth
            size="small"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            sx={{ mb: 2 }}
          />
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
            Continue
          </Button>
        </form>
        {/* Terms */}
        <Typography sx={{ fontSize: 12, color: "#555", mb: 2 }}>
          <Link href="#" underline="hover">
            Conditions of Use
          </Link>{" "}
          and{" "}
          <Link href="#" underline="hover">
            Privacy Notice
          </Link>
          .
        </Typography>

        {/* Help */}
        <Link href="#" underline="hover" sx={{ fontSize: 13 }}>
          Need help?
        </Link>
      </Box>

      {/* Create Account */}
      <Box sx={{ width: 360, mt: 3 }}>
        <Divider sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: 12, color: "#666" }}>
            New to Account?
          </Typography>
        </Divider>

        <Button
          onClick={() => navigate("/registration")}
          fullWidth
          sx={{
            border: "1px solid #a6a6a6",
            borderRadius: "999px",
            py: 1,
            textTransform: "none",
            color: "#000",
          }}
        >
          Create your account
        </Button>
      </Box>
    </Box>
  );
};

export default SignIn;
