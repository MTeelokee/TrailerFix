import { useState, useEffect } from "react";
import axios from "axios";
import MovieCategory from "./MovieCategory";
import NowTheater from "./NowTheater";

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
    <div className="displayAll">
      <h3>Actuellement au cinéma</h3>
      <NowTheater />
      <ul>
        {genre.map((e) => (
          <div key={e.id}>
            <li className="categoryTitle">{e.name}</li>
            <div>
              <MovieCategory name={e.id} />
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Categorie;
