import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../Asset/logo.png"

const NavBar = () => {
  const navigate = useNavigate();

  const search = (e) => {
    e.preventDefault();
    e.target.value.length > 0
      ? navigate(`/search/${e.target.value}`)
      : navigate("/");
  };

  const clear = () => {
    const query= document.querySelector(".form__field")
    query.value = ""
  }

  return (
    <div className="navBar">
    <div>
        <img src={Logo} width={"150px"} style={{marginTop : "10px"}} alt="logo"/>
      </div>
      <div className="link">
        <NavLink  activeClassName="active" to="/" onClick={()=> clear()} style={{textDecoration : "none" , color:"white"}}>Acceuil</NavLink>
        -
        <NavLink  activeClassName="active" to="/series" onClick={()=> clear()} style={{textDecoration : "none", color:"white"}} >Films</NavLink>
        -
        <NavLink  activeClassName="active" to="/series" onClick={()=> clear()} style={{textDecoration : "none", color:"white"}} >Séries</NavLink>
      </div>
      
      <div className="form__group field">
        <input
          placeholder="Search films"
          className="form__field"
          type="input"
          onChange={(e) => search(e)}
        />
        <label className="form__label">Search films</label>
      </div>
    </div>
  );
};

export default NavBar;
