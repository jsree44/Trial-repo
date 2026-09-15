
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Inventory from "./pages/admin/Inventory";
import AdminManagement from "./pages/admin/AdminManagement";
import Coupons from "./pages/admin/Coupons";
import Customers from "./pages/admin/Customers";
import Reviews from "./pages/admin/Reviews";
import Referrals from "./pages/admin/Referrals";
import Rentals from "./pages/admin/Rentals"

function Profile() {
  return <h1>Profile Page</h1>;
}


function App() {
  return (
    <BrowserRouter>

      <Sidebar />

      <main className="main-content">

        <Routes>

          <Route
            path="/admin"
            element={<Dashboard />}
          />

          <Route
            path="/admin/products"
            element={<Products />}
          />

          <Route
            path="/admin/orders"
            element={<Orders />}
          />

          <Route
            path="/admin/inventory"
            element={<Inventory />}
          />

          <Route
            path="/admin/customers"
            element={<Customers />}
          />

          <Route
            path="/admin/Profile"
            element={<Profile />}
          />

          <Route
            path="/admin/admin-management"
            element={<AdminManagement />}
          />

          <Route 
            path="/admin/coupons" 
            element={<Coupons />} 
          />
          

          <Route
            path="/admin/reviews"
            element={<Reviews />}
          />

          <Route 
            path="/admin/referrals" 
            element={<Referrals />} 
          />

          <Route 
            path="/admin/rentals" 
            element={<Rentals/>} 
          />

        </Routes>

      </main>

    </BrowserRouter>
  );
}

export default App;

