import { Handler } from "leaflet";
import React from "react";
import Delete from "../../assets/Icons/delete_red_24dp.svg";
import View from "../../assets/Icons/visibility_yellow_24.svg";

export default function AdminHousingItems({
  imgUrl,
  title,
  priceByNight,
  priceByWeek,
  priceByMonth,
  address,
  municipality,
  town,
  country,
  dimension,
  onClick,
  HandlerShow,
}) {
  return (
    <div>
      <div className="admin-housing">
        <div>
          <img
            src={imgUrl}
            alt="Housing img"
            height={200}
            className="admin-housing-image"
          />
        </div>

        <div className="admin-housing-right-items">
          <h2>{title}</h2>
          <p>
            {priceByNight && <span>{priceByNight} Xof / nuit ou </span>}
            {priceByWeek && <span>{priceByWeek} Xof / semaine ou </span>}
            {priceByMonth && <span>{priceByMonth} Xof/Mois</span>}
          </p>
          <div>
            <p>
              {address}, {municipality}, {town}-{country}
            </p>
            <p>{dimension} m²</p>
          </div>

          <div className="admin-housing-bottom-item">
            {/* <i></i> */}
            <span onClick={onClick}>
              <img src={Delete} alt="delete" />
            </span>
            {/* <p>Publié le 17/08/2024</p> */}
            <span
              onClick={HandlerShow}
              className="admin-housing-bottom-item-view"
            >
              <p>Voir</p>
              <img src={View} alt="view" />
            </span>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}
