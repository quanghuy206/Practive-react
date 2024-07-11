import Form from "react-bootstrap/Form";
import React, { memo, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap/";
import { putUpdateUser } from "../services/UserService";
import { ToastContainer, toast } from "react-toastify";

const ModalEditUser = (props) => {
  const { show, handleClose, dataEditUser, handleUpdateFromModal } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEditUser = async () => {
    let res = await putUpdateUser(name, job);

    if (res && res.updatedAt) {
      handleUpdateFromModal({ first_name: name, id: dataEditUser.id });
      handleClose();
      toast.success("Update Succeed!!");
    }
  };

  useEffect(() => {
    if (show) {
      setName(dataEditUser.first_name);
    }
  }, [dataEditUser]);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Users</Modal.Title>
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
          <Button variant="primary" onClick={() => handleEditUser()}>
            Comfirm
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

export default memo(ModalEditUser);
