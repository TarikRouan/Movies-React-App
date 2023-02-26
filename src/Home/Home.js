import React from "react";
import styled from "styled-components";
import Menu from "./components/Menu";
import Movies from "./components/Movies";

const Home = () => {
  return (
    <HOME>
      <Menu />
      <Movies />
    </HOME>
  );
};

export default Home;

const HOME = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
