import React from "react";
import { Container } from "react-bootstrap";
import { Route, Routes, useMatch } from "react-router-dom";

import BaseScreen from "../components/FileManager/BaseScreen";
import FolderComponent from "../components/FileManager/FolderComponent";
import FileComponent from "../components/FileManager/FileComponent";

const Album = () => {
  const { path } = useMatch('album');
  return (
    <Container fluid className="px-0" style={{ overflowX: "hidden" }}>
      <Routes>
        <Route exact path={`album/${path}`} element={<BaseScreen/>} />
        <Route exact path={`album/${path}/folder/:folderId`} element={<FolderComponent/>} />
        <Route exact path={`album/${path}/file/:fileId`} element={<FileComponent/>} />
      </Routes>
    </Container>
  );
};

export default Album;