import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ShowMap from "../../../../../components/map/ShowMap";
import { Button } from "../../../../../components/button/Button";
import HousingLocationIcon from "../../../../../assets/Icons/home_pin_24.png";
import Footer from "../../../../../includes/footer/Footer";
import CheckImg from "../../../../../assets/Icons/check_circle_24.png";

export default function Preview() {
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
  const weAre = state ? state.weAre : null;
  const companyType = state ? state.companyType : null;
  const debatePrice = state ? state.debatePrice : null;
  const forSalePrice = state ? state.forSalePrice : null;
  const onlinePaiement = state ? state.onlinePaiement : false;

  // console.log(nearestLocations[0])

  const navigateHandler = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="preview">
        <br />
        <Button text={"< Retours"} onClick={navigateHandler} />
        <br />
        <div className="priview-adress">
          <div>
            <img src={HousingLocationIcon} alt="" className="location-logo" />
            <p>
              {address}, {municipality}, {town}, {country}
            </p>
          </div>
          <p>{selectedOption}</p>
        </div>
        <br />
        <div className="col-md-8">
          <h3>Aperçu des photos</h3>
        </div>
        <div className="preview-images-container">
          {housingImages.length === 0 ? (
            <p>Aucun fichier à afficher</p>
          ) : (
            housingImages.map((file, index) => (
              <div>
                <div className="housing-details-left" key={index}>
                  {index === 0 && (
                    <img
                      // src={file.preview}
                      src={housingImages[0].preview}
                      alt={file.name}
                      className="housing-detail-img"
                    />
                  )}
                </div>

                <div className="housing-details-right">
                  <div className="housing-details-right-top">
                    {index === 1 && (
                      <img
                        src={housingImages[1].preview}
                        alt="Housing Img 2"
                        className="housing-detail-img"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <h2>Le titre de la chambre : {housingTitle}</h2>

        {/* <br /> */}
        <h1>Détails des chambres</h1>
        {roomTitles &&
          roomTitles.map((title, index) => (
            <div key={index}>
              <h3>
                Chambre {index + 1}: {title}
              </h3>
              <p>Chambre {roomEmpty[index] ? "non" : ""} meublée</p>
              <p>Images de la chambre : </p>
              <div className="preview-room-img-container">
                {roomImages[index].map((file) => (
                  <img
                    key={file.id}
                    src={file.preview}
                    alt={file.file.name}
                    // height={"100px"}
                    className="preview-room-img"
                  />
                ))}
              </div>
            </div>
          ))}
        <br />
        {/* <p>{categoryId}</p> */}
        <p>
          <b>Briève Description :</b> {brefDescription}
        </p>
        <p>
          <b>Code postale : {postalCode}</b>
        </p>
        <p>
          <b>Numero de la maison : {housingNo}</b>
        </p>
        <ShowMap mapLat={mapLat} mapLong={mapLong} />
        <p>
          Logement en {housingStatus == 1 ? "location" : "vente"}, vous{" "}
          {directOwner ? "êtes" : "n'êtes"} le propriétaire directe.
        </p>
        <p>
          Les clients {specialRequest ? "peuvent" : "ne peuvent pas"} soumettre
          des requette spéciaux,{" "}
          <b>
            {nbPeople} personne{nbPeople > 1 && "s"}
          </b>{" "}
          en tout,{" "}
          <b>
            {nbBath} salle{nbBath > 1 && "s"} de bain
          </b>{" "}
          en tout,{" "}
          <b>
            {nbRoom} chambre
            {nbRoom > 1 && "s"}
          </b>{" "}
          en tout,{" "}
          <b>
            {nbBed} lit{nbBed > 1 && "s"}
          </b>{" "}
          en tout.
        </p>
        <p>
          Enfants <b>{allowChild ? "" : "non"} autorisées</b>, logement{" "}
          <b>{furniture ? "" : "non"} meublé</b>
        </p>
        {/* <p>Descriptive options : {descriptiveOptionsId}</p> */}
        {/* <p>Usefull Equipments : {usefullEquipments}</p> */}
        {/* <p>Equipments hors du commun : {outstandingEquipments}</p> */}
        {/* <p>Equipments de sécurité : {securityEquipments}</p> */}
        {/* <p>Avantages : {advantages}</p> */}
        {/* <p>Equipelents de base : {basicSuppliers}</p> */}
        <br />
        <h4>Description :</h4>
        {description}
        <br />
        <br />

        {nearestLocations.length > 0 && nearestLocations[0] == null ? (
          <div>
            <h4>Endroits les plus proche :</h4>
            {nearestLocations.map((nearestLocation, index) => (
              <div key={index}>
                <div key={index} className="preveiw-check-items">
                  <img src={CheckImg} alt="check" />
                  <p>{nearestLocation}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
        <br />
        {includServices.length > 0 && includServices[0] == null && (
          <div>
            <h4>Services inclus :</h4>
            {includServices.map((includService, index) => (
              <div key={index} className="preveiw-check-items">
                <img src={CheckImg} alt="check" />
                <p>{includService}</p>
              </div>
            ))}
          </div>
        )}

        <h4>Dimension du logement : {dimension} m²</h4>

        {documents && (
          <div>
            <h4>Les documents à fournir sur palce : </h4>
            <p>{documents}</p>
          </div>
        )}

        <h4>
          Prix : {paymentByNight ? `${priceByNight} Xof/nuit` : ""}{" "}
          {paymentByWeek ? `${priceByWeek} Xof/semaine` : ""}{" "}
          {paymentByMonth ? `${priceByMonth} Xof/mois` : ""}{" "}
          {forSalePrice ? `${forSalePrice} Xof prix de vente` : ""}
        </h4>

        <br />
        {forSalePrice && (
          <b>
            Le prix de vente {debatePrice ? "est" : "n'est"} à débatre, Vous{" "}
            {onlinePaiement ? "" : "n'"} acceptez {onlinePaiement ? "" : "pas"}{" "}
            les paiements en ligne
          </b>
        )}
        <br />
        <br />
      </div>
      <Footer />
    </div>
  );
}
