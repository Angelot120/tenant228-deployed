import React, { useState } from "react";
import HousingProcessingMenu from "../../../menu/HousingProcessingMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { HousingProcessingStep1 } from "../../../menu/HousingProcessingSteps";
import { toast, ToastContainer } from "react-toastify";
import MapComponent from "../../../../../includes/createHousingProcessing/step1/MapComponent";
import { Input } from "../../../../../components/input/Input";

export default function HousingProcessingStep1_3() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const categoryId = state ? state.categoryId : null;
  const selectedOption = state ? state.selectedOption : null;

  const navigateHandler = (e) => {
    e.preventDefault();

    if (!value) {
      toast.error("Veuillez renseigner le titre !");
      return;
    }

    navigate("/processing/create-housing/step1-4", {
      state: {
        categoryId: categoryId,
        housingTitle: value,
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

      <div className="housing-title-container">
        <p>Vous pouvez donner un titre à ce logement</p>
        <br />
        <Input
          value={value}
          type={"text"}
          onChange={(e) => setValue(e.target.value)}
          placeholder={"Le titre ici..."}
          reference={"title"}
          // label={""}
          className={"form-input"}
        />
      </div>
    </div>
  );
}
