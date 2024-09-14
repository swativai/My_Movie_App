import React from "react";
import { useParams } from "react-router-dom";

const SingleMovie = () => {
  const { id } = useParams();

  return (
    <div>
      <h3>Single page movie {id}</h3>
    </div>
  );
};

export default SingleMovie;
