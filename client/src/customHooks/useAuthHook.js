import { useEffect } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAuthHook = () => {
  const { user, loading } = useSelector((state) => state?.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      // Redirect to login page if the user is not authenticated
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const isLoggedIn = !!user; // Check if the user is logged in
  console.log("is user logged in: ", isLoggedIn);

  const redirectIfLoggedIn = () => {
    // If user tries to access login or signup page when already logged in
    if (isLoggedIn) {
      navigate("/"); // Redirect to home/dashboard if already logged in
    }
  };

  return { isLoggedIn, redirectIfLoggedIn };
};

export default useAuthHook;
