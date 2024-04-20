import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "./header";
import Title from "../shared/title";
import { Drawer, Grid, Skeleton } from "@mui/material";
import ChatList from "../specific/chatList";
import { samepleChats } from "../../constants/sampleData";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "../specific/profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsDeleteMenu,
  setIsMobileMenu,
  setSelectedDeleteChat,
} from "../../redux/reducer/misc.slice";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import { getSocket } from "../../socket";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../../constants/events";
import {
  incrementNotification,
  setNewMessagesAlert,
} from "../../redux/reducer/chat.slice";
import { getOrSaveFromStorage } from "../../lib/features";
import DeleteMenu from "../dialogs/deleteChatMenu";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const deleteMenuAnchor = useRef(null);
    const chatId = params.chatId;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [onlineUsers, setOnlineUsers] = useState([]);

    const socket = getSocket();

    const { isMobileMenu } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);

    const handleMobileClose = (e) => {
      e.preventDefault();
      dispatch(setIsMobileMenu(false));
    };

    const { isLoding, data, isError, error, refetch } = useMyChatsQuery("");

    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
    }, [newMessagesAlert]);

    const handleDeleteChat = (e, chatId, groupChat) => {
      e.preventDefault();
      deleteMenuAnchor.current = e.currentTarget;
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ chatId, groupChat }));
    };

    const newMessageAlertListner = useCallback(
      (data) => {
        console.log(data.chatId === chatId);
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatId]
    );

    const newRequestListner = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const onlineUsersLitner = useCallback((data) => {
      setOnlineUsers(data);
    }, []);

    const refetchListner = useCallback(() => {
      refetch();
      navigate("/");
    }, [navigate]);

    const eventHandler = {
      [NEW_MESSAGE_ALERT]: newMessageAlertListner,
      [NEW_REQUEST]: newRequestListner,
      [REFETCH_CHATS]: refetchListner,
      [ONLINE_USERS]: onlineUsersLitner,
    };

    useSocketEvents(socket, eventHandler);

    return (
      <>
        <Title />
        <Header />
        <DeleteMenu
          dispatch={dispatch}
          deleteMenuAnchor={deleteMenuAnchor.current}
        />
        {isLoding ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobileMenu} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              newMessagesAlert={newMessagesAlert}
              onlineUsers={onlineUsers}
              handleDeleteChat={handleDeleteChat}
            />
          </Drawer>
        )}

        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
            height={"100%"}
            bgcolor={"#52525b"}
            overflow={"auto"}
          >
            {isLoding ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                newMessagesAlert={newMessagesAlert}
                onlineUsers={onlineUsers}
                handleDeleteChat={handleDeleteChat}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "black",
            }}
          >
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
