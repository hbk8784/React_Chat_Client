import {
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Backdrop,
} from "@mui/material";
import {
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import React, { useState, memo, useEffect, lazy, Suspense } from "react";
import { matBlack } from "../constants/color";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../component/styles/styledComponents";
import AvatarCard from "../component/shared/avatarCard";
import { samepleChats, sampleUsers } from "../constants/sampleData";
import UserItem from "../component/shared/userItem";
const ConfirmDeleteDilog = lazy(() =>
  import("../component/dialogs/confirmDeleteDialog")
);

const AddMemberDialog = lazy(() =>
  import("../component/dialogs/addMemberDialog")
);
const isAddMember = false;

const Group = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [groupName, setGroupName] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const chatId = useSearchParams()[0].get("group");

  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((pre) => !pre);
  };

  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const updateGroupName = () => {
    setIsEdit(false);
    console.log(groupNameUpdatedValue);
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
    console.log("openConfirmDeleteHandler");
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  const openAddMemberHandler = () => {
    console.log("openAddMemberHandler");
  };

  const deleteHandler = () => {
    console.log("delete Handler");
    closeConfirmDeleteHandler();
  };

  const removeMemberHandler = (id) => {
    console.log("remove member", id);
  };

  useEffect(() => {
    if (chatId) {
      setGroupName(`My Group ${chatId}`);
      setGroupNameUpdatedValue(`My Group ${chatId}`);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton
            onClick={updateGroupName}
            // disabled={isLoadingGroupName}
          >
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton
            // disabled={isLoadingGroupName}
            onClick={() => setIsEdit(true)}
          >
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <Tooltip title="menu">
          <IconButton onClick={handleMobile}>
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: matBlack,
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const ButtonGroup = (
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row",
      }}
      spacing={"1rem"}
      p={{
        xs: "0",
        sm: "1rem",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="large"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openAddMemberHandler}
      >
        Add Member
      </Button>
    </Stack>
  );

  return (
    <Grid container height={"100vh"} bgcolor={"#cbd5e1"}>
      <Grid
        item
        sm={4}
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        bgcolor={"#71717a"}
      >
        <GroupsList myGroups={samepleChats} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}
        {groupName && (
          <>
            {GroupName}
            <Typography
              margin={"2rem"}
              alignSelf={"flex-start"}
              variant="body1"
            >
              Member's
            </Typography>
            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{ sm: "1rem", xs: "0", md: "1rem 4rem" }}
              spacing={"2rem"}
              // bgcolor={"bisque"}
              height={"50vh"}
              overflow={"auto"}
            >
              {/*members */}

              {sampleUsers.map((i) => {
                return (
                  <UserItem
                    user={i}
                    isAdded={true}
                    styling={{
                      boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                      padding: "1rem 2rem",
                      borderRadius: "1rem",
                    }}
                    handler={removeMemberHandler}
                    key={i._id}
                  />
                );
              })}
            </Stack>
            {ButtonGroup}
          </>
        )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop />}>
          <AddMemberDialog />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDilog
            open={confirmDeleteDialog}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}

      <Drawer
        sx={{ display: { xs: "block", sm: "none" } }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupsList w="50vw" myGroups={samepleChats} chatId={chatId} />
      </Drawer>
    </Grid>
  );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack
    width={w}
    sx={{
      // backgroundImage: bgGradient,
      height: "100vh",
      overflow: "auto",
    }}
    bgcolor={"#52525b"}
  >
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} padding="1rem">
        No groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack
        direction={"row"}
        spacing={"1rem"}
        alignItems={"center"}
        height={"4rem"}
        // bgcolor={"#6b7280"}
        marginBottom={"0.5rem"}
        color={"white"}
      >
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Group;
