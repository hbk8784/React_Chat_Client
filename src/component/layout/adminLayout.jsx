import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  ManageAccounts as ManageAccountsIcon,
  Groups as GroupsIcon,
  Message as MessageIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import React, { useState } from "react";
import { useLocation, Link as LinkComponent, Navigate } from "react-router-dom";

const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;

const adminTabs = [
  {
    name: "Dashboard",
    path: "/master/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "User",
    path: "/master/user",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Chat",
    path: "/master/chat",
    icon: <GroupsIcon />,
  },
  {
    name: "Message",
    path: "/master/messages",
    icon: <MessageIcon />,
  },
];

const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();

  const logoutHandler = () => {};

  return (
    <Stack w={w} direction={"column"} p={"2rem"} spacing={"2rem"}>
      {console.log("rendered")}
      <Typography variant="h5" textTransform={"uppercase"} textAlign={"center"}>
        Admin
      </Typography>
      <Stack spacing={"1rem"}>
        {adminTabs.map((tab) => {
          return (
            <Link
              key={tab.path}
              to={tab.path}
              p={"2rem"}
              sx={
                location.pathname === tab.path && {
                  bgcolor: "black",
                  color: "white",
                  ":hover": {
                    color: "white",
                  },
                }
              }
            >
              <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                {tab.icon}
                <Typography>{tab.name}</Typography>
              </Stack>
            </Link>
          );
        })}
      </Stack>

      <Link key={"logout"} p={"2rem"} onClick={logoutHandler}>
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
          <ExitToAppIcon />
          <Typography>Logout</Typography>
        </Stack>
      </Link>
    </Stack>
  );
};

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => setIsMobile((pre) => !pre);

  const handleClose = () => setIsMobile(false);
  const isAdmin = true;

  if (!isAdmin) return <Navigate to="/master" />;

  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
        <Sidebar />
      </Grid>

      <Grid
        item
        xs={12}
        md={8}
        lg={9}
        sx={{
          bgcolor: "white",
        }}
      >
        {children}
      </Grid>

      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w="50vw" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
