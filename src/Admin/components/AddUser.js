import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchUsers } from "../../features/users/usersSlice";
import { postUser } from "../../features/users/userSlice";

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [id, setId] = useState(0);
  const [errMsg, setErrMsg] = useState({});

  const errors = {
    us: "The Username is required.",
    ps: "The Password is required.",
    psv: "The Password is required.",
    psvX: "The Password is not simular.",
    em: "The Email is required",
    short: "The Password is too short",
  };
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
    users.users.length === 0
      ? setId(0)
      : setId(users.users[users.users.length - 1].id + 1);
  }, []);

  const handleCancel = () => {
    navigate("/admin/users");
  };
  const handleAdd = (e) => {
    e.preventDefault();
    let { us, ps, psv, em } = document.forms[0];

    if (us.value.length === 0) {
      setErrMsg({ name: "us", message: errors.us });
      return;
    }
    if (ps.value.length === 0) {
      setErrMsg({ name: "ps", message: errors.ps });
      return;
    }
    if (ps.value.length < 6) {
      setErrMsg({ name: "short", message: errors.short });
      return;
    }
    if (em.value === 0) {
      setErrMsg({ name: "em", message: errors.em });
      return;
    }
    if (psv.value.length === 0) {
      setErrMsg({ name: "psv", message: errors.psv });
      return;
    }
    if (ps.value !== psv.value) {
      setErrMsg({ name: "psvX", message: errors.psvX });
      return;
    }
    const User = {
      id: id,
      username: us.value,
      password: ps.value,
      email: em.value,
    };
    dispatch(postUser(User));
    navigate("/admin/users");

    setErrMsg({});
  };

  const renderErrMsg = (name) =>
    name === errMsg.name && <Error>{errMsg.message}</Error>;

  return (
    <Section>
      <Header>Add User</Header>
      <Form onSubmit={handleAdd}>
        <label htmlFor="user">Username</label>
        <Input id="user" type="text" name="us" />
        {renderErrMsg("us")}

        <label htmlFor="email">Email</label>
        <Input id="email" type="email" name="em" />
        {renderErrMsg("em")}

        <label htmlFor="pass">Password</label>
        <Input id="pass" type="password" name="ps" />
        {renderErrMsg("ps")}
        {renderErrMsg("short")}

        <label htmlFor="passwordV">Password Valoidation</label>
        <Input id="passwordV" type="password" name="psv" />
        {renderErrMsg("psv")}
        {renderErrMsg("psvX")}

        <Btns>
          <Submit>Add</Submit>
          <Cancel onClick={handleCancel}>cancel</Cancel>
        </Btns>
      </Form>
    </Section>
  );
};

export default AddUser;

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
