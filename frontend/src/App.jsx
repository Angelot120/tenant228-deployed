import { useEffect, useState } from "react";
import HomeMenu from "./includes/header/HomeMenu";
import HousingCard from "./components/HousingCard/HousingCard";
import axios from "axios";
import api from "./api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "./includes/footer/Footer";
import Banner from "./assets/Icons/banner-img.jpg";
import providerImage from "./assets/images/home img.jpg";
import check from "./assets/Icons/task_alt_yellow_24.png";
import close from "./assets/Icons/close_pink_24.png";
import { Button, OutlineButton } from "./components/button/Button";
import Cookies from "js-cookie";
import LoadingIndicators from "./components/Loading/LoadingIndicators";

function App() {
  const [loading, setLoading] = useState(true);

  const [allHousing, setAllHousing] = useState([]);
  const [housingImages, setHousingImages] = useState([]);
  const [housingPrice, setHousingPrice] = useState([]);
  const texts = [
    "Bienvenue sur",
    "Il y a tous types de logements sur",
    "Commancez par publier vos logements sur",
  ];
  const [count, setCount] = useState(0);
  const [index, setIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [quantity, setQantity] = useState(12);
  const navigate = useNavigate();

  useEffect(() => {
    const isConnected = Cookies.get("conected");
    if (!isConnected) {
      navigate("/login");
    }

    const fetchHousing = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          "http://localhost:8000/api/create-housing/"
        );
        setAllHousing(response.data);
        // console.log(response.data);
        const imagesData = await fetchHousingImages(response.data);
        const pricingData = await fetchHousingPricing(response.data);
        setHousingImages(imagesData);
        setHousingPrice(pricingData);
      } catch (err) {
        // console.log(err);
        toast.error("Une erreur est survenue lors du chargement des données !");
      } finally {
        // setLoading(false);
      }
    };

    const fetchHousingImages = async (housingData) => {
      // setLoading(true);
      const imagesPromises = housingData.map(async (housing) => {
        try {
          const response = await api.get(
            `http://localhost:8000/api/create-housing-img/${housing.housing_img_id[0]}`
          );
          // console.log(response.data);
          return response.data;
        } catch (err) {
          // console.log(err);
          toast.error(
            "Une erreur est survenue lors du chargement des images !"
          );
          return null;
        } finally {
          // setLoading(false);
        }
      });
      return Promise.all(imagesPromises);
    };

    const fetchHousingPricing = async (housingData) => {
      // setLoading(true);
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
            toast.error(
              "Une erreur est survenue lors du chargement des prix !"
            );
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

  useEffect(() => {
    const type = () => {
      if (count === texts.length) {
        setCount(0);
      }

      const text = texts[count];
      const letter = text.slice(0, index + 1);
      setCurrentText(letter);

      if (letter.length === text.length) {
        setCount(count + 1);
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    };

    const timer = setTimeout(type, 150);
    return () => clearTimeout(timer);
  }, [count, index, texts]);

  const moreHandler = () => {
    setQantity((prev) => prev * 2);
  };

  const showDetailsHandler = (e, id, housingPrice) => {
    e.preventDefault();
    // console.log(id);
    navigate(`/housing-details/${id}`, {
      state: {
        id: id,
        housingPrice: housingPrice,
      },
    });
  };

  const handleSubmit = async () => {
    if (!selectedPlan) {
      alert("Veuillez sélectionner un plan.");
      return;
    }

    const data = {
      plan: selectedPlan,
      total: plans.find((p) => p.id === selectedPlan).price,
      payment: paymentMethod,
      payment_number: paymentNumber,
    };

    try {
      const response = await axios.post(
        "http://ton-api-url/subscription",
        data
      );
      // Redirection vers PayGates
      window.location.href = response.data.redirect_url;
    } catch (error) {
      console.error("Erreur lors de la souscription:", error);
      alert(
        "Une erreur est survenue lors de la souscription. Veuillez réessayer."
      );
    }
  };

  const handlePayment = (planId, amount, description) => {
    window.CinetPay.setConfig({
      apikey: "8543217556712c8c66d2324.51585463",
      site_id: "5881741",
      notify_url: "https://mondomaine.com/notify/",
      close_after_response: true,
      mode: "Test",
    });

    window.CinetPay.getCheckout({
      transaction_id: planId,
      amount: amount,
      currency: "XOF",
      channels: "ALL",
      description: description,
      customer_name: "Joe",
      customer_surname: "Down",
      customer_email: "down@test.com",
      customer_phone_number: "088767611",
      customer_address: "BP 0024",
      customer_city: "Antananarivo",
      customer_country: "CM",
      customer_state: "CM",
      customer_zip_code: "06510",
    });

    window.CinetPay.onClose(function (data) {
      if (data.status === "REFUSED") {
        alert("Votre paiement a échoué");
      } else if (data.status === "ACCEPTED") {
        alert("Votre paiement a été effectué avec succès");
      } else {
        alert("Fermeture du guichet");
      }
      window.location.reload();
    });

    window.CinetPay.onError(function (data) {
      // console.log(data);
    });
  };

  return (
    <>
      <div className="housing-item illuminate">{/* Contenu de la div */}</div>

      <HomeMenu />
      <br />
      <br />

      {loading ? (
        <div className="home-full-banner">
          <div className="home-banner skeleton"></div>
        </div>
      ) : (
        <div className="home-full-banner">
          <div className="home-banner">
            {/* <img src={Banner} alt="Banner" className="home-banner-img" /> */}
            <div>
              <h1>
                <span id="text">{currentText}</span>{" "}
                <span className="cursor">|</span>{" "}
                <span className="banner-tenant">Tenant228,</span>
              </h1>
              <p>
                Commancez par rechercher les logements qui vous sont adéquat
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="after-home-banner">
        {loading ? (
          <div className="skeleton-details-adress skeleton"></div>
        ) : (
          <h2>Trouvez les meilleurs logements sur Tenant228</h2>
        )}
      </div>
      <div className="housings-container">
        {loading ? (
          <LoadingIndicators />
        ) : (
          <div className="housings-container">
            {allHousing.map((housing, index) => (
              <div
                key={housing.id}
                onClick={(e) =>
                  showDetailsHandler(e, housing.id, housingPrice[index])
                }
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

      {loading ? (
        ""
      ) : (
        <div>
          <div className="home-show-more-session">
            <Button text={"Afficher plus"} onClick={moreHandler} />
          </div>

          <div className="after-housings-session">
            <div>
              <h2>
                Commancer par gagner gros en publiant vos logements sur
                Tenant228
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quibusdam ut est nulla eius tempore voluptate, praesentium
                aliquid veritatis animi consectetur optio nesciunt beatae quos
                expedita odit porro sint error labore!
              </p>
            </div>

            <div className="after-housings-right-session">
              <div className="provider-image-container">
                <img src={providerImage} alt="" className="provider-image" />
              </div>
            </div>
          </div>

          <div className="payment-session">
            <div className="payment-first-session">
              <p>
                Vous êtes une entreprise immobilère, un hôtel ou un particulier
                ? Alors ça tombe bien pour
              </p>
              <h1>
                Profiter des <span>100 jours</span> d'éssaie gratuit
              </h1>
            </div>

            <div className="payment-last-session">
              <div className="payment-last-session-top-items">
                <p>
                  Profitez de la visibillitée de la plate-forme pour attirer
                  plus de clients en choissant un plan.
                </p>
              </div>
              <div className="payment-last-session-bottom-items">
                <div className="particular-plan">
                  <h3>Particulier</h3>
                  <p>Le plan rêvé des particuliers</p>
                  <h2 className="plan-price">5.000 Xof / mois</h2>

                  <br />
                  <br />

                  <div className="plan-advantages">
                    <div className="plan-advantage">
                      <img
                        src={check}
                        alt="check"
                        className="plan-ckeck-icon"
                      />
                      <p>Publier j'usqu'à trois logements</p>
                    </div>
                    <div className="plan-advantage">
                      <img
                        src={close}
                        alt="check"
                        className="plan-ckeck-icon"
                      />
                      <p>Créer son entreprise en ligne</p>
                    </div>
                    <div className="plan-advantage">
                      <img
                        src={close}
                        alt="check"
                        className="plan-ckeck-icon"
                      />
                      <p>Avoir des abonnés</p>
                    </div>
                    <br />

                    <OutlineButton
                      text={"Je choisis ce plan"}
                      onClick={() =>
                        handlePayment(
                          "plan-particulier",
                          5000,
                          "Particulier - Le plan rêvé des particuliers"
                        )
                      }
                    />
                  </div>
                  <br />
                </div>
                <div className="company-first-plan">
                  <br />
                  <h3>Entreprise</h3>
                  <p className="best-plan-txt">
                    Le bon plan pour les entreprises
                  </p>
                  <h2 className="plan-price">135.000 Xof / ans</h2>

                  <br />
                  <br />

                  <div className="plan-advantages">
                    <div className="plan-advantage">
                      <img
                        src={check}
                        alt="check"
                        className="plan-ckeck-icon"
                      />
                      <p>Publication illimitée de logements</p>
                    </div>
                    <div className="plan-advantage">
                      <img
                        src={check}
                        alt="check"
                        className="plan-ckeck-icon"
                      />
                      <p>Créer son entreprise en ligne</p>
                    </div>
                    <div className="plan-advantage">
                      <img
                        src={check}
                        alt="check"
                        className="plan-ckeck-icon"
                      />
                      <p>Avoir des abonnés</p>
                    </div>
                    <br />
                    <Button
                      text={"Je chousins ce plan"}
                      onClick={() =>
                        handlePayment(
                          "plan-Entreprise",
                          135000,
                          "Entreprise - Le plan rêvé des entreprises"
                        )
                      }
                    />
                  </div>
                </div>
                <div className="company-second-plan">
                  <h3>Entreprise</h3>
                  <p>Idéale pour les entreprises</p>
                  <h2 className="plan-price">15.000 Xof / mois</h2>

                  <br />
                  <br />

                  <div className="plan-advantages">
                    <div className="plan-advantage">
                      <img
                        src={check}
                        alt="check"
                        className="plan-ckeck-icon"
                      />
                      <p>Publication illimitée de logements</p>
                    </div>
                    <div className="plan-advantage">
                      <img
                        src={check}
                        alt="check"
                        className="plan-ckeck-icon"
                      />
                      <p>Créer son entreprise en ligne</p>
                    </div>
                    <div className="plan-advantage">
                      <img
                        src={check}
                        alt="check"
                        className="plan-ckeck-icon"
                      />
                      <p>Avoir des abonnés</p>
                    </div>
                  </div>
                  <br />
                  <br />
                  <OutlineButton
                    text={"Je choisis ce plan"}
                    onClick={() =>
                      handlePayment(
                        "plan-entreprise",
                        15000,
                        "Entreprise - L'un des plans préféré des entreprise."
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />
          <br />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
