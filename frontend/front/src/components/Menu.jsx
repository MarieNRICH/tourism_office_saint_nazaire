import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
const Menu = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        >
                            <Nav.Link href="*">Home</Nav.Link>
                            <NavDropdown title="Places" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/places/add">
                                    Créer d'un nouveau lieu d'évènement ou activité
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/places">
                                    Liste des Lieux
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Categories" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/Categories/add">
                                    Créer une nouvelle catégorie
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/categories">
                                    Liste des catégories
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Events" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/events/add">
                                    Créer un nouvel évènement
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/events">
                                    Liste des évènements
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};
export default Menu;