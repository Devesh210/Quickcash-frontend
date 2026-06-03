import React, { useMemo } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import logo from "../../Images/logo.svg";
import { storage } from "../../config/storage";

const Header = () => {
  const user = useMemo(() => storage.getUser(), []);

  const logoutHandler = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      {["sm"].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="#">
              <Link to="/">
                <img src={logo} className="homelogo" alt="QuickCash" />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                >
                  <img src={logo} className="homelogo" alt="QuickCash" />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Link to="/Sellbuyback" className="nav-link">
                    Sell / BuyBack
                  </Link>
                  <Nav.Link target="_blank" href="https://shop.quickcash.ae/">
                    Shop
                  </Nav.Link>
                  {user ? (
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        <img
                          style={{
                            width: "40px",
                            marginRight: "5px",
                            position: "relative",
                            top: "-4px",
                          }}
                          src="https://cdn3d.iconscout.com/3d/premium/thumb/profile-6073860-4996977.png"
                          alt="Profile"
                        />
                        <span>{user.name || user.firstName || "Account"}</span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Link className="dashboard_acds" to="/Userdashboard">
                          Dashboard
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={logoutHandler}>
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <Link to="/Login" className="signlin nav-link">
                      Sign In <i className="fa fa-sign-in" aria-hidden="true"></i>
                    </Link>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default React.memo(Header);
