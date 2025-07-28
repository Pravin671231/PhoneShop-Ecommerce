import { useState } from "react";
import {
  Form,
  Button,
  Alert,
  Row,
  Col,
  Spinner,
  Container,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createAddress, getAddresses } from "../redux/features/addressSlice";

const AddressForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.address);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
  });

  const [success, setSuccess] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (Object.values(formData).some((val) => val.trim() === "")) {
      setSuccess(null);
      return;
    }

    try {
      await dispatch(createAddress(formData)).unwrap();
      setSuccess("Address added successfully!");
      setFormData({
        name: "",
        mobile: "",
        pincode: "",
        address: "",
        city: "",
        state: "",
      });
      dispatch(getAddresses());
    } catch {
      setSuccess(null);
    }
  };

  return (
    <Container className="my-4">
      <Card className="p-4 shadow-sm">
        <h4 className="mb-4">Add New Address</h4>

        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          {/* Name */}
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Mobile */}
          <Form.Group className="mb-3">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              name="mobile"
              placeholder="Enter mobile number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Pincode */}
          <Form.Group className="mb-3">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              type="text"
              name="pincode"
              placeholder="Enter pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Address */}
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="address"
              placeholder="Enter full address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* City, State Row */}
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Submit */}
          <Button type="submit" variant="success" disabled={loading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Saving...
              </>
            ) : (
              "Save Address"
            )}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddressForm;
