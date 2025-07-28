import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh", textAlign: "center" }}
    >
      <h1 style={{ fontSize: "5rem" }}>404</h1>
      <p className="lead">Oops! The page you're looking for doesn't exist.</p>
      <Button variant="primary" onClick={() => navigate("/")}>
        Go to Homepage
      </Button>
    </div>
  );
};

export default NotFound;
