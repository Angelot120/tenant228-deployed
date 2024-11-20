import React from "react";
import HousingProcessingMenu from "../../menu/HousingProcessingMenu";
import { useNavigate } from "react-router-dom";

export default function CreateHousingStart() {
  const navigate = useNavigate();
  const navigateHandler = (e) => {
    e.preventDefault();
    navigate("/processing/create-housing/step1-1");
  };

  return (
    <div>
      <HousingProcessingMenu
        to={"#"}
        text={"Commancer"}
        onClick={navigateHandler}
      />
      <br />
      <br />
      <br />
      <div className="all-steps-resume">
        <div className="all-steps-resume-left-items">
          <p>
            Publier un logement sur <b className="tenant">Tenant228</b> en
            Seulement
          </p>

          <p>
            <b>3 étapes</b>
          </p>
        </div>

        <div>
          <div className="all-steps-card">
            <h3>Etape 1</h3>
            <p>Parlez nous de votre logement.</p>
          </div>
          <br />
          <div className="all-steps-card">
            <h3>Etape 2</h3>
            <p>Dites-nous ce qui rend votre logement unique.</p>
          </div>
          <br />
          <div className="all-steps-card">
            <h3>Etape 3</h3>
            <p>Publiez votre logement.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
