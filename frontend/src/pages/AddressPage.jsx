import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress, getAddresses } from "../redux/features/addressSlice";
import { Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddressPage = ({ onSelect }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addresses } = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteAddress(id));
    }
  };

  return (
    <div className="mt-4">
      <h4>Select Shipping Address</h4>
       <Button
        variant="primary"
        className="mb-3"
        onClick={() => navigate("/address/add")}
      >
        + Add New Address
      </Button>
      <Row>
        {addresses?.map((addr) => (
          <Col key={addr._id} md={6} lg={4} className="mb-3">
            <Card border="secondary">
              <Card.Body>
                <Card.Title>{addr.name}</Card.Title>
                <Card.Text>
                  {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                  <br />
                  <strong>Mobile:</strong> {addr.mobile}
                </Card.Text>
                <Button
                  variant="outline-success"
                  size="sm"
                  className="me-2"
                  onClick={() => onSelect(addr)}
                >
                  Deliver to this address
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => navigate(`/address/edit/${addr._id}`)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => deleteHandler(addr._id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AddressPage;
