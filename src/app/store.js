import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "../features/Movies/movieSlice";
import moviesSclice from "../features/Movies/moviesSclice";
import uiSlice from "../features/ui/uiSlice";
import userSlice from "../features/users/userSlice";
import usersSlice from "../features/users/usersSlice";

const store = configureStore({
  reducer: {
    ui: uiSlice,
    users: usersSlice,
    user: userSlice,
    movies: moviesSclice,
    movie: movieSlice,
  },
});

export default store;
