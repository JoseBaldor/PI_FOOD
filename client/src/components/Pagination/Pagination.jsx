import React from "react";
import icoRight from "../../images/left.png";
import icoLeft from "../../images/rigth.png";
import "./Pagination.css";

const Pagination = ({ recipesPerPage, allRecipes, paginado, current }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClickPreview = () => {
    if (current > 1) {
      paginado(current - 1);
    } else {
      alert("there are no more pages");
    }
  };

  const handleClickNext = () => {
    if (current < pageNumbers.length) {
      paginado(current + 1);
    } else {
      alert("there are no more pages");
    }
  };
  return (
    <div className="container__paginado">
      <button className="button__paginado" onClick={handleClickPreview}>
        <img className="arrow" src={icoRight} />
      </button>
      {pageNumbers &&
        pageNumbers.map((number, i) => (
          <button
            className={`button__paginado ${
              number === current ? "b__active" : "button__paginado"
            }`}
            key={i}
            onClick={() => paginado(number)}
          >
            {number}
          </button>
        ))}
      <button className="button__paginado" onClick={handleClickNext}>
        <img className="arrow" src={icoLeft} />
      </button>
    </div>
  );
};

export default Pagination;
