import React from "react";
import DimensImg from "/assets/icons/fit_width_24.png";
import { Button, PinkButton } from "../button/Button";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CardItems({
  id,
  housingId,
  imgUrl,
  title,
  dimension,
  brefDescription,
  accepted,
  priceByNight,
  priceByWeek,
  priceByMonth,
  forSalePrice,
  paymentChoice,
}) {
  const handlerCancelled = (e, id) => {
    e.preventDefault();

    if (confirm("Voulez-vous vraiment annuler cette commande ? ")) {
      try {
        const response = api.put(
          `http://localhost:8000/api/get-ordered-housings/${id}/`
        );
        toast.success("Commande annulée avec succès");
        return response.data;
      } catch (err) {
        console.error(err);
        toast.error("Une erreur est survenue lors du traitement !");
        return;
      }
    }
  };

  const navigate = useNavigate();

  const navigateHandler = (e, id) => {
    e.preventDefault();

    navigate(`/housing-details/${id}`, {
      id: id,
    });
  };

  return (
    <div>
      <div className="cart-item">
        <img src={imgUrl} alt="" className="card-housing-img" />
        <div>
          {accepted ? (
            <span className="card-badge card-order-sucess-badge">
              Demande acceptée
            </span>
          ) : accepted == null ? (
            <span className="card-badge card-order-badge">
              Demande en cours
            </span>
          ) : (
            ""
          )}

          <h3>{title}</h3>
          <div className="card-center-informations">
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
            </span>{" "}
            <div className="card-housing-dimension">
              <img src={DimensImg} alt="Dimension" className="dimesion-img" />
              <p>{dimension} m²</p>
            </div>
          </div>
          <p>{brefDescription}</p>
          <div className="card-operations">
            <Button
              text={"Voir"}
              onClick={(e) => navigateHandler(e, housingId)}
            />
            <PinkButton
              text={"Annuler"}
              onClick={(e) => handlerCancelled(e, id)}
            />
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
