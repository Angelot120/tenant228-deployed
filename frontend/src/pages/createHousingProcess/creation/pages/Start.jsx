import React from "react";
import HousingProcessingMenu from "../../menu/HousingProcessingMenu";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../../../../components/button/Button";
import "./Start.css";
import banner from "../../../../assets/Icons/banner-img.jpg";
import Footer from "../../../../includes/footer/Footer";
import motiv from "../../../../assets/images/Create-housing-motiv.png";

export default function Start() {
  const navigate = useNavigate();
  const navigateHandler = (e) => {
    e.preventDefault();

    navigate("/processing/create-housing/start");
  };
  return (
    <div>
      <HousingProcessingMenu
        to={"/"}
        text={"Commancer"}
        onClick={navigateHandler}
      />
      <br />
      <br />
      <br />
      <br />
      <div className="start-publishing-banner-items">
        <div>
          <p>Publiez vos logements sur</p>

          <h1>Tenant 228</h1>

          <Button text={"En cliquant ici"} onClick={navigateHandler} />
          <br />
          <br />
        </div>

        <div>
          <img src={banner} alt="Banner img" />
        </div>
      </div>

      <br />
      <br />

      <div className="start-publishing-after-banner">
        <h4>
          Lancez-vous dès maintenant et exposez vous logements en ligne et
          trouvez des clients plus rapidement.
        </h4>

        <h2>
          Vous pourriez gagner jusqu’à 100,000 Xof par nuit sur un logment
        </h2>

        <Button text={"Je me lance"} onClick={navigateHandler} />
      </div>

      <br />
      <br />

      <div className="start-publishing-image">
        <img src={motiv} alt="" />
      </div>

      <br />
      <br />

      <Footer />
    </div>
  );
}
