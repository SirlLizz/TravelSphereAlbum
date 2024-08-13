import React from "react";
import { Breadcrumb, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BreadCrum = ({ currentFolder }) => {
  const history = useNavigate();
  return (
    <Breadcrumb>
      {currentFolder && currentFolder.data.path.length > 0 ? (
        <>
          <Breadcrumb.Item
            linkAs={Button}
            linkProps={{
              variant: "white",
              className: "text-primary",
            }}
            onClick={() => history.push("/dashboard")}
            className="text-decoration-none"
          >
            Root
          </Breadcrumb.Item>
          {currentFolder.data.path.map((folder, index) => (
            <Breadcrumb.Item
              key={index}
              linkAs={Button}
              linkProps={{
                variant: "white",
                className: "text-primary",
              }}
              onClick={() =>
                history.push(
                  `/dashboard/folder/${folder.id}`
                )
              }
            >
              {folder.name}
            </Breadcrumb.Item>
          ))}
          <Breadcrumb.Item as={Button} disabled variant="white" active>
            {currentFolder.data.name}
          </Breadcrumb.Item>
        </>
      ) : (
        <>
          <Breadcrumb.Item
            linkAs={Button}
            linkProps={{
              variant: "white",
              className: "text-primary",
            }}
            onClick={() => history.push("/dashboard")}
          >
            Root
          </Breadcrumb.Item>
          <Breadcrumb.Item as={Button} variant="white" disabled active>
            {currentFolder.data.name}
          </Breadcrumb.Item>
        </>
      )}
    </Breadcrumb>
  );
};

export default BreadCrum;