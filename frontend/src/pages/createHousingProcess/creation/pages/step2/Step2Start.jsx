import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HousingProcessingMenu from "../../../menu/HousingProcessingMenu";
import { HousingProcessingStep2 } from "../../../menu/HousingProcessingSteps";
import banner from "../../../../../assets/Icons/banner-img.jpg";

export default function Step2Start() {
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
  const nbPeople = state ? state.nbPeople : null;
  const nbBath = state ? state.nbBath : null;
  const nbRoom = state ? state.nbRoom : null;
  const nbBed = state ? state.nbBed : null;
  const allowChild = state ? state.allowChild : null;
  const furniture = state ? state.furniture : null;

  const navigateHandler = (e) => {
    e.preventDefault();

    navigate("/processing/create-housing/step2-1", {
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
        allowChild: allowChild,
        furniture: furniture,
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
      <HousingProcessingStep2 />

      {/* <p>{categoryId}</p>
      <p>{housingTitle}</p>
      <p>{address}</p>
      <p>{country}</p>
      <p>{town}</p>
      <p>{municipality}</p>
      <p>{postalCode}</p>
      <p>{housingNo}</p>
      <p>{mapLong}</p>
      <p>{mapLat}</p>
      <p>{selectedOption}</p>
      <p>Logement en : {housingStatus == 1 ? "location" : "vente"}</p>
      <p>Propriétaire directe : {directOwner ? "oui" : "non"}</p>
      <p>Requette spéciale disponible : {specialRequest ? "oui" : "non"}</p>
      <p>Nombre de personnes : {nbPeople}</p>
      <p>Nombre de salles de bain : {nbBath}</p>
      <p>Nombre de chambres : {nbRoom}</p>
      <p>Nombre de lits : {nbBed}</p>
      <p>Enfants autorisées : {allowChild ? "Oui" : "Non"}</p>
      <p>Logement meublé: {furniture ? "Oui" : "Non"}</p> */}

      <div className="step2-start">
        <div>
          <h2>Etape 2</h2>

          <p>Dites-nous pourquoi votre logement est le meilleur ?</p>
        </div>
        <div>
          <img src={banner} alt="Banner image" />
        </div>
      </div>
    </div>
  );
}
