import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Movie = ({ id, img, title, rating, date }) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const d = new Date(date);
  const formatedDate = d.toLocaleDateString("en-US", options);

  return (
    <Card>
      <DivR>
        <Link to={`/movies/${id}`}>
          <Poster src={require("../../images/" + img)} alt="" />
        </Link>

        <Rating
          className={rating < 5 ? "red" : rating > 7 ? "green" : "yellow"}
        >
          {rating}
        </Rating>
      </DivR>
      <Bottom>
        <LINK to={`/movies/${id}`}>
          <h3>{title}</h3>
        </LINK>

        <h4>{formatedDate}</h4>
      </Bottom>
    </Card>
  );
};

export default Movie;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 1rem;
  background-color: rgb(170, 168, 168);
  width: 280px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Rating = styled.h2`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: -3%;
  left: 3%;
  border-radius: 50%;
  font-size: 25px;
  width: 60px;
  height: 60px;
  color: #fff;
  background-color: #000;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;
const Poster = styled.img`
  width: 100%;
`;

const Bottom = styled.div`
  padding: 0.8rem 2rem;
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0;
    width: 90%;
  }
  h4 {
    margin: 0;
    width: 250px;
    color: #535353;
  }
`;

const LINK = styled(Link)`
  color: #000000;
  font-weight: 600;
  font-size: large;
  text-decoration: none;
`;
const DivR = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
