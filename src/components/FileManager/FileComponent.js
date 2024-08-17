import React, { useState } from "react";
import { Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ViewerWindow from "../Viewer";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";

const FileComponent = ({data}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
    <Col
      onClick={() => {setShowModal(true)}}
      md={2}
      className="border h-100 d-flex align-items-center justify-content-around flex-column py-1 rounded-2 text-truncate m-2">
      <FontAwesomeIcon
        icon={faPhotoFilm}
        className="mt-3"
        style={{ fontSize: '3rem' }}
      />
      <div className="mt-3 mx-3">{data.name}</div>
    </Col>
    {showModal && (
      <Modal show={showModal} onHide={() => setShowModal(false)} fullscreen >
        <Modal.Header closeButton>
          <Modal.Title className="text-truncate">
            {data.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <ViewerWindow url={data.url}/>
        </Modal.Body>
      </Modal>
    )}
  </>
  );
};

export default FileComponent;