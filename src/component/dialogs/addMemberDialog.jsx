import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { sampleUsers } from "../../constants/sampleData";
import React, { useState } from "react";
import UserItem from "../shared/userItem";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAddGroupMemberMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducer/misc.slice";

const AddMemberDialog = ({ chatId }) => {
  const [selectedMemebers, setSelectedMembers] = useState([]);

  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);

  const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);

  console.log(data);

  const errors = [{ isError, error }];

  useErrors(errors);

  const selectMemberHandler = (id) => {
    setSelectedMembers((pre) =>
      pre.includes(id) ? pre.filter((item) => item !== id) : [...pre, id]
    );
  };
  const [addMembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGroupMemberMutation
  );

  const addMemberSubmitHandler = () => {
    addMembers("adding member...", { chatId, members: selectedMemebers });
    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"}>
        <DialogTitle textAlign={"center"}>ADD Members</DialogTitle>
        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : data?.friends?.length > 0 ? (
            data?.friends?.map((i) => {
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
            disabled={isLoadingAddMembers}
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
