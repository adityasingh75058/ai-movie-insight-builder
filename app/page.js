"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [imdbID, setImdbID] = useState("");
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovie = async () => {
    if (!imdbID.startsWith("tt")) {
      setError("IMDb ID must start with 'tt' (Example: tt0133093)");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`/api/movie?imdbID=${imdbID}`);
      setMovie(res.data);
    } catch (err) {
      setError("Movie not found or server error.");
      setMovie(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🎬 AI Movie Insight Builder</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter IMDb ID (e.g. tt0133093)"
          value={imdbID}
          onChange={(e) => setImdbID(e.target.value)}
        />
        <button onClick={fetchMovie}>Analyze</button>
      </div>

      {error && <p className="error">{error}</p>}

      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Analyzing movie...</p>
        </div>
      )}

      {movie && (
        <div className="movie-card">
          <img src={movie.poster} alt="poster" />

          <h2>{movie.title}</h2>
          <p><b>Year:</b> {movie.year}</p>
          <p><b>Rating:</b> {movie.rating}</p>
          <p><b>Cast:</b> {movie.cast}</p>
          <p><b>Plot:</b> {movie.plot}</p>

          <h3>AI Audience Summary</h3>
          <p>{movie.aiSummary}</p>

          <p>
            <b>Sentiment:</b>{" "}
            <span
              className={
                movie.sentiment === "Positive"
                  ? "badge positive"
                  : movie.sentiment === "Negative"
                  ? "badge negative"
                  : "badge mixed"
              }
            >
              {movie.sentiment}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}