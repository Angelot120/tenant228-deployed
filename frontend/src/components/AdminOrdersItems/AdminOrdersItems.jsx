import React from "react";
import DimensionIcon from "../../assets/Icons/fit_width_24.png";
import Location from "../../assets/Icons/home_pin_24.png";

export default function AdminOrdersItems({
  title,
  imgUrl,
  priceByNight,
  priceByWeek,
  priceByMonth,
  forSalePrice,
  paymentChoice,
  address,
  municipality,
  town,
  country,
  dimension,
  firstName,
  lastName,
  sex,
  phoneNum,
  email,
  nbPeople,
  nbChildren,
  startingDate,
  startingHour,
  endingDate,
  reservationForYou,
  forWhoEmail,
  forWhoFirstName,
  forWhoLastName,
  forWhoPhoneNo,
}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      // hour: "2-digit",
      // minute: "2-digit",
      // second: "2-digit",
    });
  };

  return (
    <div className="pending-orders">
      {reservationForYou ? (
        <div className="pending-orders-item">
          <div className="pending-orders-left-items">
            <img src={imgUrl} alt="Housing Img" />
          </div>
          <div className="pending-orders-right-items">
            <h3>{title}</h3>
            <h4>
              {
                <span>
                  {paymentChoice == "N" ? (
                    <p>{priceByNight} Xof Paiement par nuit</p>
                  ) : paymentChoice == "W" ? (
                    <p>{priceByWeek} Xof Paiement par semaine</p>
                  ) : paymentChoice == "M" ? (
                    <p>{priceByMonth} Xof Paiement par mois</p>
                  ) : paymentChoice == "V" ? (
                    <p>{forSalePrice} Xof Prix de vente </p>
                  ) : (
                    ""
                  )}
                </span>
              }
            </h4>

            <div className="pending-order-dimen">
              <span>
                <img src={Location} alt="dimension" />
                <p>
                  {address}, {municipality}, {town}-{country}
                </p>
              </span>

              <span>
                <img src={DimensionIcon} alt="dimension" />
                <p>{dimension} m²</p>
              </span>
            </div>

            <div className="pending-order-user-info">
              <p>
                Nom complet du client : {firstName} {lastName}
              </p>
              <p>Sexe: {sex}</p>
              <p>Numéro: {phoneNum}</p>
              <p>Email: {email}</p>
              <p>
                Réservation pour {nbPeople} personne{nbPeople > 1 && "s"}{" "}
                {nbChildren != 0 ? (
                  <span>
                    dont {nbChildren} enfant{nbChildren > 1 && "s"}
                  </span>
                ) : (
                  "Pas d'enfants"
                )}
              </p>
              <p>
                Commance le: {formatDate(startingDate)} à {startingHour}
              </p>
              <p>
                Termine le: {formatDate(endingDate)}
                {/* à 22h20 */}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="pending-orders-item">
          <div className="pending-orders-left-items">
            <img src={imgUrl} alt="Housing Img" />
          </div>
          <div className="pending-orders-right-items">
            <h3>{title}</h3>
            <h4>
              {
                <span>
                  {paymentChoice == "N" ? (
                    <p>{priceByNight} Xof Paiement par nuit</p>
                  ) : paymentChoice == "W" ? (
                    <p>{priceByWeek} Xof Paiement par semaine</p>
                  ) : paymentChoice == "M" ? (
                    <p>{priceByMonth} Xof Paiement par mois</p>
                  ) : paymentChoice == "V" ? (
                    <p>{forSalePrice} Xof Prix de vente </p>
                  ) : (
                    ""
                  )}
                </span>
              }
            </h4>

            <div className="pending-order-dimen">
              <span>
                <img src={Location} alt="dimension" />
                <p>
                  {address}, {municipality}, {town}-{country}
                </p>
              </span>

              <span>
                <img src={DimensionIcon} alt="dimension" />
                <p>{dimension} m²</p>
              </span>
            </div>

            <div className="pending-order-user-info">
              <p>
                Nom complet du client : {firstName} {lastName} a réservé pour{" "}
                {forWhoFirstName} {forWhoLastName}
              </p>
              <p>Sexe: {sex}</p>
              <p>Numéro du réservataire: {phoneNum}</p>
              <p>Numéro du bénéficiaire: {forWhoPhoneNo}</p>
              <p>Email du réservataire : {email}</p>
              <p>Email du bénéficiaire : {forWhoEmail}</p>
              <p>
                Réservation pour {nbPeople} personne{nbPeople > 1 && "s"}{" "}
                {nbChildren != 0 ? (
                  <span>
                    dont {nbChildren} enfant{nbChildren > 1 && "s"}
                  </span>
                ) : (
                  "Pas d'enfants"
                )}
              </p>
              <p>
                Commance le: {formatDate(startingDate)} à {startingHour}
              </p>
              <p>
                Termine le: {formatDate(endingDate)}
                {/* à 22h20 */}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
