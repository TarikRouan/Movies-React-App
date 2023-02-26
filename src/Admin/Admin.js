import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Main from "./Main";

const Admin = () => {
  const ActiveUser = localStorage.getItem("ActiveUser");

  const navigate = useNavigate();

  useEffect(() => {
    if (!ActiveUser) return navigate("/login");
  }, [ActiveUser]);

  return <Main />;
};

export default Admin;
