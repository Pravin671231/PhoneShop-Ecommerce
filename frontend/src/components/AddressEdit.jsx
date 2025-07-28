import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAddress, getAddresses } from "../redux/features/addressSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

const AddressEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { addresses } = useSelector((state) => state.address);
  const addressToEdit = addresses.find((a) => a._id === id);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    if (!addresses.length) {
      dispatch(getAddresses());
    } else if (addressToEdit) {
      setFormData(addressToEdit);
    }
  }, [dispatch, addresses, addressToEdit]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAddress({id, addressData:formData}));
    navigate("/checkout");
  };

  return (
    <Container>
      <h3>Edit Address</h3>
      <Form onSubmit={handleSubmit}>
        {["name", "mobile", "pincode", "address", "city", "state"].map(
          (field) => (
            <Form.Group key={field} className="mb-3">
              <Form.Label>{field}</Form.Label>
              <Form.Control
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )
        )}
        <Button type="submit" variant="success">
          Update
        </Button>
      </Form>
    </Container>
  );
};

export default AddressEdit;
