import React, { useState } from "react";
import HousingProcessingMenu from "../../../menu/HousingProcessingMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { HousingProcessingStep1 } from "../../../menu/HousingProcessingSteps";
import { toast, ToastContainer } from "react-toastify";
import "./Step1.css";

export default function HousingProcessingStep1_2() {
  const location = useLocation();
  const { state } = location;
  const categoryId = state ? state.categoryId : null;

  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const navigateHandler = (event) => {
    event.preventDefault();

    if (!selectedOption) {
      toast.error("Veuillez choisir une option !");
      return;
    }
    toast.success(`Option sélectionnée : ${selectedOption}`);
    navigate("/processing/create-housing/step1-3", {
      state: {
        categoryId: categoryId,
        selectedOption: selectedOption,
      },
    });
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

      <div className="housing-type-available">
        <div>
          <h2>Quelle type de logement sera disponible pour vos clients ?</h2>
          <br />
          <br />
          <form onSubmit={navigateHandler}>
            <div>
              <div>
                <input
                  type="radio"
                  id="option1"
                  name="housingOption"
                  value="Le logement en son intégralité"
                  checked={selectedOption === "Le logement en son intégralité"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="option1">Le logement en son intégralité</label>
              </div>
              <br />
              <div>
                <input
                  type="radio"
                  id="option2"
                  name="housingOption"
                  value="Une Chambre"
                  checked={selectedOption === "Une Chambre"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="option2">Une Chambre</label>
              </div>
              <br />
              <div>
                <input
                  type="radio"
                  id="option3"
                  name="housingOption"
                  value="Une chambre en colocation"
                  checked={selectedOption === "Une chambre en colocation"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="option3">Une chambre en colocation</label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
