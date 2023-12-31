import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import {
  Signup,
  Login,
  ResetPassword,
  Home,
  PageNotFound,
  Expenses,
} from "../pages/index";

import { useSelector } from "react-redux";
import { selectedUserIsLoggedIn } from "../redux/features/userSlice";

const AppRouter = () => {
  const isLoggedIn = useSelector(selectedUserIsLoggedIn);

  return (
    <Routes>
      {!isLoggedIn && <Route path="/" element={<Navigate to="/login" />} />}
      {!isLoggedIn && (
        <Route path="/expenses" element={<Navigate to="/login" />} />
      )}
      {!isLoggedIn && <Route path="/login" element={<Login />} />}
      {!isLoggedIn && <Route path="/signup" element={<Signup />} />}
      {!isLoggedIn && (
        <Route path="/resetpassword" element={<ResetPassword />} />
      )}

      {isLoggedIn && <Route path="/" element={<Home />} />}
      {isLoggedIn && <Route path="/login" element={<Home />} />}
      {isLoggedIn && <Route path="/signup" element={<Home />} />}

      {isLoggedIn && <Route path="/expenses" element={<Expenses />} />}
      {!isLoggedIn && <Route path="*" element={<Navigate to="/login" />} />}
      {isLoggedIn && <Route path="*" element={<PageNotFound />} />}
    </Routes>
  );
};

export default AppRouter;
