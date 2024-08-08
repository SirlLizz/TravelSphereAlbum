import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home";
import Viewer from "./pages/Viewer";
import Album from "./pages/Album";
import Travel from "./pages/Travel";
import NoMatch from "./pages/NoMatch";


class App extends React.Component {
    render() {
        return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/album" element={ <Album/> } />
                <Route exact path="/viewer" element={ <Viewer/> } />
                <Route exact path="/travel" element={ <Travel/> } />
                <Route component={ NoMatch } />
            </Routes>
        </Router>
        )
    }
}

export default App;