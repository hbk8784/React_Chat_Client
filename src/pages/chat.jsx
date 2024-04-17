import React, { useCallback, useEffect, useRef, useState } from "react";
import AppLayout from "../component/layout/AppLayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { grayColor } from "../constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../component/styles/styledComponents";
import FileMenu from "../component/dialogs/fileMenu";
// import { sampleMessage } from "../constants/sampleData";
import MessageComponent from "../component/shared/messageComponent";
import backgroundImage from "../assets/chat-background/chat-background.jpeg";
import { getSocket } from "../socket";
import {
  ALERT,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../constants/events";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducer/misc.slice";
import { removeNewMessagesAlert } from "../redux/reducer/chat.slice";
import { TypingLoader } from "../component/layout/loaders";

const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const socket = getSocket();
  const fileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const [messages, setMessages] = useState("");
  const [messagess, setMessagess] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const [iAmTyping, setIAmTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);

  const typingTimeout = useRef(null);
  const bottomRef = useRef(null);

  // console.log(messagess);
  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  // console.log(oldMessagesChunk.data);

  const members = chatDetails?.data?.chat?.members;
  // console.log(members);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!messages) return;

    socket.emit(NEW_MESSAGE, { chatId, members, messages });
    setMessages("");
  };

  const newMessagesListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMessagess((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  useEffect(() => {
    dispatch(removeNewMessagesAlert({ chatId }));

    return () => {
      setMessages("");
      setMessagess([]);
      setOldMessages([]);
      setPage(1);
    };
  }, [chatId]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagess]);

  const startTypingLintener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingLintener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setUserTyping(false);
    },
    [chatId]
  );

  const alertListner = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setUserTyping(false);
    },
    [chatId]
  );

  const eventHandler = {
    [ALERT]: alertListner,
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingLintener,
    [STOP_TYPING]: stopTypingLintener,
  };

  useSocketEvents(socket, eventHandler);

  useErrors(errors);

  // const allMessages = [...oldMessagesChunk?.data?.messages, ...messagess];

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk?.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk?.data?.messages
  );

  const allMessages = [...oldMessages, ...messagess];

  const handleFileOpen = (e) => {
    e.preventDefault();
    setFileMenuAnchor(e.currentTarget);
    dispatch(setIsFileMenu(true));
  };

  const messageOnChange = (e) => {
    setMessages(e.target.value);

    if (!iAmTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIAmTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIAmTyping(false);
    }, 2000);

    // socket.emit(START_TYPING, { members, chatId });
  };

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        // bgcolor={grayColor}
        height={"90%"}
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {/* {!oldMessagesChunk.isLoading &&
          oldMessagesChunk.data?.messages?.map((i) => {
            return <MessageComponent message={i} user={user} key={i._id} />;
          })} */}

        {allMessages?.map((i) => {
          return <MessageComponent message={i} user={user} key={i._id} />;
        })}

        {userTyping && <TypingLoader />}
        <div ref={bottomRef} />
      </Stack>

      <form style={{ height: "10%" }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"100%"}
          padding={"1rem"}
          position={"relative"}
          bgcolor={"#3f3f46"}
        >
          <IconButton
            title="Attach Multimedia"
            ref={fileMenuRef}
            onClick={handleFileOpen}
          >
            <AttachFileIcon
              sx={{ color: "white", marginRight: "1rem", rotate: "30deg" }}
            />
          </IconButton>

          <InputBox
            placeholder="Send Message..."
            value={messages}
            onChange={messageOnChange}
          />

          <IconButton
            type="submit"
            sx={{ position: "absolute", right: "1.5rem" }}
            title="Send Message"
            onClick={submitHandler}
          >
            <SendIcon sx={{ color: "#020617" }} />
          </IconButton>
        </Stack>
      </form>

      <FileMenu anchorE1={fileMenuRef.current} chatId={chatId} />
    </>
  );
};

export default AppLayout()(Chat);
