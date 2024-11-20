import React, { useEffect, useState } from "react";
import HousingProcessingMenu from "../../../menu/HousingProcessingMenu";
import { useNavigate } from "react-router-dom";
import { HousingProcessingStep1 } from "../../../menu/HousingProcessingSteps";
import api from "../../../../../api";
import { toast, ToastContainer } from "react-toastify";
import LoadingIndicators from "../../../../../components/Loading/LoadingIndicators";
import CardLoading from "../../../../../components/Loading/CardLoading";

export default function HousingProcessingStep1_1() {
  const [allData, setData] = useState([]);
  const [id, setId] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getHousingCategories();
    setLoading(false);
  }, []);

  const getHousingCategories = () => {
    api
      .get("api/create-housing-categories/")
      .then((res) => res.data)
      .then((data) => {
        setData(data);
        // console.log(data);
      })
      .catch((err) => {
        // console.log(err);
        toast.error("Une erreur est survenue lors du chargement des données !");
      });
  };

  const navigate = useNavigate();
  const navigateHandler = (e) => {
    e.preventDefault();

    if (id != 0)
      navigate("/processing/create-housing/step1-2", {
        state: { categoryId: id },
      });

    toast.error("Veuillez choisir une option !");
  };

  return (
    <div>
      <ToastContainer stacked position="bottom-left" />
      <HousingProcessingMenu
        to={"/"}
        text={"Suivant"}
        onClick={navigateHandler}
      />
      <br />
      <br />
      <br />
      <br />
      <HousingProcessingStep1 />
      <form className="housing-type">
        {loading ? (
          <CardLoading />
        ) : (
          <div>
            <h2>Parmis ces options comment décriez-vous cet logement ?</h2>

            <div className="category-container">
              {allData.map((category, key) => (
                <label
                  htmlFor={`option${key}`}
                  className={`category  ${
                    selectedId === category.id ? "selected" : ""
                  }`}
                  key={key}
                  onClick={() => {
                    setSelectedId(category.id);
                  }}
                >
                  <input
                    type="radio"
                    id={`option${key}`}
                    name="housingCategory"
                    value={category.category_name}
                    onClick={() => setId(category.id)}
                    className="radio-input"
                  />
                  <div className="option-cont">
                    <img
                      src={category.category_img_url}
                      alt={category.category_name}
                      className="category-image"
                    />
                    <span>{category.category_name}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
