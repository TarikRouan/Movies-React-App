import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { toggleTheme } from "../features/ui/uiSlice";
import { v } from "../styles/vars";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Header = () => {
  const { theme } = useSelector((state) => state.ui);

  const dispatch = useDispatch();
  const toggleThemeHandle = () => {
    dispatch(toggleTheme());
  };
  return (
    <LHeader>
      <h1>Movies</h1>
      <button onClick={toggleThemeHandle}>
        {theme === "light" ? <MdLightMode /> : <MdDarkMode />}
      </button>
    </LHeader>
  );
};

export default Header;

const LHeader = styled.div`
  width: 100%;
  height: ${v.headerHeight};
  background: ${({ theme }) => theme.bg2};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  button {
    font-size: x-large;
    font-weight: bold;
    border-radius: 50%;
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    color: #eeeeee;
  }
`;
