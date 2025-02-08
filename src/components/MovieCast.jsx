import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
            },
          }
        );
        setCast(response.data.cast);
      } catch (err) {
        setError("Failed to fetch cast information.");
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) return <p>Loading cast...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map((member) => (
          <li key={member.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
              alt={member.name}
              style={{ width: "50px", borderRadius: "50%" }}
            />
            <p>
              {member.name} as {member.character}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
