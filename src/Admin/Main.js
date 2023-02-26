import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AddMovies from "./components/AddMovies";
import AddUser from "./components/AddUser";
import MoviesAdmin from "./components/MoviesAdmin";
import UpdateMovie from "./components/UpdateMovie";
import UpdateUser from "./components/UpdateUser";
import UsersAdmin from "./components/UsersAdmin";

const Main = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("ActiveUser");
    navigate("/login");
  };
  return (
    <MAIN>
      <Menu>
        <LINK to="/admin">Movies</LINK>
        <LINK to="/admin/users">Users</LINK>
        <Btn onClick={handleLogout}>Logout</Btn>
      </Menu>
      <Routes>
        <Route path="/" element={<MoviesAdmin />} />
        <Route path="/users" element={<UsersAdmin />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users/update/:id" element={<UpdateUser />} />
        <Route path="/movies/add" element={<AddMovies />} />
        <Route path="/movies/update/:id" element={<UpdateMovie />} />
      </Routes>
    </MAIN>
  );
};

export default Main;

const MAIN = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: unset;
  }
  height: 100%;
`;

const Menu = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 100px;
  margin-left: 10%;
  gap: 0.8rem;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    margin-top: unset;
    margin-left: unset;
  }
  margin-bottom: 1rem;
`;

const LINK = styled(Link)`
  border: none;
  background-color: #000000e2;
  color: #fff;
  font-weight: 600;
  font-size: large;
  text-decoration: none;
  border-radius: 10px;
  width: 100%;
  max-width: 250px;
  cursor: pointer;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.text};
  box-shadow: rgba(255, 2, 2, 0.849) 0px 2px;
  @media (max-width: 768px) {
    max-width: unset;
  }
  &:hover {
    border: ${({ theme }) => theme.text3} 1px solid;
  }
`;
const Btn = styled.button`
  border: none;
  background-color: #000000e2;
  color: #fff;
  font-weight: 600;
  font-size: large;
  border-radius: 10px;
  width: 100%;
  max-width: 250px;
  cursor: pointer;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.text};
  box-shadow: rgba(255, 2, 2, 0.849) 0px 2px;

  @media (max-width: 768px) {
    max-width: unset;
  }

  &:hover {
    border: ${({ theme }) => theme.text3} 1px solid;
  }
`;
