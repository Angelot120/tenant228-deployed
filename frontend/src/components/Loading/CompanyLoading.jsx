import React from "react";
import "./Loading.css";

export default function CompanyLoading() {
  return (
    <div>
      <div className="company-skeleton-banner skeleton"></div>
      <br />
      <br />
      <div className="company-skeleton-item">
        <div className="skeleton skeleton-text long"></div>
      </div>
      <br />
      <br />
      <div className="skeleton skeleton-text long"></div>
    </div>
  );
}
