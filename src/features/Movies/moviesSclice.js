import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  movies: [],
  error: null,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", () => {
  return axios.get("http://localhost:3500/movies").then((res) => res.data);
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    sortByTitle: (state) => {
      state.movies = state.movies.sort((a, b) =>
        a.Title.localeCompare(b.Title)
      );
    },
    sortByRating: (state) => {
      state.movies = state.movies.sort((a, b) =>
        b.Rating > a.Rating ? 1 : -1
      );
    },
    sortByDate: (state) => {
      state.movies = state.movies.sort((a, b) =>
        b.ReleaseDate > a.ReleaseDate ? 1 : -1
      );
    },
    selectByKey: (state, action) => {
      state.movies = state.movies.filter((movie) => {
        return movie.Title.toLowerCase().includes(action.payload.toLowerCase());
      });
    },
    selectWithRate: (state, action) => {
      state.movies = state.movies.filter((movie) => {
        return (
          movie.Rating >= parseFloat(action.payload[0]) &&
          movie.Rating <= parseFloat(action.payload[1])
        );
      });
    },
    selectWithYear: (state, action) => {
      state.movies = state.movies.filter((movie) => {
        const rYear = new Date(movie.ReleaseDate).getFullYear();
        return (
          parseInt(rYear) >= parseInt(action.payload[0]) &&
          parseInt(rYear) <= parseInt(action.payload[1])
        );
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.movies = action.payload;
      state.error = null;
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.loading = false;
      state.movies = [];
      state.error = action.error.message;
    });
  },
});

export const selectMovieById = (state, movieId) =>
  state.movies.movies.find((movie) => movie.id === movieId);

export default moviesSlice.reducer;
export const {
  sortByTitle,
  sortByRating,
  sortByDate,
  selectByKey,
  selectWithYear,
  selectWithRate,
} = moviesSlice.actions;
