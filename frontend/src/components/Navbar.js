import { Link, useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn, userRole, handleLogout }) {
  const navigate = useNavigate();

  const onLogout = () => {
    sessionStorage.clear();
    handleLogout();
    navigate("/login");
  };

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 32px",
    backgroundColor: "#0d0d0d",
    borderBottom: "1px solid #222",
  };

  const logoStyle = {
    color: "#ffffff",
    fontSize: "1.4rem",
    fontWeight: "bold",
    textDecoration: "none",
    letterSpacing: "1px",
  };

  const linkStyle = {
    color: "#cccccc",
    textDecoration: "none",
    marginLeft: "24px",
    fontSize: "0.95rem",
  };

  const logoutStyle = {
    ...linkStyle,
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>CineSync</Link>
      <div>
        {isLoggedIn && userRole === "user" && (
          <>
            <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
            <Link to="/movies" style={linkStyle}>Movies</Link>
            <Link to="/wishlist" style={linkStyle}>Wishlist</Link>
            <Link to="/friends" style={linkStyle}>Friends</Link>
            <Link to="/profile" style={linkStyle}>Profile</Link>
            <button onClick={onLogout} style={logoutStyle}>Logout</button>
          </>
        )}
        {isLoggedIn && userRole === "admin" && (
          <>
            <Link to="/admin/dashboard" style={linkStyle}>Dashboard</Link>
            <button onClick={onLogout} style={logoutStyle}>Logout</button>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/signup" style={linkStyle}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;