import React from "react";
import styled from "styled-components";

const Select = ({ elements, onChangeY, value }) => {
  return (
    <Sel value={value} onChange={(e) => onChangeY(e.target.value)}>
      <option>NONE</option>
      {elements.map((item, index) => {
        return (
          <option key={index} value={item}>
            {item}
          </option>
        );
      })}
    </Sel>
  );
};

export default Select;

const Sel = styled.select`
  border-radius: 0.25rem;
  min-width: 12rem;
  height: 2rem;
  @media (max-width: 768px) {
    width: 100%;
  }
  box-shadow: rgba(255, 2, 2, 0.849) 0px 2px;
`;
