import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from '../components/NavBar';

function Travel() {
    return (
        <Container fluid="xxl">
            <NavBar />
            <div>
                <p>This is the Travel page!</p>
            </div>
        </Container>
    );
}
export default Travel;