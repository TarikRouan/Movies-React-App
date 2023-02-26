import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectMovieById } from "../../features/Movies/moviesSclice";
import { putMovie } from "../../features/Movies/movieSlice";

const UpdateMovie = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState({});

  const errors = {
    ti: "The title is required.",
    de: "The description is required.",
    du: "The duration is required",
    ra: "The rating is required",
    co: "The country is required",
  };

  const movie = useSelector((state) =>
    selectMovieById(state, Number(params.id))
  );

  const [title, setTitle] = useState(movie?.Title);
  const [des, setDes] = useState(movie?.Synopsis);
  const [dur, setDur] = useState(movie?.Duration);
  const [rat, setRat] = useState(movie?.Rating);
  const [cou, setCou] = useState(movie?.Country);
  const [img, setImg] = useState(movie?.Image);

  const handleCancel = () => {
    navigate("/admin");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    var { ti, de, du, im, re, ra, co } = document.forms[0];
    let date =
      re.value === "" ? movie.ReleaseDate : new Date(re.value).toISOString();

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
    if (ra.value.length === 0) {
      setErrMsg({ name: "ra", message: errors.ra });
      return;
    }
    if (co.value.length === 0) {
      setErrMsg({ name: "co", message: errors.co });
      return;
    }
    dispatch(
      putMovie({
        id: Number(params.id),
        Duration: parseInt(du.value),
        Image: im.files[0] ? im.files[0].name : movie.Image,
        ReleaseDate: date,
        Rating: parseFloat(ra.value),
        Country: co.value,
        Title: ti.value,
        Synopsis: de.value,
      })
    );
    navigate("/admin");
    setErrMsg({});
  };
  const renderErrMsg = (name) =>
    name === errMsg.name && <Error>{errMsg.message}</Error>;

  return (
    <Section>
      <Header>Update Movie</Header>
      <Form onSubmit={handleUpdate}>
        <label htmlFor="title">Title</label>
        <Input
          value={title}
          id="title"
          type="text"
          name="ti"
          onChange={(e) => setTitle(e.target.value)}
        />
        {renderErrMsg("ti")}
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={des}
          cols="10"
          rows="12"
          name="de"
          onChange={(e) => setDes(e.target.value)}
        ></textarea>
        {renderErrMsg("de")}

        <label htmlFor="duration">Duration</label>
        <Input
          value={dur}
          min="0"
          id="duration"
          type="number"
          name="du"
          onChange={(e) => setDur(e.target.value)}
        />
        {renderErrMsg("du")}

        <label htmlFor="image">Image</label>
        <Input id="image" type="file" accept="image/*" name="im" />
        {renderErrMsg("im")}
        {img && (
          <PosterDiv>
            <Poster src={require(`../../images/${img}`)} alt="movie poster" />
          </PosterDiv>
        )}

        <label htmlFor="ReleaseDate">Release Date</label>
        <Input id="ReleaseDate" type="date" name="re" />
        {renderErrMsg("re")}

        <label htmlFor="rating">Rating</label>
        <Input
          value={rat}
          min="0"
          max="10"
          step="0.1"
          id="rating"
          type="number"
          name="ra"
          onChange={(e) => setRat(e.target.value)}
        />
        {renderErrMsg("ra")}

        <label htmlFor="country">Country</label>
        <Input
          value={cou}
          id="country"
          type="text"
          name="co"
          onChange={(e) => setCou(e.target.value)}
        />
        {renderErrMsg("co")}
        <Btns>
          <Submit>Update</Submit>
          <Cancel onClick={handleCancel}>cancel</Cancel>
        </Btns>
      </Form>
    </Section>
  );
};

export default UpdateMovie;

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

const Poster = styled.img`
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const PosterDiv = styled.div`
  display: flex;
  justify-content: center;
`;
