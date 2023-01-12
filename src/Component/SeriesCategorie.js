import { useState, useEffect } from "react";
import axios from "axios";
import OnTheAir from "./OnTheAir";
import SerieListCategorie from "./SerieListCategorie";
const Categorie = () => {
  const [genre, setGenre] = useState([]);

  const API_KEY = process.env.REACT_APP_API_KEY;

  const fetchData = async () => {
    try {
      const callData = await axios.get(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`
      );
      setGenre(callData.data.genres);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="displayAll">
        <h3 className="categoryTitleInTheather">Séries populaire</h3>
        <OnTheAir />
        <ul>
          {genre.map((e) => (
            <div key={e.id}>
              <h3 className="categoryTitle">{e.name}</h3>
              <div>
                <SerieListCategorie name={e.id} />
              </div>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Categorie;
