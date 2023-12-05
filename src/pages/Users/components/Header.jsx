import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VITE_API } from "../../../App.jsx";
import { Navbar, Nav, Button } from "react-bootstrap";

export const Header = () => {
  const [user, setuser] = useState(null);
  const isLoggedIn = user !== null;
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear("token");
    setuser(null);
    navigate("/login");
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await fetch(`${VITE_API}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setuser(userData.user);
        } else {
          navigate("/login");
        }
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Navbar.Brand as={Link} to="/" className="text-xl font-weight-bold">
        Your Logo
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ml-auto">
          {isLoggedIn ? (
            <>
              <Nav.Item className="mr-2">Hi {user.name}</Nav.Item>

              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
              <Nav.Item>
                <Button type="button" class="btn btn-dark" onClick={logout}>
                  Logout
                </Button>
              </Nav.Item>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
