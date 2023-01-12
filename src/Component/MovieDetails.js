import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import Play from "../Asset/play.png";
import Rating from "./Rating";

const MovieDetails = () => {
  const { id } = useParams();

  const [details, setDetails] = useState([]);
  const [video, setVideo] = useState([]);
  const [plateforme, setPlateforme] = useState([]);
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

  const fetchDataPlateforme = async () => {
    try {
      const callData = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${API_KEY}`
      );
      setPlateforme(callData.data.results.FR.flatrate);
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
    fetchDataPlateforme();
  }, []);

  console.log(plateforme);

  return (
    <>
      {loading && (
        <div className="cardDetails">
          <div className="filmdetail">
            <div>
              <img
                className="moviePicture"
                src={`https://image.tmdb.org/t/p/original/${details.backdrop_path}`}
                alt="film"
              />
              <h1>{details.title}</h1>
            </div>

            <div className="credit">
              <Rating children={details.vote_average.toFixed(2)} />
              <p className="release">{`Year of release : ${details.release_date.substr(
                0,
                4
              )}`}</p>
            </div>

            <p className="synopsis">
              <span>Synopsis :</span> {details.overview}
            </p>
            <div>
              {plateforme.length > 0 && (
                <div>
                  <p>Available on :</p>
                  {plateforme.map((e, i) => (
                    <img
                      key={i}
                      src={`https://image.tmdb.org/t/p/original/${e.logo_path}`}
                      width={"50px"}
                      style={{ borderRadius: "50px" }}
                      alt="plateformelogo"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="line"></div>
            <div className="more">
              <Link
                to={`/home/${details.title}/${details.id}`}
                className="similarMovie"
              >
                Similar Movies
              </Link>
              <div className="video">
                <button
                  onClick={() => removeContact()}
                  style={{
                    background: "none",
                    color: "inherit",
                    border: "none",
                    padding: "0",
                    font: "inherit",
                    cursor: "pointer",
                    outline: "inherit",
                  }}
                >
                  {" "}
                  <img width={"45px"} src={Play} alt="" />{" "}
                </button>
              </div>
            </div>
          </div>
          <div>
            {displayVideo && (
              <ReactPlayer
                playing={true}
                controls={true}
                width={"854px"}
                height={"480px"}
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
