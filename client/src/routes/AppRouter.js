import React from "react";
import { Routes, Route } from "react-router-dom";

import {
  Signup,
  Login,
  ResetPassword,
  Home,
  PageNotFound,
} from "../pages/index";

const AppRouter = ({ isLoggedIn }) => {
  console.log(isLoggedIn);

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
