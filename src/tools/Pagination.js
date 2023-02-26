import styled from "styled-components";

const Pagination = ({ total, perPage, setCurrentPage, currentPage }) => {
  const num = Math.ceil(total / perPage);
  let pages = Array.from({ length: num }, (_, index) => index + 1);

  return (
    <DivP>
      {pages.map((page, index) => (
        <Btn
          key={index}
          onClick={() => setCurrentPage(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </Btn>
      ))}
    </DivP>
  );
};

export default Pagination;

const Btn = styled.button`
  width: 40px;
  height: 40px;
  font-family: inherit;
  font-weight: 600;
  font-size: 16px;
  margin: 0 5px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #e84545;
  color: rgb(0, 0, 0);
  border-color: rgb(0, 0, 0);
  box-shadow: rgba(255, 2, 2, 0.849) 0px 2px;
  &:hover {
    border: ${({ theme }) => theme.text3} 1px solid;
  }
  &:active {
    font-weight: 900;
    border-color: #101010;
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
  }
`;

const DivP = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
