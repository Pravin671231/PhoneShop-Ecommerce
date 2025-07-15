import { useEffect, useState } from "react";
import { Table, Container, Tabs, Tab, Badge } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

const API = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const [ordersRes, productsRes] = await Promise.all([
          axios.get(`${API}/orders`, config),
          axios.get(`${API}/products`),
        ]);

        const fetchedOrders = Array.isArray(ordersRes.data)
          ? ordersRes.data
          : ordersRes.data.orders || [];

        const fetchedProducts = Array.isArray(productsRes.data.product)
          ? productsRes.data.product
          : productsRes.data.products || [];

        setOrders(fetchedOrders);
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Failed to fetch admin data", err);
      } finally {
        setLoading(false);
      }
    };

    if (userInfo?.isAdmin) {
      fetchData();
    }
  }, [userInfo]);

  const renderStatusBadge = (status) => {
    const variant =
      {
        Pending: "warning",
        Processing: "info",
        Shipped: "primary",
        Delivered: "success",
        Cancelled: "danger",
      }[status] || "secondary";

    return (
      <Badge bg={variant} pill>
        {status}
      </Badge>
    );
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <Tabs
          defaultActiveKey="orders"
          className="mb-3"
          mountOnEnter
          unmountOnExit
        >
          {/* Orders Tab */}
          <Tab eventKey="orders" title={`Orders (${orders.length})`}>
            <Table striped bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>User</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Order Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order.user?.name || "Unknown"}</td>
                      <td>₹{order.totalPrice.toFixed(2)}</td>
                      <td>{renderStatusBadge(order.status)}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Tab>

          {/* Products Tab */}
          <Tab eventKey="products" title={`Products (${products.length})`}>
            <Table striped bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>{product.title}</td>
                      <td>₹{product.price.toFixed(2)}</td>
                      <td>
                        {product.countInStock > 0 ? (
                          <Badge bg="success" pill>
                            {product.countInStock}
                          </Badge>
                        ) : (
                          <Badge bg="danger" pill>
                            Out of Stock
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      )}
    </Container>
  );
};

export default AdminDashboard;
