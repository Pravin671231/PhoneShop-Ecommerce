import { Button, Form } from "react-bootstrap";
// import "./Sidebar.css"; // You can create and use this for styling

const Sidebar = ({
  items,
  selectedBrands,
  setSelectedBrands,
  selectedRam,
  setSelectedRam,
  selectedStorage,
  setSelectedStorage,
  minPrice,
  maxPrice,
  priceRange,
  setPriceRange,
}) => {
  const brands = [...new Set(items.map((item) => item.brand))].sort();
  const description = items.map((i) => i.description);
  const rams = [...new Set(description.map((d) => d.ram))].sort(
    (a, b) => a - b
  );
  const storages = [...new Set(description.map((d) => d.storage))].sort(
    (a, b) => a - b
  );

  const handleBrandChange = (e) => {
    const { value, checked } = e.target;
    setSelectedBrands((prev) =>
      checked ? [...prev, value] : prev.filter((brand) => brand !== value)
    );
  };

  const handleResetFilters = () => {
    setSelectedBrands([]);
    setSelectedRam("All");
    setSelectedStorage("All");
    setPriceRange(maxPrice);
  };

  return (
    <div className="sidebar p-3 shadow-sm bg-white rounded">
      <div className="d-flex justify-content-between">
      <Button
        variant="outline-danger"
        className="mb-3 w-100"
        onClick={handleResetFilters}
      >
        Reset
      </Button>
      </div>
      {/* Brand Filter */}
      <div className="mb-4">
        <h6 className="fw-semibold">Brand</h6>
        {brands.map((brand) => (
          <Form.Check
            key={brand}
            type="checkbox"
            label={brand}
            value={brand}
            checked={selectedBrands.includes(brand)}
            onChange={handleBrandChange}
            className="mb-1"
          />
        ))}
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <h6 className="fw-semibold">Price</h6>
        <div className="d-flex justify-content-between mb-1">
          <span>₹{minPrice}</span>
          <span>₹{priceRange}</span>
        </div>
        <Form.Range
          className=""
          min={minPrice}
          max={maxPrice}
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
        />
      </div>

      {/* RAM Selection */}
      <div className="mb-4">
        <h6 className="fw-semibold">RAM</h6>
        <Form.Select
          value={selectedRam}
          onChange={(e) => setSelectedRam(e.target.value)}
        >
          <option value="All">All</option>
          {rams.map((ram) => (
            <option key={ram} value={ram}>
              {ram}
            </option>
          ))}
        </Form.Select>
      </div>

      {/* Storage Selection */}
      <div className="mb-4">
        <h6 className="fw-semibold">Storage</h6>
        <Form.Select
          value={selectedStorage}
          onChange={(e) => setSelectedStorage(e.target.value)}
        >
          <option value="All">All</option>
          {storages.map((storage) => (
            <option key={storage} value={storage}>
              {storage}
            </option>
          ))}
        </Form.Select>
      </div>
    </div>
  );
};

export default Sidebar;
