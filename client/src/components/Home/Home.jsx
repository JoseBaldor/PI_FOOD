import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; //useSelector me ayuda a acceder a mi estado global. useDispatch me ayuda a ejecutar una accion
import { getRecipes, setLoading } from "../../redux/actions";
import Cardrecipe from "../Card/Cardrecipe";
import styles from "./Home.module.css";
import defaultImage from "../../images/notfound.png";
import Pagination from "../Pagination/Pagination";
import Filters from "../Filters/Filters";
import Loading from "../Load/Loading";
import Error from "../Error/Error";

const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.filterRecipes);
  const load = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  /*******Aqui se establece el páginado*******/
  //se establece el estado local para la pagina actual
  const [curretPage, setCurrentPage] = useState(1);
  //se establece la variable que mantiene el numero de paginas
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const [order, setOrder] = useState(""); //para guardar los ordenamientos

  //obtenemos el indice de la ultima receta
  const indexOfLastRecipe = curretPage * recipesPerPage;
  //obtenemos el indice de la primer receta
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  //aplicamos un slice para solo traerme el numero de recetas
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //useeffect se ajecuta siempre que hay un cambio en el estado
  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  return (
    <>
      <div>
        <div>
          <Filters setOrder={setOrder} setCurrentPage={setCurrentPage} />
        </div>
        <div>
          <Pagination
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes.length}
            paginado={paginado}
            current={curretPage}
          />
        </div>
        <div className={styles.main}>
          {currentRecipes.map((recipe) => (
            <Cardrecipe
              title={recipe.title}
              healthScore={recipe.healthScore}
              image={recipe.image ? recipe.image : defaultImage}
              diets={
                recipe.createInDb
                  ? recipe.diets.map((e) => e.name).join(" - ")
                  : recipe.diets.join(" - ")
              }
              id={recipe.id}
              key={recipe.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
