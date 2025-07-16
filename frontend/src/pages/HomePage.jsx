import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Col,
  Container,
  Row,
  Spinner,
  Button,
  Modal,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { fetchProducts } from "../redux/features/productSlice.js";
import ProductCard from "../components/ProductCard.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const { items, error, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRam, setSelectedRam] = useState("All");
  const [selectedStorage, setSelectedStorage] = useState("All");

  const location = useLocation();
  const searchQuery =
    new URLSearchParams(location.search).get("search")?.toLowerCase() || "";

  const minPrice = Math.min(...items.map((i) => i.price));
  const maxPrice = Math.max(...items.map((i) => i.price));
  const [priceRange, setPriceRange] = useState(maxPrice);

  useEffect(() => {
    setPriceRange(maxPrice);
  }, [maxPrice]);

  // Modal toggle state
  const [showSidebarModal, setShowSidebarModal] = useState(false);

  // Filtering logic
  const filteredItems = items.filter((item) => {
    if (selectedBrands.length > 0 && !selectedBrands.includes(item.brand))
      return false;
    if (selectedRam !== "All" && item.description.ram !== selectedRam)
      return false;
    if (
      selectedStorage !== "All" &&
      item.description.storage !== selectedStorage
    )
      return false;
    if (item.price > priceRange) return false;
    if (
      searchQuery &&
      !item.title.toLowerCase().includes(searchQuery) &&
      !item.brand.toLowerCase().includes(searchQuery)
    )
      return false;
    return true;
  });

  return (
    <Container className="page-background" fluid>
      <Row>
        {/* Fixed sidebar on large screens */}
        <Col md={2} className="fixed-sidebar d-none d-lg-block ">
          <Sidebar
            items={items}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            selectedRam={selectedRam}
            setSelectedRam={setSelectedRam}
            selectedStorage={selectedStorage}
            setSelectedStorage={setSelectedStorage}
            minPrice={minPrice}
            maxPrice={maxPrice}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </Col>

        {/* Main Content */}
        <Col lg={10} md={12}>
          {/* Toggle button for small/medium screens */}
          <div className="d-lg-none mb-3">
            <Button
              variant="outline-secondary"
              onClick={() => setShowSidebarModal(true)}
              className="sidebar-toggle-btn"
            >
              <span className="navbar-toggler-icon"></span> Filters
            </Button>
          </div>

          {/* Sidebar Modal for small/medium screens */}
          <Modal
            show={showSidebarModal}
            onHide={() => setShowSidebarModal(false)}
            centered
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Filters ({filteredItems.length})</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: "80vh", overflowY: "auto" }}>
              <Sidebar
                items={items}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                selectedRam={selectedRam}
                setSelectedRam={setSelectedRam}
                selectedStorage={selectedStorage}
                setSelectedStorage={setSelectedStorage}
                minPrice={minPrice}
                maxPrice={maxPrice}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </Modal.Body>
          </Modal>

          <h3 className="title-font">
            Latest Products ({filteredItems.length})
          </h3>

          {loading ? (
            <Spinner animation="border" />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Row>
              {filteredItems.map((product) => (
                <Col key={product._id} md={12}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
