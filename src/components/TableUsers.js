import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import { fetchAllUser } from '../services/UserService';
import { useEffect, useState } from 'react';

const TableUsers = () => {
  const [listUsers,setListUsers] = useState([])
  const [totalUsers,setTotalUsers] = useState(0)
  const [totalPages,setTotalPage] = useState(0)

  useEffect(() => {
    getAllUsers(1);
  },[])

  const getAllUsers = async (page) => {
    let res = await fetchAllUser(page);
    if(res && res.data) {
      setTotalPage(res.total_pages)
      setTotalUsers(res.total)
      setListUsers(res.data)
    }
  }

  const handlePageClick = (event) => {
    getAllUsers(+event.selected + 1)
  }
  
    return (
    <>
     <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        {listUsers && listUsers.length > 0 && 
          listUsers.map((item,index) => {
            return (
              <tr key={`users-${index}`}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
            </tr>
            )
          })
        }
      
       
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
    </>)
}
export default TableUsers;