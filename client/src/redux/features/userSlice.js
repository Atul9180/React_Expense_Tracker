import { createSlice } from "@reduxjs/toolkit";
import { generateUserName } from "../../utils/generateUserNameUtil";

const initialState = {
  user: {},
  isProfileComplete: false,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    SetActiveUserState: (state, action) => {
      console.log(action.payload);
      const { email, accessToken, uid, displayName, emailVerified, photoURL } =
        action.payload;
      const userName = displayName || generateUserName(email);

      state.isLoggedIn = true;
      state.isProfileComplete = false;

      state.user = {
        email,
        accessToken,
        uid,
        userName,
        emailVerified,
        photoURL,
      };
    },

    setLogOutState: (state) => {
      state.user = {};
      state.isProfileComplete = false;
      state.isLoggedIn = false;
    },

    SetProfileUpdateStatus: (state, action) => {
      console.log(action.payload);
      const { name, profileImage, isProfileUpdated } = action.payload;
      state.isProfileComplete = isProfileUpdated || true;
      state.user.userName = name;
      state.user.photoURL = profileImage;
      console.log("state updated");
    },
  },
});

export const { SetActiveUserState, setLogOutState, SetProfileUpdateStatus } =
  userSlice.actions;

export const selectedUser = (state) => state.user.user;
export const selectedUserIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectedUserIsProfileComplete = (state) =>
  state.user.isProfileComplete;

export default userSlice.reducer;
