import Container from "react-bootstrap/Container";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Eventos from './Eventos';
import Lugares from './Lugares';
import Home from './Home';
import './Menu.css';
import Login from "./Login";

function Menu() {
    const onLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    return (
    <>
    <Router>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">My App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" ></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="menuButtons" href="/"> Home </Nav.Link>
                        <Nav.Link className="menuButtons" href="/lugares"> Lugares </Nav.Link>
                        <NavDropdown title="Mas opciones" id="basic-nav-dropdown">
                            <NavDropdown.Item className="menuButtons" href="/eventos"> Eventos </NavDropdown.Item>
                            <NavDropdown.Item onClick={onLogout}> Logout </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </Router>
    <Router>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/lugares" element={<Lugares />}/>
            <Route path="/eventos" element={<Eventos />}/>
            <Route path="/login" element={<Login />}/>
        </Routes>
    </Router>
    </>
    );
    
};

export default Menu;
