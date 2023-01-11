import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";

const MovieDetails = () => {
  const { id } = useParams();

  const [details, setDetails] = useState([]);
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayVideo, setDisplayVideo] = useState(false);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const fetchData = async () => {
    try {
      const callData = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      );
      setDetails(callData.data);

      setLoading(true);
    } catch (err) {
      console.log(ErrorEvent);
    }
  };
  const fetchDataVideo = async () => {
    try {
      const callData = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
      );
      setVideo(callData.data.results);
    } catch (err) {
      console.log(ErrorEvent);
    }
  };

  const removeContact = () => {
    setVideo((current) =>
      current.filter(
        (el) => el.type.includes("Trailer") || el.type.includes("Teaser")
      )
    );
    setVideo(video.sort((a, b) => b.type.localeCompare(a.type)));
    setDisplayVideo(true);
  };

  useEffect(() => {
    fetchData();
    fetchDataVideo();
  }, []);


  return (
    <>
      {loading && (
        <div className="cardDetails">
          <h1>{details.title}</h1>
          <img
            className="moviePicture"
            src={`https://image.tmdb.org/t/p/original/${details.backdrop_path}`}
            width={"400px"}
            alt="film"
          />
          <p>Synopsis :</p>
          <p>{details.overview}</p>
          <Link to={`/${details.title}/${details.id}`}>Similar Movies</Link>
          <div className="video">
            <button onClick={() => removeContact()}>Voir Trailer</button>
            {displayVideo && (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${video[0].key}`}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
