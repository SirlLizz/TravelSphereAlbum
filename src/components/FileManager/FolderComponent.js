import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col } from 'react-bootstrap';

const FolderComponent = ({data, setCurrentFolder}) => {
  return (
    <>
      <Col
        onDoubleClick={() =>
          setCurrentFolder(data.path)
        }
        onClick={(e) => {
          if (e.currentTarget.classList.contains('text-white')) {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.classList.remove('text-white');
            e.currentTarget.classList.remove('shadow-sm');
          } else {
            e.currentTarget.style.background = '#017bf562';
            e.currentTarget.classList.add('text-white');
            e.currentTarget.classList.add('shadow-sm');
          }
        }}
        md={2}
        className="border h-100 d-flex align-items-center justify-content-around flex-column py-1 m-2 rounded-2">
        <FontAwesomeIcon
          icon={faFile}
          className="mt-3"
          style={{ fontSize: '3rem' }}
        />
        <p className="mt-3">{data.name}</p>
      </Col>
    </>
  );
};
export default FolderComponent;