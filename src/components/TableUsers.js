import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import ModalAddNewUser from "./ModalAddNewUser";
import ModalEditUser from "./ModalEditUser";
import ModalComfirm from "./ModalConfirm";
import './TableUser.scss'
import { fetchAllUser } from "../services/UserService";
import { useEffect, useState } from "react";
import _, { cloneDeep } from "lodash";

const TableUsers = () => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  const [totalPages, setTotalPage] = useState(0);
  const [IsShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [IsShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataEditUser, setDataEditUser] = useState({});
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataDeleteUser, setDataDeleteUser] = useState({});
  const [sortBy,setSortBy] = useState("asc")
  const [sortField,setSortField] = useState("")
  //Close Toast
  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };

  //Post User
  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };

  //Show Modal Eidt User
  const handleEditUser = (user) => {
    setDataEditUser(user);
    setIsShowModalEdit(true);
  };

  //Update User From Modal
  const handleUpdateFromModal = (user) => {
    const cloneUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.id);
    cloneUsers[index].first_name = user.first_name;
    setListUsers(cloneUsers);
  };

  //Delete User
  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setDataDeleteUser(user);
  };
  const handleDeleteUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);
    setListUsers(cloneListUsers);
  };

  //call GetAll
  useEffect(() => {
    getAllUsers(1);
  }, []);

  // Get All User From API To Table
  const getAllUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setTotalPage(res.total_pages);
      setTotalUsers(res.total);
      setListUsers(res.data);
    }
  };

  //Pagination Table
  const handlePageClick = (event) => {
    getAllUsers(+event.selected + 1);
  };

  //sort By Type 
  const handleSortbyType = (sortBy,sortField) => {
    setSortBy(sortBy)
    setSortField(sortField)
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers,[sortField],[sortBy])
    setListUsers(cloneListUsers);
  }

  return (
    <>
      <div className="my-3 flex-col">
        <h1>List Users</h1>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setIsShowModalAddNew(true)}
          >
            Add Users
          </button>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="d-flex justify-content-between">
                <span>ID</span>
                <span className="custom-icon-table">
                  <i class="fa-solid fa-arrow-down"
                  onClick={() => handleSortbyType("asc","id")}
                  ></i>
                  <i class="fa-solid fa-arrow-up"
                   onClick={() => handleSortbyType("desc","id")}
                   >
                   </i>
                </span>
              </div>
            </th>
            <th>Email</th>
            <th>
            <span>First Name</span>
                <span className="custom-icon-table">
                  <i class="fa-solid fa-arrow-down"
                  onClick={() => handleSortbyType("asc","first_name")}
                  ></i>
                  <i class="fa-solid fa-arrow-up"
                   onClick={() => handleSortbyType("desc","first_name")}
                   >
                   </i>
                </span>
              </th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => handleEditUser(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        ageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      <ModalAddNewUser
        show={IsShowModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser
        show={IsShowModalEdit}
        handleClose={handleClose}
        dataEditUser={dataEditUser}
        handleUpdateFromModal={handleUpdateFromModal}
      />

      <ModalComfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataDeleteUser={dataDeleteUser}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </>
  );
};
export default TableUsers;
