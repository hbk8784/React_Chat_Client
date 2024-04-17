import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/userItem";
import { useInputValidation } from "6pp";

const NewGroup = () => {
  const groupName = useInputValidation("");

  const [members, setMembers] = useState(sampleUsers);
  const [selectedMemebers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((pre) =>
      pre.includes(id) ? pre.filter((item) => item !== id) : [...pre, id]
    );
  };

  const submitHandler = () => {
    console.log("submit handler");
  };

  const closeHandler = () => {};

  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} width={"25rem"} spacing={"1rem"}>
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant="body1">Members</Typography>

        <Stack>
          {sampleUsers.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={selectMemberHandler}
              isAdded={selectedMemebers.includes(i._id)}
              // handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button variant="text" color="error">
            Cancel
          </Button>
          <Button variant="contained" onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
