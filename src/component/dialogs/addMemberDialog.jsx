import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import { sampleUsers } from "../../constants/sampleData";
import React, { useState } from "react";
import UserItem from "../shared/userItem";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMemebers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((pre) =>
      pre.includes(id) ? pre.filter((item) => item !== id) : [...pre, id]
    );
  };

  const addMemberSubmitHandler = () => {
    closeHandler();
    console.log("add member submit handler");
  };

  const closeHandler = () => {
    setSelectedMembers([]);
    setMembers([]);
    console.log("close handler");
  };

  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"}>
        <DialogTitle textAlign={"center"}>ADD Members</DialogTitle>
        <Stack>
          {members.length > 0 ? (
            members.map((i) => {
              //   console.log(i);
              return (
                <UserItem
                  key={i._id}
                  user={i}
                  handler={selectMemberHandler}
                  isAdded={selectedMemebers.includes(i._id)}
                />
              );
            })
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>

        <Stack
          spacing={"1rem"}
          marginTop={"2rem"}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button color="error" variant="text" onClick={closeHandler}>
            cancel
          </Button>
          <Button
            variant="contained"
            disabled={isLoadingAddMember}
            onClick={addMemberSubmitHandler}
          >
            confirm
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
