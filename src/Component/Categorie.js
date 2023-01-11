import { useState,useEffect } from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"
import MovieCategory from "./MovieCategory"
import NowTheater from "./NowTheater"

const Categorie = () => {

    const [genre,setGenre] = useState([])

    const API_KEY = process.env.REACT_APP_API_KEY

  const fetchData = async () =>{
    try {
      const callData = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      setGenre(callData.data.genres)
      
    }
    catch(err) {console.log(ErrorEvent)}
  } 

  useEffect(() => {fetchData()},[])

  console.log(genre)
    return(
        <div>
        <p>Actuellement au cinéma</p>
        <NowTheater/>
        <ul>
        {genre.map((e)=>
        <>
        <li className="categoryTitle" key={e.id}>{e.name}</li>
        <div>
        <MovieCategory name={e.id}/>
        </div>
        </>
        )}
        </ul>
        </div>
    )
}

export default Categorie