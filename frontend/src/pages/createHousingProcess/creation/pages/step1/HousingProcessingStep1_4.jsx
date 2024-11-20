import React, { useState } from "react";
import HousingProcessingMenu from "../../../menu/HousingProcessingMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { HousingProcessingStep1 } from "../../../menu/HousingProcessingSteps";
import MapComponent from "../../../../../includes/createHousingProcessing/step1/MapComponent";
import { toast, ToastContainer } from "react-toastify";
import { Input } from "../../../../../components/input/Input";

export default function HousingProcessingStep1_4() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const categoryId = state ? state.categoryId : null;
  const housingTitle = state ? state.housingTitle : null;
  const selectedOption = state ? state.selectedOption : null;
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [town, setTown] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [housingNo, setHousingNo] = useState("");
  const [mapLat, setMapLat] = useState(0.0);
  const [mapLong, setMapLong] = useState(0.0);

  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationClick = (latlng) => {
    setSelectedLocation(latlng);

    setMapLat(latlng.lat);
    setMapLong(latlng.lng);
  };

  const navigateHandler = (e) => {
    e.preventDefault();

    if (!address) {
      toast.error("Veullez renseigner l'address");
      return;
    } else if (!country) {
      toast.error("Veullez renseigner le pays");
      return;
    } else if (!town) {
      toast.error("Veullez renseigner la ville");
      return;
    } else if (!municipality) {
      toast.error("Veullez renseigner la commune");
      return;
    } else if (!postalCode) {
      toast.error("Veullez renseigner le code postale valide !");
      return;
    } else if (!housingNo) {
      toast.error("Veullez renseigner le numéro de la maison");
      return;
    } else if (!mapLat || !mapLong) {
      toast.error("Veullez choisir un emplacement sur la carte !");
      return;
    }
    navigate("/processing/create-housing/step1-5", {
      state: {
        categoryId: categoryId,
        housingTitle: housingTitle,
        address: address,
        country: country,
        town: town,
        municipality: municipality,
        postalCode: postalCode,
        housingNo: housingNo,
        mapLat: mapLat,
        mapLong: mapLong,
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

      <div className="create-housing-address-session">
        <h1>Dites-nous, où se trouve votre logement ?</h1>

        <p>
          Ce ci sera uniquement visible par les clients que vous aurez approuvés
        </p>

        <div className="full-adress-container">
          <Input
            value={address}
            type={"text"}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={"Adresse"}
            reference={"address"}
            label={"Adresse"}
            className={"form-input"}
          />
          <br />
          <br />
          <Input
            value={country}
            type={"text"}
            onChange={(e) => setCountry(e.target.value)}
            placeholder={"Pays/Région"}
            reference={"country"}
            label={"Pays/région"}
            className={"form-input"}
          />
          <br />
          <br />
          <Input
            value={town}
            type={"text"}
            onChange={(e) => setTown(e.target.value)}
            placeholder={"Ville"}
            reference={"city"}
            label={"Ville / Citée"}
            className={"form-input"}
          />
          <br />
          <br />
          <Input
            value={municipality}
            type={"text"}
            onChange={(e) => setMunicipality(e.target.value)}
            placeholder={"Commune"}
            reference={"municipality"}
            label={"Commune"}
            className={"form-input"}
          />
          <br />
          <br />
          <Input
            value={postalCode}
            type={"number"}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder={"Code postale"}
            reference={"postalCode"}
            label={"Code postale"}
            className={"form-input"}
          />
          <br />
          <br />
          <Input
            value={housingNo}
            type={"number"}
            onChange={(e) => setHousingNo(e.target.value)}
            placeholder={"numero de la maison"}
            reference={"no"}
            label={"Numero de la maison"}
            className={"form-input"}
          />
        </div>
        <br />
        <div className="App">
          <h2>Précisez exactement l’emplacement de votre logement.</h2>

          <MapComponent
            location={selectedLocation}
            onClick={handleLocationClick}
          />
        </div>
        <br />
      </div>
    </div>
  );
}
