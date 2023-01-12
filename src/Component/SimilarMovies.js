import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import NavBar from "./Navbar";

const SimilarMovies = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  const [similarMovie, setSimilarMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_KEY = process.env.REACT_APP_API_KEY;

  const fetchData = async () => {
    try {
      const callData = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
      );

      setSimilarMovie(callData.data.results);
      setLoading(true);
    } catch (err) {
      console.log(ErrorEvent);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <NavBar/>
      {loading &&
        similarMovie.map(
          (e, i) =>
            i < 6 && (
              <div className="similarMovie">
                <LazyLoadImage
                  key={i}
                  src={`https://image.tmdb.org/t/p/original/${e.poster_path}`}
                  width={"200px"}
                  alt="film"
                  effect='blur'
                  onClick={() => navigate(`/${e.id}`)}
                />
              </div>
            )
        )}
    </>
  );
};

export default SimilarMovies;
