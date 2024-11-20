import React from "react";

export default function HousingCard({ imgUrl, title, price, roomCount, town }) {
  return (
    <div className="housing-card">
      <img
        src={imgUrl}
        alt="Housing img"
        height={200}
        className="housing-image"
      />
      <span className="housing-title">
        <h3>{title}</h3>
        <h3>{price}</h3>
      </span>
      <p>
        {roomCount}Pièce{roomCount > 1 && "s"}*{town}
      </p>
      <a href="#">Voir</a>
    </div>
  );
}
