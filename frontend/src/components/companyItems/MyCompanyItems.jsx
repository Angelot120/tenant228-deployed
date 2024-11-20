import React, { useEffect, useState } from "react";
import EnterpriseDilog from "../Dialogue/EnterpriseDilog";
import Banner from "../../assets/icons/banner-img.jpg";
import Logo from "../../assets/logo/Tenant288.png";
import { ToastContainer } from "react-toastify";
import api from "../../api";
import ShowMap from "../map/ShowMap";
import { useNavigate } from "react-router-dom";
import PreviewIcon from "../../assets/Icons/visibility_yellow_24.svg";

export default function MyCompanyItems() {
  const [company, setCompany] = useState([]);
  const [provider, setProvider] = useState([]);

  useEffect(() => {
    api
      .get("http://127.0.0.1:8000/api/get-company/")
      .then((res) => res.data)
      .then((data) => {
        console.log(data[0]);
        setCompany(data[0]);
      })
      .catch((err) => console.log(err));

    api
      .get("http://127.0.0.1:8000/api/get-provider/")
      .then((res) => res.data)
      .then((data) => {
        setProvider(data[0]);
      });
  }, []);

  const navigate = useNavigate();

  const handlerSubmit = (e, id) => {
    e.preventDefault();
    navigate(`/show-company/${id}`, {
      state: {
        id: id,
      },
    });
  };

  return (
    <div className="admin-company">
      <ToastContainer stacked position="bottom-left" />
      <br />
      <div className="company-top-items">
        <EnterpriseDilog />

        <span
          className="company-preview-btn"
          onClick={(e) => handlerSubmit(e, company.id)}
        >
          <p>Prévisualiser</p>
          <img src={PreviewIcon} alt="view" />
        </span>
      </div>

      <h1 className="admin-company-name">
        {company?.company_name || "Hôtel Tenant 228"}
      </h1>

      <div className="admin-banner">
        <p>Image de la bannière</p>
        <div>
          <img
            src={company?.banner_img_url || Banner}
            alt="Banner Img"
            className="admin-comany-banner-img"
          />
        </div>
      </div>

      <div className="companies-info">
        <p>Email: {company?.company_email || "tenant228@gmail.com"}</p>
        <br />
        <p>
          Numéro de téléphone: {company?.company_phone_no || "00 228 901743 77"}
        </p>
        <br />
        <p>Secteur d'activité: {company?.activity_sector || "Immobilier"}</p>
        <br />
        <p>Nombre d'emplyés: {company?.nb_employees || "17"}</p>
        <br />
        <p>Slogan: {company?.slogan || "votre satisfaction notre surire !"}</p>

        <br />

        <p>
          Description:{" "}
          {company?.description ||
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati minus cum, tenetur quod voluptas maxime consequatur illum, veritatis deleniti eligendi dolore a! Ullam dolorem ut odit quas molestias eaque voluptatum."}
        </p>

        <br />

        <p>
          Adresse: {company?.address || "Rue des Guépiers, Bè-Kpota, Lomé-Togo"}
        </p>

        <br />
        <br />

        <p>Votre localisation</p>

        <ShowMap mapLat={company?.map_lat} mapLong={company?.map_long} />

        <br />

        <p>Votre Logo: </p>

        <div className="admin-company-logo">
          <img
            src={company?.company_logo || Logo}
            alt="Votre Logo"
            className="comany-logo"
          />
        </div>

        <p>Catégorie :</p>
        <div className="admin-comany-category">
          {provider?.whoAreYou && <p>{provider.company_type}</p>}
        </div>
        <br />
      </div>
    </div>
  );
}
