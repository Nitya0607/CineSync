import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function Movies() {
  const token = sessionStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ratingMovie, setRatingMovie] = useState(null);
  const [currentRating, setCurrentRating] = useState(0);
  const [review, setReview] = useState("");

  const fetchMovies = useCallback(async () => {
    try {
      const res = await axios.get("https://cinesync-backend-ylss.onrender.com/api/movies", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMovies(res.data || []);
    } catch (err) {
      setError("Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchMovies();
  }, [token, fetchMovies]);

  const addToWishlist = async (movieId) => {
    try {
      await axios.post(`https://cinesync-backend-ylss.onrender.com/api/wishlist/${movieId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Added to wishlist!");
    } catch (err) {
      alert(err.response?.data?.message || "Error adding to wishlist");
    }
  };

  const submitRating = async (e) => {
    e.preventDefault();
    if (currentRating === 0) {
      alert("Please select a star rating.");
      return;
    }
    try {
      await axios.post(
        `https://cinesync-backend-ylss.onrender.com/api/ratings/${ratingMovie._id}/rate`,
        { rating: currentRating, review },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Rating submitted!");
      setRatingMovie(null);
      setCurrentRating(0);
      setReview("");
      fetchMovies();
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting rating.");
    }
  };

  if (loading) return <p style={{ textAlign: "center", color: "#888", marginTop: "60px" }}>Loading movies...</p>;
  if (error) return <p style={{ textAlign: "center", color: "#ff4d4d", marginTop: "60px" }}>{error}</p>;

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Browse Movies</h2>

      <div style={gridStyle}>
        {movies.map((movie) => (
          <div key={movie._id} style={cardStyle}>
            <h3 style={titleStyle}>{movie.title} <span style={yearStyle}>({movie.releaseYear})</span></h3>
            <p style={genreStyle}>{movie.genre}</p>
            <p style={descStyle}>{movie.description}</p>
            <p style={ratingStyle}>
              {movie.avgRating ? `${movie.avgRating.toFixed(1)} / 5` : "No ratings yet"}
            </p>
            <div style={btnRowStyle}>
              <button onClick={() => addToWishlist(movie._id)} style={btnStyle}>Add to Wishlist</button>
              <button onClick={() => setRatingMovie(movie)} style={{ ...btnStyle, backgroundColor: "#28a745" }}>Rate</button>
            </div>
          </div>
        ))}
      </div>

      {ratingMovie && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h3 style={{ color: "#fff", marginBottom: "16px" }}>Rate: {ratingMovie.title}</h3>
            <form onSubmit={submitRating}>
              <div style={{ marginBottom: "16px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setCurrentRating(star)}
                    style={{ cursor: "pointer", fontSize: "2rem", color: star <= currentRating ? "#ffc107" : "#444" }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                placeholder="Write an optional review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                style={textareaStyle}
              />
              <div style={btnRowStyle}>
                <button type="submit" style={btnStyle}>Submit</button>
                <button type="button" onClick={() => setRatingMovie(null)} style={{ ...btnStyle, backgroundColor: "#444" }}>Cancel</button>
              </div>
            </form>
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
  marginBottom: "4px",
};

const yearStyle = {
  color: "#888",
  fontWeight: "normal",
  fontSize: "0.9rem",
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
  marginBottom: "12px",
  lineHeight: "1.5",
};

const ratingStyle = {
  color: "#ffc107",
  fontSize: "0.875rem",
  marginBottom: "16px",
};

const btnRowStyle = {
  display: "flex",
  gap: "10px",
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
  maxWidth: "480px",
};

const textareaStyle = {
  width: "100%",
  padding: "10px",
  minHeight: "80px",
  marginBottom: "16px",
  backgroundColor: "#0d0d0d",
  border: "1px solid #333",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "0.9rem",
  boxSizing: "border-box",
};