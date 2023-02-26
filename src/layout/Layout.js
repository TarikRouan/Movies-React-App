import React from "react";
import styled from "styled-components";
import { b, s, v } from "../styles/vars";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <Lay>
      <Header />
      <LPage>{children}</LPage>
      <Footer />
    </Lay>
  );
};

export default Layout;

export const LPage = styled.main`
  transition: 0.3s ease padding;
  flex: 1;
  padding: ${v.mdSpacing};
  @media ${b.sm} {
    padding: ${v.smSpacing};
  }
  @media ${b.lg} {
    padding: ${v.smSpacing};
    margin: 0 auto;
    width: 100%;
    /* max-width: ${s.lg}; */
  }
`;

const Lay = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
