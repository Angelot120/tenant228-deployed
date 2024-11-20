import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HousingProcessingMenu from "../../../menu/HousingProcessingMenu";
import { HousingProcessingStep3 } from "../../../menu/HousingProcessingSteps";
import { toast, ToastContainer } from "react-toastify";
import { RadioInput } from "../../../../../components/input/Input";
import person from "../../../../../assets/Icons/person.png";
import enterprise from "../../../../../assets/Icons/location.png";
import api from "../../../../../api";

export default function HousingProcessingStep3_2() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [provider, setProvider] = useState([]);

  useEffect(() => {
    const checkProvider = () => {
      api
        .get("http://localhost:8000/api/get-provider/")
        .then((res) => res.data)
        .then((data) => {
          setProvider(data);
        });
    };

    checkProvider();

    if (provider[0]?.id > 0) {
      navigate("/processing/create-housing/finish", {
        state: {
          categoryId: categoryId,
          selectedOption: selectedOption,
          housingTitle: housingTitle,
          address: address,
          country: country,
          town: town,
          municipality: municipality,
          postalCode: postalCode,
          housingNo: housingNo,
          mapLong: mapLong,
          mapLat: mapLat,
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
          nearestLocations: nearestLocations,
          includServices: includServices,
          dimension: dimension,
          documents: documents,
          roomTitles: roomTitles,
          roomImages: roomImages,
          roomEmpty: roomEmpty,
          paymentByNight: paymentByNight,
          priceByNight: priceByNight,
          paymentByWeek: paymentByWeek,
          priceByWeek: priceByWeek,
          paymentByMonth: paymentByMonth,
          priceByMonth: priceByMonth,
          cancellationPaiment: cancellationPaiment,
          cancellationPrice: cancellationPrice,
          debatePrice: debatePrice,
          forSalePrice: forSalePrice,
          onlinePaiement: onlinePaiement,
          weAre: userType,
          companyType: companyType,
        },
      });
    }
  });

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
    setCompanyType("");
  };

  const handleCompanyTypeChange = (event) => {
    setCompanyType(event.target.value);
  };

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
  const brefDescription = state ? state.brefDescription : null;
  const descriptiveOptionsId = state ? state.descriptiveOptionsId : null;
  const usefullEquipments = state ? state.usefullEquipments : null;
  const outstandingEquipments = state ? state.outstandingEquipments : null;
  const securityEquipments = state ? state.securityEquipments : null;
  const advantages = state ? state.advantages : null;
  const basicSuppliers = state ? state.basicSuppliers : null;
  const housingImages = location.state?.housingImages || [];
  const description = state ? state.description : null;
  const nearestLocations = location.state?.nearestLocations || [];
  const includServices = location.state?.includServices || [];
  const dimension = state ? state.dimension : null;
  const documents = state ? state.documents : null;
  const roomTitles = location.state?.roomTitles || {};
  const roomImages = location.state?.roomImages || {};
  const roomEmpty = location.state?.roomEmpty || {};
  const paymentByNight = state ? state.paymentByNight : null;
  const priceByNight = state ? state.priceByNight : null;
  const paymentByWeek = state ? state.paymentByWeek : null;
  const priceByWeek = state ? state.priceByWeek : null;
  const paymentByMonth = state ? state.paymentByMonth : null;
  const priceByMonth = state ? state.priceByMonth : null;
  const cancellationPaiment = state ? state.cancellationPaiment : null;
  const cancellationPrice = state ? state.cancellationPrice : null;
  const debatePrice = state ? state.debatePrice : null;
  const forSalePrice = state ? state.forSalePrice : null;
  const onlinePaiement = state ? state.onlinePaiement : null;

  const navigateHandler = (e) => {
    e.preventDefault();

    if (!userType) {
      toast.error(
        "Veuillez indiquer si vous êtes un particulier ou une entreprise !"
      );
      return;
    } else if (userType === "business" && !companyType) {
      toast.error("Veuillez indiquer quelle type d'entreprise vous êtes !");
      return;
    }
    navigate("/processing/create-housing/finish", {
      state: {
        categoryId: categoryId,
        selectedOption: selectedOption,
        housingTitle: housingTitle,
        address: address,
        country: country,
        town: town,
        municipality: municipality,
        postalCode: postalCode,
        housingNo: housingNo,
        mapLong: mapLong,
        mapLat: mapLat,
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
        nearestLocations: nearestLocations,
        includServices: includServices,
        dimension: dimension,
        documents: documents,
        roomTitles: roomTitles,
        roomImages: roomImages,
        roomEmpty: roomEmpty,
        paymentByNight: paymentByNight,
        priceByNight: priceByNight,
        paymentByWeek: paymentByWeek,
        priceByWeek: priceByWeek,
        paymentByMonth: paymentByMonth,
        priceByMonth: priceByMonth,
        cancellationPaiment: cancellationPaiment,
        cancellationPrice: cancellationPrice,
        weAre: userType === "business" ? true : false,
        companyType: companyType,
        debatePrice: debatePrice,
        forSalePrice: forSalePrice,
        onlinePaiement: onlinePaiement,
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
      <HousingProcessingStep3 />

      <div className="company-container">
        <form onSubmit={navigateHandler}>
          <div className="company-container-first-items">
            <h2>Qui êtes vous ?</h2>
            <p>Êtes-vous un particulier ou une entreprise ?</p>

            <div className="all-options">
              {/* <div className="option"> */}
              <label
                className={`option ${selectedId === 1 ? "selected" : ""}`}
                onClick={() => {
                  setSelectedId(1);
                }}
              >
                <span>
                  <input
                    type="radio"
                    name="userType"
                    value="individual"
                    checked={userType === "individual"}
                    onChange={handleUserTypeChange}
                    id="individual"
                    className="radio-input"
                  />
                  <img src={person} alt="" className="option-img" />
                  Particulier
                </span>
              </label>
              {/* </div> */}
              <br />
              {/* <div className="option"> */}
              <label
                className={`option ${selectedId === 2 ? "selected" : ""}`}
                onClick={() => {
                  setSelectedId(2);
                }}
              >
                <span>
                  <input
                    type="radio"
                    name="userType"
                    value="business"
                    checked={userType === "business"}
                    onChange={handleUserTypeChange}
                    id="business"
                    className="radio-input"
                  />
                  <img src={enterprise} alt="" className="option-img" />
                  Entreprise
                </span>
              </label>
              {/* </div> */}
            </div>
          </div>

          <br />
          <br />

          {userType === "business" && (
            <div className="company-kind">
              <div>
                <h3>Quel type d'entreprise êtes-vous ?</h3>

                <label>
                  <input
                    type="radio"
                    name="companyType"
                    value="Hôtel"
                    checked={companyType === "Hôtel"}
                    onChange={handleCompanyTypeChange}
                    id="id"
                  />
                  Hôtel
                </label>

                <br />
                <br />

                <label>
                  <input
                    type="radio"
                    name="companyType"
                    value="Agences Immobilières"
                    checked={companyType === "Agences Immobilières"}
                    onChange={handleCompanyTypeChange}
                    id="id"
                  />
                  Agences Immobilières
                </label>

                <br />
                <br />

                <label>
                  <input
                    type="radio"
                    name="companyType"
                    value="Sociétés de Gestion Immobilière"
                    checked={companyType === "Sociétés de Gestion Immobilière"}
                    onChange={handleCompanyTypeChange}
                    id="id"
                  />
                  Sociétés de Gestion Immobilière
                </label>

                <br />
                <br />

                <label>
                  <input
                    type="radio"
                    name="companyType"
                    value="Promoteurs Immobiliers"
                    checked={companyType === "Promoteurs Immobiliers"}
                    onChange={handleCompanyTypeChange}
                    id="id"
                  />
                  Promoteurs Immobiliers
                </label>

                <br />
                <br />

                <label>
                  <input
                    type="radio"
                    name="companyType"
                    value="Investisseurs Immobiliers"
                    checked={companyType === "Investisseurs Immobiliers"}
                    onChange={handleCompanyTypeChange}
                    id="id"
                  />
                  Investisseurs Immobiliers
                </label>

                <br />
                <br />

                <label>
                  <input
                    type="radio"
                    name="companyType"
                    value="Sociétés d'Investissement Immobilier Cotées en Bourse (REITs)"
                    checked={
                      companyType ===
                      "Sociétés d'Investissement Immobilier Cotées en Bourse (REITs)"
                    }
                    onChange={handleCompanyTypeChange}
                    id="id"
                  />
                  Sociétés d'Investissement Immobilier Cotées en Bourse (REITs)
                </label>

                <br />
                <br />

                <label>
                  <input
                    type="radio"
                    name="companyType"
                    value="Sociétés de Développement Immobilier"
                    checked={
                      companyType === "Sociétés de Développement Immobilier"
                    }
                    onChange={handleCompanyTypeChange}
                    id="id"
                  />
                  Sociétés de Développement Immobilier
                </label>

                <br />
                <br />

                <label>
                  <input
                    type="radio"
                    name="companyType"
                    value="Sociétés de Conseil en Immobilier"
                    checked={
                      companyType === "Sociétés de Conseil en Immobilier"
                    }
                    onChange={handleCompanyTypeChange}
                    id="id"
                  />
                  Sociétés de Conseil en Immobilier
                </label>

                <br />
                <br />

                <label>
                  <input
                    type="radio"
                    name="companyType"
                    value="Sociétés de Location de Vacances"
                    checked={companyType === "Sociétés de Location de Vacances"}
                    onChange={handleCompanyTypeChange}
                    id="id"
                  />
                  Sociétés de Location de Vacances
                </label>

                <br />
                <br />

                <label>
                  <input
                    type="radio"
                    name="companyType"
                    value="Sociétés de Construction Immobilière"
                    checked={
                      companyType === "Sociétés de Construction Immobilière"
                    }
                    onChange={handleCompanyTypeChange}
                    id="id"
                  />
                  Sociétés de Construction Immobilière
                </label>

                <br />
                <br />

                <label>
                  <input
                    type="radio"
                    name="companyType"
                    value="Bailleurs Sociaux"
                    checked={companyType === "Bailleurs Sociaux"}
                    onChange={handleCompanyTypeChange}
                    id="id"
                  />
                  Bailleurs Sociaux
                </label>

                <br />
                <br />

                <label>
                  <input
                    type="radio"
                    name="companyType"
                    value="Autre"
                    checked={companyType === "Autre"}
                    onChange={handleCompanyTypeChange}
                    id="id"
                  />
                  Autre
                </label>
              </div>
            </div>
          )}
        </form>
      </div>
      <br />
      <br />
    </div>
  );
}
