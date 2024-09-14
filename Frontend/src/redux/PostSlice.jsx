import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "Post",
  initialState: {
    post: null,
    traindingPost: null,
  },
  reducers: {
    setPosts: (state, action) => {
      state.post = action.payload;
    },
    settraindingPost: (state, action) => {
      state.traindingPost = action.payload;
    },
  },
});

export const { setPosts, settraindingPost } = postSlice.actions;
export default postSlice.reducer;
