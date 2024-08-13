import React, { useEffect} from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getFiles,
  getFolders
} from "../../redux/actionCreators/filefoldersActionCreators";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEye } from "@fortawesome/free-solid-svg-icons";

const FileComponent = () => {
  const { fileId } = useParams();
  const history = useNavigate();

  const { isLoading, currentFile, folders } = useSelector(
    (state) => ({
      isLoading: state.filefolders.isLoading,
      folders: state.filefolders.UserFolders,
      currentFile: state.filefolders.userFiles?.find(
        (file) => file.docId === fileId
      ),
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading && !folders && !currentFile) {
      dispatch(getFolders());
      dispatch(getFiles());
    }
  }, [dispatch, isLoading, currentFile && currentFile.data.data]);

  if (isLoading) {
    return (
      <Row className="m-0 w-100 h-100">
        <Col md={12} className="bg-white m-0">
          <h1 className="text-center my-5">Fetching file...</h1>
        </Col>
      </Row>
    );
  }
  return (
    <>
      {currentFile && (
          <>
            <Row
            className="position-fixed top-0 left-0 m-0 w-100 h-100"
            style={{ background: "rgba(0, 0, 0, 0.98)" }}
          >
            <Col md={12}>
              <div
                className="d-flex align-items-center mt-5 mb-3"
                style={{ height: "40px" }}
              >
                <p
                  className="text-left px-5 my-5 text-white"
                  style={{ width: "85%" }}
                >
                  {currentFile.data.name}
                </p>
                <div className="btns top-5 right-0 ml-auto mr-5">
                  <Button
                    variant="outline-light"
                    onClick={() => history.goBack()}
                  >
                    Go Back
                  </Button>
                  &nbsp;
                  <a
                    className="btn btn-primary"
                    target="_blank"
                    href={currentFile.data.url}
                    download
                  >
                    <FontAwesomeIcon icon={faDownload} />
                    &nbsp; Download
                  </a>
                </div>
              </div>
              <Col md={12} style={{ height: "65%" }}>
                <Image
                  src={currentFile.data.url}
                  alt={currentFile.data.url}
                  className="mb-5"
                  height="100%"
                  width="100%"
                />
              </Col>
            </Col>
          </Row>
          </>
        )
      };
    </>
  );
};

export default FileComponent;