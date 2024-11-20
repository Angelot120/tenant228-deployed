import React from "react";
import "./Loading.css";

export default function LoadingIndicators() {
  return (
    <div className="loading-container">
      {Array.from({ length: 12 }).map((_, index) => (
        <div className="skeleton_container" key={index}>
          <div className="skeleton big_img"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text long"></div>
          <div className="skeleton skeleton-text like"></div>
        </div>
      ))}
    </div>
  );
}
