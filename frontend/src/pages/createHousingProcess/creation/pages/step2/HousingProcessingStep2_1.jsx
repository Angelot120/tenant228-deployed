import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HousingProcessingMenu from "../../../menu/HousingProcessingMenu";
import { HousingProcessingStep2 } from "../../../menu/HousingProcessingSteps";
import "./step2.css";
import { toast, ToastContainer } from "react-toastify";
import api from "../../../../../api";
import { Textarea } from "../../../../../components/input/Input";
import CardLoading from "../../../../../components/Loading/CardLoading";

export default function HousingProcessingStep2_1() {
  const [descriptiveOptions, setDescriptiveOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    loadData();
    setLoading(false);
  });

  const loadData = () => {
    api
      .get("api/create-descriptive-options/")
      .then((res) => res.data)
      .then((data) => setDescriptiveOptions(data))
      .catch((error) => {
        // console.log(error);
        toast.error("Une erreur est survenue lors du chargement des données !");
      });
  };

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

  const [textValue, setTextValue] = useState("");
  const [id, setId] = useState(null);
  const [desciptive, setDesciptive] = useState(null);
  const maxLength = 150;

  const handleChange = (event) => {
    setTextValue(event.target.value);
  };

  const navigateHandler = (e) => {
    e.preventDefault();

    if (!textValue) {
      toast.error("La briève description est obligatoire !");
      return;
    } else if (textValue.length > maxLength) {
      toast.error("La biève description ne doit pas dépasser les 150 mots !");
      return;
    } else if (!id) {
      toast.error(
        "Veuillez choisir une option descriptive de votre logement !"
      );
      return;
    }

    navigate("/processing/create-housing/step2-2", {
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
        brefDescription: textValue,
        descriptiveOptionsId: id,
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
      <HousingProcessingStep2 />
      <br />
      <div className="housing-descrition-session">
        <div>
          <h4>Comment décririez vous votre logement en 150 mots ?</h4>

          <Textarea
            value={textValue}
            onChange={handleChange}
            name={"postContent"}
            cols={60}
            rows={10}
            maxLength={150}
          />

          <br />

          {loading ? (
            <CardLoading />
          ) : (
            <div>
              <h4>
                Quelle autre option décrit le mieux votre logement parmis ces
                options disponibles ?
              </h4>

              <form className="descriptive-options-container">
                {descriptiveOptions.map((descriptiveOption, key) => (
                  <div
                    key={key}
                    className={`descriptive-option  ${
                      desciptive === descriptiveOption.id ? "selected" : ""
                    }`}
                    onClick={() => setDesciptive(descriptiveOption.id)}
                  >
                    <label
                      htmlFor={`option${key}`}
                      className="descriptive-option-label"
                    >
                      <input
                        type="radio"
                        id={`option${key}`}
                        name="housingCategory"
                        value={descriptiveOption.descriptive_options_name}
                        onClick={() => setId(descriptiveOption.id)}
                        className="radio-input"
                      />

                      <img
                        src={descriptiveOption.descriptive_options_img_url}
                        alt={descriptiveOption.descriptive_options_name}
                        height={"50px"}
                      />
                      {descriptiveOption.descriptive_options_name}
                    </label>
                  </div>
                ))}
              </form>
            </div>
          )}
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}
