import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../features/Movies/moviesSclice";
import Pagination from "../../tools/Pagination";
import { useNavigate } from "react-router-dom";

const MoviesTable = ({
  modalDisplay,
  modalDis,
  handleQuickUpdate,
  quickUpdateOn,
  setQuickUpdateOn,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [upTitle, setUpTitle] = useState("");
  const [upDur, setUpDur] = useState("");
  const [upCountry, setUpCountry] = useState("");

  const movies = useSelector((state) => state.movies);
  useEffect(() => {
    dispatch(fetchMovies());
  }, [modalDis, quickUpdateOn]);

  const handleQuickOn = (id, t, d, c) => {
    setQuickUpdateOn(id);
    setUpTitle(t);
    setUpDur(d);
    setUpCountry(c);
  };
  const handleQuickOff = () => {
    setQuickUpdateOn(null);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const moviesReversed = movies.movies.slice(0).reverse();
  const currentItems = moviesReversed.slice(firstIndex, lastIndex);

  const directUpdate = (id) => {
    navigate(`/admin/movies/update/${id}`);
  };

  return (
    <>
      <DIV>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Duration</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.loading && (
              <tr>
                <td>
                  <h1>Loading...</h1>
                </td>
              </tr>
            )}
            {movies.error && (
              <tr>
                <td>
                  <h1>{movies.error}</h1>
                </td>
              </tr>
            )}

            {currentItems.map((movie) => (
              <tr key={movie.id}>
                {quickUpdateOn === movie.id ? (
                  <>
                    <td>
                      <Input
                        type="text"
                        value={upTitle}
                        onChange={(e) => setUpTitle(e.target.value)}
                      />
                    </td>
                    <td>
                      <Input
                        type="number"
                        value={upDur}
                        onChange={(e) => setUpDur(e.target.value)}
                      />
                    </td>
                    <td>
                      <Input
                        type="text"
                        value={upCountry}
                        onChange={(e) => setUpCountry(e.target.value)}
                      />
                    </td>
                    <Btns>
                      <Submit
                        onClick={() =>
                          handleQuickUpdate(
                            movie.Synopsis,
                            movie.Image,
                            movie.ReleaseDate,
                            movie.Rating,
                            upTitle,
                            upDur,
                            upCountry
                          )
                        }
                      >
                        Update
                      </Submit>
                      <Cancel onClick={handleQuickOff}>cancel</Cancel>
                    </Btns>
                  </>
                ) : (
                  <>
                    <td data-label="Title">{movie.Title}</td>
                    <td data-label="Duration">{movie.Duration}</td>
                    <td data-label="Country">{movie.Country}</td>
                    <td data-label="Actions">
                      <div>
                        <Span>
                          <BsLightningChargeFill
                            onClick={() =>
                              handleQuickOn(
                                movie.id,
                                movie.Title,
                                movie.Duration,
                                movie.Country
                              )
                            }
                          />
                        </Span>
                        <Span>
                          <FaRegEdit onClick={() => directUpdate(movie.id)} />
                        </Span>
                        <Span>
                          <FaTrashAlt onClick={() => modalDisplay(movie.id)} />
                        </Span>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </DIV>
      <Pagination
        currentPage={currentPage}
        total={movies.movies.length}
        perPage={perPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default MoviesTable;

const Table = styled.table`
  color: ${({ theme }) => theme.text2};
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
  min-width: 100%;
  /* min-height: 300px; */
  tr {
    border: 1px solid ${({ theme }) => theme.text2};
    padding: 0.35em;
  }
  td,
  th {
    padding: 0.625em;
    text-align: center;
  }

  th {
    font-size: 0.85em;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    min-width: unset;
    /* min-height: unset; */
    border: 0;
    thead {
      border: none;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }
    tr {
      border-bottom: 3px solid ${({ theme }) => theme.text2};
      display: block;
      margin-bottom: 0.625em;
    }
    td {
      border-bottom: 1px solid ${({ theme }) => theme.text2};
      display: block;
      font-size: 0.8em;
      text-align: right;
    }
    td::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }

    table td:last-child {
      border-bottom: 0;
    }
  }
`;
const Span = styled.span`
  font-size: x-large;
  &:hover {
    color: #e84545;
  }
`;

const Submit = styled.button`
  border: none;
  background-color: #000000e2;
  color: white;
  font-weight: 600;
  font-size: large;
  border-radius: 1.5rem;
  /* padding: 0 2rem; */
  cursor: pointer;
  height: 3rem;

  width: 50%;
  background-color: ${({ theme }) => theme.text};
  &:hover {
    border: ${({ theme }) => theme.text3} 2px solid;
    font-weight: 700;
  }
`;
const Btns = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  padding: 0.25rem;
`;
const Cancel = styled.button`
  border: none;
  background-color: #ffffffe0;
  color: #000000;
  border: black 1px solid;
  font-weight: 600;
  font-size: large;
  border-radius: 1.5rem;
  /* padding: 0 2rem; */
  text-align: center;
  cursor: pointer;
  height: 3rem;
  width: 50%;
  background-color: ${({ theme }) => theme.text3};
  &:hover {
    border: ${({ theme }) => theme.text} 2px solid;
    font-weight: 700;
  }
`;
const Input = styled.input`
  appearance: none;
  border-radius: 10px;
  width: 20rem;
  height: 2rem;
  width: 100%;
  box-shadow: rgba(255, 2, 2, 0.849) 0px 2px;
`;
const DIV = styled.div`
  min-width: 100%;
  min-height: 380px;
  @media (max-width: 768px) {
    min-width: unset;
    min-height: unset;
  }
`;
