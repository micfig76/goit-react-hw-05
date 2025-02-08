import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../components/MovieList";

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day",
          {
            headers: {
              Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
            },
          }
        );
        setTrendingMovies(response.data.results);
      } catch (err) {
        setError("Failed to fetch trending movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Trending Today</h1>
      <MovieList movies={trendingMovies} />
    </div>
  );
};

export default HomePage;
