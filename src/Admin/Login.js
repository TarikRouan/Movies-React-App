import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchUsers } from "../features/users/usersSlice";

const Login = () => {
  const ActiveUser = localStorage.getItem("ActiveUser");

  const navigate = useNavigate();

  useEffect(() => {
    if (ActiveUser) return navigate("/admin");
  }, []);

  const [pwd, setPwd] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const logHandle = (id) => {
    localStorage.setItem("ActiveUser", id);
    navigate("/admin/");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    user === "" || pwd === ""
      ? setError("The username and The password is required!")
      : users.forEach((userData) => {
          userData.username === user && userData.password === pwd
            ? logHandle(userData.id)
            : setError("The username or The password is Wrong!");
        });
    setTimeout(function () {
      setError("");
    }, 2000);
  };

  return (
    <Section>
      <Header>Sign In</Header>
      <Form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <Input
          type="text"
          id="username"
          onChange={(e) => setUser(e.target.value)}
          value={user}
        />
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
        />

        {error !== "" && <Error>{error}</Error>}

        <Submit>Sign In</Submit>
      </Form>
    </Section>
  );
};

export default Login;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 100px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 270px;
  color: ${({ theme }) => theme.text2};
`;
const Input = styled.input`
  appearance: none;
  border-radius: 10px;
  height: 3rem;
  box-shadow: ${({ theme }) => theme.bs};
`;

const Submit = styled.button`
  border: none;
  background-color: #000000e2;
  color: #fff;
  font-weight: 600;
  font-size: large;
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
  height: 3.5rem;
  background-color: ${({ theme }) => theme.text};

  &:hover {
    border: ${({ theme }) => theme.text} 5px solid;
    font-weight: 700;
  }
`;

const Header = styled.h1`
  font-size: xx-large;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bolder;
`;
const Error = styled.div`
  text-decoration: underline;
  color: red;
  font-size: medium;
  font-weight: 500;
`;
