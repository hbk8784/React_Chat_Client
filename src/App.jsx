import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./component/auth/protectedRoute";
import { LayoutLoader } from "./component/layout/loaders";

const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const Chat = lazy(() => import("./pages/chat"));
const Groups = lazy(() => import("./pages/groups"));
const Error_404 = lazy(() => import("./pages/error_404"));

const AdminLogin = lazy(() => import("./pages/admin/adminLogin"));
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const UserManagement = lazy(() => import("./pages/admin/userManagement"));
const ChatManagement = lazy(() => import("./pages/admin/chatManagement"));
const MessageManagement = lazy(() => import("./pages/admin/messageManagement"));
import { server } from "./constants/config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists, useExists } from "./redux/reducer/auth.slice";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./socket";

const App = () => {
  const { user, loader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then((res) => dispatch(useExists(res.data.user)))
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch]);

  return loader ? (
    <LayoutLoader />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route
            element={
              <SocketProvider>
                <ProtectedRoute user={user} />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <Login />
              </ProtectedRoute>
            }
          />

          <Route path="/master" element={<AdminLogin />} />
          <Route path="/master/dashboard" element={<Dashboard />} />
          <Route path="/master/user" element={<UserManagement />} />
          <Route path="/master/chat" element={<ChatManagement />} />
          <Route path="/master/messages" element={<MessageManagement />} />

          <Route path="*" element={<Error_404 />} />
        </Routes>
      </Suspense>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
};

export default App;
