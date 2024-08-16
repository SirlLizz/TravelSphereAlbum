import React from "react";
import { Breadcrumb } from "react-bootstrap";

const BreadCrumb = ({ currentFolder, setCurrentFolder }) => {
  const pathParts = currentFolder.split('/').filter(part => part !== '');
  return (
    <Breadcrumb className="mt-2">
      <Breadcrumb.Item
            linkProps={{
              variant: "white",
              className: "text-primary",
            }}
            onClick={() => setCurrentFolder("/")}
            className="link-underline-opacity-0"
          >
            Root
          </Breadcrumb.Item>
          {pathParts.map((folder, index) => (
            <Breadcrumb.Item
              key={index}

              linkProps={{
                variant: "white",
                className: "text-primary",
              }}
              onClick={() =>
                setCurrentFolder(pathParts.slice(0, index + 1).join('/'))
              }
            >
              {folder}
            </Breadcrumb.Item>
          ))}
    </Breadcrumb>
  );
};

export default BreadCrumb;