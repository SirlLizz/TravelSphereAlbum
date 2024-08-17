import React from "react";
import { Breadcrumb } from "react-bootstrap";

const BreadCrumb = ({ currentFolder, setCurrentFolder }) => {
  const pathParts = currentFolder.split('/').filter(part => part !== '');
  pathParts.unshift('Root');
  return (
    <Breadcrumb className="mt-2">
      {pathParts.map((folder, index) => (
        <Breadcrumb.Item
          key={index}
          className="border h-100 p-1 rounded-2"
          linkProps={{
            variant: "white",
            className: "text-primary text-decoration-none",
          }}
          onClick={() =>
            setCurrentFolder(pathParts.slice(1, index + 1).join('/'))
          }
        >
          {folder}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadCrumb;