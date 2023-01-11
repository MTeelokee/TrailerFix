import axios from "axios"
import {useState , useEffect} from 'react'


const NowTheater = () => {
    const [movieInTheater,setMovieInTheater] = useState([])
    const [count,setCount] = useState(1)
  const API_KEY = process.env.REACT_APP_API_KEY

  const fetchData = async () =>{
    try {
      const callData = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${count}`)
      setMovieInTheater(callData.data.results)
      
    }
    catch(err) {console.log(ErrorEvent)}
  } 
  useEffect(() => {fetchData()},[count])
console.log()
    return(
        <div className="moviCategory">
        <button onClick={() => count> 1 && setCount(count - 1)}>-</button>
        {movieInTheater.map((e,i)=> 
          i<6 && e.backdrop_path &&
        <div className="card">
        {/* <p style={{color:"white"}}>{e.original_title}</p> */}
        <img className="moviePicture" key={i} src={`https://image.tmdb.org/t/p/original/${e.poster_path}`} width={"200px"} alt="film"/>
        
        </div>)} 
        <button onClick={() => setCount(count + 1)}>+</button>
        </div>
    )
}

export default NowTheater