import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HousingProcessingMenu from "../../../menu/HousingProcessingMenu";
import { HousingProcessingStep2 } from "../../../menu/HousingProcessingSteps";
import { toast, ToastContainer } from "react-toastify";
import api from "../../../../../api";
import CardLoading from "../../../../../components/Loading/CardLoading";

export default function HousingProcessingStep2_2() {
  const navigate = useNavigate();
  const location = useLocation();
  const [usefullEquipments, setUsefullEquipments] = useState([]);
  const [outstandingEquipments, setOutstandingEquipments] = useState([]);
  const [securityEquipments, setSecurityEquipments] = useState([]);
  const [advantages, setAdvantage] = useState([]);
  const [basicSuppliers, setBasicSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedUseFullEquipments, setSelectedUseFullEquipments] = useState(
    []
  );
  const [selectedOutstandingEquipments, setSelectedOutstandingEquipments] =
    useState([]);

  const [selectedSecurityEquipments, setSelectedSecurityEquipments] = useState(
    []
  );

  const [selectedAdvantages, setSelectedAdvantages] = useState([]);

  const [selectedBasicSuppliers, setSelectedBasicSuppliers] = useState([]);

  useEffect(() => {
    setLoading(true);
    loadData();
  }, []);

  const loadData = () => {
    Promise.all([
      api.get("api/create-usefull-equipments/"),
      api.get("api/create-outstanding-equipments/"),
      api.get("api/create-security-equipments/"),
      api.get("api/create-advantages/"),
      api.get("api/create-basic-suppliers/"),
    ])
      .then(
        ([
          usefullRes,
          outstandingRes,
          securityRes,
          advantageRes,
          supplierRes,
        ]) => {
          setUsefullEquipments(usefullRes.data);
          setOutstandingEquipments(outstandingRes.data);
          setSecurityEquipments(securityRes.data);
          setAdvantage(advantageRes.data);
          setBasicSuppliers(supplierRes.data);
          setLoading(false);
        }
      )
      .catch((err) => {
        // console.log(err);
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
  const brefDescription = state ? state.brefDescription : null;
  const descriptiveOptionsId = state ? state.descriptiveOptionsId : null;

  const selectedUseFullEquipmentsHandleCheckboxChange = (event, optionId) => {
    const { checked } = event.target;
    setSelectedUseFullEquipments((prevSelectedOptions) =>
      checked
        ? [...prevSelectedOptions, optionId]
        : prevSelectedOptions.filter((id) => id !== optionId)
    );
  };

  const selectedOutstandingEquipmentsHandleCheckboxChange = (
    event,
    optionId
  ) => {
    const { checked } = event.target;
    setSelectedOutstandingEquipments((prevSelectedOptions) =>
      checked
        ? [...prevSelectedOptions, optionId]
        : prevSelectedOptions.filter((id) => id !== optionId)
    );
  };

  const selectedSecurityEquipmentsEquipmentsHandleCheckboxChange = (
    event,
    optionId
  ) => {
    const { checked } = event.target;
    setSelectedSecurityEquipments((prevSelectedOptions) =>
      checked
        ? [...prevSelectedOptions, optionId]
        : prevSelectedOptions.filter((id) => id !== optionId)
    );
  };

  const selectedAdvantageHandleCheckboxChange = (event, optionId) => {
    const { checked } = event.target;
    setSelectedAdvantages((prevSelectedOptions) =>
      checked
        ? [...prevSelectedOptions, optionId]
        : prevSelectedOptions.filter((id) => id !== optionId)
    );
  };

  const selectedSupplierHandleCheckboxChange = (event, optionId) => {
    const { checked } = event.target;
    setSelectedBasicSuppliers((prevSelectedOptions) =>
      checked
        ? [...prevSelectedOptions, optionId]
        : prevSelectedOptions.filter((id) => id !== optionId)
    );
  };

  const navigateHandler = (e) => {
    e.preventDefault();

    navigate("/processing/create-housing/step2-3", {
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
        usefullEquipments: selectedUseFullEquipments,
        outstandingEquipments: selectedOutstandingEquipments,
        securityEquipments: selectedSecurityEquipments,
        advantages: selectedAdvantages,
        basicSuppliers: selectedBasicSuppliers,
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

      {loading ? (
        <div className="option-margin">
          <div>
            <CardLoading />
          </div>
          <br />
          <br />
          <br />
          <div>
            <CardLoading />
          </div>
          <br />
          <br />
          <br />
          <div>
            <CardLoading />
          </div>
          <br />
          <br />
          <br />
          <div>
            <CardLoading />
          </div>
          <br />
          <br />
          <br />
          <div>
            <CardLoading />
          </div>
        </div>
      ) : (
        <div className="options-conatainer">
          <div>
            <h2>Quelles sont les équipements que possède votre logement ?</h2>

            <p>Les équipements souvant utilisés ? </p>

            <form className="options-container">
              {usefullEquipments.map((usefullEquipment, key) => (
                <div key={key} className="option">
                  <input
                    type="checkbox"
                    id={`option${key}`}
                    value={usefullEquipment.usefull_equipment_name}
                    onChange={(event) =>
                      selectedUseFullEquipmentsHandleCheckboxChange(
                        event,
                        usefullEquipment.id
                      )
                    }
                    // className="check-input"
                  />
                  <label htmlFor={`option${key}`} className="option-label">
                    <img
                      src={usefullEquipment.usefull_equipment_img_url}
                      alt={usefullEquipment.usefull_equipment_name}
                      className="option-img"
                    />
                    {usefullEquipment.usefull_equipment_name}
                  </label>
                </div>
              ))}
            </form>

            <br />
            <br />
            <p>De quelle équipement hors du commun disposez-vous ?</p>
            <br />
            <br />
            <form className="options-container">
              {outstandingEquipments.map((outstandingEquipment, key) => (
                <div key={key} className="option">
                  <input
                    type="checkbox"
                    id={`outstandOption${key}`}
                    value={outstandingEquipment.equipment_name}
                    onChange={(event) =>
                      selectedOutstandingEquipmentsHandleCheckboxChange(
                        event,
                        outstandingEquipment.id
                      )
                    }
                  />
                  <label
                    htmlFor={`outstandOption${key}`}
                    className="option-label"
                  >
                    <img
                      src={outstandingEquipment.equipment_img_url}
                      alt={outstandingEquipment.equipment_name}
                      className="option-img"
                    />
                    {outstandingEquipment.equipment_name}
                  </label>
                </div>
              ))}
            </form>
            <br />
            <br />
            <p>De quelle équipement de sécurité disposez-vous ?</p>
            <br />
            <br />
            <form className="options-container">
              {securityEquipments.map((securityEquipment, key) => (
                <div key={key} className="option">
                  <input
                    type="checkbox"
                    id={`securityOption${key}`}
                    value={securityEquipment.equipment_name}
                    onChange={(event) =>
                      selectedSecurityEquipmentsEquipmentsHandleCheckboxChange(
                        event,
                        securityEquipment.id
                      )
                    }
                  />
                  <label
                    htmlFor={`securityOption${key}`}
                    className="option-label"
                  >
                    <img
                      src={securityEquipment.equipment_image_url}
                      alt={securityEquipment.equipment_name}
                      className="option-img"
                    />
                    {securityEquipment.equipment_name}
                  </label>
                </div>
              ))}
            </form>
            <br />
            <br />
            <p>Quelles sont les avantages de votre logement ?</p>
            <br />
            <br />
            <form className="options-container">
              {advantages.map((advantage, key) => (
                <div key={key} className="option">
                  <input
                    type="checkbox"
                    id={`advantageOption${key}`}
                    value={advantage.adventages_name}
                    onChange={(event) =>
                      selectedAdvantageHandleCheckboxChange(event, advantage.id)
                    }
                  />
                  <label htmlFor={`advantageOption${key}`}>
                    {advantage.adventages_name}
                  </label>
                </div>
              ))}
            </form>
            <br />
            <br />
            <p>
              Quelles sont les équipements de base mise à la disposition de vos
              clients ?
            </p>
            <br />
            <br />
            <form className="options-container">
              {basicSuppliers.map((basicSupplier, key) => (
                <div key={key} className="option">
                  <input
                    type="checkbox"
                    id={`supplierOption${key}`}
                    value={basicSupplier.basic_suppliers_name}
                    onChange={(event) =>
                      selectedSupplierHandleCheckboxChange(
                        event,
                        basicSupplier.id
                      )
                    }
                  />
                  <label htmlFor={`supplierOption${key}`}>
                    {basicSupplier.basic_suppliers_name}
                  </label>
                </div>
              ))}
            </form>
          </div>
        </div>
      )}

      <br />
      <br />
    </div>
  );
}
