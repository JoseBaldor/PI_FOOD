import React, { useEffect } from "react";
import styles from "./Detail.module.css";
import { getRecipesById, setLoading } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import defaultImage from "../../images/notfound.png";
import vinneta from "../../images/viñetadetalle.png";
import Loading from "../Load/Loading";

const Detail = (props) => {
  const { id } = props.match.params;
  const dispatch = useDispatch();
  const idRecipes = useSelector((state) => state.recipeDetail);
  const load = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getRecipesById(id));
    error && dispatch(setLoading(false));
  }, [dispatch, id]);

  return (
    <>
      {load ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <p className={styles.title_text}> {idRecipes.title}</p>
          <div className={styles.img_summary}>
            <div className={styles.image_container}>
              <img
                className={styles.image}
                alt="description"
                src={idRecipes.image ? idRecipes.image : defaultImage}
              />
            </div>
            <div className={styles.summary_container}>
              <p dangerouslySetInnerHTML={{ __html: idRecipes.summary }} />
            </div>
          </div>

          <div className={styles.tips_container}>
            <div className={styles.tips_image_container}>
              <div className={styles.text_tips}>HEALTH SCORE</div>
              <div>
                <img
                  className={styles.vinneta}
                  alt="description"
                  src={vinneta}
                />
              </div>
              <div>{idRecipes.healthScore}</div>
            </div>
            <div className={styles.tips_image_container}>
              <div className={styles.text_tips}>DISH TYPES</div>
              <img className={styles.vinneta} alt="description" src={vinneta} />
              {idRecipes.dishTypes
                ? idRecipes.dishTypes.map((e) => {
                    return (
                      <div>
                        <ul className={styles.ul}>
                          <li key={e}>{e}</li>
                        </ul>
                      </div>
                    );
                  })
                : "There are no Dish Types for this recipe"}
            </div>
            <div className={styles.tips_image_container}>
              <div className={styles.text_tips}>DIET TYPES</div>
              <img className={styles.vinneta} alt="description" src={vinneta} />
              {idRecipes.createInDb
                ? idRecipes.diets.map((e) => {
                    return (
                      <div>
                        <ul className={styles.ul}>
                          <li key={e.name}>{e.name}</li>
                        </ul>
                      </div>
                    );
                  })
                : idRecipes.diets?.map((e) => {
                    return (
                      <div>
                        <ul className={styles.ul}>
                          <li key={e}>{e}</li>
                        </ul>
                      </div>
                    );
                  })}
            </div>
          </div>

          <div className={styles.steps_container}>
            <div className={styles.steps}>
              <div className={styles.text_instructions}>INSTRUCTIONS</div>
              {idRecipes.steps
                ? idRecipes.steps.map((e, index) => {
                    return (
                      <div>
                        <p className={styles.p_step}>Step: {index + 1}</p>
                        <div className={styles.step_text}>
                          <p className={styles.p_text} key={e}>
                            {e}
                          </p>
                        </div>
                      </div>
                    );
                  })
                : "There are no instructions for this recipe"}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
