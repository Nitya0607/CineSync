import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function Friends() {
  const token = sessionStorage.getItem("token");
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFriends = useCallback(async () => {
    if (!token) {
      setError("Not authorized. Please log in.");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get("https://cinesync.onrender.com/api/friends", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFriends(res.data || []);
    } catch (err) {
      setError("Failed to fetch friends list.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  const viewWishlist = async (friendId) => {
    try {
      const res = await axios.get(`https://cinesync.onrender.com/api/friends/${friendId}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedFriend(friends.find((f) => f._id === friendId));
      setWishlist(res.data.wishlist || []);
    } catch (err) {
      alert("Could not fetch this friend's wishlist.");
    }
  };

  if (loading) return <p style={{ textAlign: "center", color: "#888", marginTop: "60px" }}>Loading friends...</p>;
  if (error) return <p style={{ textAlign: "center", color: "#ff4d4d", marginTop: "60px" }}>{error}</p>;

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>My Friends</h2>

      {friends.length > 0 ? (
        <div style={listStyle}>
          {friends.map((friend) => (
            <div key={friend._id} style={friendRowStyle}>
              <span style={usernameStyle}>{friend.username}</span>
              <button onClick={() => viewWishlist(friend._id)} style={btnStyle}>
                View Wishlist
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={emptyStyle}>
          <p style={{ color: "#888" }}>You haven't added any friends yet.</p>
        </div>
      )}

      {selectedFriend && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <div style={modalHeaderStyle}>
              <h3 style={modalTitleStyle}>{selectedFriend.username}'s Wishlist</h3>
              <button onClick={() => setSelectedFriend(null)} style={closeBtnStyle}>Close</button>
            </div>

            {wishlist.length > 0 ? (
              wishlist.map((movie) => (
                <div key={movie._id} style={movieCardStyle}>
                  <h4 style={movieTitleStyle}>{movie.title}</h4>
                  <p style={movieDescStyle}>{movie.description}</p>
                </div>
              ))
            ) : (
              <p style={{ color: "#888" }}>{selectedFriend.username}'s wishlist is empty.</p>
            )}
          </div>
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

const friendRowStyle = {
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
};

const btnStyle = {
  padding: "8px 16px",
  backgroundColor: "#007BFF",
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

const overlayStyle = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "#1a1a1a",
  border: "1px solid #2a2a2a",
  padding: "32px",
  borderRadius: "12px",
  width: "90%",
  maxWidth: "500px",
  maxHeight: "80vh",
  overflowY: "auto",
};

const modalHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const modalTitleStyle = {
  color: "#ffffff",
  fontSize: "1.1rem",
  fontWeight: "bold",
};

const closeBtnStyle = {
  padding: "6px 14px",
  backgroundColor: "#333",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "0.875rem",
};

const movieCardStyle = {
  borderBottom: "1px solid #2a2a2a",
  paddingBottom: "14px",
  marginBottom: "14px",
};

const movieTitleStyle = {
  color: "#ffffff",
  fontSize: "1rem",
  marginBottom: "4px",
};

const movieDescStyle = {
  color: "#aaa",
  fontSize: "0.875rem",
};