import React, { useState, useEffect } from "react";
import axios from "axios";
// import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";

const MoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearchSubmit = async (term) => {
    setSearchTerm(term);
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
          },
          params: { query: term },
        }
      );
      setMovies(response.data.results);
    } catch (err) {
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default MoviesPage;
