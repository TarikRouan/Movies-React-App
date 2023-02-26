import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../tools/Pagination";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../../features/users/usersSlice";

const UsersTable = ({
  modalDisplay,
  modalDis,
  handleQuickUpdate,
  quickUpdateOn,
  setQuickUpdateOn,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ActiveUser = localStorage.getItem("ActiveUser");

  const [upUser, setUpUser] = useState("");
  const [upEmail, setUpEmail] = useState("");

  const users = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [modalDis, quickUpdateOn]);

  const handleQuickOn = (id, u, e) => {
    setQuickUpdateOn(id);
    setUpUser(u);
    setUpEmail(e);
  };
  const handleQuickOff = () => {
    setQuickUpdateOn(null);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const usersReversed = users.users.slice(0).reverse();
  const currentItems = usersReversed.slice(firstIndex, lastIndex);

  const directUpdate = (id) => {
    navigate(`/admin/users/update/${id}`);
  };

  return (
    <>
      <DIV>
        <Table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.loading && (
              <tr>
                <td>
                  <h1>Loading...</h1>
                </td>
              </tr>
            )}
            {users.error && (
              <tr>
                <td>
                  <h1>{users.error}</h1>
                </td>
              </tr>
            )}
            {currentItems.map((user) => (
              <tr key={user.id}>
                {quickUpdateOn === user.id ? (
                  <>
                    <td>
                      <Input
                        type="text"
                        value={upUser}
                        onChange={(e) => setUpUser(e.target.value)}
                      />
                    </td>
                    <td>
                      <Input
                        type="email"
                        value={upEmail}
                        onChange={(e) => setUpEmail(e.target.value)}
                      />
                    </td>
                    <td>
                      <Btns>
                        <Submit
                          onClick={() =>
                            handleQuickUpdate(upUser, upEmail, user.password)
                          }
                        >
                          Update
                        </Submit>
                        <Cancel onClick={handleQuickOff}>cancel</Cancel>
                      </Btns>
                    </td>
                  </>
                ) : (
                  <>
                    <td data-label="Username">{user.username}</td>
                    <td data-label="Email">{user.email}</td>
                    <td data-label="Actions">
                      <div>
                        <Span>
                          <BsLightningChargeFill
                            onClick={() =>
                              handleQuickOn(user.id, user.username, user.email)
                            }
                          />
                        </Span>
                        <Span>
                          <FaRegEdit onClick={() => directUpdate(user.id)} />
                        </Span>
                        {user.id === Number(ActiveUser) ? null : (
                          <Span>
                            <FaTrashAlt onClick={() => modalDisplay(user.id)} />
                          </Span>
                        )}
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
        total={users.users.length}
        perPage={perPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default UsersTable;

const Table = styled.table`
  color: ${({ theme }) => theme.text2};
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
  min-width: 100%;
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
