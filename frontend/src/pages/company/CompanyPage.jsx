import React, { useEffect, useState } from "react";
import bannerImg from "../../assets/Icons/banner-img.jpg";
import bannerLogo from "../../assets/Hotel-logo.jpg";
import catIcon from "../../assets/icons/profile_user.svg";
import "./company.css";
import api from "../../api";
import HousingCard from "../../components/HousingCard/HousingCard";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, PinkButton } from "../../components/button/Button";
import Footer from "../../includes/footer/Footer";
import HomeMenu from "../../includes/header/HomeMenu";
import ShowMap from "../../components/map/ShowMap";
import LoadingIndicators from "../../components/Loading/LoadingIndicators";
import CompanyLoading from "../../components/Loading/CompanyLoading";

export default function CompanyPage() {
  const [loading, setLoading] = useState(true);
  const [allHousing, setAllHousing] = useState([]);
  const [housingImages, setHousingImages] = useState([]);
  const [housingPrice, setHousingPrice] = useState([]);
  const [company, setCompany] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [quantity, setQantity] = useState(12);
  const [userId, setUserId] = useState("");

  const location = useLocation();
  const { state } = location;
  const id = state ? state.id : null;

  useEffect(() => {
    setLoading(true);
    const fetchHousing = async () => {
      const fechCompany = (id) => {
        api
          .get(`http://localhost:8000/api/get-company/${id}/`)
          .then((res) => res.data)
          .then((data) => {
            // console.log("company", data[0]);
            setCompany(data[0]);
          });
      };

      fechCompany(id);

      const fechSubscribe = (id) => {
        api
          .get(`http://localhost:8000/api/get-subscription/${id}/`)
          .then((res) => res.data)
          .then((data) => {
            // console.log("subscribed", data);
            setSubscribers(data);
          });
      };

      const fetchUser = () => {
        api
          .get("api/get-user/")
          .then((res) => res.data)
          .then((data) => {
            // console.log("User ", data);
            setUserId(data.id);
          })
          // .catch((err) => console.log(err));
      };

      fetchUser();

      fechSubscribe(id);

      try {
        const response = await api.get(
          `http://localhost:8000/api/get-filtered-housing-company/${id}`
        );
        setAllHousing(response.data);
        // console.log("Housing", response.data);
        const imagesData = await fetchHousingImages(response.data);
        const pricingData = await fetchHousingPricing(response.data);
        setHousingImages(imagesData);
        setHousingPrice(pricingData);
      } catch (err) {
        // console.log(err);
        // toast.error("Une erreur est survenue lors du chargement des données !");
      }
    };

    const fetchHousingImages = async (housingData) => {
      const imagesPromises = housingData.map(async (housing) => {
        try {
          const response = await api.get(
            `http://localhost:8000/api/create-housing-img/${housing.housing_img_id[0]}`
          );
          // console.log(response.data);
          return response.data;
        } catch (err) {
          // console.log(err);
          // toast.error(
          //   "Une erreur est survenue lors du chargement des images !"
          // );
          return null;
        }
      });
      return Promise.all(imagesPromises);
    };

    const fetchHousingPricing = async (housingData) => {
      const pricingPromises = housingData.map(async (housing) => {
        if (housing.house_pricing_id) {
          try {
            const response = await api.get(
              `http://localhost:8000/api/create-house-pricing/${housing.house_pricing_id}`
            );
            // console.log(response.data);
            return response.data;
          } catch (err) {
            // console.log(err);
            // toast.error(
            //   "Une erreur est survenue lors du chargement des prix !"
            // );
            return null;
          } finally {
            setLoading(false);
          }
        }
      });
      return Promise.all(pricingPromises);
    };

    fetchHousing();
  }, []);

  const moreHandler = () => {
    setQantity((prev) => prev * 2);
  };

  const navigate = useNavigate();

  const showDetailsHandler = (e, id) => {
    e.preventDefault();
    // console.log(id);
    navigate(`/housing-details/${id}`, {
      state: {
        id: id,
      },
    });
  };

  const handleSubscribe = async (id) => {
    const fromData = new FormData();
    fromData.append("company_id", id);

    try {
      const response = await api.post(
        "http://localhost:8000/api/create-subscription/",
        fromData
      );
      // console.log(response.data);
    } catch (error) {
      // console.error("Erreur lors de la souscription :", error);
      // toast.error("Erreur lors de la souscription...");
    }
  };

  console.log(company);

  const isSubscribed =
    Array.isArray(subscribers) &&
    subscribers.some((subscriber) => subscriber.user_id == userId);

  return (
    <div>
      <HomeMenu />
      <br />
      <br />
      <br />
      <br />

      {loading ? (
        <div className="banner-items">
          <CompanyLoading />
        </div>
      ) : (
        <div className="banner-items">
          <img
            src={company.banner_img_url || bannerImg}
            alt="Banner"
            className="company-banner"
          />
          <span className="company-logo-items">
            <img
              src={company.company_logo || bannerLogo}
              alt="Banner"
              className="company-logo"
            />

            <div>
              <br />
              <br />
              <h2>{company.company_name}</h2>
              <p>{company.slogan}</p>
            </div>
          </span>
        </div>
      )}

      <br />
      <div className="company-page-housings">
        {!loading && (
          <h1>Découvrez les logements publiés par cet entreprise</h1>
        )}
        {/* 
        <div className="company-page-categories d-flex">
          <div className="company-category-card d-flex">
            <img src={catIcon} alt="Category" />
            <p>Tous</p>
          </div>
          <div className="company-category-card d-flex">
            <img src={catIcon} alt="Category" />
            <p>Cabanes</p>
          </div>
          <div className="company-category-card d-flex">
            <img src={catIcon} alt="Category" />
            <p>Maison à la plage</p>
          </div>
          <div className="company-category-card d-flex">
            <img src={catIcon} alt="Category" />
            <p>Camping</p>
          </div>
          <div className="company-category-card d-flex">
            <img src={catIcon} alt="Category" />
            <p>Villa</p>
          </div>
        </div> */}

        {loading ? (
          <div className="housings-container">
            <LoadingIndicators />
          </div>
        ) : (
          <div className="housings-container">
            {allHousing.map((housing, index) => (
              <div
                key={housing.id}
                onClick={(e) => showDetailsHandler(e, housing.id)}
                className="housing-item"
              >
                {quantity >= index + 1 ? (
                  <div>
                    {housingPrice[index] ? (
                      <div>
                        <HousingCard
                          imgUrl={
                            housingImages[index]
                              ? housingImages[index].image_url
                              : ""
                          }
                          title={housing.title}
                          price={
                            housingPrice[index].payment_by_night
                              ? `${housingPrice[index].price_by_night} Xof/nuit`
                              : housingPrice[index].price_by_week
                              ? `${housingPrice[index].payment_by_week} Xof/semaine`
                              : housingPrice[index].payment_by_month
                              ? `${housingPrice[index].price_by_month} Xof/mois`
                              : housingPrice[index].for_sale_pricing
                              ? `${housingPrice[index].for_sale_pricing} Xof (vente)`
                              : "No price"
                          }
                          roomCount={housing.nb_room}
                          town={housing.town}
                        />
                      </div>
                    ) : (
                      // "No price"
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
                <br />
                <br />
                <br />
              </div>
            ))}
          </div>
        )}
      </div>

      {!loading && (
        <div>
          <div className="home-show-more-session">
            <Button text={"Afficher plus"} onClick={moreHandler} />
          </div>

          <div className="company-contact-session">
            <h3>Rentrons en contact</h3>
            <div className="company-contact-all">
              <div className="company-contact-left">
                <ShowMap mapLat={company.map_lat} mapLong={company.map_long} />
              </div>

              <div className="company-contact-right">
                <p>
                  <b>Email: </b>
                  <a href="mailto:rivera@gmail.com">{company.company_email}</a>
                </p>
                <p>
                  <b>Numéro de téléphone: </b>
                  <a href={`tel:${company.company_phone_no}`}>
                    {company.company_phone_no}
                  </a>
                </p>
                {/* <p>
                  <b>Site web: </b>
                  <a href="www.rivera.com">www.rivera.com</a>
                </p> */}
                <p>
                  <b>Adresse: </b>
                  {company.address}
                </p>
              </div>
            </div>

            <p>{company.description}</p>
          </div>

          <div className="company-subscribe-session">
            <h4>
              {Array.isArray(subscribers) ? `${subscribers.length}` : "0"}{" "}
              abonnée
              {Array.isArray(subscribers) && subscribers.length > 1 && "s"}
            </h4>

            <PinkButton
              text={isSubscribed ? "abonné" : "S'abonner"}
              onClick={() => handleSubscribe(company.id)}
              disabled={isSubscribed}
            />

            {/* <PinkButton
              text={
                Array.isArray(subscribers) &&
                subscribers.some((subscriber) => subscriber.user_id === userId)
                  ? "abonné"
                  : "S'abonner"
              }
              onClick={() => handleSubscribe(company.id)}
              disabled={
                Array.isArray(subscribers) &&
                subscribers.some((subscriber) => subscriber.user_id === userId)
              }
            /> */}
          </div>

          <br />
          <br />
          <Footer />
        </div>
      )}
    </div>
  );
}
