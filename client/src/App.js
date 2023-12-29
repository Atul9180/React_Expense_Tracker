import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Footer, Header, UserProfileStatus } from "./components/index";

import AppRouter from "./routes/AppRouter";
import { useSelector } from "react-redux";
import { selectedUserIsLoggedIn } from "./redux/features/userSlice";
import useAuthChangeDetails from "./customHooks/useAuthDetails";

const App = () => {
  useAuthChangeDetails();
  const isLoggedIn = useSelector(selectedUserIsLoggedIn);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      {isLoggedIn ? <UserProfileStatus /> : ""}
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
