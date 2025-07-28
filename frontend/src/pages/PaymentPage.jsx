import { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Card,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import OrderSuccess from "../components/OrderSuccess ";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
  });

  const location = useLocation();
  const order = location.state?.order;

  const amount = order?.totalPrice || 0;

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      paymentDetails.cardNumber.length === 16 &&
      paymentDetails.cardHolder.trim() !== "" &&
      paymentDetails.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/) &&
      paymentDetails.cvv.length === 3
    ) {
      setMessage(null);
      setShowSuccessModal(true);
    } else {
      setMessage("Please fill in valid payment details.");
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <h4 className="mb-4">Secure Payment</h4>

            {message && <Alert variant="danger">{message}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="cardNumber" className="mb-3">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  name="cardNumber"
                  maxLength={16}
                  placeholder="Enter 16-digit card number"
                  value={paymentDetails.cardNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="cardHolder" className="mb-3">
                <Form.Label>Card Holder Name</Form.Label>
                <Form.Control
                  type="text"
                  name="cardHolder"
                  placeholder="Enter name on card"
                  value={paymentDetails.cardHolder}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group controlId="expiry" className="mb-3">
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={paymentDetails.expiry}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="cvv" className="mb-3">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control
                      type="password"
                      name="cvv"
                      maxLength={3}
                      placeholder="123"
                      value={paymentDetails.cvv}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="success" type="submit" className="w-100">
                Pay ₹{amount.toLocaleString("en-IN")}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>

      <OrderSuccess
        show={showSuccessModal}
        onHide={() => {
          setShowSuccessModal(false);
          navigate("/"); // Navigate to home or orders page
        }}
      />
    </Container>
  );
};

export default PaymentPage;
