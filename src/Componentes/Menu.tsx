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
                <Navbar.Brand href="/">My App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" ></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="menuButtons" href="/"> Home </Nav.Link>
                        <Nav.Link className="menuButtons" href="/lugares"> Lugares </Nav.Link>
                        <NavDropdown title="Mas opciones" id="basic-nav-dropdown">
                            <NavDropdown.Item className="menuButtons" href="/eventos"> Eventos </NavDropdown.Item>
                            {(Boolean(token) && <NavDropdown.Item onClick={onLogout}> Logout </NavDropdown.Item>)}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
    );
    
};

export default Menu;
