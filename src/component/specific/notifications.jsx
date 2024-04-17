import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
// import { sampleNotifications } from "../../constants/sampleData";
import { useErrors } from "../../hooks/hook";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationQuery,
} from "../../redux/api/api";
import { transformImage } from "../../lib/features";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducer/misc.slice";
import toast from "react-hot-toast";

const Notifications = () => {
  const dispatch = useDispatch();
  const { isNotification } = useSelector((state) => state.misc);

  const { isLoading, data, isError, error, refetch } =
    useGetNotificationQuery();

  const [acceptRequest] = useAcceptFriendRequestMutation();

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    try {
      const resp = await acceptRequest({ requestId: _id, accept });
      if (resp?.data?.success) {
        //use socket here in future to send the request actions
        toast.success(resp?.data?.message, { duration: 5000 });
      } else {
        toast.error(resp?.data?.error || "failed to accept friend request");
      }
    } catch (error) {
      // toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  const closeHandler = () => {
    dispatch(setIsNotification(false));
  };

  useErrors([{ isError, error }]);
  console.log(data);

  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>

        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequest?.length > 0 ? (
              data?.allRequest?.map(({ sender, _id }) => (
                <NotificationItem
                  sender={sender}
                  _id={_id}
                  handler={friendRequestHandler}
                  key={_id}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>0 Notifications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        // {...styling}
      >
        <Avatar src={transformImage(avatar)} />

        <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {`${name} sent you a friend request`}
        </Typography>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
