import { useCallback, useEffect, useState } from "react";

export default function AdminDashboard({ handleLogout }) {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [desc, setDesc] = useState("");
  const token = sessionStorage.getItem("token");

  const fetchMovies = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch("https://cinesync-backend-ylss.onrender.com/api/movies", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMovies(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const addMovie = async () => {
    if (!title || !genre || !desc) return;
    try {
      const res = await fetch("https://cinesync-backend-ylss.onrender.com/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          genre,
          description: desc,
          releaseYear: new Date().getFullYear(),
        }),
      });
      if (res.ok) {
        fetchMovies();
        setTitle("");
        setGenre("");
        setDesc("");
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to add movie");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const res = await fetch(`https://cinesync-backend-ylss.onrender.com/api/movies/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMovies((prev) => prev.filter((m) => m._id !== id));
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to delete movie");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={containerStyle}>

      <div style={headerStyle}>
        <h2 style={headingStyle}>Admin Dashboard</h2>
        <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
      </div>

      <div style={sectionStyle}>
        <h3 style={sectionHeadingStyle}>Add Movie</h3>
        <div style={formStyle}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            style={{ ...inputStyle, flex: 2 }}
          />
          <button onClick={addMovie} style={addBtnStyle}>Add</button>
        </div>
      </div>

      <div style={sectionStyle}>
        <h3 style={sectionHeadingStyle}>All Movies</h3>
        {movies.length > 0 ? (
          <div style={listStyle}>
            {movies.map((m) => (
              <div key={m._id} style={movieRowStyle}>
                <div>
                  <p style={movieTitleStyle}>{m.title}</p>
                  <p style={movieGenreStyle}>{m.genre}</p>
                  <p style={movieDescStyle}>{m.description}</p>
                  <p style={movieByStyle}>Added by: {m.createdBy?.username || "admin"}</p>
                </div>
                <button onClick={() => deleteMovie(m._id)} style={deleteBtnStyle}>Delete</button>
              </div>
            ))}
          </div>
        ) : (
          <p style={emptyStyle}>No movies found. Add one above.</p>
        )}
      </div>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  backgroundColor: "#0d0d0d",
  padding: "40px 32px",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "36px",
};

const headingStyle = {
  color: "#ffffff",
  fontSize: "1.6rem",
  fontWeight: "bold",
};

const logoutBtnStyle = {
  padding: "8px 20px",
  backgroundColor: "transparent",
  border: "1px solid #444",
  borderRadius: "8px",
  color: "#888",
  fontSize: "0.9rem",
  cursor: "pointer",
};

const sectionStyle = {
  marginBottom: "40px",
};

const sectionHeadingStyle = {
  color: "#ffffff",
  fontSize: "1.1rem",
  fontWeight: "bold",
  marginBottom: "16px",
};

const formStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  maxWidth: "900px",
};

const inputStyle = {
  flex: 1,
  padding: "10px 12px",
  backgroundColor: "#1a1a1a",
  border: "1px solid #2a2a2a",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "0.9rem",
  minWidth: "140px",
};

const addBtnStyle = {
  padding: "10px 24px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "0.9rem",
};

const listStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  maxWidth: "900px",
};

const movieRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  padding: "20px",
  backgroundColor: "#1a1a1a",
  border: "1px solid #2a2a2a",
  borderRadius: "10px",
};

const movieTitleStyle = {
  color: "#ffffff",
  fontSize: "1rem",
  fontWeight: "bold",
  marginBottom: "4px",
};

const movieGenreStyle = {
  color: "#007BFF",
  fontSize: "0.8rem",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  marginBottom: "6px",
};

const movieDescStyle = {
  color: "#aaa",
  fontSize: "0.875rem",
  marginBottom: "6px",
};

const movieByStyle = {
  color: "#555",
  fontSize: "0.8rem",
};

const deleteBtnStyle = {
  padding: "8px 16px",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "0.875rem",
  whiteSpace: "nowrap",
};

const emptyStyle = {
  color: "#555",
  fontSize: "0.9rem",
};