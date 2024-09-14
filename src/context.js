import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();
const API = `https://www.omdbapi.com/?i=tt3896198&apikey=${process.env.REACT_APP_API_KEY}`;

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [query, setQuery] = useState("ironman");

  const getMovies = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      //   console.log(data.Search);
      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data.Search);
      } else {
        setIsError({
          show: true,
          msg: data.error,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // using Debouncing
    let timeerOut = setTimeout(() => {
      getMovies(`${API}&s=${query}`);
    }, 2000);

    return () => clearTimeout(timeerOut);
    // getMovies(API);
  }, [query]);

  return (
    <AppContext.Provider value={{ isLoading, isError, movie, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
