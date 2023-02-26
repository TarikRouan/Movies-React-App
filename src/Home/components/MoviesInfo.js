import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { selectMovieById } from "../../features/Movies/moviesSclice";
import { BsBoxArrowLeft } from "react-icons/bs";

const MoviesInfo = () => {
  const params = useParams();
  const navigate = useNavigate();

  const movie = useSelector((state) =>
    selectMovieById(state, Number(params.id))
  );

  const options = { year: "numeric", month: "long", day: "numeric" };
  const d = new Date(movie.ReleaseDate);
  const formatedDate = d.toLocaleDateString("en-US", options);
  const time = `${Math.floor(movie.Duration / 60)}h${movie.Duration % 60}`;

  const goBack = () => {
    navigate(`/`);
  };

  return (
    <MAIN>
      {movie.Image.length !== 0 && (
        <img src={require(`../../images/${movie.Image}`)} alt="poster" />
      )}
      <Infos>
        <h1>
          {movie.Title}
          <Span onClick={goBack}>
            <BsBoxArrowLeft /> <h5>Back</h5>
          </Span>
        </h1>
        <h3>{`${formatedDate} - (${movie.Country}) - ${time}`}</h3>
        <h2
          className={
            movie.Rating < 5 ? "red" : movie.Rating > 7 ? "green" : "yellow"
          }
        >
          {movie.Rating}
        </h2>
        <p>{movie.Synopsis}</p>
      </Infos>
    </MAIN>
  );
};

export default MoviesInfo;

const MAIN = styled.div`
  display: flex;
  padding: 1rem 3rem;
  flex-wrap: wrap;
  color: ${({ theme }) => theme.text2};

  img {
    border-radius: 2rem;
    width: 380px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    img {
      width: 100%;
      padding: unset;
    }
  }
`;
const Infos = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 3rem;
  gap: 0.25rem;
  @media (max-width: 768px) {
    width: 100%;
  }
  h1 {
    display: flex;
    justify-content: space-between;
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
    }
  }

  h3 {
    margin-top: 0;
  }
  h1 {
    margin: 0.25rem 0;
  }
  h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 40px;
    width: 80px;
    height: 80px;
    text-align: center;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
  p {
    font-size: 20px;
    width: 600px;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: unset;
    align-items: center;
    gap: 1rem;
  }
`;
const Span = styled.span`
  font-size: x-large;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  margin-left: 5rem;
  cursor: pointer;
  &:hover {
    color: #e84545;
  }
`;
