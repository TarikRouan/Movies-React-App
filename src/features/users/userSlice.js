import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  user: null,
  error: "",
};

export const postUser = createAsyncThunk("user/postUser", async (data) => {
  const res = await axios.post("http://localhost:3500/users", data);
  const userData = res.data;
  return userData;
});

export const putUser = createAsyncThunk("user/putUser", async (data) => {
  const id = data.id;
  const clone = Object.assign({}, data);
  delete clone.id;
  const res = await axios.put(`http://localhost:3500/users/${id}`, clone);
  const userData = res.data;

  return userData;
});
export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  const res = await axios.delete(`http://localhost:3500/users/${id}`);
  const userData = res.data;
  return userData;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(postUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(postUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error.message;
    });

    builder.addCase(putUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = "";
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = "";
    });
  },
});

export default userSlice.reducer;
