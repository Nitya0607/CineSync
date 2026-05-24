import { useState } from "react";
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import FriendRequests from "./pages/FriendRequests";
import Friends from "./pages/Friends";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Wishlist from "./pages/Wishlist";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem("token"));
  const [userRole, setUserRole] = useState(sessionStorage.getItem("role") || null);

  const handleLoginSuccess = (role = "user") => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} userRole={userRole} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={!isLoggedIn ? <Home /> : <Navigate to={userRole === "admin" ? "/admin/dashboard" : "/dashboard"} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />

        <Route path="/dashboard" element={isLoggedIn && userRole === "user" ? <Dashboard handleLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/movies" element={isLoggedIn ? <Movies /> : <Navigate to="/login" />} />
        <Route path="/wishlist" element={isLoggedIn ? <Wishlist /> : <Navigate to="/login" />} />
        <Route path="/friends" element={isLoggedIn ? <Friends /> : <Navigate to="/login" />} />
        <Route path="/friend-requests" element={isLoggedIn ? <FriendRequests /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/users" element={isLoggedIn && userRole === "user" ? <Users token={sessionStorage.getItem("token")} /> : <Navigate to="/login" />} />

        <Route path="/admin/login" element={<AdminLogin onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/admin/dashboard" element={isLoggedIn && userRole === "admin" ? <AdminDashboard handleLogout={handleLogout} /> : <Navigate to="/admin/login" />} />
      </Routes>
    </Router>
  );
}

function Home() {
  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "1.1rem",
    cursor: "pointer",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#007BFF",
    color: "white",
    marginLeft: "12px",
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "32px" }}>
        Welcome to CineSync
      </h1>
      <Link to="/login"><button style={buttonStyle}>Login</button></Link>
      <Link to="/signup"><button style={buttonStyle}>Signup</button></Link>
      <Link to="/admin/login"><button style={{ ...buttonStyle, backgroundColor: "darkred" }}>Admin</button></Link>
    </div>
  );
}

export default App;