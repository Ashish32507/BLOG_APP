import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    admins: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAdmin: (state, action) => {
      state.admins = action.payload;
    },
  },
});

export const { setUser, setAdmin } = userSlice.actions;
export default userSlice.reducer;
