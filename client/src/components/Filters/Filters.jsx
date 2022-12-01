import React, { useEffect } from "react";
import {
  OrderByTitle,
  filterByDiet,
  filterCreated,
  getDiets,
  filterHealthScore,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Filters.module.css";

const Filters = ({ setOrder, setCurrentPage }) => {
  const dispatch = useDispatch();
  const allDiets = useSelector((state) => state.diets);

  const handleOrderbyTitle = (e) => {
    e.preventDefault();
    dispatch(OrderByTitle(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  };

  function handleOnFilterDiets(e) {
    e.preventDefault();
    dispatch(filterByDiet(e.target.value));
    setCurrentPage(1);
  }

  const handlerfilterCreated = (e) => {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  };

  const handleOrderHealtScore = (e) => {
    e.preventDefault();
    dispatch(filterHealthScore(e.target.value));
    setCurrentPage(1);
  };

  const handleClick = (e) => {
    /*  dispatch(getAllrecipes()); */
    window.location.reload(false);
  };
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className={styles.container_filtros}>
      {/* /***************Ordenar de A-Z********************/}
      <select onChange={(e) => handleOrderbyTitle(e)}>
        <option value="defaults" disabled>
          Select Order...
        </option>
        <option key="asc" value="asc">
          Alphabetical order A-Z
        </option>
        <option key="desc" value="desc">
          Alphabetical order Z-A
        </option>
      </select>
      {/* /***************Filtrar por Dietas********************/}
      <select label="DIETS" onChange={(e) => handleOnFilterDiets(e)}>
        <option value="defaults" disabled>
          Select Diet...
        </option>
        <option key="Todos" value="All">
          All
        </option>
        {allDiets &&
          allDiets.map((diet) => (
            <option key={diet.id} value={diet.name}>
              {diet.name}
            </option>
          ))}
      </select>
      {/****************Filtrar por API o DB********************/}
      <select onChange={(e) => handlerfilterCreated(e)}>
        <option value="defaults" disabled>
          Select Origin...
        </option>
        <option key="All" value="All">
          All
        </option>
        <option key="Api" value="Api">
          Existing API
        </option>
        <option key="Created" value="Created">
          Aggregate DB
        </option>
      </select>
      {/****************Filtrar por HealthScore********************/}
      <select
        onChange={(e) => handleOrderHealtScore(e)}
        name="healthScore"
        id="healthScore"
      >
        <option value="defaults" disabled>
          Select Option...
        </option>
        <option value="asc">Lower</option>
        <option value="desc">Higher</option>
      </select>
      {/****************Reset********************/}
      <button onClick={handleClick}>Reset Filter</button>
    </div>
  );
};

export default Filters;
