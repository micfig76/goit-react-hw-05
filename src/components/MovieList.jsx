import React from "react";
import { Link } from "react-router-dom";

const MovieList = ({ movies }) => {
  return (
    <>
      {movies.map((movie) => (
        <Link key={movie.id} to={`/movies/${movie.id}`}>
          <div className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h2>{movie.title}</h2>
          </div>
        </Link>
      ))}
    </>
  );
};

export default MovieList;
