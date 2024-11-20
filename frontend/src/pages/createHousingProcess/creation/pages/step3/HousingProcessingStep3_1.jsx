import React, { useState } from "react";
import HousingProcessingMenu from "../../../menu/HousingProcessingMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { HousingProcessingStep3 } from "../../../menu/HousingProcessingSteps";
import {
  DistanceInput,
  FloatInput,
  Input,
  RadioInput,
} from "../../../../../components/input/Input";
import { toast, ToastContainer } from "react-toastify";
import { Toggle } from "../../../../../includes/createHousingProcessing/step1/Step1_6Items";
import "./Step3.css";

export default function HousingProcessingStep3_1() {
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
  const roomTitles = location.state?.roomTitles || [];
  const roomImages = location.state?.roomImages || {};
  const roomEmpty = location.state?.roomEmpty || {};

  const [paymentByNight, setPaymentByNight] = useState(null);
  const [paymentByWeek, setPaymentByWeek] = useState(null);
  const [paymentByMonth, setPaymentByMonth] = useState(null);
  const [cancellationPaiment, setCancellationPaiment] = useState(null);

  const [price, setPrice] = useState("");
  const [priceByWeek, setPriceByWeek] = useState("");
  const [priceByMonth, setPriceByMonth] = useState("");
  const [cancellationPrice, setCancellationPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [forSalePrice, setForSalePrice] = useState("");
  const [onlinePaiement, setOnlinePaiement] = useState(false);

  const salePriceHandleChange = (event) => {
    const { value } = event.target;
    setSalePrice(value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleWeekPriceChange = (event) => {
    setPriceByWeek(event.target.value);
  };

  const handleMonthPriceChange = (event) => {
    setPriceByMonth(event.target.value);
  };

  const handleCancellationPriceChange = (event) => {
    setCancellationPrice(event.target.value);
  };

  const handleToggleSwitch = (e) => {
    setOnlinePaiement(e.target.checked);
  };

  const ownerhandleChange = (event) => {
    const { value } = event.target;
    setPaymentByNight(value);
    if (value === "no") {
      setPrice("");
    }
  };

  const weekHandleChange = (event) => {
    const { value } = event.target;
    setPaymentByWeek(value);
    if (value === "no") {
      setPriceByWeek("");
    }
  };

  const monthHandleChange = (event) => {
    const { value } = event.target;
    setPaymentByMonth(value);
    if (value === "no") {
      setPriceByMonth("");
    }
  };

  const cancellationHandleChange = (event) => {
    const { value } = event.target;
    setCancellationPaiment(value);
    if (value === "no") {
      setCancellationPrice("");
    }
  };

  const navigateHandler = (event) => {
    event.preventDefault();

    if ((housingStatus == "1" || housingStatus == "3") && !paymentByNight) {
      toast.error("Veuillez remplir le champ du paiement par nuit !");
      return;
    } else if (paymentByNight === "yes" && !price) {
      toast.error("Veuillez renseigner le prix par nuit !");
      return;
    } else if (
      (housingStatus == "1" || housingStatus == "3") &&
      !paymentByWeek
    ) {
      toast.error("Veuillez renseigner le prix par semaine !");
      return;
    } else if (paymentByWeek === "yes" && !priceByWeek) {
      toast.error("Veuillez renseigner le prix par semaine !");
      return;
    } else if (
      (housingStatus == "1" || housingStatus == "3") &&
      !paymentByMonth
    ) {
      toast.error("Veuillez renseigner le prix par mois !");
      return;
    } else if (paymentByMonth === "yes" && !priceByMonth) {
      toast.error("Veuillez renseigner le prix par mois !");
      return;
    } else if (!cancellationPaiment) {
      toast.error(
        "Veuillez renseigner le champ concernant le prix d'annulation !"
      );
      return;
    } else if (cancellationPaiment === "yes" && !cancellationPrice) {
      toast.error("Veuillez renseigner le prix d'annulation !");
      return;
    } else if (
      (housingStatus === "2" || housingStatus === "3") &&
      !forSalePrice
    ) {
      toast.error("Veuillez renseigner le prix de vente de votre logement !");
      return;
    } else if ((housingStatus === "2" || housingStatus === "3") && !salePrice) {
      toast.error(
        "Veuillez renseigner si le prix de vente est à débatre ou pas !"
      );
      return;
    }

    if (
      (housingStatus == "1" || housingStatus == "3") &&
      !price &&
      !priceByWeek &&
      !priceByMonth
    ) {
      toast.error("Veuillez renseigner au moins un prix pour la location !");
      return;
    }

    navigate("/processing/create-housing/step3-2", {
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
        nearestLocations: nearestLocations,
        includServices: includServices,
        dimension: dimension,
        documents: documents,
        roomTitles: roomTitles,
        roomImages: roomImages,
        roomEmpty: roomEmpty,
        paymentByNight: paymentByNight === "yes" ? true : false,
        priceByNight: price,
        paymentByWeek: paymentByWeek === "yes" ? true : false,
        priceByWeek: priceByWeek,
        paymentByMonth: paymentByMonth === "yes" ? true : false,
        priceByMonth: priceByMonth,
        cancellationPaiment: cancellationPaiment === "yes" ? true : false,
        cancellationPrice: cancellationPrice,
        debatePrice: salePrice === "yes" ? true : false,
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

      <div className="housing-price-container">
        <h2>Donnez un prix à votre logement</h2>
        <p>Vous pourriez modifier le prix plus tard</p>

        {(housingStatus == "1" || housingStatus == "3") && (
          <div>
            <form onSubmit={navigateHandler}>
              <div>
                <h3>Paiement par nuit ?</h3>

                <label>
                  <input
                    type="radio"
                    name="owner"
                    value="yes"
                    checked={paymentByNight === "yes"}
                    onChange={ownerhandleChange}
                    id="yes"
                  />
                  Oui
                </label>

                <br />

                <label>
                  <input
                    type="radio"
                    name="owner"
                    value="no"
                    checked={paymentByNight === "no"}
                    onChange={ownerhandleChange}
                    id="no"
                  />
                  Non
                </label>
              </div>

              {paymentByNight === "yes" && (
                <div>
                  {/* <label> */}
                  {/* Prix par nuit : */}
                  <div className="form">
                    <FloatInput
                      type={"number"}
                      value={price}
                      onChange={handlePriceChange}
                      placeholder={"Entrez le prix"}
                      label={"Entrez le prix ici"}
                    />
                  </div>
                  {/* </label> */}
                </div>
              )}
            </form>

            <form onSubmit={navigateHandler}>
              <div>
                <h3>Paiement par semaine ?</h3>

                <label>
                  <input
                    type="radio"
                    name="owner"
                    value="yes"
                    checked={paymentByWeek === "yes"}
                    onChange={weekHandleChange}
                    id="yes"
                  />
                  Oui
                </label>

                <br />

                <label>
                  <input
                    type="radio"
                    name="owner"
                    value="no"
                    checked={paymentByWeek === "no"}
                    onChange={weekHandleChange}
                    id="no"
                  />
                  Non
                </label>
              </div>

              {paymentByWeek === "yes" && (
                <div>
                  <label>
                    Prix par semaine :
                    <div className="form">
                      <FloatInput
                        type={"number"}
                        value={priceByWeek}
                        onChange={handleWeekPriceChange}
                        placeholder={"Entrez le prix"}
                        label={"Entrez le prix ici..."}
                      />
                    </div>
                  </label>
                </div>
              )}
            </form>

            <form onSubmit={navigateHandler}>
              <div>
                <h3>Paiement par mois ?</h3>

                <label>
                  <input
                    type="radio"
                    name="owner"
                    value="yes"
                    checked={paymentByMonth === "yes"}
                    onChange={monthHandleChange}
                    id="yes"
                  />
                  Oui
                </label>

                <br />

                <label>
                  <input
                    type="radio"
                    name="owner"
                    value="no"
                    checked={paymentByMonth === "no"}
                    onChange={monthHandleChange}
                    id="no"
                  />
                  Non
                </label>
              </div>

              {paymentByMonth === "yes" && (
                <div>
                  <label>
                    Prix par mois :
                    <div className="form">
                      <FloatInput
                        type={"number"}
                        value={priceByMonth}
                        onChange={handleMonthPriceChange}
                        placeholder={"Entrez le prix ici ..."}
                        label={"Entrez le prix ici ..."}
                      />
                    </div>
                  </label>
                </div>
              )}
            </form>
          </div>
        )}
        <form onSubmit={navigateHandler}>
          <div>
            <h3>À combient s'élève le prix d'annulation de votre logement ?</h3>

            <label>
              <input
                type="radio"
                name="owner"
                value="yes"
                checked={cancellationPaiment === "yes"}
                onChange={cancellationHandleChange}
                id="yes"
              />
              Annulation payante
            </label>

            <br />

            <label>
              <input
                type="radio"
                name="owner"
                value="no"
                checked={cancellationPaiment === "no"}
                onChange={cancellationHandleChange}
                id="no"
              />
              Annulation gratuite
            </label>
          </div>

          {cancellationPaiment === "yes" && (
            <div>
              <label>
                Prix d'annulation :
                <div className="form">
                  <FloatInput
                    type={"number"}
                    value={cancellationPrice}
                    onChange={handleCancellationPriceChange}
                    placeholder={"Entrez le prix d'annulation ici..."}
                    label={"Entrez le prix d'annulation ici..."}
                  />
                </div>
              </label>
            </div>
          )}
        </form>

        <form onSubmit={navigateHandler}>
          <div>
            {(housingStatus == "2" || housingStatus == "3") && (
              <div>
                <h4>Quelle est le prix de ce logement s’il est en vente ?</h4>
                <div className="form">
                  <DistanceInput
                    type={"number"}
                    value={forSalePrice}
                    placeholder={"Le prix du logement ici..."}
                    onChange={(e) => setForSalePrice(e.target.value)}
                    reference={"price"}
                    label={"Le prix du logement ici.."}
                  />
                </div>
                <RadioInput
                  type="radio"
                  name="salePrice"
                  value="yes"
                  label="Prix à débattre"
                  checked={salePrice === "yes"}
                  onChange={salePriceHandleChange}
                  id="yess"
                />
                <br />
                <RadioInput
                  type="radio"
                  name="salePrice"
                  value="no"
                  label="Prix à ne pas débattre"
                  checked={salePrice === "no"}
                  onChange={salePriceHandleChange}
                  id="noo"
                />
              </div>
            )}
            <br />
            <Toggle
              text={"Acceptez-vous les paiements en ligne ?"}
              checked={onlinePaiement}
              onChange={(e) => handleToggleSwitch(e)}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
