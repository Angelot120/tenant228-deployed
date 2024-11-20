import React from "react";
import "./Loading.css"

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
}
