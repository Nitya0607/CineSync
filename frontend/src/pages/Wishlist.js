import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function Wishlist() {
  const token = sessionStorage.getItem("token");
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWishlist = useCallback(async () => {
    if (!token) {
      setError("Not authorized. Please log in.");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get("https://cinesync-backend-ylss.onrender.com/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(res.data.wishlist || []);
    } catch (err) {
      setError("Failed to fetch your wishlist.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  if (loading) return <p style={{ textAlign: "center", color: "#888", marginTop: "60px" }}>Loading your wishlist...</p>;
  if (error) return <p style={{ textAlign: "center", color: "#ff4d4d", marginTop: "60px" }}>{error}</p>;

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>My Wishlist</h2>

      {wishlist.length > 0 ? (
        <div style={gridStyle}>
          {wishlist.map((movie) => (
            <div key={movie._id} style={cardStyle}>
              <h3 style={titleStyle}>{movie.title}</h3>
              <p style={genreStyle}>{movie.genre}</p>
              <p style={descStyle}>{movie.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div style={emptyStyle}>
          <p style={{ color: "#888", fontSize: "1rem" }}>Your wishlist is empty.</p>
          <p style={{ color: "#555", fontSize: "0.9rem" }}>Browse movies and add some to your list.</p>
        </div>
      )}
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  backgroundColor: "#0d0d0d",
  padding: "40px 32px",
};

const headingStyle = {
  color: "#ffffff",
  fontSize: "1.6rem",
  fontWeight: "bold",
  marginBottom: "28px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  backgroundColor: "#1a1a1a",
  border: "1px solid #2a2a2a",
  borderRadius: "10px",
  padding: "24px",
};

const titleStyle = {
  color: "#ffffff",
  fontSize: "1.1rem",
  fontWeight: "bold",
  marginBottom: "6px",
};

const genreStyle = {
  color: "#007BFF",
  fontSize: "0.8rem",
  marginBottom: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const descStyle = {
  color: "#aaa",
  fontSize: "0.9rem",
  lineHeight: "1.5",
};

const emptyStyle = {
  textAlign: "center",
  marginTop: "80px",
};