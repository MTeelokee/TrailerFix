import { useNavigate } from "react-router-dom";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
import MevinePicture from "../Asset/Mevine.jpg"
import ElyesPicture from "../Asset/Elyes.jpg"

const Acceuil = () => {
    const [user,setUser] = useContext(UserContext)
    const navigate=useNavigate()

    const Mevine = () => {
        setUser((prevState) => ({
            ...prevState,
            name: "Mevine",
            img: 1,
          }));
          navigate("/home/movie") 
    }

    const Elyes = () => {
        setUser((prevState) => ({
            ...prevState,
            name: "Elyes",
            img: 2,
          }));
          navigate("/home/movie") 
    }

    return(
        <div className="Accueil">
        <h1>Qui est ce ?</h1>
        <div className="iconId">
            <div >
            <img src={MevinePicture} width={"100px"} alt="iconId" onClick={() => Mevine()} />
            <p>Mevine</p>
            </div>
            <div>
            <img src={ElyesPicture} width={"100px"} alt="iconId" onClick={() => Elyes()}/>
            <p>Elyes</p>
            </div>

        </div>
        </div>
    )
}

export default Acceuil;
