import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/features/userSlice";
import axios from "axios";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const API = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [name, setName] = useState(userInfo?.name || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      setMessage("Please login to view your profile");
    }
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${API}/users/profile`,
        { name, email, password },
        config
      );

      setMessage("✅ Profile updated successfully");
    } catch (err) {
      setMessage("❌ Update failed. Please try again.");
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2>My Profile</h2>
            {message && <Alert>{message}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to keep existing"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Update Profile
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
