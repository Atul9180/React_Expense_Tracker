import React from "react";
import { Routes, Route } from "react-router-dom";

import {
  Signup,
  Login,
  ResetPassword,
  Home,
  PageNotFound,
} from "../pages/index";

// import { useSelector } from "react-redux";
// import { SetActiveUserState,selectedUserIsLoggedIn } from "../redux/features/userSlice";

const AppRouter = () => {
  // const isLoggedIn = useSelector(selectedUserIsLoggedIn);
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/resetpassword" element={<ResetPassword />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRouter;
