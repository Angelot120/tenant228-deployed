import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function HousingProcessingStep1() {
  const navigate = useNavigate();

  useEffect(() => {
    const isConnected = Cookies.get("conected");
    if (!isConnected) {
      navigate("/login");
    }
  });

  const backHandler = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="steps-progress-container">
      <div className="step-counter">
        <p className="steps-back" onClick={(e) => backHandler(e)}>
          Précédent
        </p>
        <p className="step1">Etape 1</p>
      </div>
      <div className="steps-progress-bar">
        <div className="first-step-progress current-step d-flex">
          <div className="progress-bar d-flex"></div>
          <div className="step-number d-flex">
            <p>1</p>
          </div>

          <div className="progress-bar d-flex"></div>
        </div>

        <div className="second-step-progress d-flex">
          <div className="progress-bar d-flex"></div>
          <div className="step-number d-flex">
            <p>2</p>
          </div>

          <div className="progress-bar d-flex"></div>
        </div>

        <div className="tird-step-progress d-flex">
          <div className="progress-bar d-flex"></div>
          <div className="step-number d-flex">
            <p>3</p>
          </div>

          <div className="progress-bar d-flex"></div>
        </div>
      </div>
    </div>
  );
}

function HousingProcessingStep2() {
  const navigate = useNavigate();

  const backHandler = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  return (
    <div className="steps-progress-container">
      <div className="step-counter">
        <p className="steps-back" onClick={(e) => backHandler(e)}>
          Précédent
        </p>
        <p className="step1">Etape 2</p>
      </div>
      <div className="steps-progress-bar">
        <div className="first-step-progress d-flex">
          <div className="progress-bar d-flex"></div>
          <div className="step-number d-flex">
            <p>1</p>
          </div>

          <div className="progress-bar d-flex"></div>
        </div>

        <div className="second-step-progress current-step d-flex">
          <div className="progress-bar d-flex"></div>
          <div className="step-number d-flex">
            <p>2</p>
          </div>

          <div className="progress-bar d-flex"></div>
        </div>

        <div className="tird-step-progress d-flex">
          <div className="progress-bar d-flex"></div>
          <div className="step-number d-flex">
            <p>3</p>
          </div>

          <div className="progress-bar d-flex"></div>
        </div>
      </div>
    </div>
  );
}

function HousingProcessingStep3() {
  const navigate = useNavigate();

  const backHandler = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="steps-progress-container">
      <div className="step-counter">
        <p className="steps-back" onClick={(e) => backHandler(e)}>
          Précédent
        </p>
        <p className="step1">Etape 3</p>
      </div>
      <div className="steps-progress-bar">
        <div className="first-step-progress d-flex">
          <div className="progress-bar d-flex"></div>
          <div className="step-number d-flex">
            <p>1</p>
          </div>

          <div className="progress-bar d-flex"></div>
        </div>

        <div className="second-step-progress d-flex">
          <div className="progress-bar d-flex"></div>
          <div className="step-number d-flex">
            <p>2</p>
          </div>

          <div className="progress-bar d-flex"></div>
        </div>

        <div className="tird-step-progress current-step  d-flex">
          <div className="progress-bar d-flex"></div>
          <div className="step-number d-flex">
            <p>3</p>
          </div>

          <div className="progress-bar d-flex"></div>
        </div>
      </div>
    </div>
  );
}

export {
  HousingProcessingStep1,
  HousingProcessingStep2,
  HousingProcessingStep3,
};
