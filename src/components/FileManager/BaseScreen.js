import React, { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import BreadCrum from './Breadcrumb.js';
import FolderComponent from './FolderComponent.js';
import FileComponent from './FileComponent.js';
import { getFiles, getFolders } from './../../API/firebase.js';

const BaseScreen = () => {
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [currentPath, setCurrentPath] = useState('/'); 
  const [isFoldersLoading, setIsFoldersLoading] = useState(true); 
  const [isFilesLoading, setIsFilesLoading] = useState(true); 

  useEffect(() => {
    const listFilesAndFolders = async (path) => {
      try {
        setIsFoldersLoading(true);
        setIsFilesLoading(true);
        getFolders(path).then((newFolders)=>{
          setFolders(newFolders);
          setIsFoldersLoading(false);
        })
        getFiles(path).then((newFiles)=>{
          setFiles(newFiles);
          setIsFilesLoading(false);
        })
      } catch (error) {
        console.error('Error listing files and folders:', error);
      }
    };

    listFilesAndFolders(currentPath);
  }, [currentPath]);

  const handleFolderClick = (folderName) => {
    setCurrentPath(`${currentPath}/${folderName}/`);
  };

  return (
    <Container fluid="xxl">
      <BreadCrum currentFolder={currentPath} setCurrentFolder={setCurrentPath} />
      {isFoldersLoading ?(
        <Row>
          <Col md="12">
            <h1 className="text-center my-5">Fetching folders...</h1>
          </Col>
        </Row>
      ):(folders && folders.length > 0 && (
          <Container fluid="xl">
            <Row><h3 className="text-center border-bottom py-2">Folders</h3></Row>
            <Row className="pt-2 pb-4 px-5">
              {folders.map((folder) => (
                <FolderComponent key={folder.path} data={folder} setCurrentFolder={handleFolderClick}/>
              ))}
            </Row>
          </Container>
        )
      )}
      {isFilesLoading ?(
        <Row>
          <Col md="12">
            <h1 className="text-center my-5">Fetching files...</h1>
          </Col>
        </Row>
      ):(files && files.length > 0 && (
          <Container fluid="xl">
            <Row><h3 className="text-center border-bottom py-2">Files</h3></Row>
            <Row className="pt-2 pb-4 px-5">
              {files.map((file) => (
                <FileComponent key={file.path} data={file}/>
              ))}
            </Row>
          </Container>
        )
      )}
      {!isFoldersLoading && !isFilesLoading && files.length === 0 && folders.length === 0 &&(
        <Row>
        <Col md="12">
          <h1 className="text-center my-5">No data</h1>
        </Col>
      </Row>
      )}
    </Container>
  );
};

export default BaseScreen;