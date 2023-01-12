import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import iconDroit from "../Asset/icons8-flèche-droite-50.png";
import iconGauche from "../Asset/icons8-flèche-gauche-50.png"

const SimilarMovies = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [similarMovie, setSimilarMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [count, setCount] = useState(1);
  const [slice, setSlice] = useState({ start: "0", end: "6" });
  const fetchData = async () => {
    try {
      const callData = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${API_KEY}&language=en-US&page=${count}`
      );

      setSimilarMovie(callData.data.results);
      setLoading(true);
    } catch (err) {
      console.log(ErrorEvent);
    }
  };

  useEffect(() => {
    fetchData();
  }, [count]);

  const changeSlicePlus = () => {
    parseInt(slice.end) === 18 && setCount(count + 1);
    parseInt(slice.end) + 6 < similarMovie.length
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

  const changeSliceMoins = () =>{
    parseInt(slice.start) === 0 && count> 1 && setCount(count - 1);
  if(parseInt(slice.start) - 6 >= 0){setSlice( (prevState) => ({
    ...prevState, start : parseInt(slice.start)-6, end : parseInt(slice.end) - 6}) )}
    else if (parseInt(slice.start)=== 0 && count===1){return}
     else{setSlice( (prevState) => ({
        ...prevState, start : "12", end : "18"}) )} 
        
    }

  return (
    <div className="moviSearch">
    <img className="iconButtonFilm"
        src={iconGauche}
        width={"40px"}
        height={"40px"}
        alt="clickDroit"
        onClick={() => changeSliceMoins()}
      />
      {loading &&
        similarMovie.slice(slice.start, slice.end).map(
          (e, i) =>
         (
              <div className="card" key={i}>
                <LazyLoadImage
                  src={`https://image.tmdb.org/t/p/original/${e.poster_path}`}
                  width={"200px"}
                  alt="film"
                  effect='blur'
                  onClick={() => navigate(`/home/series/${e.id}`)}
                />
              </div>
            )
        )}
        <img className="iconButtonFilm"
        src={iconDroit}
        width={"40px"}
        height={"40px"}
        alt="clickDroit"
        onClick={() => changeSlicePlus()}
      />
    </div>
  );
};

export default SimilarMovies;
