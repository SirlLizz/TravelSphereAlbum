import React, { useState } from "react";
import { Button, Form, Modal, ProgressBar } from "react-bootstrap";

const UploadFile = props => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert("Please add file name!");
    const fileExtension = file.name.split(".").reverse()[0];
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
              <Form.Group controlId="formBasicFolderName" className="my-2">
                <Form.Control 
                  type="file" 
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicFolderSubmit" className="mt-5">
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
      <Button className="mx-auto my-3"  onClick={() => setShowModal(true)} variant="outline-dark" >
          Upload File
      </Button>
    </>
  );
};

export default UploadFile;