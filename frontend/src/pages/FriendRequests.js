import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function FriendRequests() {
  const token = sessionStorage.getItem("token");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequests = useCallback(async () => {
    try {
      const res = await axios.get("https://cinesync-backend-ylss.onrender.com/api/friends/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data || []);
    } catch (err) {
      setError("Failed to fetch friend requests.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchRequests();
  }, [token, fetchRequests]);

  const handleRequest = async (fromId, action) => {
    try {
      await axios.put(
        `https://cinesync-backend-ylss.onrender.com/api/friends/${action}-request/${fromId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRequests();
    } catch (err) {
      alert(`Could not ${action} the request. Please try again.`);
    }
  };

  if (loading) return <p style={{ textAlign: "center", color: "#888", marginTop: "60px" }}>Loading requests...</p>;
  if (error) return <p style={{ textAlign: "center", color: "#ff4d4d", marginTop: "60px" }}>{error}</p>;

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Friend Requests</h2>

      {requests.length > 0 ? (
        <div style={listStyle}>
          {requests.map((req) => (
            <div key={req.from._id} style={requestRowStyle}>
              <div>
                <p style={usernameStyle}>{req.from.username}</p>
                <p style={emailStyle}>{req.from.email}</p>
              </div>
              <div style={btnRowStyle}>
                <button onClick={() => handleRequest(req.from._id, "accept")} style={acceptBtnStyle}>Accept</button>
                <button onClick={() => handleRequest(req.from._id, "reject")} style={rejectBtnStyle}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={emptyStyle}>
          <p style={{ color: "#888" }}>No pending friend requests.</p>
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

const listStyle = {
  maxWidth: "600px",
};

const requestRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 20px",
  backgroundColor: "#1a1a1a",
  border: "1px solid #2a2a2a",
  borderRadius: "10px",
  marginBottom: "12px",
};

const usernameStyle = {
  color: "#ffffff",
  fontSize: "0.95rem",
  fontWeight: "500",
  marginBottom: "2px",
};

const emailStyle = {
  color: "#666",
  fontSize: "0.8rem",
};

const btnRowStyle = {
  display: "flex",
  gap: "10px",
};

const acceptBtnStyle = {
  padding: "8px 16px",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "0.875rem",
};

const rejectBtnStyle = {
  padding: "8px 16px",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "0.875rem",
};

const emptyStyle = {
  textAlign: "center",
  marginTop: "80px",
};