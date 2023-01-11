import { NavLink, useNavigate } from "react-router-dom";

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
      <div className="link">
        <NavLink to="/" onClick={()=> clear()}>Acceuil</NavLink>
        <NavLink to="/series">Séries</NavLink>
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
