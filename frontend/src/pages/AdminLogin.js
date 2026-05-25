import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("https://cinesync.onrender.com/api/auth/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Admin login failed");
        return;
      }
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("username", data.username);
      sessionStorage.setItem("role", data.role);
      onLoginSuccess(data.role);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/admin/dashboard"), 1500);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={logoStyle}>CineSync</h1>
        <p style={subtitleStyle}>Admin Access</p>

        <form onSubmit={handleAdminLogin}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Admin email"
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Admin password"
              style={inputStyle}
            />
          </div>

          {error && <p style={errorStyle}>{error}</p>}
          {success && <p style={successStyle}>{success}</p>}

          <button type="submit" style={btnStyle}>Login as Admin</button>
        </form>

        <p style={footerStyle}>
          <Link to="/" style={linkStyle}>Back to Home</Link>
        </p>
      </div>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  backgroundColor: "#0d0d0d",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const cardStyle = {
  backgroundColor: "#1a1a1a",
  padding: "40px",
  borderRadius: "12px",
  width: "100%",
  maxWidth: "400px",
  border: "1px solid #2a2a2a",
};

const logoStyle = {
  color: "#ffffff",
  fontSize: "1.8rem",
  fontWeight: "bold",
  marginBottom: "6px",
  textAlign: "center",
};

const subtitleStyle = {
  color: "#dc3545",
  fontSize: "0.875rem",
  textAlign: "center",
  marginBottom: "28px",
  textTransform: "uppercase",
  letterSpacing: "1px",
};

const fieldStyle = {
  marginBottom: "18px",
};

const labelStyle = {
  display: "block",
  color: "#cccccc",
  fontSize: "0.9rem",
  marginBottom: "6px",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  backgroundColor: "#0d0d0d",
  border: "1px solid #333",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "0.95rem",
  boxSizing: "border-box",
};

const btnStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "1rem",
  cursor: "pointer",
  marginTop: "8px",
};

const errorStyle = {
  color: "#ff4d4d",
  fontSize: "0.875rem",
  marginBottom: "10px",
};

const successStyle = {
  color: "#4caf50",
  fontSize: "0.875rem",
  marginBottom: "10px",
};

const footerStyle = {
  textAlign: "center",
  marginTop: "20px",
};

const linkStyle = {
  color: "#888",
  fontSize: "0.875rem",
  textDecoration: "none",
};