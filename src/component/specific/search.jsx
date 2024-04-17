import {
  Dialog,
  Stack,
  DialogTitle,
  TextField,
  InputAdornment,
  List,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/userItem";
// import { sampleUsers } from "../../constants/sampleData";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducer/misc.slice";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { useAsyncMutation } from "../../hooks/hook";

const users = [1, 2, 3];

const Search = () => {
  const [users, setUsers] = useState([]);
  const search = useInputValidation("");

  const { isSearch } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest, isLoadingSendFriendRequest, data] =
    useAsyncMutation(useSendFriendRequestMutation);

  const searchCloseHandler = () => {
    dispatch(setIsSearch(false));
  };

  const addFriendHandler = async (id) => {
    await sendFriendRequest("sending friend request", { receiverId: id });
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (search.value) {
        searchUser(search.value)
          .then(({ data }) => setUsers(data.users))
          .catch((e) => console.log(e));
      }
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users?.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
