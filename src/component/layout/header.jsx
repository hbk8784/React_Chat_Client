import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationIcon,
} from "@mui/icons-material";

import React, { Suspense, lazy, useState } from "react";
import { orange } from "../../constants/color";
import { useNavigate } from "react-router-dom";
import { server } from "../../constants/config.js";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducer/auth.slice";
import toast from "react-hot-toast";
import axios from "axios";
import {
  setIsMobileMenu,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducer/misc.slice.js";
import { resetNotificationCount } from "../../redux/reducer/chat.slice.js";

const SearchDialog = lazy(() => import("../specific/search"));
const NotificationsDialog = lazy(() => import("../specific/notifications"));
const NewGroupDialog = lazy(() => import("../specific/newGroup"));

const Header = () => {
  const navigate = useNavigate();

  // const [isNewGroup, setIsNewGroup] = useState(false);
  // const [isNotification, setIsNotification] = useState(false);
  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );
  const { notificationCount } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  //handler functions
  const handleMobile = () => {
    dispatch(setIsMobileMenu(true));
  };

  const openSearchDialog = () => {
    dispatch(setIsSearch(true));
  };

  const opneNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };

  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  };

  const navigateToGroup = () => navigate("/groups");

  const logoutHandler = async (e) => {
    e.preventDefault();
    const config = { withCredentials: true };

    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, config);
      dispatch(userNotExists());
      toast.success(data.message, { duration: 5000 });
    } catch (error) {
      toast.error(error?.response?.data?.message || "unable to logout", {
        duration: 5000,
      });
    }
  };
  //-------------End Of handler functions-----------------------------------

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ bgcolor: orange }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" } }}
              title={"Application Name"}
            >
              What's Up
            </Typography>

            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            {/* ---------in middle empty to push icons to left side------ */}
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              {/* ---------------search icon------------------------------ */}
              <IconBtn
                title={"Search"}
                onclick={openSearchDialog}
                icon={<SearchIcon />}
              />
              {/* --------------new group icon--------------------------- */}
              <IconBtn
                title={"New Group"}
                onclick={opneNewGroup}
                icon={<AddIcon />}
              />
              {/* --------------manage group icon------------------------ */}
              <IconBtn
                title={"Manage Group"}
                onclick={navigateToGroup}
                icon={<GroupIcon />}
              />
              {/* --------------notification icon------------------------ */}
              <IconBtn
                title={"Notification"}
                onclick={openNotification}
                icon={<NotificationIcon />}
                value={notificationCount}
              />
              {/* --------------logout icon------------------------ */}
              <IconBtn
                title={"Logout"}
                onclick={logoutHandler}
                icon={<LogoutIcon />}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationsDialog />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onclick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onclick}>
        {value ? (
          <Badge badgeContent={value} color="error">
            {" "}
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
