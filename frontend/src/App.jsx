import { Route, Routes } from "react-router-dom";
import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectRoute from "./components/ProtectRoute";
import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import AdminDashboard from "./pages/AdminDashboard";
import Header from "./components/Header";
import AddressListPage from "./pages/AddressPage";
import AddressEdit from "./components/AddressEdit";
import PaymentPage from "./pages/PaymentPage";
import OrderSuccess from "./components/OrderSuccess ";
import AddressForm from "./components/AddressForm";

function App() {
  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/profile" element={<ProfilePage />} /> */}

          <Route
            path="/profile"
            element={
              <ProtectRoute>
                <ProfilePage />
              </ProtectRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectRoute>
                <CheckoutPage />
              </ProtectRoute>
            }
          />
          <Route
            path="/myorders"
            element={
              <ProtectRoute>
                <MyOrdersPage />
              </ProtectRoute>
            }
          />
          <Route path="/address/add" element={<AddressForm />} />
          <Route path="/address/edit/:id" element={<AddressEdit />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectRoute>
                <AdminDashboard />
              </ProtectRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
