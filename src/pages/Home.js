import React from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

function Home() {
    return (
        <Stack gap={3}>
            <Button variant="info" href="album">Album</Button>
            <Button variant="primary" href="viewer">Viewer</Button>
            <Button variant="secondary" href="travel">Travel</Button>
        </Stack>
    );
}
export default Home;