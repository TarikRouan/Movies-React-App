import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <LFooter>
      <span>&copy; {year} Tarik Rouan </span>
      <LINK to="/login">Admin</LINK>
    </LFooter>
  );
};

export default Footer;

const LFooter = styled.footer`
  background: ${({ theme }) => theme.bg2};
  text-align: center;
  font-weight: bold;
  padding: 10px;
`;

const LINK = styled(Link)`
  color: ${({ theme }) => theme.text2};
`;
