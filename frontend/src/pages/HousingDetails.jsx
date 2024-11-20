import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import api from "../api";
import ShowMap from "../components/map/ShowMap";
import { HousingOrderDialogBox } from "../components/Dialogue/InfoDialogueBox";
import ShowHousingImages from "../components/Dialogue/ShowHousingImages";
import HomeMenu from "../includes/header/HomeMenu";
import locationImg from "../assets/Icons/home_pin_24.png";
import checkIcon from "../assets/Icons/check_circle_24.png";
import { PinkButton } from "../components/button/Button";
import Footer from "../includes/footer/Footer";
import HousingCard from "../components/HousingCard/HousingCard";
import DetailsLoading from "../components/Loading/DetailsLoading";

export default function HousingDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const { state } = location;
  const id = state ? state.id : null;
  const housingPricing = state ? state.housingPricing : null;

  const [loading, setLoading] = useState(true);
  const [housing, setHousing] = useState([]);
  const [housingImg, setHousingImg] = useState([]);
  const [price, setPrice] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [roomImages, setRoomImages] = useState([]);
  const [usefullEquipements, setUsefullEquipements] = useState([]);
  const [nearestLocation, setNearestLocation] = useState([]);
  const [outstandingEq, setOutstandingEq] = useState([]);
  const [secEq, setSecEq] = useState([]);
  const [advantages, setAdvantages] = useState([]);
  const [basicSuppliers, setBasicSuppliers] = useState([]);
  const [includedServ, setIncludedServ] = useState([]);
  const [company, setCompany] = useState([]);
  const [allHousing, setAllHousing] = useState([]);
  const [housingImages, setHousingImages] = useState([]);
  const [housingPrice, setHousingPrice] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    // console.log("Price", housingPricing);
    // console.log(id);
    setLoading(true);
    const fechCompany = (id) => {
      api
        .get(`http://localhost:8000/api/get-company/${id}/`)
        .then((res) => res.data)
        .then((data) => {
          // console.log("company", data);
          setCompany(data);
        });
    };

    fechCompany(id);

    const fetchHousing = async () => {
      if (!id) return toast.error("L'Id du logement non trouvé");

      try {
        const res = await api.get(
          `http://localhost:8000/api/create-housing/${id}/`
        );
        const data = res.data;
        setHousing(data);

        const pricingData = await fetchHousingPricing(data);
        // setPrice(pricingData ? pricingData : null);

        const imageIds = data.housing_img_id || [];
        const imagePromises = imageIds.map((imgId) =>
          api.get(`http://localhost:8000/api/create-housing-img/${imgId}`)
        );
        const imageResponses = await Promise.all(imagePromises);
        setHousingImg(imageResponses.map((res) => res.data));
      } catch (err) {
        console.error(err);
        // toast.error("Une erreur est survenue lors du chargement des données !");
      }
    };

    const fetchHousingPricing = async (housingData) => {
      if (housingData.house_pricing_id) {
        try {
          const response = await api.get(
            `http://localhost:8000/api/create-house-pricing/${housingData.house_pricing_id}/`
          );

          // console.log("Pricing", response.data);
          setPrice(response.data);
          return response.data;
        } catch (err) {
          console.error(err);
          toast.error("Une erreur est survenue lors du chargement des prix !");
          return null;
        } finally {
          // setLoading(false);
        }
      }
      return null;
    };

    fetchHousing();
  }, [id]);

  useEffect(() => {
    // setLoading(true);
    const fetchRoomData = async () => {
      if (!housing.room_id || housing.room_id.length === 0) return;

      try {
        const roomPromises = housing.room_id.map((id) =>
          api.get(`api/get-room-detail/${id}/`).then((res) => res.data)
        );
        const roomData = await Promise.all(roomPromises);
        setRooms(roomData);
      } catch (err) {
        console.error(err);
        // toast.error(
        //   "Une erreur est survenue lors de la récupération des chambres"
        // );
      } finally {
        // setLoading(false);
      }
    };

    fetchRoomData();
  }, [housing]);

  useEffect(() => {
    // setLoading(true);
    const fetchRoomImages = async () => {
      if (rooms.length === 0) return;

      try {
        const roomImagePromises = rooms.flatMap((room) =>
          room.room_img_id.map((id) =>
            api.get(`api/get-room-img/${id}/`).then((res) => res.data)
          )
        );
        const roomImageData = await Promise.all(roomImagePromises);
        setRoomImages(roomImageData);
      } catch (err) {
        console.error(err);
        // toast.error(
        //   "Une erreur est survenue lors de la récupération des images des chambres"
        // );
      } finally {
        setLoading(false);
      }
    };
    fetchRoomImages();
  }, [rooms]);

  const fetchDataForArray = async (array, endpoint, setData) => {
    if (!array || array.length === 0) return;

    try {
      const promises = array.map((id) =>
        api.get(`${endpoint}/${id}/`).then((res) => res.data)
      );
      const data = await Promise.all(promises);
      setData(data);
    } catch (err) {
      console.error(err);
      // toast.error(
      //   "Une erreur est survenue lors de la récupération des données !"
      // );
    }
  };

  useEffect(() => {
    fetchDataForArray(
      housing.nearest_location_id,
      "api/get-nearest-locations",
      setNearestLocation
    );
  }, [housing.nearest_location_id]);

  useEffect(() => {
    fetchDataForArray(
      housing.outstanding_equipments_id,
      "api/create-outstanding-equipments",
      setOutstandingEq
    );
  }, [housing.outstanding_equipments_id]);

  useEffect(() => {
    fetchDataForArray(
      housing.security_equipments_id,
      "api/create-security-equipments",
      setSecEq
    );
  }, [housing.security_equipments_id]);

  useEffect(() => {
    fetchDataForArray(
      housing.advantages_id,
      "api/create-advantages",
      setAdvantages
    );
  }, [housing.advantages_id]);

  useEffect(() => {
    fetchDataForArray(
      housing.basic_suppliers_id,
      "api/create-basic-suppliers",
      setBasicSuppliers
    );
  }, [housing.basic_suppliers_id]);

  useEffect(() => {
    fetchDataForArray(
      housing.included_services_id,
      "api/get-included-services",
      setIncludedServ
    );
  }, [housing.included_services_id]);

  useEffect(() => {
    // console.log("Fetching useful equipments:", housing.usefull_eq_id);
    fetchDataForArray(
      housing.usefull_eq_id,
      "api/create-usefull-equipments",
      setUsefullEquipements
    );
  }, [housing.usefull_eq_id]);

  // Logements de même type

  useEffect(() => {
    const fetchCategory = async () => {
      if (housing.housing_category_id) {
        try {
          api
            .get(`api/create-housing-category/${id}/`)
            .then((res) => res.data)
            .then((data) => {
              setCategory(data);
              // console.log("Category ", data);
            });
        } catch (err) {
          console.error(err);
          toast.error(
            "Une erreur est survenue lors de la récupération des chambres"
          );
        }
      }
    };

    fetchCategory();
  }, [housing.housing_category_id]);

  useEffect(() => {
    if (housing.housing_category_id) {
      const fetchHousing = async () => {
        try {
          const response = await api.get(
            `http://localhost:8000/api/get-categoric-housing/${housing.housing_category_id}/`
          );
          if (Array.isArray(response.data)) {
            setAllHousing(response.data);
            const imagesData = await fetchHousingImages(response.data);
            const pricingData = await fetchHousingPricing(response.data);
            setHousingImages(imagesData);
            setHousingPrice(pricingData);
          } else {
            console.error("Données inattendues :", response.data);
            setAllHousing([]); // Assure-toi que c'est un tableau
          }
          // console.log("allHousing", response.data);
        } catch (err) {
          // console.log(err);
          // toast.error(
          //   "Une erreur est survenue lors du chargement des données !"
          // );
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
              // console.log("Pricing", response.data);
              return response.data;
            } catch (err) {
              // console.log(err);
              // toast.error(
              //   "Une erreur est survenue lors du chargement des prix !"
              // );
              return null;
            }
          }
        });

        return Promise.all(pricingPromises);
      };

      fetchHousing();
    }
  }, []);

  const countImages = roomImages.length + housingImg.length;

  const showCompanyHandler = (e, id) => {
    e.preventDefault();
    navigate(`/show-company/${id}`, {
      state: {
        id: id,
      },
    });
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      // hour: "2-digit",
      // minute: "2-digit",
      // second: "2-digit",
    });
  };

  return (
    <div>
      {/* <ToastContainer stacked position="bottom-left" /> */}
      <HomeMenu />
      <br />
      <br />
      <br />
      <br />
      {/* <h1>Details {id}</h1> */}
      {loading ? (
        <DetailsLoading />
      ) : (
        <div className="housing-detail-container">
          {housing ? (
            <div>
              <div className="detail-location-session">
                <div className="detail-location-left-items">
                  <img
                    src={locationImg}
                    alt="location"
                    className="location-logo"
                  />
                  <p>
                    {housing.address}, {housing.municipality}, {housing.town},{" "}
                    {housing.country}
                  </p>
                </div>

                <p>
                  {category.category_name},{" "}
                  {price.for_sale_pricing && "à vendre"}
                  {price.payment_by_night ||
                  price.payment_by_week ||
                  price.payment_by_month ? (
                    <>{price.for_sale_pricing && " & "}à louer</>
                  ) : null}
                </p>
              </div>

              {housingImg.length > 0 ? (
                <div className="housing-details-images-container">
                  <div className="housing-details-left">
                    {housingImg[0] && (
                      <img
                        src={housingImg[0].image_url}
                        alt="Housing Img 1"
                        className="housing-detail-img"
                      />
                    )}
                  </div>
                  <div className="housing-details-right">
                    <div className="housing-details-right-top">
                      {housingImg[1] && (
                        <img
                          src={housingImg[1].image_url}
                          alt="Housing Img 2"
                          className="housing-detail-img"
                        />
                      )}
                    </div>
                    <div className="housing-details-right-bottom">
                      {housingImg[2] && (
                        <img
                          src={housingImg[2].image_url}
                          alt="Housing Img 3"
                          className="housing-detail-img detail-img-height"
                        />
                      )}
                      {housingImg[3] && (
                        <img
                          src={housingImg[3].image_url}
                          alt="Housing Img 4"
                          className="housing-detail-img"
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="baloo">
                      {housing.all_nb_bed} chambre
                      {housing.all_nb_bed > 1 && "s"}
                    </p>

                    <p className="baloo">
                      {housing.all_nb_bed} Lit{housing.all_nb_bed > 1 && "s"}
                    </p>

                    <br />
                    <br />
                    <br />

                    <p>{countImages} images disponible</p>

                    <ShowHousingImages
                      housingImages={housingImg}
                      rooms={rooms}
                      roomImages={roomImages}
                    />
                  </div>
                </div>
              ) : (
                <p>Aucune image disponible.</p>
              )}
              <br />
              <br />
              <br />
              <div>
                <h1>{housing.title}</h1>
                <br />
                <br />
                <div className="detail-center-items">
                  <div>
                    <p>{housing.bref_description}</p>
                    {usefullEquipements.length > 0 && (
                      <div className="detail-options-container">
                        {usefullEquipements.map((usefullEquipement, index) => (
                          <div className="detail-options-card" key={index}>
                            <img
                              src={usefullEquipement.usefull_equipment_img_url}
                              alt="icon"
                              className="detail-options-card-img"
                            />

                            <p>{usefullEquipement.usefull_equipment_name}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="detail-card">
                      <h4>
                        {price.payment_by_night
                          ? `${price.price_by_night} Xof/nuit,`
                          : ""}{" "}
                        {price.payment_by_week
                          ? `${price.price_by_week} Xof/semaine,`
                          : ""}{" "}
                        {price.payment_by_month
                          ? `${price.price_by_month} Xof/mois,`
                          : ""}{" "}
                        {price.for_sale_pricing
                          ? `${price.for_sale_pricing} Xof prix de vente`
                          : ""}
                      </h4>
                      <p>
                        {price.for_sale_pricing_discussed
                          ? "Prix de vente à débattre."
                          : "Prix de vente à ne pas débattre."}
                      </p>
                      {price.for_sale_pricing && (
                        <p>
                          Paiemant en ligne {price.on_line_payment ? "" : "pas"}{" "}
                          possible
                        </p>
                      )}
                      <p>
                        Annulation{" "}
                        {price.cancellation_price_available
                          ? "payante."
                          : "gratuite."}
                      </p>
                      <p>
                        {price.cancellation_price_available &&
                          price.cancellation_price}
                      </p>
                      <br />
                      <div className="justify-content-center">
                        <HousingOrderDialogBox
                          price={price}
                          text={"Commander"}
                          housingId={id}
                          specialRequest={housing.special_request}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                {housing.housing_kind}: {housing.nb_people} Personne
                {housing.nb_people === 1 ? "" : "s"} maximum |{" "}
                {housing.allow_child
                  ? "Enfants autorisées"
                  : "Enfants non autorisés"}
              </p>
              <p>Logement {housing.housing_empty ? "non meublé" : "meublé"}</p>

              <br />

              <div className="detail-options">
                {nearestLocation.length > 0 && (
                  <div>
                    <h4>Les endroits les plus proche : </h4>
                    {nearestLocation.map((location, index) => (
                      <div className="details-ckecked-items" key={index}>
                        <img
                          src={checkIcon}
                          alt="icon"
                          className="detail-options-card-img"
                        />

                        <p>{location.nameAndDistance}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <br />

              <h3>Description</h3>
              <p>{housing.description}</p>

              <p>Publié le {formatDate(housing.created_at)}</p>

              <br />
              <br />
              <div className="detail-center-items">
                <div>
                  {outstandingEq.length > 0 && (
                    <div>
                      <h4>Equipements hors du commun : </h4>
                      <br />

                      <div className="detail-options-container">
                        {outstandingEq.map((outstand, index) => (
                          <div className="detail-options-card" key={index}>
                            <img
                              src={outstand.equipment_img_url}
                              alt="icon"
                              className="detail-options-card-img"
                            />

                            <p>{outstand.equipment_name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <br />
              <br />
              <ShowMap mapLat={housing.map_lat} mapLong={housing.map_long} />

              <br />
              <br />
              {/* <p><strong>Price:</strong> ${housing.price.toFixed(2)}</p> */}

              {/* {outstandingEq.length > 0 && (
                    <div className="detail-options-container">
                      {outstandingEq.map((outstand, index) => (
                        <div className="detail-options-card">
                          <img
                            src={outstand.equipment_img_url}
                            alt="icon"
                            className="detail-options-card-img"
                          />

                          <p>{outstand.equipment_name}</p>
                        </div>
                      ))}
                    </div>
                  )} */}

              <div className="detail-center-items">
                {secEq.length > 0 && (
                  <div>
                    <h4>Equipements de sécurité : </h4>
                    <div className="detail-options-container">
                      {secEq.map((equipement, index) => (
                        <div className="detail-options-card" key={index}>
                          <img
                            src={equipement.equipment_image_url}
                            alt="icon"
                            className="detail-options-card-img"
                          />

                          <p>{equipement.equipment_name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <br />
              <br />
              <br />

              <div className="detail-options">
                {advantages.length > 0 && (
                  <div>
                    <h4>Les avantages de ce logment : </h4>
                    {advantages.map((advantage, index) => (
                      <div className="details-ckecked-items" key={index}>
                        <img
                          src={checkIcon}
                          alt="ckeck"
                          className="detail-options-card-img"
                        />

                        <p>{advantage.adventages_name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <br />
              <br />
              <div className="detail-options">
                {basicSuppliers.length > 0 && (
                  <div>
                    <h4>Les équipements de base de ce logment : </h4>
                    {basicSuppliers.map((basic, index) => (
                      <div className="details-ckecked-items" key={index}>
                        <img
                          src={checkIcon}
                          alt="ckeck"
                          className="detail-options-card-img"
                        />

                        <p>{basic.basic_suppliers_name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <br />
              <br />
              <div className="detail-options">
                {includedServ.length > 0 && (
                  <div>
                    <h4>Les services inclus dans ce logment : </h4>
                    {includedServ.map((service, index) => (
                      <div className="details-ckecked-items" key={index}>
                        <img
                          src={checkIcon}
                          alt="ckeck"
                          className="detail-options-card-img"
                        />

                        <p>{service.service_name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <h4>Documents à fournir sur place.</h4>
              <p>
                {housing.given_documents ? housing.given_documents : "Aucun"}
              </p>
              <br />
              <div className="text-center">
                {company.length > 0 && (
                  <PinkButton
                    text={"Voir les autres logements de ce promoteur"}
                    onClick={(e) => showCompanyHandler(e, company[0]?.id)}
                  />
                )}
              </div>
              <br />
              <h4>Voici des propositions de logements de même type : </h4>
              <br />
              <div className="housings-container">
                {allHousing.map((housing, index) => (
                  <div
                    key={housing.id}
                    onClick={(e) => showDetailsHandler(e, housing.id)}
                    className="housing-item"
                  >
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

                    <br />
                    <br />
                    <br />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}
