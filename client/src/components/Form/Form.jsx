import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getDiets } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { validate } from "./validate";
import styles from "./Form.module.css";

const defaultState = {
  title: "",
  summary: "",
  image: "",
  diets: [],
  steps: [],
};

const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const stepsInitial = { auxStep: "" };
  const [auxStep, setStep] = useState([{ ...stepsInitial }]);
  const [error, setError] = useState({});
  const [input, setInput] = useState(defaultState);
  const diets = useSelector((state) => state.diets);

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  useEffect(() => {
    setError(validate(input));
  }, [input]);

  const handlerDiets = (e) => {
    e.preventDefault();
    const { value } = e.target;

    let newArray = input.diets;

    const find = newArray.indexOf(value);
    if (find >= 0) {
      newArray.splice(find, 1);
    } else {
      newArray.push(value);
    }
    setInput({
      ...input,
      diets: newArray,
    });
  };

  const addStep = () => {
    setStep([...auxStep, { ...stepsInitial }]);
  };

  const saveStep = () => {
    const arraySteps = [...auxStep];
    const array = arraySteps.map((step) => step.auxStep);
    setInput({ ...input, steps: array });
  };

  const hanldeStepChange = (e) => {
    const { id, value } = e.target;
    const arraySteps = [...auxStep];
    arraySteps[id][e.target.dataset.name] = value;
    setStep(arraySteps);
  };

  const handleStepOnRemove = (index) => {
    const arraySteps = [...auxStep];
    arraySteps.splice(index, 1);
    setStep(arraySteps);
  };

  function handleChange(e) {
    const { value, name } = e.target;
    setInput({ ...input, [name]: value });
  }

  const handlerOnSubmit = (e) => {
    e.preventDefault();
    if (!Object.keys(error).length) {
      dispatch(postRecipe(input));
      alert("New recipe added successfully!");
      setInput({ defaultState });
      setStep([{ ...stepsInitial }]);
      history.push("/food/home");
    } else {
      alert("Please complete the form");
    }
  };

  return (
    <form className={styles.container}>
      <h1>NEW RECIPE</h1>

      <div className={styles.title}>
        <div className={styles.content_label}>
          <label htmlFor="title" className={styles.text_titles}>
            Recipe Title:
          </label>
        </div>
        <div className={styles.content_input}>
          <input
            className={styles.input_line}
            type="text"
            placeholder="Write Title..."
            id="title"
            value={input.title || ""}
            name="title"
            onChange={(e) => handleChange(e)}
          />
          {error.title && <p className={styles.danger}>{error.title}</p>}
        </div>
      </div>

      <div className={styles.title}>
        <div className={styles.content_label}>
          <label htmlFor="summary" className={styles.text_titles}>
            Summary:
          </label>
        </div>
        <div className={styles.content_input}>
          <textarea
            className={styles.input_area}
            type="text"
            placeholder="Write summary..."
            id="summary"
            value={input.summary || ""}
            name="summary"
            onChange={(e) => handleChange(e)}
          />
          {error.summary && <p className={styles.danger}>{error.summary}</p>}
        </div>
      </div>

      <div className={styles.title}>
        <div className={styles.content_label}>
          <label htmlFor="diets" className={styles.text_titles}>
            Diets Type:
          </label>
        </div>
        <div className={styles.content_input_diet}>
          <select className={styles.selected} onChange={(e) => handlerDiets(e)}>
            {diets.map((res) => (
              <option key={res.id} value={res.name}>
                {res.name}
              </option>
            ))}
          </select>
        </div>
        {error.diets && <p className={styles.danger}>{error.diets}</p>}
        <div className={styles.diets}>
          {input.diets &&
            input.diets.map((element, index) => (
              <div key={index} className={styles.add_diet}>
                <div className={styles.diet_button}>{element}</div>
              </div>
            ))}
        </div>
      </div>

      <div className={styles.healt_image}>
        <div className={styles.content_input_healt}>
          <div className={styles.content_label}>
            <label htmlFor="healthScore" className={styles.text_titles}>
              Health Score:
            </label>
          </div>
          <div className={styles.content_input}>
            <input
              className={styles.input_line_number}
              type="number"
              placeholder="1"
              id="healthScore"
              value={input.healthScore || 1}
              name="healthScore"
              min="1"
              max="100"
              onChange={(e) => handleChange(e)}
            />
            {error.healthScore && (
              <p className={styles.danger}>{error.healthScore}</p>
            )}
          </div>
        </div>

        <div className={styles.content_input}>
          <div className={styles.content_label}>
            <label htmlFor="image" className={styles.text_titles}>
              Image:
            </label>
          </div>
          <div className={styles.content_input}>
            <input
              className={styles.input_line}
              type="text"
              placeholder="url..."
              id="image"
              value={input.image || ""}
              name="image"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
      </div>
      {/* /////////////////////////////////////////////////////////////////// */}
      <div className={styles.title}>
        <label htmlFor="Instructions" className={styles.text_titles}>
          Instructions:
        </label>
        <div className={styles.steps}>
          {auxStep.map((el, i) => (
            <div className={styles.content_input} key={`step-${i}`}>
              <label
                className={styles.text_titles}
                htmlFor={`auxStep-${i}`}
              >{`Step ${i + 1}`}</label>
              <div className={styles.step_remove}>
                <textarea
                  className={styles.input_area_steps}
                  type="text"
                  name={`auxStep-${i}`}
                  id={i}
                  data-name="auxStep"
                  value={el.auxStep}
                  onChange={hanldeStepChange} // Agregamos el metodo a cada input que generamos
                />
                <button
                  type="button"
                  value="remove"
                  onClick={() => handleStepOnRemove(i)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.add_step}>
          <div>
            <input type="button" value="Save Step" onClick={saveStep} />
          </div>
          <div>
            <input type="button" value="Add Step" onClick={addStep} />
          </div>
        </div>
      </div>
      {
        <p className={styles.danger}>
          Save intructions before creating the recipe
        </p>
      }
      <div className={styles.create_recipe}>
        <input type="submit" value="Create Recipe" onClick={handlerOnSubmit} />
      </div>
    </form>
  );
};

export default Form;
