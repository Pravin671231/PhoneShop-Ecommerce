import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user);
  const location = useLocation();
  return userInfo ? (
    children
  ) : (
    <Navigate to={`/login?redirect=${location.pathname}`} replace />
  );
};

export default ProtectRoute;
