import { Button, Col, Container, Form, ListGroup, Row, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeHandler = (id) => dispatch(removeFromCart(id));

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  const updateQty = (item, qty) => {
    dispatch(addToCart({ ...item, qty: Number(qty) }));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Container className="py-4">
      <h3 className="mb-4">Shopping Cart</h3>
      {cartItems.length === 0 ? (
        <h5>Your cart is empty</h5>
      ) : (
        <Row>
          {/* Left: Cart Items */}
          <Col md={8}>
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id} className="mb-3 shadow-sm">
                  <Row className="align-items-center">
                    <Col md={2}>
                      <img src={item.image} alt={item.title} className="img-fluid" />
                    </Col>
                    <Col md={4}>
                      <h6>{item.title}</h6>
                      <p className="text-muted mb-1">₹{item.price}</p>
                    </Col>
                    <Col md={3}>
                      <Form.Select
                        size="sm"
                        value={item.qty}
                        onChange={(e) => updateQty(item, e.target.value)}
                      >
                        {[...Array(10).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="outline-danger"
                        onClick={() => removeHandler(item._id)}
                        size="sm"
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          {/* Right: Summary */}
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <h5>Price Details</h5>
                <hr />
                <Row className="mb-2">
                  <Col>Items ({totalItems})</Col>
                  <Col className="text-end">₹{totalPrice}</Col>
                </Row>
                <Row className="mb-2">
                  <Col>Delivery</Col>
                  <Col className="text-end text-success">Free</Col>
                </Row>
                <hr />
                <Row className="fw-bold">
                  <Col>Total Amount</Col>
                  <Col className="text-end">₹{totalPrice}</Col>
                </Row>
                <div className="d-grid mt-3">
                  <Button variant="primary" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CartPage;
