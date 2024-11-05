// src/App.js
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import LostItems from "./pages/LostItems";
import LostItemDetail from "./pages/LostItemDetail";
import AddLostItem from "./pages/AddLostItem";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Logout from "./pages/Logout";
import ProfileView from "./pages/ProfileView";
import ProfilePage from "./pages/ProfilePage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import EmailConfirmed from "./pages/EmailConfirmed";
import ItemApproved from "./pages/ItemApproved";
import ApproveItemPage from "./pages/ApproveItemPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <>
      {/* Navbar with higher z-index */}
      <div style={{ position: "relative", zIndex: 50 }}>
        <Navbar isLoggedIn={isLoggedIn} />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Public routes */}
        <Route
          path="/login"
          element={
            <PublicRoute
              element={<Login onLogin={handleLogin} />}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute element={<Register />} isLoggedIn={isLoggedIn} />
          }
        />

        {/* Protected routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute element={<ProfileView />} isLoggedIn={isLoggedIn} />
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute
              element={<ChangePassword />}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path="/add-lost-item"
          element={
            <ProtectedRoute element={<AddLostItem />} isLoggedIn={isLoggedIn} />
          }
        />
        <Route path="/logout" element={<Logout onLogout={handleLogout} />} />

        {/* General Routes */}
        <Route path="/email-confirmed" element={<EmailConfirmed />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/lost-items" element={<LostItems />} />
        <Route path="/lost-item/:id" element={<LostItemDetail />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/item-approved" element={<ItemApproved />} />
        <Route path="/approve-item/:id" component={ApproveItemPage} />
      </Routes>
    </>
  );
}

export default App;
