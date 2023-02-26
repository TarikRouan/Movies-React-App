import React from "react";
import styled from "styled-components";
import { FaExclamationTriangle } from "react-icons/fa";

const Modal = ({ handleDelete, modalOff }) => {
  return (
    <MODAL>
      <Mod>
        <Par>
          Confirm to delete{" "}
          <span>
            <FaExclamationTriangle />
          </span>
        </Par>
        <Btns>
          <Submit onClick={handleDelete}>Confirm</Submit>
          <Cancel onClick={modalOff}>Cancel</Cancel>
        </Btns>
      </Mod>
    </MODAL>
  );
};

export default Modal;

const MODAL = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Mod = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  color: ${({ theme }) => theme.text2};
  background-color: ${({ theme }) => theme.bg};
  padding: 4rem;
  border-radius: 1rem;
`;
const Par = styled.p`
  font-size: large;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  span {
    font-size: x-large;
    color: #e84545;
  }
`;
const Btns = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Submit = styled.button`
  border: none;
  background-color: #000000e2;
  color: white;
  font-weight: 600;
  font-size: large;
  border-radius: 10px;
  padding: 0 2rem;
  cursor: pointer;
  height: 3.5rem;
  width: 50%;
  background-color: ${({ theme }) => theme.text};
  &:hover {
    border: ${({ theme }) => theme.text3} 1px solid;
  }
`;

const Cancel = styled.button`
  border: none;
  background-color: #ffffffe0;
  color: #000000;
  border: black 3px solid;
  font-weight: 600;
  font-size: large;
  border-radius: 10px;
  padding: 0 2rem;
  text-align: center;
  cursor: pointer;
  height: 3.5rem;
  width: 50%;
  background-color: ${({ theme }) => theme.text3};
  &:hover {
    border: ${({ theme }) => theme.text} 1px solid;
  }
`;
