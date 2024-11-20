import React, { useState } from "react";
import HousingProcessingMenu from "../../../menu/HousingProcessingMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { HousingProcessingStep1 } from "../../../menu/HousingProcessingSteps";
import { RadioInput } from "../../../../../components/input/Input";
import { toast, ToastContainer } from "react-toastify";

export default function HousingProcessingStep1_5() {
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

  // const [locationType, setLocationType] = useState("");

  const [selectedValue, setSelectedValue] = useState(null);
  const [ownerStatus, setOwnerStatus] = useState(null);
  const [specialRequest, setSpecialRequest] = useState(null);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const ownerhandleChange = (event) => {
    const { value } = event.target;
    setOwnerStatus(value);
  };

  const requestHandleChange = (event) => {
    const { value } = event.target;
    setSpecialRequest(value);
  };

  const navigateHandler = (event) => {
    event.preventDefault();

    if (!selectedValue) {
      toast.error(
        "Veuillez indiquer si ce logement est vente ou en location !"
      );
      return;
    } else if (!ownerStatus) {
      toast.error("Veuillez indiquer si vous êtes le propiétaire ou pas !");
      return;
    } else if (!specialRequest) {
      toast.error(
        "Veuillez indiquer si vous Acceptez les requettes spéciaux ou pas !"
      );
      return;
    }

    navigate("/processing/create-housing/step1-6", {
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
        housingStatus: selectedValue,
        directOwner: ownerStatus == "oui" ? true : false,
        specialRequest: specialRequest == "oui" ? true : false,
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

      <div className="housing-plan-select">
        <h2>Cet logement est en :</h2>

        <form onSubmit={navigateHandler} className="housing-plan-select-item">
          <div>
            <RadioInput
              type="radio"
              name="option"
              value={1}
              label="Location"
              checked={selectedValue == 1}
              onChange={handleChange}
              id="option1"
            />
            <br />
            <RadioInput
              type="radio"
              name="option"
              value={2}
              label="Vente"
              checked={selectedValue == 2}
              onChange={handleChange}
              id="option2"
            />
            <br />
            <RadioInput
              type="radio"
              name="option"
              value={3}
              label={
                <>
                  Location <br /> {"  "}& Vente
                </>
              }
              checked={selectedValue == 3}
              onChange={handleChange}
              id="option3"
            />
          </div>
        </form>
        <form onSubmit={navigateHandler}>
          <div>
            <p>Êtes-vous le propriétaire direct ?</p>

            <RadioInput
              type="radio"
              name="owner"
              value="oui"
              label="Oui"
              checked={ownerStatus === "oui"}
              onChange={ownerhandleChange}
              id="yes"
            />
            <br />
            <RadioInput
              type="radio"
              name="owner"
              value="non"
              label="Non"
              checked={ownerStatus === "non"}
              onChange={ownerhandleChange}
              id="no"
            />
          </div>
        </form>
        <form onSubmit={navigateHandler}>
          <div>
            <p>
              Est ce que vos clients peuvent vous somettre des requettes
              spéciaux ?
            </p>

            <RadioInput
              type="radio"
              name="request"
              value="oui"
              label="Oui"
              checked={specialRequest === "oui"}
              onChange={requestHandleChange}
              id="yess"
            />
            <br />
            <RadioInput
              type="radio"
              name="request"
              value="non"
              label="Non"
              checked={specialRequest === "non"}
              onChange={requestHandleChange}
              id="noo"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
