import React from "react";
import AppLayout from "../component/layout/AppLayout";
import { Box, Typography } from "@mui/material";
import selectChatting from "../assets/select-chat/chatting.svg";

const Home = () => {
  return (
    <Box bgcolor={"#cbd5e1"} height={"100%"}>
      <Typography textAlign={"center"} variant="h5" p={"2rem"}>
        <pre style={{ textWrap: "pretty" }}>
          click on <b>&#9776;</b> icon to select chat on Mobile
        </pre>
        <img
          src={selectChatting}
          style={{ marginTop: "20rem", width: "100%" }}
        />
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
