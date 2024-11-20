import React, { useEffect, useState } from "react";
import HomeMenu from "../../includes/header/HomeMenu";
import "./cart.css";
import api from "../../api";
import CardItems from "../../components/cardItems/CardItems";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [allHousing, setAllHousing] = useState([]);
  const [housingImages, setHousingImages] = useState([]);
  const [housingPrice, setHousingPrice] = useState([]);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const isConnected = Cookies.get("conected");
    if (!isConnected) {
      navigate("/login");
    }
    const fetchOrders = async () => {
      try {
        const response = await api.get(
          "http://localhost:8000/api/get-cart-order/"
        );
        setOrders(response.data);

        // console.log("data", response.data);

        // Récupérer les logements en utilisant Promise.all pour les appels asynchrones
        const housingPromises = response.data.map((order) =>
          fetchHousing(order.housing_id)
        );
        const housingData = await Promise.all(housingPromises);

        // Filtrer les logements valides
        const validHousingData = housingData.filter(Boolean);

        if (validHousingData.length === 0) {
          setAllHousing([]);
          setHousingImages([]);
          setHousingPrice([]);
          return; // Sortir si aucun logement n'est valide
        }

        // Extraire les images et les prix des logements
        const images = await Promise.all(
          validHousingData.map((housing) => housing.images)
        );
        const pricing = await Promise.all(
          validHousingData.map((housing) => housing.pricing)
        );

        // Mettre à jour les états
        setAllHousing(validHousingData);
        setHousingImages(images);
        setHousingPrice(pricing);
      } catch (err) {
        console.error(err);
        toast.error(
          "Une erreur est survenue lors du chargement des commandes !"
        );
      }
    };

    const fetchHousing = async (id) => {
      try {
        const response = await api.get(
          `http://localhost:8000/api/get-ordred-housings/${id}/`
        );
        const housing = response.data;

        // console.log("Housing data:", housing);

        const [imagesData, pricingData] = await Promise.all([
          fetchHousingImages(housing),
          fetchHousingPricing(housing),
        ]);

        return { ...housing, images: imagesData, pricing: pricingData };
      } catch (err) {
        console.error(err);
        toast.error(
          "Une erreur est survenue lors du chargement des données de logement !"
        );
        return null; // Retourner null en cas d'erreur
      }
    };

    const fetchHousingImages = async (housingData) => {
      // Vérifiez si housingData est un tableau et s'il a au moins un élément
      if (!Array.isArray(housingData) || housingData.length === 0) {
        console.error("Invalid housingData:", housingData);
        return []; // Retourner un tableau vide si housingData est invalide
      }

      // Si housingData[0] a des images
      const housing = housingData[0]; // Supposons que vous travaillez avec le premier élément
      if (!housing.housing_img_id) {
        console.error("housing_img_id is undefined:", housing);
        return []; // Retourner un tableau vide si housing_img_id est indéfini
      }

      // Récupérer les images
      const imagesPromises = housing.housing_img_id.map(async (imgId) => {
        try {
          const response = await api.get(
            `http://localhost:8000/api/create-housing-img/${imgId}`
          );
          return response.data;
        } catch (err) {
          console.error(err);
          toast.error(
            "Une erreur est survenue lors du chargement des images !"
          );
          return null;
        }
      });

      return Promise.all(imagesPromises);
    };

    const fetchHousingPricing = async (housingData) => {
      if (!housingData[0].house_pricing_id) return null;

      try {
        const response = await api.get(
          `http://localhost:8000/api/create-house-pricing/${housingData[0].house_pricing_id}`
        );

        // console.log("Order pricing", response.data);
        return response.data;
      } catch (err) {
        console.error(err);
        toast.error("Une erreur est survenue lors du chargement des prix !");
        return null;
      }
    };

    fetchOrders();
  });

  return (
    <div>
      <HomeMenu />
      <br />
      <br />
      <br />
      <div className="cart-container">
        <div className="cart-all-items">
          <div className="cart-title">
            <h1>Mes commandes</h1>
          </div>

          {orders.map((order, index) => (
            <div key={index}>
              {order.ordered &&
              (order.order_accepted == null || order.order_accepted == true) &&
              order.completed == false ? (
                <CardItems
                  id={order.id}
                  housingId={allHousing[index]?.[0].id}
                  imgUrl={
                    housingImages[index] && housingImages[index].length > 0
                      ? housingImages[index][0].image_url
                      : ""
                  }
                  title={allHousing[index]?.[0]?.title || "Pas de titre"}
                  dimension={
                    allHousing[index]?.[0]
                      ? allHousing[index]?.[0]?.dimension
                      : ""
                  }
                  brefDescription={
                    allHousing[index]?.[0]
                      ? allHousing[index]?.[0]?.bref_description
                      : ""
                  }
                  accepted={order.order_accepted}
                  priceByNight={housingPrice[index]?.price_by_night || 0}
                  priceByWeek={housingPrice[index]?.price_by_week || 0}
                  priceByMonth={housingPrice[index]?.price_by_month || 0}
                  forSalePrice={housingPrice[index]?.for_sale_pricing || 0}
                  paymentChoice={order.payment_choice}
                />
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
