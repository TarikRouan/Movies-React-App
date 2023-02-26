import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchMovies } from "../../features/Movies/moviesSclice";
import { postMovie } from "../../features/Movies/movieSlice";

const AddMovies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [id, setId] = useState(0);
  const [errMsg, setErrMsg] = useState({});

  const errors = {
    ti: "The title is required.",
    de: "The description is required.",
    du: "The duration is required",
    im: "The image is required",
    re: "The releaseDate is required",
    ra: "The rating is required",
    co: "The country is required",
  };

  const movies = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  useEffect(() => {
    movies.movies.length === 0
      ? setId(0)
      : setId(movies.movies[movies.movies.length - 1].id + 1);
  }, []);

  const handleCancel = () => {
    navigate("/admin");
  };
  const handleAdd = (e) => {
    e.preventDefault();
    var { ti, de, du, im, re, ra, co } = document.forms[0];
    let date = re.value !== "" ? new Date(re.value).toISOString() : "";

    if (ti.value.length === 0) {
      setErrMsg({ name: "ti", message: errors.ti });
      return;
    }
    if (de.value.length === 0) {
      setErrMsg({ name: "de", message: errors.de });
      return;
    }
    if (du.value.length === 0) {
      setErrMsg({ name: "du", message: errors.du });
      return;
    }
    if (!im.files[0]) {
      setErrMsg({ name: "im", message: errors.im });
      return;
    }
    if (re.value.length === 0) {
      setErrMsg({ name: "re", message: errors.re });
      return;
    }
    if (ra.value.length === 0) {
      setErrMsg({ name: "ra", message: errors.ra });
      return;
    }
    if (co.value.length === 0) {
      setErrMsg({ name: "co", message: errors.co });
      return;
    }
    const Movie = {
      id: id,
      Duration: parseInt(du.value),
      Image: im.files[0].name,
      ReleaseDate: date,
      Rating: parseFloat(ra.value),
      Country: co.value,
      Title: ti.value,
      Synopsis: de.value,
    };
    dispatch(postMovie(Movie));
    navigate("/admin");

    setErrMsg({});
  };

  const renderErrMsg = (name) =>
    name === errMsg.name && <Error>{errMsg.message}</Error>;

  return (
    <Section>
      <Header>Add Movie</Header>
      <Form onSubmit={handleAdd}>
        <label htmlFor="title">Title</label>
        <Input id="title" type="text" name="ti" />
        {renderErrMsg("ti")}
        <label htmlFor="description">Description</label>
        <textarea id="description" cols="40" rows="10" name="de"></textarea>
        {renderErrMsg("de")}

        <label htmlFor="duration">Duration</label>
        <Input min="0" id="duration" type="number" name="du" />
        {renderErrMsg("du")}

        <label htmlFor="image">Image</label>
        <Input id="image" type="file" accept="image/*" name="im" />
        {renderErrMsg("im")}

        <label htmlFor="ReleaseDate">Release Date</label>
        <Input id="ReleaseDate" type="date" name="re" />
        {renderErrMsg("re")}

        <label htmlFor="rating">Rating</label>
        <Input
          min="0"
          max="10"
          step="0.1"
          id="rating"
          type="number"
          name="ra"
        />
        {renderErrMsg("ra")}

        <label htmlFor="country">Country</label>
        <Input id="country" type="text" name="co" />
        {renderErrMsg("co")}
        <Btns>
          <Submit>Add</Submit>
          <Cancel onClick={handleCancel}>cancel</Cancel>
        </Btns>
      </Form>
    </Section>
  );
};

export default AddMovies;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem auto;
  width: 45%;
  gap: 1rem;
  margin-right: 10%;
  @media (max-width: 768px) {
    margin-right: unset;
  }
  width: 100%;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  color: ${({ theme }) => theme.text2};
`;
const Input = styled.input`
  appearance: none;
  border-radius: 10px;
  width: 20rem;
  height: 2.5rem;
  width: 100%;
  box-shadow: rgba(255, 2, 2, 0.849) 0px 2px;
`;

const Submit = styled.button`
  border: none;
  background-color: #000000e2;
  color: white;
  font-weight: 600;
  font-size: large;
  border-radius: 10px;
  cursor: pointer;
  height: 3.5rem;
  width: 50%;
  background-color: ${({ theme }) => theme.text};
  &:hover {
    border: ${({ theme }) => theme.text3} 2px solid;
    font-weight: 700;
  }
`;
const Btns = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;
const Cancel = styled.button`
  border: none;
  background-color: #ffffffe0;
  color: #000000;
  border: black 3px solid;
  font-weight: 600;
  font-size: large;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  height: 3.5rem;
  width: 50%;
  background-color: ${({ theme }) => theme.text3};
  &:hover {
    border: ${({ theme }) => theme.text} 2px solid;
    font-weight: 700;
  }
`;

const Header = styled.h1`
  font-size: xx-large;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bolder;
`;
const Error = styled.div`
  color: red;
  font-size: small;
  font-weight: 500;
  width: 100%;
`;
