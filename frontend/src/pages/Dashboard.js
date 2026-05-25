import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");

  const handleLogout = async () => {
    try {
      await fetch("https://cinesync.onrender.com/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("role");
      navigate("/");
    }
  };

  const navItems = [
    { label: "Movies", path: "/movies" },
    { label: "Wishlist", path: "/wishlist" },
    { label: "Find Users", path: "/users" },
    { label: "Friends", path: "/friends" },
    { label: "Friend Requests", path: "/friend-requests" },
    { label: "Profile", path: "/profile" },
  ];

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={welcomeStyle}>Welcome back, {username}</h2>
        <p style={subtitleStyle}>What would you like to do today?</p>
      </div>

      <div style={gridStyle}>
        {navItems.map((item) => (
          <Link to={item.path} key={item.path} style={cardLinkStyle}>
            <div style={cardStyle}>
              <span style={cardLabelStyle}>{item.label}</span>
            </div>
          </Link>
        ))}
      </div>

      <button onClick={handleLogout} style={logoutStyle}>Logout</button>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  backgroundColor: "#0d0d0d",
  padding: "40px 32px",
};

const headerStyle = {
  marginBottom: "36px",
};

const welcomeStyle = {
  color: "#ffffff",
  fontSize: "1.8rem",
  fontWeight: "bold",
  marginBottom: "6px",
};

const subtitleStyle = {
  color: "#888",
  fontSize: "0.95rem",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
  gap: "16px",
  maxWidth: "800px",
};

const cardLinkStyle = {
  textDecoration: "none",
};

const cardStyle = {
  backgroundColor: "#1a1a1a",
  border: "1px solid #2a2a2a",
  borderRadius: "10px",
  padding: "28px 16px",
  textAlign: "center",
  cursor: "pointer",
};

const cardLabelStyle = {
  color: "#ffffff",
  fontSize: "0.95rem",
  fontWeight: "500",
};

const logoutStyle = {
  marginTop: "40px",
  padding: "10px 24px",
  backgroundColor: "transparent",
  border: "1px solid #444",
  borderRadius: "8px",
  color: "#888",
  fontSize: "0.9rem",
  cursor: "pointer",
};

export default Dashboard;