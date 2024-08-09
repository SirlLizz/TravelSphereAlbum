import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from '../components/NavBar';

function Album() {
    return (
        <Container>
            <NavBar />
            <div>
                <p>This is the Album page!</p>
            </div>
        </Container>

    );
}
export default Album;