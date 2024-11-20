import React, { useState } from "react";
import HousingProcessingMenu from "../../../menu/HousingProcessingMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { HousingProcessingStep1 } from "../../../menu/HousingProcessingSteps";
import {
  Step1_6Items,
  Toggle,
} from "../../../../../includes/createHousingProcessing/step1/Step1_6Items";
import "./step1.css";

export default function HousingProcessingStep1_6() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const categoryId = state ? state.categoryId : null;
  const selectedOption = state ? state.selectedOption : null;
  const housingTitle = state ? state.housingTitle : null;
  const address = state ? state.address : null;
  const country = state ? state.country : null;
  const town = state ? state.town : null;
  const municipality = state ? state.municipality : null;
  const postalCode = state ? state.postalCode : null;
  const housingNo = state ? state.housingNo : null;
  const mapLong = state ? state.mapLong : null;
  const mapLat = state ? state.mapLat : null;
  const housingStatus = state ? state.housingStatus : null;
  const directOwner = state ? state.directOwner : null;
  const specialRequest = state ? state.specialRequest : null;

  let [nbPeople, setNbPeople] = useState(1);
  let [nbBath, setNbBath] = useState(0);
  let [nbRoom, setNbRoom] = useState(1);
  let [nbBed, setNbBed] = useState(0);
  const [allowChild, setAllowChild] = useState(false);
  const [furniture, setFurniture] = useState(false);

  const peapleDecrementHandler = () => {
    if (nbPeople > 1) {
      setNbPeople(nbPeople - 1);
    }
  };

  const peapleIncrementHandler = () => {
    setNbPeople(nbPeople + 1);
  };

  const bathDecrementHandler = () => {
    if (nbBath >= 1) {
      setNbBath(nbBath - 1);
    }
  };

  const bathIncrementHandler = () => {
    setNbBath(nbBath + 1);
  };

  const roomDecrementHandler = () => {
    if (nbRoom > 1) {
      setNbRoom(nbRoom - 1);
    }
  };

  const roomIncrementHandler = () => {
    setNbRoom(nbRoom + 1);
  };

  const bedDecrementHandler = () => {
    if (nbBed >= 1) {
      setNbBed(nbBed - 1);
    }
  };

  const bedIncrementHandler = () => {
    setNbBed(nbBed + 1);
  };

  const childToggleSwitch = () => {
    setAllowChild(!allowChild);
  };

  const furnitureToggleSwitch = () => {
    setFurniture(!furniture);
  };

  const navigateHandler = (e) => {
    e.preventDefault();

    navigate("/processing/create-housing/step2-start", {
      state: {
        categoryId: categoryId,
        housingTitle: housingTitle,
        address: address,
        country: country,
        town: town,
        municipality: municipality,
        postalCode: postalCode,
        housingNo: housingNo,
        mapLong: mapLong,
        mapLat: mapLat,
        selectedOption: selectedOption,
        housingStatus: housingStatus,
        directOwner: directOwner,
        specialRequest: specialRequest,
        nbPeople: nbPeople,
        nbBath: nbBath,
        nbRoom: nbRoom,
        nbBed: nbBed,
        allowChild: allowChild ? true : false,
        furniture: furniture ? true : false,
      },
    });
  };
  return (
    <div>
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

      <div className="housing-infos-plus">
        <div>
          <h2>Donnez nous des informations principales sur votre logement.</h2>

          <Step1_6Items
            text={"Nombre de personnes"}
            count={nbPeople}
            onDecrementClick={peapleDecrementHandler}
            onIncrementClick={peapleIncrementHandler}
            className={"count-btn"}
          />
          <br />
          <Step1_6Items
            text={"Nombre de salles de bain"}
            count={nbBath}
            onDecrementClick={bathDecrementHandler}
            onIncrementClick={bathIncrementHandler}
            className={"count-btn"}
          />
          <br />
          <Step1_6Items
            text={"Nombre de chambres"}
            count={nbRoom}
            onDecrementClick={roomDecrementHandler}
            onIncrementClick={roomIncrementHandler}
            className={"count-btn"}
          />
          <br />
          <Step1_6Items
            text={"Nombre de lits"}
            count={nbBed}
            onDecrementClick={bedDecrementHandler}
            onIncrementClick={bedIncrementHandler}
            className={"count-btn"}
          />
          <br />
          <Toggle
            text={"Enfants autorisés"}
            checked={allowChild}
            onChange={childToggleSwitch}
          />
          <br />
          <Toggle
            text={"Le logement n'est pas meublé"}
            checked={furniture}
            onChange={furnitureToggleSwitch}
          />
        </div>
      </div>
    </div>
  );
}
