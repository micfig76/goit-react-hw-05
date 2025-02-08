import React from "react";
import { Outlet, useParams } from "react-router-dom";
import MovieCast from "../components/MovieCast";
import MovieReviews from "../components/MovieReviews";

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  return (
    <div>
      <Outlet />
      <MovieCast />
      <MovieReviews />
    </div>
  );
};

export default MovieDetailsPage;
