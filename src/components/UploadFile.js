import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const UploadFile = props => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert("Please add file name!");
    const fileExtension = file.name.split(".").reverse()[0].toLowerCase();
    const allowedExtensions = ["png", "jpg", "jpeg", "gif", "svg"];

    if (allowedExtensions.indexOf(fileExtension) === -1) {
      return alert(`File with extension ${fileExtension} not allowed!`);
    }
    props.fileHandler(file)
    setShowModal(false)
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)} >
        <Modal.Header closeButton>
          <Modal.Title>
            Upload File
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFileSubmit} encType="multipart/form-data">
<<<<<<< HEAD
            <Form.Group className="my-2">
              <Form.Control 
                type="file" 
=======
            <Form.Group controlId="formBasicFolderName" className="my-2">
              <Form.Control
                type="file"
>>>>>>> 316c81bd9d00f530d0682ab7c681f39f449f2562
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </Form.Group>
<<<<<<< HEAD
            <Form.Group className="mt-5">
=======
            <Form.Group controlId="formBasicFolderSubmit" className="mt-5">
>>>>>>> 316c81bd9d00f530d0682ab7c681f39f449f2562
              <Button
                type="submit"
                className="form-control"
                variant="primary"
              >
                Upload File
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
<<<<<<< HEAD
      <Button className="mx-auto my-3"  onClick={() => setShowModal(true)} variant="outline-dark" >
=======
      <Button className="mx-auto my-3" onClick={() => setShowModal(true)} variant="outline-dark" >
>>>>>>> 316c81bd9d00f530d0682ab7c681f39f449f2562
        Upload File
      </Button>
    </>
  );
};

export default UploadFile;