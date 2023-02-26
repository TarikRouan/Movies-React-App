import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchMovies } from "../../features/Movies/moviesSclice";
import Pagination from "../../tools/Pagination";
import Movie from "./Movie";
import Sort from "./Sort";

const Movies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  const movies = useSelector((state) => state.movies);

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const currentItems = movies.movies.slice(firstIndex, lastIndex);

  return (
    <MOVIES>
      <TOP>
        <Pagination
          currentPage={currentPage}
          total={movies.movies.length}
          perPage={perPage}
          setCurrentPage={setCurrentPage}
        />
        <Sort />
      </TOP>
      <CARDS>
        {currentItems.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            img={movie.Image}
            title={movie.Title}
            rating={movie.Rating}
            date={movie.ReleaseDate}
          />
        ))}
      </CARDS>
      <TOP>
        <Pagination
          currentPage={currentPage}
          total={movies.movies.length}
          perPage={perPage}
          setCurrentPage={setCurrentPage}
        />
      </TOP>
    </MOVIES>
  );
};

export default Movies;

const MOVIES = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-bottom: 1rem;
`;
const TOP = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }
`;
const CARDS = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
`;
