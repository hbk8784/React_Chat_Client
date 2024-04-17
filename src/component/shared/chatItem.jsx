import React, { memo } from "react";
import { Link } from "../styles/styledComponents";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./avatarCard";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
      style={{ marginTop: "5px" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "1rem",
          gap: "1rem",
          backgroundColor: sameSender ? "#cbd5e1" : "#44403c",
          color: sameSender ? "#020617" : "white",
          position: "relative",
          borderRadius: "0.5rem",
        }}
      >
        <AvatarCard avatar={avatar} />
        <Stack>
          <Typography>{name}</Typography>
          {newMessageAlert && (
            <Typography>{newMessageAlert.count} New Message</Typography>
          )}
        </Stack>

        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#4ade80",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          ></Box>
        )}
      </div>
    </Link>
  );
};

export default memo(ChatItem);
