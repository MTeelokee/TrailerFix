import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Categorie from "./Component/Categorie";
import MovieDetails from "./Component/MovieDetails";
import SimilarMovies from "./Component/SimilarMovies";
import ResultsSearch from "./Component/ResultsSearch";
import SeriesCategorie from "./Component/SeriesCategorie";
import Acceuil from ".//Component/Acceuil";
import { UserController } from "./Context/UserContext";
import SerieDetails from "./Component/SerieDetails";
import SimilarSeries from "./Component/SimilarSeries";
import NavBar from "./Component/Navbar";


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
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">

      <UserController>
        <Routes>
          <Route path="/" element={<Acceuil />} />
          <Route path="/home" element={<NavBar />}>
            <Route path="/home/movie" element={<Categorie />} />
            <Route path="/home/series" element={<SeriesCategorie />} />
            <Route path="/home/:id" element={<MovieDetails />} />
            <Route path="/home/series/:id" element={<SerieDetails />} />
            <Route path="/home/search/:query" element={<ResultsSearch />} />
            <Route path="/home/:title/:id" element={<SimilarMovies />} />
            <Route path="/home/series/:title/:id" element={<SimilarSeries />} />
          </Route>
        </Routes>
      </UserController>
    </div>
  );
};
export default App;
