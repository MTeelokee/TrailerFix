import { useState, useEffect } from "react";
import axios from "axios";
import MovieCategory from "./MovieCategory";
import NowTheater from "./NowTheater";
import NavBar from "./Navbar";
const Categorie = () => {
  const [genre, setGenre] = useState([]);

  const API_KEY = process.env.REACT_APP_API_KEY;

  const fetchData = async () => {
    try {
      const callData = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
      );
      setGenre(callData.data.genres);
    } catch (err) {
      console.log(ErrorEvent);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
   <>
      <NavBar />
      <div className="displayAll">
        <h3 className="categoryTitleInTheather">Actuellement au cinéma</h3>
        <NowTheater />
        <ul>
          {genre.map((e) => (
            <div key={e.id}>
              <h3 className="categoryTitle">{e.name}</h3>
              <div>
                <MovieCategory name={e.id} />
              </div>
            </div>
          ))}
        </ul>
      </div>
      </>
    );

};

export default Categorie;
