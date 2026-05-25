import axios from "axios";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("https://cinesync-backend-ylss.onrender.com/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [token]);

  if (!user) return <p style={{ textAlign: "center", color: "#888", marginTop: "60px" }}>Loading profile...</p>;

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={nameStyle}>{user.username || user.name}</h2>
        <p style={emailStyle}>{user.email}</p>
        <span style={roleStyle}>{user.role}</span>
      </div>

      <div style={sectionStyle}>
        <h3 style={sectionHeadingStyle}>Friends</h3>
        {user.friends?.length > 0 ? (
          <div style={listStyle}>
            {user.friends.map((f) => (
              <div key={f._id} style={itemStyle}>
                <span style={itemTextStyle}>{f.username || f.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={emptyTextStyle}>No friends added yet.</p>
        )}
      </div>

      <div style={sectionStyle}>
        <h3 style={sectionHeadingStyle}>Wishlist</h3>
        {user.wishlist?.length > 0 ? (
          <div style={listStyle}>
            {user.wishlist.map((m) => (
              <div key={m._id} style={itemStyle}>
                <span style={itemTextStyle}>{m.title}</span>
                <span style={ratingStyle}>{m.rating ? `${m.rating} / 5` : "Not rated"}</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={emptyTextStyle}>Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  backgroundColor: "#0d0d0d",
  padding: "40px 32px",
  maxWidth: "700px",
};

const cardStyle = {
  backgroundColor: "#1a1a1a",
  border: "1px solid #2a2a2a",
  borderRadius: "12px",
  padding: "32px",
  marginBottom: "28px",
};

const nameStyle = {
  color: "#ffffff",
  fontSize: "1.6rem",
  fontWeight: "bold",
  marginBottom: "6px",
};

const emailStyle = {
  color: "#888",
  fontSize: "0.95rem",
  marginBottom: "12px",
};

const roleStyle = {
  display: "inline-block",
  padding: "4px 12px",
  backgroundColor: "#007BFF22",
  color: "#007BFF",
  borderRadius: "20px",
  fontSize: "0.8rem",
  textTransform: "capitalize",
};

const sectionStyle = {
  marginBottom: "28px",
};

const sectionHeadingStyle = {
  color: "#ffffff",
  fontSize: "1.1rem",
  fontWeight: "bold",
  marginBottom: "14px",
};

const listStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const itemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 18px",
  backgroundColor: "#1a1a1a",
  border: "1px solid #2a2a2a",
  borderRadius: "8px",
};

const itemTextStyle = {
  color: "#cccccc",
  fontSize: "0.95rem",
};

const ratingStyle = {
  color: "#ffc107",
  fontSize: "0.875rem",
};

const emptyTextStyle = {
  color: "#555",
  fontSize: "0.9rem",
};