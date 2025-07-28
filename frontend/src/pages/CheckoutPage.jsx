import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { removeFromCart } from "../redux/features/cartSlice";
import axios from "axios";
import AddressListPage from "./AddressPage";

const CheckoutPage = () => {
  const API = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null); // NEW
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const placeOrder = async () => {
    if (!selectedAddress) {
      setMessage("Please select a shipping address.");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const orderItems = cartItems.map((item) => ({
        title: item.title,
        qty: item.qty,
        price: item.price,
        product: item._id,
      }));

      const orderData = {
        orderItems,
        totalPrice,
        shippingAddress: selectedAddress, // include full address
      };

      await axios.post(`${API}/orders`, orderData, config);

      localStorage.removeItem("cartItems");
      cartItems.forEach((item) => dispatch(removeFromCart(item._id)));

      setMessage("Order placed successfully!");

      setTimeout(() => navigate("/myorders"), 1500);
    } catch (error) {
      setMessage("Error placing order. Please try again.");
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Checkout</h2>

      {message && (
        <Alert
          variant={message.includes("successfully") ? "success" : "danger"}
          dismissible
          onClose={() => setMessage(null)}
        >
          {message}
        </Alert>
      )}

      <Row>
        {/* Left: Cart Items */}
        <Col md={8}>
          <ListGroup variant="flush" className="shadow-sm rounded mb-3">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row className="align-items-center">
                  <Col md={6}>{item.title}</Col>
                  <Col md={2}>Qty: {item.qty}</Col>
                  <Col md={2}>₹{item.price}</Col>
                  <Col md={2} className="fw-bold">
                    ₹{item.qty * item.price}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          {/* Inject AddressListPage with address selection */}
          <AddressListPage onSelect={setSelectedAddress} />

          {selectedAddress && (
            <Alert variant="info" className="mt-3">
              <strong>Delivering to:</strong> {selectedAddress.name},{" "}
              {selectedAddress.address}, {selectedAddress.city},{" "}
              {selectedAddress.state} - {selectedAddress.pincode}
            </Alert>
          )}
        </Col>

        {/* Right: Order Summary */}
        <Col md={4}>
          <Card className="shadow-sm p-3">
            <h5>Price Details</h5>
            <hr />
            <Row className="mb-2">
              <Col>Total Items</Col>
              <Col className="text-end">{cartItems.length}</Col>
            </Row>
            <Row className="mb-2">
              <Col>Total Price</Col>
              <Col className="text-end">₹{totalPrice}</Col>
            </Row>
            <hr />
            <div className="d-grid">
              <Button
                variant="success"
                size="lg"
                disabled={cartItems.length === 0}
                onClick={placeOrder}
              >
                Place Order
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;
