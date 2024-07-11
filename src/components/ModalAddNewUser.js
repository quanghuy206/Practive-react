import Form from 'react-bootstrap/Form';
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap/";
import { postCreateUser } from "../services/UserService";
import { ToastContainer, toast } from 'react-toastify';


const ModalAddNewUser = (props) => {
  const { show, handleClose,handleUpdateTable } = props;

  const [name,setName] = useState(null)
  const [job,setJob] = useState(null)

  const handleSaveUser = async () => {
    let res = await postCreateUser(name,job);
    if(res && res.id){
        handleClose()
        setJob('');
        setName('');
        toast.success("A user is created succed!")
        handleUpdateTable({first_name:name,id:res.id})
    }
    else{
        toast.error("Error !")
    }
  }
  return (
    <>
      <Modal 
        show={show} 
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter name" 
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Job</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter job" 
                value={job}
                onChange={(event) => setJob(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </>
  );
};

export default ModalAddNewUser;
