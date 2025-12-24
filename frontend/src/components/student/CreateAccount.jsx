import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Link } from "react-router";

const CreateAccount = () => {
  const [email, setEmail] = useState(false);
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

        <form>
          <Typography sx={{ fontSize: 14, fontWeight: "bold", mb: 0.5 }}>
            Your name
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="First and last name"
            sx={{ mb: 2 }}
          />

          <Typography sx={{ fontSize: 14, fontWeight: "bold", mb: 0.5 }}>
            Email
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Enter your email"
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
            sx={{ mb: 1 }}
          />

          {/* Password Info */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Typography sx={{ fontSize: 13 }}>
              Passwords must be at least 6 characters.
            </Typography>
          </Box>

          {/* Re-enter Password */}
          <Typography sx={{ fontSize: 14, fontWeight: "bold", mb: 0.5 }}>
            Re-enter password
          </Typography>
          <TextField
            fullWidth
            size="small"
            type="password"
            placeholder="Re type password"
            sx={{ mb: 3 }}
          />
          <Button
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
