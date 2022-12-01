import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Cardrecipe.module.css";
import icono from "../../images/icohealt02.png";
const Cardrecipe = ({ title, healthScore, image, diets, id }) => {
  return (
    <NavLink className={styles.nav} to={`/food/detail/${id}`}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title_text}>{title}</h2>
          <div className={styles.image_container}>
            <img className={styles.image} src={image} alt={image} />
            <div>
              <img className={styles.health} alt="description" src={icono} />
            </div>
            <div className={styles.text_over_num}>{healthScore} </div>
            <div className={styles.text_over_pts}>pts</div>
            <div className={styles.text_over_txt}>Health Score</div>
          </div>
          <p className={styles.diets}>{diets}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default Cardrecipe;
