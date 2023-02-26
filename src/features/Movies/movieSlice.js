import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  movie: null,
  error: "",
};
export const getMovie = createAsyncThunk("movie/getMovie", async (id) => {
  const res = await axios.get(`http://localhost:3500/movies/${id}`);
  const movieData = res.data;
  return movieData;
});

export const postMovie = createAsyncThunk("movie/postMovie", async (data) => {
  const res = await axios.post("http://localhost:3500/movies", data);
  const movieData = res.data;
  return movieData;
});

export const putMovie = createAsyncThunk("movie/putMovie", async (data) => {
  const id = data.id;
  const clone = Object.assign({}, data);
  delete clone.id;
  const res = await axios.put(`http://localhost:3500/movies/${id}`, clone);
  const movieData = res.data;

  return movieData;
});
export const deleteMovie = createAsyncThunk("movie/deleteMovie", async (id) => {
  const res = await axios.delete(`http://localhost:3500/movies/${id}`);
  const movieData = res.data;
  return movieData;
});

const movieSlice = createSlice({
  name: "movie",
  initialState,
  // reducers: {
  //   reset: (state) => {
  //     state.movie = null;
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(getMovie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMovie.fulfilled, (state, action) => {
      state.loading = false;
      state.movie = action.payload;
      state.error = "";
    });
    builder.addCase(getMovie.rejected, (state, action) => {
      state.loading = false;
      state.movie = null;
      state.error = action.error.message;
    });
    builder.addCase(postMovie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postMovie.fulfilled, (state, action) => {
      state.loading = false;
      state.movie = action.payload;
      state.error = "";
    });
    builder.addCase(postMovie.rejected, (state, action) => {
      state.loading = false;
      state.movie = null;
      state.error = action.error.message;
    });

    builder.addCase(putMovie.fulfilled, (state, action) => {
      state.movie = action.payload;
      state.error = "";
    });

    builder.addCase(deleteMovie.fulfilled, (state, action) => {
      state.movie = action.payload;
      state.error = "";
    });
  },
});

export default movieSlice.reducer;
// export const { reset } = movieSlice.actions;
