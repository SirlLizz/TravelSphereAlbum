import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getFiles,
  getFolders
} from '../../redux/actionCreators/filefoldersActionCreators.js';
import BreadCrum from './Breadcrumb.js';

const BaseScreen = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, folders } =
    useSelector(
      (state) => ({
        isLoading: state.filefolders.isLoading,
        folders: state.filefolders.folders,
      }),
      shallowEqual
    );

  useEffect(() => {
    dispatch(getFolders());
  }, [dispatch, isLoading]);

  if (isLoading) {
    return (
      <Row>
        <Col md="12">
          <h1 className="text-center my-5">Fetching folders...</h1>
        </Col>
      </Row>
    );
  }

  return (
    <>
      <BreadCrum currentFolder="root folder" />
      {folders && folders.length > 0 && (
        <>
          <p className="text-center border-bottom py-2">Folders</p>
          <Row style={{ height: '150px' }} className="pt-2 pb-4 px-5">
            {folders.map(({ data, docId }) => (
              <Col
                onDoubleClick={() =>
                  history.push(`/dashboard/folder/admin/${docId}`)
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
                key={docId}
                md={2}
                className="border h-100  d-flex align-items-center justify-content-around flex-column py-1 rounded-2">
                <FontAwesomeIcon
                  icon={faFolder}
                  className="mt-3"
                  style={{ fontSize: '3rem' }}
                />
                <p className="text-center mt-3">{data.name}</p>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default BaseScreen;