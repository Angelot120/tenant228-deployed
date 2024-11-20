import React from "react";
import "./Loading.css";

export default function CardLoading() {
  return (
    <div>
      <div className="skeleton-details-adress-card-container">
        <div className="skeleton-details-card skeleton"></div>
        <div className="skeleton-details-card skeleton"></div>
        <div className="skeleton-details-card skeleton"></div>
        <div className="skeleton-details-card skeleton"></div>
        <div className="skeleton-details-card skeleton"></div>
        <div className="skeleton-details-card skeleton"></div>
      </div>
    </div>
  );
}
