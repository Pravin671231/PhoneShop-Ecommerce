import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  Container,
  Image,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchProduct } from "../redux/features/productSlice";
import { addToCart } from "../redux/features/cartSlice";
import { IoMdStarHalf } from "react-icons/io";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, loadingProduct } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty: 1 }));
    navigate("/cart");
  };
  // console.log("Product details:", product);

  return (
    <Container className="mt-4">
      <h3 className="title-font">Product Details</h3>
      {loadingProduct ? (
        <Spinner animation="border" />
      ) : product ? (
        <Row>
          <Col md={6}>
            <Image src={product.image} fluid />
          </Col>
          <Col md={6}>
            <h2>
              {product.title}
              <span className="ms-4 fs-4">
                <IoMdStarHalf className="text-warning fs-4" /> {product.rating}
              </span>
            </h2>
            <Table bordered size="sm" className="my-3">
              <tbody>
                <tr>
                  <td>
                    <strong>Display</strong>
                  </td>
                  <td>{product.description.display}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Processor</strong>
                  </td>
                  <td>{product.description.processor}</td>
                </tr>
                <tr>
                  <td>
                    <strong>RAM</strong>
                  </td>
                  <td>{product.description.ram}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Storage</strong>
                  </td>
                  <td>{product.description.storage}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Battery</strong>
                  </td>
                  <td>{product.description.battery}</td>
                </tr>
              </tbody>
            </Table>

            <h4>₹{product.price}</h4>
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </Col>
        </Row>
      ) : (
        <p>Product not found.</p>
      )}
    </Container>
  );
};

export default ProductDetails;
