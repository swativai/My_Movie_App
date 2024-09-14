import React from "react";
import { useGlobalContext } from "./context";
import { NavLink } from "react-router-dom";

const Movies = () => {
  const { movie } = useGlobalContext();
  console.log(movie);

  return (
    <>
      <section className="movie-page">
        {movie?.length > 0 ? (
          <div className="grid grid-4-col">
            {movie.map((curMovie) => {
              const { imdbID, Title, Poster } = curMovie;
              const movieName = Title.substring(0, 15);
              return (
                <NavLink to={`movie/${imdbID}`} key={imdbID}>
                  <div className="card">
                    <div className="card-info">
                      <h2>
                        {movieName.length >= 15 ? `${movieName}...` : movieName}
                      </h2>
                      <img src={Poster} alt={imdbID} />
                    </div>
                  </div>
                </NavLink>
              );
            })}
          </div>
        ) : (
          <div>
            <h3>No Movie Found</h3>
          </div>
        )}
      </section>
    </>
  );
};

export default Movies;
