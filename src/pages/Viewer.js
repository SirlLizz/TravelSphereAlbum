import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from '../components/NavBar';

function Viewer() {
    return (
        <Container>
            <NavBar/>
            <div>
                <p>This is the album page!</p>
            </div>
        </Container>
    );
}
export default Viewer;