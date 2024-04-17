import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useInputValidation } from "6pp";
import React from "react";
import { Navigate } from "react-router-dom";

const isAdmin = true;

const AdminLogin = () => {
  const userName = useInputValidation("");
  const secretKey = useInputValidation("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("login admin");
  };

  if (isAdmin) return <Navigate to={"/master/dashboard"} />;
  return (
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#18181b",
        }}
      >
        <>
          <Typography variant="h4" color={"white"}>
            Welcome Admin
          </Typography>
          <Typography variant="h5" color={"white"}>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            {/* <TextField
              required
              fullWidth
              label="UserName"
              margin="normal"
              varient="outlined"
              value={userName.value}
              onChange={userName.changeHandler}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#3b82f6", // Change the border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#f43f5e", // Change the border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3b82f6", // Change the border color when focused
                  },
                },
                "& label": {
                  color: "white", // Change the label color
                },
                "& input": {
                  color: "white", // Change the text color
                },
              }}
            ></TextField> */}

            <TextField
              required
              fullWidth
              label="Secret Key"
              type="password"
              margin="normal"
              varient="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#3b82f6", // Change the border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#f43f5e", // Change the border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3b82f6", // Change the border color when focused
                  },
                },
                "& label": {
                  color: "white", // Change the label color
                },
                "& input": {
                  color: "white", // Change the text color
                },
              }}
            ></TextField>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginTop: "1rem" }}
              fullWidth
            >
              Login
            </Button>
          </form>
        </>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
