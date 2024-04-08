import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";
import React from "react";

function Header() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">WeTravel</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" onClick={() => navigate("/")}>
              Головна
            </Nav.Link>
            <Nav.Link href="#testimonials" onClick={() => navigate("/")}>
              Відгуки
            </Nav.Link>
            <Nav.Link href="#trips" onClick={() => navigate("/")}>
              Поїздки
            </Nav.Link>
          </Nav>

          {authToken ? (
            <>
              <NavDropdown title="Редагувати" id="basic-nav-dropdown">
                <NavDropdown.Item
                  href="#"
                  onClick={() => navigate("/countries")}
                >
                  Країни
                </NavDropdown.Item>
                <NavDropdown.Item href="#" onClick={() => navigate("/cities")}>
                  Міста
                </NavDropdown.Item>
                <NavDropdown.Item href="#" onClick={() => navigate("/hotels")}>
                  Готелі
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="#"
                  onClick={() => navigate("/restaurants")}
                >
                  Ресторани
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item href="#" onClick={() => navigate("/trips")}>
                  Поїздки
                </NavDropdown.Item>
              </NavDropdown>
              <div style={{ width: "1rem" }}></div>
              <Nav.Link
                href="#"
                onClick={() => {
                  localStorage.removeItem(AUTH_TOKEN);
                  navigate("/");
                }}
              >
                Вийти
              </Nav.Link>
            </>
          ) : (
            <Nav.Link href="#login" onClick={() => navigate("/login")}>
              Увійти
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
