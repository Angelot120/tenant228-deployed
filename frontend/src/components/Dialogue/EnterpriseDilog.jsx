import React, { useEffect, useRef, useState } from "react";
import { Input } from "../input/Input";
import Banner from "../../assets/icons/banner-img.jpg";
import "./Dialogue.css";
import MapComponent from "./../../includes/createHousingProcessing/step1/MapComponent";
import { Button } from "../button/Button";
import { toast } from "react-toastify";
import api from "../../api";
import Edit from "../../assets/Icons/edit_bleu_24.png";
import close from "../../assets/Icons/close_24.svg";

export default function EnterpriseDilog() {
  const dialog = useRef();

  // const [companyData, setCompanyData] = useState([]);
  const [comapyName, setComapyName] = useState("");
  const [comapyEmail, setComapyEmail] = useState("");
  const [bannerImg, setBannerImg] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [comapyNum, setComapyNum] = useState("");
  const [comapySector, setComapySector] = useState("");
  const [comapyEmployee, setComapyEmployee] = useState("");
  const [comapySlogan, setComapySlogan] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [logoPreview, setLogoPreview] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapLong, setMapLong] = useState(null);
  const [mapLat, setMapLat] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const res = await api.get("http://127.0.0.1:8000/api/get-company/");
        const data = res.data;
        if (data.length > 0) {
          const company = data[0];
          // setCompanyData(company);
          setComapyName(company.company_name);
          setComapyEmail(company.company_email);
          setComapyNum(company.company_phone_no);
          setComapySector(company.activity_sector);
          setComapyEmployee(company.nb_employees);
          setComapySlogan(company.slogan);
          setDescription(company.description);
          setAddress(company.address);
          setMapLat(company.map_lat);
          setMapLong(company.map_long);
          // setCompanyLogo(company.company_logo);
          setLogoPreview(company.company_logo);
          // setBannerImg(company.banner_img_url);
          setImagePreview(company.banner_img_url);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCompanyData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImg(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompanyLogo(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocationClick = (latlng) => {
    setSelectedLocation(latlng);

    setMapLat(latlng.lat);
    setMapLong(latlng.lng);
  };

  const openHandler = () => {
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };

  const formData = new FormData();

  const submitHandler = () => {
    if (!comapyName) {
      toast.error("Veuillez renseigner le nom de votre entreprise !");
      return;
    } else if (!comapyEmail) {
      toast.error("Veuillez renseigner l'email de votre entreprise !");
      return;
    } else if (!comapyNum) {
      toast.error(
        "Veuillez renseigner le numéro de téléphone de votre entreprise !"
      );
      return;
    } else if (!companyLogo && !logoPreview) {
      toast.error("Veuillez choisir un logo pour de votre entreprise !");
      return;
    } else if (!comapySector) {
      toast.error(
        "Veuillez renseigner le secteur d'activité de votre entreprise !"
      );
      return;
    } else if (!comapyEmployee) {
      toast.error(
        "Veuillez renseigner le nombre d'employées de votre entreprise !"
      );
      return;
    } else if (!comapySlogan) {
      toast.error(
        "Veuillez renseigner le slogan d'employées de votre entreprise !"
      );
      return;
    } else if (!description) {
      toast.error(
        "Veuillez renseigner une description pour la publicitée de votre entreprise !"
      );
      return;
    } else if (!address) {
      toast.error("Veuillez renseigner l'adresse de votre entreprise !");
      return;
    } else if (!mapLong || !mapLat) {
      toast.error(
        "Veuillez choisir l'enplacement de votre entreprise sur la carte !"
      );
      return;
    } else if (!bannerImg && !imagePreview) {
      toast.error(
        "Veuillez choisir l'image de la bannière pour votre entreprise !"
      );
      return;
    }

    formData.append("company_name", comapyName);
    formData.append("company_email", comapyEmail);
    formData.append("company_phone_no", comapyNum);
    // formData.append("company_logo", companyLogo);
    formData.append("activity_sector", comapySector);
    formData.append("nb_employees", comapyEmployee);
    formData.append("slogan", comapySlogan);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("map_long", mapLong);
    formData.append("map_lat", mapLat);
    // formData.append("banner_img_url", bannerImg);

    if (companyLogo) {
      formData.append("company_logo", companyLogo);
    }

    if (bannerImg) {
      formData.append("banner_img_url", bannerImg);
    }

    try {
      api
        .post("http://127.0.0.1:8000/api/create-company/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => toast.success("Entreprise modifiée avec succès !"))
        .catch((error) => {
          console.log(error);
          toast.error("Une erreur est survenue lors de l'enregistrement");
        });

      closeHandler();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <dialog ref={dialog} className="dialogue">
        <div className="admin-mofify-company">
          <div className="dialog-close-btn-container">
            <button
              onClick={closeHandler}
              type="button"
              className="close-dialog-btn"
            >
              <img src={close} alt="close icon" />
            </button>
          </div>

          <h2>Modification des informations sur votre entreprise</h2>

          <Input
            label={"Quelle est le nom de votre enteprise ?"}
            reference={"comapyName"}
            value={comapyName}
            type={"text"}
            onChange={(e) => setComapyName(e.target.value)}
            placeholder={"Le nom de votre entreprise ici ..."}
            className={"form-input"}
          />

          <br />

          <Input
            label={"Quelle est l'email de votre enteprise ?"}
            reference={"comapyEmail"}
            value={comapyEmail}
            type={"email"}
            onChange={(e) => setComapyEmail(e.target.value)}
            placeholder={"L'email de votre entreprise ici ..."}
            className={"form-input"}
          />

          <p>Image de la bannière</p>

          <div className="admin-banner">
            <img
              src={imagePreview || Banner}
              alt="Banner"
              className="admin-comany-banner-img"
            />
          </div>

          <br />
          <div className="admin-company-logo">
            <label htmlFor="file">
              Veuillez choisir une autre image pour la bannière.
            </label>
            <br />
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={handleFileChange}
              className="form-input"
            />
          </div>
          <br />
          <Input
            label={"Quelle est le numero de téléphone de votre enteprise ?"}
            reference={"comapyCompanyNum"}
            value={comapyNum}
            type={"number"}
            onChange={(e) => setComapyNum(e.target.value)}
            placeholder={"Le numero de téléphone ici ..."}
            className={"form-input"}
          />

          <br />

          <Input
            label={"Quelle est votre secteur d'activité ?"}
            reference={"companySector"}
            value={comapySector}
            type={"text"}
            onChange={(e) => setComapySector(e.target.value)}
            placeholder={"Le secteur d'activité ici ..."}
            className={"form-input"}
          />

          <br />

          <Input
            label={"Nombre d'employés de l'entreprise ?"}
            reference={"comapyEmployee"}
            value={comapyEmployee}
            type={"number"}
            onChange={(e) => setComapyEmployee(e.target.value)}
            placeholder={"Le nombre d'employés ici ..."}
            className={"form-input"}
          />

          <br />

          <Input
            label={"Quelle est le slogan de l'entreprise ?"}
            reference={"comapySlogan"}
            value={comapySlogan}
            type={"text"}
            onChange={(e) => setComapySlogan(e.target.value)}
            placeholder={"Le slogan ici ..."}
            className={"form-input"}
          />

          <br />

          <Input
            label={"Quelle est votre adresse ?"}
            reference={"comapyAddres"}
            value={address}
            type={"text"}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={"Votre adress ici ..."}
            className={"form-input"}
          />

          <br />

          <label htmlFor="#">Description de l'entreprise</label>
          <br />
          <textarea
            className="admin-description"
            name="description"
            id=""
            cols="16"
            rows="6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div className="App">
            <MapComponent
              location={selectedLocation}
              onClick={handleLocationClick}
            />
          </div>

          <p>Modifier votre logo</p>
          <div className="admin-company-logo">
            <img
              src={logoPreview || Banner}
              alt="Banner"
              className="comany-logo"
            />
            <br />
            <br />
            <label htmlFor="logo">
              Veuillez choisir une autre image pour la bannière.
            </label>
            <br />
            <input
              type="file"
              id="logo"
              accept="image/*"
              onChange={handleLogoChange}
              className="form-input"
            />
            <br />
            <br />
            <Button onClick={submitHandler} text={"Modifier"} />
          </div>
        </div>
      </dialog>

      <span onClick={openHandler} className="company-edit-btn">
        <img src={Edit} alt="edit" />

        <p>Modifier</p>
      </span>
    </div>
  );
}
