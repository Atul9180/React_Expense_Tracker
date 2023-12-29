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
      const { email, accessToken, uid, displayName, emailVerified, photoURL } =
        action.payload;
      const userName = displayName || generateUserName(email);
      const profileUpdate = !!displayName && !!photoURL;

      state.isLoggedIn = true;
      state.isProfileComplete = profileUpdate || false;

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
      const { name, profileImage, isProfileUpdated } = action.payload;
      state.isProfileComplete = isProfileUpdated || true;
      state.user.userName = name;
      state.user.photoURL = profileImage;
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
