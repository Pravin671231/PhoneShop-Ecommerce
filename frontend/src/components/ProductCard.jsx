import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../redux/features/cartSlice";
import { IoMdStarHalf } from "react-icons/io";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty: 1 }));
    navigate("/cart");
  };

  return (
    <Card className="mb-3 p-3 shadow-sm">
      <Row>
        {/* Image Section */}
        <Col
          md={3}
          className="d-flex align-items-center justify-content-center"
        >
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{ maxHeight: "180px", objectFit: "contain" }}
          />
        </Col>

        {/* Product Details */}
        <Col md={6}>
          <h5>{product.title}</h5>
          <p className="text-muted mb-2" style={{ fontSize: "14px" }}>
            {product.description.processor}, {product.description.ram} RAM,{" "}
            {product.description.storage} Storage
          </p>
          <div className="mb-2">
            <span className="me-2 text-success fw-bold">
              <IoMdStarHalf className="text-warning mb-1" /> {product.rating}
            </span>
          </div>
          <p className="text-secondary mb-1">
            <strong>Display:</strong> {product.description.display}
          </p>
          <p className="text-secondary mb-1">
            <strong>Battery:</strong> {product.description.battery}
          </p>
        </Col>

        {/* Price and Action Buttons */}
        <Col
          md={3}
          className="d-flex flex-column align-items-end justify-content-between"
        >
          <div>
            <h4 className="text-danger">₹{product.price}</h4>
          </div>
          <div>
            <Button
              variant="warning"
              className="me-2"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Link to={`/products/${product._id}`}>
              <Button variant="outline-primary">View</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductCard;
