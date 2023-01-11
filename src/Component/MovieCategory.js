import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MovieCategory = (props) => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState([]);
  const [count, setCount] = useState(2);
  const API_KEY = process.env.REACT_APP_API_KEY;

  const fetchData = async () => {
    try {
      const callData = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${count}&with_genres=${props.name}&with_watch_monetization_types=flatrate`
      );
      setMovie(callData.data.results);
    } catch (err) {
      console.log(ErrorEvent);
    }
  };
  useEffect(() => {
    fetchData();
  }, [count]);

  return (
    <div className="moviCategory">
      <button onClick={() => count > 1 && setCount(count - 1)}>-</button>
      {movie.map(
        (e, i) =>
          i < 6 && (
            <div className="card" key={i}>
              <img
                key={i}
                src={`https://image.tmdb.org/t/p/original/${e.poster_path}`}
                width={"200px"}
                alt="film"
                onClick={() => navigate(`/${e.id}`)}
              />
            </div>
          )
      )}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};

export default MovieCategory;
