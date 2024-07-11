import React from "react";
import { Button, Modal } from "react-bootstrap/";
import { deleteUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalComfirm = React.memo((props) => {
  const { show, handleClose, dataDeleteUser, handleDeleteUserFromModal } = props;

  const handleComfirmDelete = async () => {
    try {
      let res = await deleteUser(dataDeleteUser.id);
      console.log("check res from modal", res);
      if (res && res.StatusCode === 204) {
        toast.success("Delete User success");
        handleClose();
        handleDeleteUserFromModal(dataDeleteUser);
      } else {
        toast.error("Error Delete");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error Delete");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete a Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            Are you sure delete user: "<b>{dataDeleteUser.email}</b>"
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleComfirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default ModalComfirm;
