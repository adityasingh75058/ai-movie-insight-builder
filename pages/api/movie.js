import axios from "axios";
import OpenAI from "openai";

export default async function handler(req, res) {
  const { imdbID } = req.query;

  if (!imdbID) {
    return res.status(400).json({ error: "IMDb ID is required" });
  }

  try {
    const movieResponse = await axios.get(
      `https://www.omdbapi.com/?i=${imdbID}&apikey=${process.env.OMDB_API_KEY}`
    );

    const movie = movieResponse.data;

    if (movie.Response === "False") {
      return res.status(404).json({ error: "Movie not found" });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

      
    let aiSummary = "";
    let sentiment = "";

    const rating = parseFloat(movie.imdbRating);

    if (rating >= 8) {
      sentiment = "Positive";
      aiSummary =
        "The movie is highly praised by audiences and critics, reflected in its strong IMDb rating and lasting impact.";
    } else if (rating >= 6) {
      sentiment = "Mixed";
      aiSummary =
        "The movie has received mixed reactions, with appreciation for certain aspects while some viewers feel it has limitations.";
    } else {
      sentiment = "Negative";
      aiSummary =
        "The movie has received generally negative audience reactions and may not strongly resonate with viewers.";
    }

    res.status(200).json({
      title: movie.Title,
      poster: movie.Poster,
      cast: movie.Actors,
      year: movie.Year,
      rating: movie.imdbRating,
      plot: movie.Plot,
      aiSummary,
      sentiment
    });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}