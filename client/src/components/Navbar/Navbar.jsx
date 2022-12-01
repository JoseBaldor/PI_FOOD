import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import icono from "../../images/iconofoods.png";
import styles from "./Navbar.module.css";
import { getRecipesByTitle, setLoading } from "../../redux/actions";

const Navbar = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const [title, setTitle] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const hanlderSubmit = (element) => {
    element.preventDefault();
    dispatch(getRecipesByTitle(title));
    setTitle(" ");
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <NavLink to="/">
          <img className={styles.img} alt="description" src={icono} />
        </NavLink>
        <div className={styles.search}>
          <input
            className={styles.search__input}
            type="text"
            placeholder="Search for a recipe by name..."
            name="find"
            onChange={(e) => handleInputChange(e)}
            value={title}
          />
          <button
            type="submit"
            className={styles.search__button}
            onClick={(e) => hanlderSubmit(e)}
          >
            <svg
              className={styles.search__icon}
              aria-hidden="true"
              viewBox="0 0 25 25"
            >
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
          </button>
        </div>
        <div>
          <NavLink to="/food/home">
            <button className={styles.button_paginado}>HOME</button>
          </NavLink>
          <NavLink to="/food/recipe">
            <button className={styles.button_paginado}>
              CREATE NEW RECIPE
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
