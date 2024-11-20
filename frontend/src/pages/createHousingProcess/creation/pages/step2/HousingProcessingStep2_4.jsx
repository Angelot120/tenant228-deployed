import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HousingProcessingMenu from "../../../menu/HousingProcessingMenu";
import { HousingProcessingStep2 } from "../../../menu/HousingProcessingSteps";
import "./step2.css";
import {
  DistanceInput,
  Input,
  Textarea,
} from "../../../../../components/input/Input";
import { toast, ToastContainer } from "react-toastify";
import { PinkButton } from "../../../../../components/button/Button";

export default function HousingProcessingStep2_4() {
  const navigate = useNavigate();
  const location = useLocation();

  const [description, setDescription] = useState("");

  const [fields, setFields] = useState([]);
  const [includedServices, setIncludedServices] = useState([]);
  const [dimension, setDimension] = useState(0.0);
  const [textValue, setTextValue] = useState("");

  const handleChange = (index, event) => {
    const newFields = [...fields];
    newFields[index].value = event.target.value;
    setFields(newFields);
  };

  const includedServicesHandleChange = (index, event) => {
    const newIncludedServices = [...includedServices];
    newIncludedServices[index].value = event.target.value;
    setIncludedServices(newIncludedServices);
  };

  const handleAddField = () => {
    setFields([...fields, { value: "" }]);
  };

  const handleAddIncludedServices = () => {
    setIncludedServices([...includedServices, { value: "" }]);
  };

  const handleRemoveField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const handleRemovesetIncludedServices = (index) => {
    const newIncludedServices = includedServices.filter((_, i) => i !== index);
    setIncludedServices(newIncludedServices);
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
  const brefDescription = state ? state.brefDescription : null;
  const descriptiveOptionsId = state ? state.descriptiveOptionsId : null;
  const usefullEquipments = state ? state.usefullEquipments : null;
  const outstandingEquipments = state ? state.outstandingEquipments : null;
  const securityEquipments = state ? state.securityEquipments : null;
  const advantages = state ? state.advantages : null;
  const basicSuppliers = state ? state.basicSuppliers : null;
  const housingImages = location.state?.housingImages || [];

  const navigateHandler = (event) => {
    event.preventDefault();

    const allValues = fields.map((field) => field.value).join(", ");
    const locationArray = allValues.split(",").map((entry) => entry.trim());
    const services = includedServices.map((field) => field.value).join(", ");
    const includService = services.split(",").map((entry) => entry.trim());

    setFields([{ value: "" }]);
    setIncludedServices([{ value: "" }]);

    if (!description) {
      toast.error("Veuillez remplir le champ de la description !");
      return;
    } else if (!dimension) {
      toast.error("Veuillez renseigner la dimension de votre logement !");
      return;
    }
    navigate("/processing/create-housing/step2-5", {
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
        brefDescription: brefDescription,
        descriptiveOptionsId: descriptiveOptionsId,
        usefullEquipments: usefullEquipments,
        outstandingEquipments: outstandingEquipments,
        securityEquipments: securityEquipments,
        advantages: advantages,
        basicSuppliers: basicSuppliers,
        housingImages: housingImages,
        description: description,
        nearestLocations: locationArray,
        includServices: includService,
        dimension: dimension,
        documents: textValue,
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

      <div className="locations-info">
        <div>
          <h4>Maintenant décrivez nous complètement votre logement.</h4>
          <p>
            Dites nous tous sur votre logement pourquoi doit-on choisir votre
            logement ?
          </p>

          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name={"postContent"}
            cols={60}
            rows={10}
          />

          <h4>Quelles sont les endroits les plus proches de vous ?</h4>
          <p>
            Exemple: Restaurant à 100m, Parc d’attraction à 300m, Salle de Gym à
            500m, Cafétériat à 200m.
          </p>
          <div>
            <div className="add-new-service">
              <button
                type="button"
                onClick={handleAddField}
                className="add-location"
              >
                Ajouter un endroit +
              </button>
            </div>
            <form onSubmit={navigateHandler}>
              {fields.map((field, index) => (
                <div className="form-row mb-3" key={index}>
                  <div className="form-group col-md-10">
                    <DistanceInput
                      type={"text"}
                      value={field.value}
                      onChange={(event) => handleChange(index, event)}
                      placeholder={"Endroit à X m, ..."}
                    />
                  </div>
                  <div className="col-md-2 d-flex align-items-end">
                    {fields.length > 1 && (
                      <PinkButton
                        // type="button"
                        onClick={() => handleRemoveField(index)}
                        text={"Supprimer"}
                      />
                    )}
                  </div>
                </div>
              ))}
            </form>
          </div>

          <h4>
            Quelles sont les services inclus dans le prix de votre logement ?
          </h4>
          <p>
            Service comme l’électricité, néttoyage, eau, repas... qui peuvent
            être inclus dans le prix.
          </p>
          <div>
            <div className="add-new-service">
              <button
                type="button"
                onClick={handleAddIncludedServices}
                className="add-location"
              >
                Ajouter un service +
              </button>
            </div>
            <form onSubmit={navigateHandler}>
              {includedServices.map((field, index) => (
                <div className="form-row mb-3" key={index}>
                  <div className="form-group col-md-10">
                    <DistanceInput
                      type={"text"}
                      value={includedServices.value}
                      onChange={(event) =>
                        includedServicesHandleChange(index, event)
                      }
                      placeholder={"Le service ici ..."}
                    />
                  </div>
                  <div className="col-md-2 d-flex align-items-end">
                    {includedServices.length > 1 && (
                      <PinkButton
                        onClick={() => handleRemovesetIncludedServices(index)}
                        text={"Supprimer"}
                      />
                    )}
                  </div>
                </div>
              ))}
            </form>
          </div>

          <br />
          <h4>Quelle est la dimension de votre logement ?</h4>
          <p>Dimension en m²</p>
          <DistanceInput
            type={"number"}
            value={dimension}
            onChange={(e) => setDimension(e.target.value)}
            placeholder={"Endroit à X m, ..."}
            label={"La dimension ici ..."}
          />
          <br />

          <h4>
            Y a t-il des documents que vos clients doivent-ils rendre sur place
            ?
          </h4>

          <Textarea
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            name={"postContent"}
            cols={60}
            rows={10}
            maxLength={400}
          />
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

/*
      <div className="container mt-5">
        <h3 className="mb-3 text-center">Ajouter des endroits et distances</h3>
        <form>
          {fields.map((field, index) => (
            <div className="form-row mb-3" key={index}>
              <div className="form-group col-md-5">
                <DistanceInput
                  type="text"
                  reference={`endroit${index}`}
                  name="endroit"
                  value={field.endroit}
                  onChange={(event) => handleChange(index, event)}
                  placeholder="Endroit..."
                  label="Endroit"
                />
              </div>
              <div className="form-group col-md-5">
                <DistanceInput
                  type="number"
                  reference={`distance${index}`}
                  name="distance"
                  value={field.distance}
                  onChange={(event) => handleChange(index, event)}
                  placeholder="Distance..."
                  label="Distance"
                />
              </div>
              <div className="col-md-2 d-flex align-items-end">
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveField(index)}
                  >
                    Supprimer
                  </button>
                )}
              </div>
            </div>
          ))}
          <div>
            <button type="button" onClick={handleAddField}>
              Ajouter un endroit
            </button>
          </div>
        </form>
      </div>

      */
