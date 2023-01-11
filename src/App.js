import './App.css';
import axios from "axios"
import {useState , useEffect} from 'react'
import React from 'react'
import ReactPlayer from 'react-player'
import SearchBar from './Component/SearchBar';

const App = () => {
  const [genre,setGenre] = useState([])
  const API_KEY = process.env.REACT_APP_API_KEY

  const fetchData = async () =>{
    try {
      const callData = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`)
      setGenre(callData.data.results)
      
    }
    catch(err) {console.log(ErrorEvent)}
  } 

  useEffect(() => {fetchData()},[])
  console.log(genre)

  return (
    <div className="App">
    <SearchBar/>
    <ReactPlayer url='https://www.youtube.com/watch?v=LgZ2MDuJvhc'/>
   {genre.map((e,i)=> 

    <div className="card">
    <p style={{color:"white"}}>{e.original_title}</p>
    <img key={i} src={`https://image.tmdb.org/t/p/original/${e.backdrop_path}`} width={"200px"} alt="film"/>
    
    </div>
   

   
   
   )}
    </div>
  );
}

export default App;


