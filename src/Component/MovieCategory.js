import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import iconDroit from "../Asset/icons8-flèche-droite-50.png";
import iconGauche from "../Asset/icons8-flèche-gauche-50.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const MovieCategory = (props) => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState([]);
  const [count, setCount] = useState(2);
  const [slice, setSlice] = useState({ start: "0", end: "6" });
  const API_KEY = process.env.REACT_APP_API_KEY;

  const fetchData = async () => {
    try {
      const callData = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${count}&with_genres=${props.name}&with_watch_monetization_types=flatrate`
      );
      setMovie(callData.data.results);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, [count]);

  const changeSlicePlus = () => {
    parseInt(slice.end) === 18 && setCount(count + 1);
    parseInt(slice.end) + 6 < movie.length
      ? setSlice((prevState) => ({
          ...prevState,
          start: parseInt(slice.start) + 6,
          end: parseInt(slice.end) + 6,
        }))
      : setSlice((prevState) => ({
          ...prevState,
          start: "0",
          end: "6",
        }));
  };

  const changeSliceMoins = () => {
    parseInt(slice.start) === 0 && count > 2 && setCount(count - 1);
    if (parseInt(slice.start) - 6 >= 0) {
      setSlice((prevState) => ({
        ...prevState,
        start: parseInt(slice.start) - 6,
        end: parseInt(slice.end) - 6,
      }));
    } else if (parseInt(slice.start) === 0 && count === 2) {
      return;
    } else {
      setSlice((prevState) => ({
        ...prevState,
        start: "12",
        end: "18",
      }));
    }
  };

  return (
    <div className="moviCategory">
      <img
        className="iconButtonFilm"
        src={iconGauche}
        width={"40px"}
        height={"40px"}
        alt="clickDroit"
        onClick={() => changeSliceMoins()}
      />
      {movie.slice(slice.start, slice.end).map((e, i) => (
        <div className="card" key={i}>
          <LazyLoadImage
            key={i}
            src={`https://image.tmdb.org/t/p/original/${e.poster_path}`}
            width={"200px"}
            alt={`film${i}`}
            effect="blur"
            onClick={() => navigate(`/home/${e.id}`)}
          />
        </div>
      ))}
      <img
        className="iconButtonFilm"
        src={iconDroit}
        width={"40px"}
        height={"40px"}
        alt="clickDroit"
        onClick={() => changeSlicePlus()}
      />
    </div>
  );
};

export default MovieCategory;
