import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import iconDroit from "../Asset/icons8-flèche-droite-50.png";
import iconGauche from "../Asset/icons8-flèche-gauche-50.png"

const NowTheater = () => {
  const navigate = useNavigate();
  const [movieInTheater, setMovieInTheater] = useState([]);
  const [count, setCount] = useState(1);
  const [slice, setSlice] = useState({ start: "0", end: "6" });
  const API_KEY = process.env.REACT_APP_API_KEY;

  const fetchData = async () => {
    try {
      const callData = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${count}`
      );
      setMovieInTheater(callData.data.results);
    } catch (err) {
      console.log(ErrorEvent);
    }
  };

  useEffect(() => {
    fetchData();
  }, [count]);

  const changeSlicePlus = () => {
    parseInt(slice.end) === 18 && setCount(count + 1);
    parseInt(slice.end) + 6 < movieInTheater.length
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
    console.log(slice);
    console.log(count);
  return (
    <div className="NowTheater">
      <img className="iconButtonFilm"
        src={iconGauche}
        width={"40px"}
        height={"40px"}
        alt="clickDroit"
        onClick={() => changeSliceMoins()}
      />

      {movieInTheater.slice(slice.start, slice.end).map(
        (e, i) =>
          e.backdrop_path && (
            <div className="card" key={i}>
              <img
                className="moviePicture"
                key={i}
                src={`https://image.tmdb.org/t/p/original/${e.poster_path}`}
                width={"200px"}
                alt="film"
                onClick={() => navigate(`/${e.id}`)}
              />
            </div>
          )
      )}
      {/* <button className="buttonFilm" onClick={() => setCount(count + 1)}></button> */}
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

export default NowTheater;
