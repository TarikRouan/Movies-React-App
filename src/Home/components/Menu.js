import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  fetchMovies,
  selectByKey,
  selectWithRate,
  selectWithYear,
} from "../../features/Movies/moviesSclice";
import Select from "../../tools/Select";

const Menu = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [rtf, setTtf] = useState("");
  const [rtt, setTtt] = useState("");
  const [yrf, setYrf] = useState("");
  const [yrt, setYrt] = useState("");

  const year = new Date().getFullYear();
  const years = Array.from(new Array(50), (val, index) => year - index);

  const handleClear = () => {
    setSearch("");
    setTtf("");
    setTtt("");
    setYrf("");
    setYrt("");
  };

  const YearHandleF = (year) => {
    setYrf(year);
  };
  const YearHandleT = (year) => {
    setYrt(year);
  };

  const handleSearch = async () => {
    await dispatch(fetchMovies());
    if (search.length !== 0) {
      dispatch(selectByKey(search));
    }
    if (rtf.length !== 0 && rtf.length !== 0) {
      dispatch(selectWithRate([Number(rtf), Number(rtt)]));
    }
    if (yrf.length !== 0 && yrt.length !== 0) {
      dispatch(selectWithYear([Number(yrf), Number(yrt)]));
    }
  };

  return (
    <MENU>
      <DivI>
        <label htmlFor="search">Keyword</label>
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label htmlFor="search">Rating From</label>
        <Input
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={rtf}
          onChange={(e) => setTtf(e.target.value)}
        />
        <label htmlFor="search">Rating To</label>
        <Input
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={rtt}
          onChange={(e) => setTtt(e.target.value)}
        />

        <label>Year From</label>
        <Select elements={years} onChangeY={YearHandleF} value={yrf} />
        <label>Year To</label>
        <Select elements={years} onChangeY={YearHandleT} value={yrt} />
      </DivI>
      <BTN onClick={handleSearch}>search</BTN>
      <BTNC onClick={handleClear}>Clean</BTNC>
    </MENU>
  );
};

export default Menu;

const MENU = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  align-items: center;
  padding: 0.5rem;
  gap: 0.5rem;
  height: 450px;
  border: rgba(255, 2, 2, 0.849) 1px solid;
  border-radius: 1rem;
  margin: 5rem 2rem 1rem 0;
  color: ${({ theme }) => theme.text2};
  padding-bottom: 1rem;
  @media (max-width: 768px) {
    margin-top: 1rem;
    width: 100%;
    height: unset;
  }
`;
const Input = styled.input`
  appearance: none;
  border-radius: 10px;
  min-width: 12rem;
  height: 2rem;
  width: 40%;
  box-shadow: rgba(255, 2, 2, 0.849) 0px 2px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const BTN = styled.button`
  border: none;
  background-color: #000000e2;
  color: white;
  font-weight: 600;
  font-size: large;
  border-radius: 10px;
  cursor: pointer;
  height: 3rem;
  width: 70%;
  background-color: ${({ theme }) => theme.text};
  &:hover {
    border: ${({ theme }) => theme.text3} 2px solid;
    font-weight: 700;
  }
`;
const BTNC = styled.button`
  border: none;
  background-color: #ffffffe0;
  color: #000000;
  border: black 3px solid;
  font-weight: 600;
  font-size: large;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  height: 3rem;
  width: 70%;
  background-color: ${({ theme }) => theme.text3};
  &:hover {
    border: ${({ theme }) => theme.text} 2px solid;
    font-weight: 700;
  }
`;
const DivI = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
