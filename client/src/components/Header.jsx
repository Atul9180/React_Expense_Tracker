import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

import { toast } from "react-toastify";
import { logOutUserWithEmailPasword } from "../firebase/authService";
import { useSelector, useDispatch } from "react-redux";
import {
  selectedUserIsLoggedIn,
  selectedUser,
  setLogOutState,
} from "../redux/features/userSlice";
import { selectTheme, toggleTheme } from "../redux/features/themeSlice.js";
import {
  clearEditedExpense,
  selectIsPremiumMember,
} from "../redux/features/expenseSlice.js";

const Header = () => {
  const isLoggedIn = useSelector(selectedUserIsLoggedIn);
  const isDarkMode = useSelector(selectTheme);
  const isPremiumMember = useSelector(selectIsPremiumMember);
  const user = useSelector(selectedUser);
  const { userName, photoURL } = user;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  const logoutHandler = async () => {
    try {
      const result = await logOutUserWithEmailPasword();
      if (result.success) {
        dispatch(setLogOutState());
        dispatch(clearEditedExpense());
        toast.success("Logged-out successfully!");
        navigate("/login");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(error);
      console.error("Logout error:", error.message);
    }
  };

  return (
    <Navbar
      className={
        isDarkMode ? "bg-dark text-light shadow" : "bg-light text-dark shadow"
      }
      // bg={isDarkMode ? "dark" : "light"}
      data-bs-theme="light"
      // className="shadow"
      style={{ position: "sticky", top: 0, zIndex: 10 }}
    >
      <Container>
        <Navbar.Brand className="font-bold">
          <NavLink
            to="/"
            // className={({isActive})=>(isActive?`giveyour style class name here`:"")}
            style={{
              textDecoration: "none",
              fontWeight: "bolder",
              fontSize: "x-large",
            }}
          >
            Expense tracker
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/login"
                  style={{
                    textDecoration: "none",
                    fontSize: "large",
                    fontWeight: "bold",
                    marginRight: "5px",
                  }}
                >
                  Login
                </NavLink>
                <NavLink
                  className="ml-auto font-bold"
                  to="/signup"
                  style={{
                    marginLeft: "5px",
                    textDecoration: "none",
                    fontSize: "large",
                    fontWeight: "bold",
                  }}
                >
                  Signup
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/expenses"
                  style={{
                    textDecoration: "underline",
                    fontSize: "larger",
                    fontWeight: "700",
                    marginRight: "15px",
                    lineHeight: "2",
                    // color: "black",
                  }}
                >
                  Expenses
                </NavLink>

                <div
                  style={{
                    fontSize: "large",
                    fontWeight: "bold",
                    lineHeight: 2,
                    marginRight: "10px",
                  }}
                >
                  {photoURL && (
                    <img
                      src={photoURL}
                      alt="profileimage"
                      style={{
                        maxHeight: "40px",
                        maxWidth: "40px",
                        borderRadius: "50%",
                        marginRight: "2px",
                      }}
                    />
                  )}
                  Hello, {userName}
                </div>

                {/* toggle btn  */}
                {isPremiumMember && (
                  <div
                    className="border p-2 mx-2 hover:bg-green-500 hover:text-white"
                    onClick={handleTheme}
                    style={{ cursor: "pointer", color: "black" }}
                  >
                    Toggle
                  </div>
                )}
                {/* toggle btn  */}

                <div
                  onClick={logoutHandler}
                  className="ml-7 btn btn-secondary"
                  style={{ fontWeight: 900 }}
                >
                  Logout
                </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
