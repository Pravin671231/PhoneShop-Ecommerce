import { useSelector } from "react-redux";
import { Button, Container, Table, Badge } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const MyOrdersPage = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get(`${API}/orders/myorders`, config);
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    if (userInfo) fetchOrders();
  }, [userInfo]);


  const handlePaid = (order) => {
    navigate("/payment", { state: { order } });
  };

  return (
    <Container className="mt-4">
      <h3 className="title-font mb-4">My Orders</h3>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Placed On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="fw-bold">{order._id.slice(-8)}</td>
                <td>₹{order.totalPrice.toFixed(2)}</td>
                <td>
                  <Badge
                    bg={order.isPaid ? "success" : "warning"}
                    text={order.isPaid ? "light" : "dark"}
                    pill
                  >
                    {order.status}
                  </Badge>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  {!order.isPaid ? (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handlePaid(order)}
                    >
                      Pay Now
                    </Button>
                  ) : (
                    <Badge bg="info" pill>
                      Paid
                    </Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default MyOrdersPage;
