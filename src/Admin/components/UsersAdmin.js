import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deleteUser, putUser } from "../../features/users/userSlice";
import Modal from "./Modal";
import UsersTable from "./UsersTable";

const UsersAdmin = () => {
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
    dispatch(deleteUser(selectedId));
    setModalDis(false);
  };

  const [quickUpdateOn, setQuickUpdateOn] = useState(null);

  const handleQuickUpdate = (u, e, p) => {
    if (u.length !== 0 && e.length !== 0 && p.length !== 0) {
      dispatch(
        putUser({
          id: quickUpdateOn,
          username: u,
          email: e,
          password: p,
        })
      );
      setQuickUpdateOn(null);
    }
  };

  return (
    <Main>
      <LINK to="/admin/users/add">Add User</LINK>
      <UsersTable
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

export default UsersAdmin;

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
