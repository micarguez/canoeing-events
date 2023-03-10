import Container from "react-bootstrap/Container";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Menu.css';

function Menu() {

    const token = localStorage.getItem('token');

    const onLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
    <>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Canotaje 2023</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" ></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="menuButtons" href="/"> Home </Nav.Link>
                        <NavDropdown title="Lugares" id="basic-nav-dropdown">
                            <NavDropdown.Item className="menuButtons" href="/crear-lugar"> Crear lugar </NavDropdown.Item>
                            <NavDropdown.Item className="menuButtons" href="/lugares"> Ver lugares </NavDropdown.Item>
                            <NavDropdown.Item className="menuButtons" href="/lugares-guardados"> Ver lugares guardados </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Eventos" id="basic-nav-dropdown">
                            <NavDropdown.Item className="menuButtons" href="/crear-evento"> Crear evento </NavDropdown.Item>
                            <NavDropdown.Item className="menuButtons" href="/eventos"> Ver eventos </NavDropdown.Item>
                            <NavDropdown.Item className="menuButtons" href="/eventos"> Ver eventos guardados </NavDropdown.Item>
                        </NavDropdown>
                        {(Boolean(token) && <Nav.Link className="menuButtons" onClick={onLogout}> Logout </Nav.Link>)}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
    );
    
};

export default Menu;
