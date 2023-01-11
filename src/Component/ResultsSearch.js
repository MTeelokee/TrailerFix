import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ResultsSearch = () => {
  const navigate = useNavigate();
  const { query } = useParams();
  const [resultSearch, setResultSearch] = useState([]);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const fetchData = async () => {
    try {
      const callData = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${count}&include_adult=false`
      );
      setResultSearch(callData.data.results);
      setLoading(true);
    } catch (err) {
      console.log(ErrorEvent);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query, count]);

  return (
    <>
      <div className="moviCategory">
        <button onClick={() => count > 1 && setCount(count - 1)}>-</button>
        {count}
        {resultSearch.length > 0 &&
          resultSearch.map(
            (e, i) =>
              i < 6 &&
              e.poster_path && (
                <div className="card" key={i}>
                  <img
                    
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
    </>
  );
};

export default ResultsSearch;
