import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

import { toast } from "react-toastify";
import { logOutUserWithEmailPasword } from "../firebase/authService";
import { useSelector, useDispatch } from "react-redux";
import {
  selectedUserIsLoggedIn,
  selectedUser,
  setLogOutState,
} from "../redux/features/userSlice";

// import useSyncedUserState from "../customeHooks/useAuthDetails";

const Header = () => {
  // const { isLoggedIn } = useSyncedUserState() || false;
  // const { userName } = useSyncedUserState() || "Guest User";
  const isLoggedIn = useSelector(selectedUserIsLoggedIn);
  const user = useSelector(selectedUser);
  const { userName, photoURL } = user;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const result = await logOutUserWithEmailPasword();
      if (result.success) {
        dispatch(setLogOutState());
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
      bg="light"
      data-bs-theme="light"
      className="shadow"
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
                    color: "black",
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
