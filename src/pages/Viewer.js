import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import ViewerWindow from '../components/Viewer';

function Viewer() {
    return (
        <>
            <NavBar />
            <ViewerWindow/>
        </>
    );
}
export default Viewer;