import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deleteMovie, putMovie } from "../../features/Movies/movieSlice";
import Modal from "./Modal";
import MoviesTable from "./MoviesTable";

const MoviesAdmin = () => {
  const dispatch = useDispatch();
  const [modalDis, setModalDis] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const modalDisplay = (id) => {
    setModalDis(true);
    setSelectedId(id);
  };
  const modalOff = () => {
    setModalDis(false);
  };
  const handleDelete = () => {
    dispatch(deleteMovie(selectedId));
    setModalDis(false);
  };

  const [quickUpdateOn, setQuickUpdateOn] = useState(null);

  const handleQuickUpdate = (d, i, r, ra, upTitle, upDur, upCountry) => {
    if (upTitle.length !== 0 && upDur.length !== 0 && upCountry.length !== 0) {
      dispatch(
        putMovie({
          id: quickUpdateOn,
          Duration: upDur,
          Image: i,
          ReleaseDate: r,
          Rating: ra,
          Country: upCountry,
          Title: upTitle,
          Synopsis: d,
        })
      );
      setQuickUpdateOn(null);
    }
  };
  return (
    <Main>
      <LINK to="/admin/movies/add">Add Movie</LINK>
      <MoviesTable
        modalDisplay={modalDisplay}
        modalDis={modalDis}
        handleQuickUpdate={handleQuickUpdate}
        quickUpdateOn={quickUpdateOn}
        setQuickUpdateOn={setQuickUpdateOn}
      />
      {modalDis && <Modal modalOff={modalOff} handleDelete={handleDelete} />}
    </Main>
  );
};

export default MoviesAdmin;

const LINK = styled(Link)`
  border: none;
  background-color: #000000e2;
  color: #fff;
  font-weight: 600;
  font-size: large;
  text-decoration: none;
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
  padding: 1rem;
  background-color: ${({ theme }) => theme.text};
  text-align: center;

  &:hover {
    border: ${({ theme }) => theme.text3} 1px solid;
  }
`;

const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;
