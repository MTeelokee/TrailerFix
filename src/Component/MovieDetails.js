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

console.log(details)
  return (
    <>
      {loading && (
        <div className="cardDetails">
        <div className="filmdetail">
          
          <div>
          <h1>{details.title}</h1>
          <img
            className="moviePicture"
            src={`https://image.tmdb.org/t/p/original/${details.backdrop_path}`}
            width={"400px"}
            alt="film"
          />
          </div>
          
          <div className="credit">
          <p>Average : {details.vote_average.toFixed(2)}</p>
          <p>Year : {details.release_date.substr(0,4)}</p>
          </div>
          <p><span>Synopsis :</span> {details.overview}</p>
          
          <div className="more">
          <Link to={`/${details.title}/${details.id}`} style={{textDecoration : "none" , color:"#E50914"}}>Similar Movies</Link>
          <div className="video">
            <button onClick={() => removeContact()} style={{backgroundColor : "#E50914" , color:"white"}}>Voir Trailer</button>
            </div>
            </div>
            </div>
           <div>
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
