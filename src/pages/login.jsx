import { CameraAlt } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { VisuallyHiddenInput } from "../component/styles/styledComponents";
import { useFileHandler, useInputValidation } from "6pp";
import { userNameValidator } from "../util/validator";
// import { customAxios } from "../lib/features";
import axios from "axios";
import { server } from "../constants/config";
import { useDispatch } from "react-redux";
import { useExists } from "../redux/reducer/auth.slice";
import toast from "react-hot-toast";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const userName = useInputValidation("", userNameValidator);
  const password = useInputValidation("");
  const avatar = useFileHandler("single");

  //-----------------login handler----------------------------
  const handleLogin = async (e) => {
    e.preventDefault();

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: userName.value,
          password: password.value,
        },
        config
      );
      dispatch(useExists(data.user));
      toast.success(data.message, { duration: 5000 });
    } catch (error) {
      toast.error(error?.response?.data?.message || "error failed to login", {
        duration: 5000,
      });
    }
  };

  //---------------signup handler----------------------------
  const handleRegister = async (e) => {
    e.preventDefault();

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();

    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", userName.value);
    formData.append("password", password.value);

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

      console.log(data);
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not Register");
    }
  };

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
          backgroundColor: "#27272a",
        }}
      >
        {isLogin ? (
          <>
            <Typography variant="h4" color={"white"}>
              Welcome Back
            </Typography>
            <Typography variant="h5" color={"white"}>
              Login
            </Typography>
            <form action="#">
              <TextField
                required
                fullWidth
                label="UserName"
                margin="normal"
                varient="outlined"
                value={userName.value}
                onChange={userName.changeHandler}
                // onSubmit={handleLogin}
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

              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                varient="outlined"
                value={password.value}
                onChange={password.changeHandler}
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
                // type="submit"
                onClick={handleLogin}
                sx={{ marginTop: "1rem" }}
                fullWidth
              >
                Login
              </Button>
              <Typography textAlign={"center"} m={"1rem"} color={"white"}>
                OR
              </Typography>
              <Button
                variant="text"
                color="primary"
                type="button"
                fullWidth
                onClick={() => setIsLogin(false)}
              >
                Register
              </Button>
            </form>
          </>
        ) : (
          <>
            {/* <Typography variant="h4">Ready To Explore!</Typography> */}
            <Typography variant="h5" mb={"1rem"} color={"white"}>
              REGISTER
            </Typography>

            <Stack position={"relative"} width={"10rem"} margin={"auto"}>
              <Avatar
                sx={{ width: "10rem", height: "10rem", objectFit: "contain" }}
                src={avatar.preview}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  color: "white",
                  bgcolor: "rgba(0,0,0,0.5)",
                  ":hover": {
                    bgcolor: "rgba(0,0,0,0.7)",
                  },
                }}
                component="label"
              >
                <>
                  <CameraAlt />
                  <VisuallyHiddenInput
                    type="file"
                    onChange={avatar.changeHandler}
                  />
                </>
              </IconButton>
            </Stack>

            {avatar.error && (
              <Typography color="error" variant="caption">
                {avatar.error}
              </Typography>
            )}

            <form>
              <TextField
                required
                fullWidth
                label="Name"
                margin="normal"
                varient="outlined"
                value={name.value}
                onChange={name.changeHandler}
                // onSubmit={handleRegister}
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

              <TextField
                required
                fullWidth
                label="Bio"
                margin="normal"
                varient="outlined"
                value={bio.value}
                onChange={bio.changeHandler}
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

              <TextField
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
              ></TextField>
              {userName.error && (
                <Typography color="error" variant="caption">
                  {userName.error}
                </Typography>
              )}
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                varient="outlined"
                value={password.value}
                onChange={password.changeHandler}
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
                // type="submit"
                onClick={handleRegister}
                sx={{ marginTop: "1rem" }}
                fullWidth
              >
                Register
              </Button>
              <Typography textAlign={"center"} m={"1rem"} color={"white"}>
                Already have an account?
              </Typography>
              <Button
                variant="text"
                color="primary"
                type="button"
                fullWidth
                onClick={() => setIsLogin(true)}
              >
                Login
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
