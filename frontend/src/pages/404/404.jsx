import React from "react";
import "./404.css";
import NotFondImg from "../../assets/images/404 img.jpg";
import { Link } from "react-router-dom";
import Oops from "../../assets/images/oops.png";
import LeftArrow from "../../assets/Icons/arrow_left.png";

export default function Error404() {
  return (
    <div className="not-fond-container">
      <div className="not-fond-left-items">
        <img src={Oops} alt="oops" className="not-fond-left-items-oops" />

        <br />

        <h2>404 Not found</h2>

        <br />

        <div className="not-fond-back-items">
          <Link to={"/"}>
            <img src={LeftArrow} alt="oops" />
            <p>Back to home</p>
          </Link>
        </div>
      </div>

      <div className="not-fond-right-items">
        <img src={NotFondImg} alt="" />
      </div>
    </div>
  );
}
