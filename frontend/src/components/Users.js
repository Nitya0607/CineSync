import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function Users() {
  const token = sessionStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = useCallback(async () => {
    if (!token) {
      setError("Not authorized. Please log in again.");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get("https://cinesync.onrender.com/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const sendRequest = async (id) => {
    try {
      await axios.post(
        `https://cinesync.onrender.com/api/friends/send-request/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Friend request sent!");
    } catch (err) {
      alert(err.response?.data?.message || "Error sending request");
    }
  };

  const filteredUsers = users.filter((u) =>
    u.username?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p style={{ textAlign: "center", color: "#888", marginTop: "60px" }}>Loading users...</p>;
  if (error) return <p style={{ textAlign: "center", color: "#ff4d4d", marginTop: "60px" }}>{error}</p>;

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Find Users</h2>

      <input
        type="text"
        placeholder="Search by username..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={inputStyle}
      />

      {filteredUsers.length > 0 ? (
        <div style={listStyle}>
          {filteredUsers.map((u) => (
            <div key={u._id} style={userRowStyle}>
              <div>
                <p style={usernameStyle}>{u.username}</p>
                <p style={emailStyle}>{u.email}</p>
              </div>
              <button onClick={() => sendRequest(u._id)} style={btnStyle}>
                Add Friend
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={emptyStyle}>
          <p style={{ color: "#888" }}>No users found.</p>
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
  marginBottom: "24px",
};

const inputStyle = {
  width: "100%",
  maxWidth: "400px",
  padding: "10px 14px",
  backgroundColor: "#1a1a1a",
  border: "1px solid #2a2a2a",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "0.95rem",
  marginBottom: "24px",
  boxSizing: "border-box",
};

const listStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  maxWidth: "600px",
};

const userRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 20px",
  backgroundColor: "#1a1a1a",
  border: "1px solid #2a2a2a",
  borderRadius: "10px",
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

const btnStyle = {
  padding: "8px 16px",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "0.875rem",
  whiteSpace: "nowrap",
};

const emptyStyle = {
  textAlign: "center",
  marginTop: "60px",
};