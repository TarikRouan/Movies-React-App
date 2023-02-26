import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchMovies,
  sortByDate,
  sortByRating,
  sortByTitle,
} from "../../features/Movies/moviesSclice";
import Select from "../../tools/Select";
const Sort = () => {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    sortBy === "By Title"
      ? dispatch(sortByTitle())
      : sortBy === "By Rating"
      ? dispatch(sortByRating())
      : sortBy === "By Date"
      ? dispatch(sortByDate())
      : dispatch(dispatch(fetchMovies));
  }, [sortBy]);

  const handleSortChoice = (choice) => {
    setSortBy(choice);
  };
  return (
    <>
      <Select
        elements={["By Title", "By Rating", "By Date"]}
        onChangeY={handleSortChoice}
      />
    </>
  );
};

export default Sort;
