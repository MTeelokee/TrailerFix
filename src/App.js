import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Categorie from "./Component/Categorie";
import MovieDetails from "./Component/MovieDetails";
import SimilarMovies from "./Component/SimilarMovies";
import ResultsSearch from "./Component/ResultsSearch";
import Acceuil from ".//Component/Acceuil"
import { UserController } from "./Context/UserContext";
const App = () => {
  const [genre, setGenre] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const fetchData = async () => {
    try {
      const callData = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`
      );
      setGenre(callData.data.results);
    } catch (err) {
      console.log(ErrorEvent);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  // console.log(genre)
  return (
    <div className="App">
      <UserController>
      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path="/movie" element={<Categorie />} />
        <Route path="/:id" element={<MovieDetails />} />
        <Route path="/search/:query" element={<ResultsSearch />} />
        <Route path="/:title/:id" element={<SimilarMovies />} />
      </Routes>
      </UserController>
    </div>
  );
};
export default App;