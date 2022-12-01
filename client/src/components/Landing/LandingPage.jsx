import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/actions";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const dispatch = useDispatch();
  // dispatch(setLoading(true));
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.div_lef}>Hola</div>
        <div>
          <NavLink className={styles.nav} to="/food/home">
            <button className={styles.buton}>BIENVENIDO</button>
          </NavLink>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default LandingPage;
