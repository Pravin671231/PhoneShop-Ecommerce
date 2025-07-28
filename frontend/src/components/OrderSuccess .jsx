import { Modal, Button } from "react-bootstrap";

const OrderSuccess = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>🎉 Thank You!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <p>Your payment was successful and your order is being processed.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onHide}>
          Continue Shopping
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderSuccess;
