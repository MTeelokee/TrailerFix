import { NavLink } from "react-router-dom"
import Logo from "../Asset/Mon projet-1.png"



const NavBar = () => {
return(
    <div className="navBar">
    <div className="link">
        <NavLink to="/">Acceuil</NavLink>
        <NavLink to="/series">Séries</NavLink>
        </div>
        <div class="form__group field">
    <input required="" placeholder="Name" className="form__field" type="input"/>
    <label className="form__label" for="name">Name</label>
</div>
    </div>
)

}

export default NavBar