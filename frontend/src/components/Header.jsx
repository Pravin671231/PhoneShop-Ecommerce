import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/userSlice";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${search.trim()}`);
    }
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container fluid className="px-4">
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Phone<span style={{ color: "#ffd700" }}>Store</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {/* Search bar */}
          <Form className="d-flex mx-auto w-50 w-md-100" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search for phones..."
              className="me-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="submit" variant="warning">
              Search
            </Button>
          </Form>

          {/* Right side navigation */}
          <Nav className="ms-auto my-2 my-lg-0 align-items-center" navbarScroll>
            <Nav.Link as={Link} to="/cart" className="text-white">
              <FaShoppingCart className="me-1" />
              Cart
            </Nav.Link>

            {userInfo ? (
              <>
                <NavDropdown
                  title={
                    <>
                      <FaUser className="me-1" />
                      {userInfo.name}
                    </>
                  }
                  id="user-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/myorders">
                    My Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                {userInfo.isAdmin && (
                  <Nav.Link
                    as={Link}
                    to="/admin/dashboard"
                    className="text-white"
                  >
                    Admin
                  </Nav.Link>
                )}
              </>
            ) : (
              <Nav.Link as={Link} to="/login" className="text-white">
                <FaUser className="me-1" />
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
