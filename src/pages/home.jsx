import React from "react";
import AppLayout from "../component/layout/AppLayout";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box bgcolor={"#cbd5e1"} height={"100%"}>
      <Typography textAlign={"center"} variant="h5" p={"2rem"}>
        Select a chat to continue
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
