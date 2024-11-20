import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHousingItems from "../components/AdminHousingItems/AdminHousingItems";
import api from "../api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AdminHousingList() {
  const [allHousing, setAllHousing] = useState([]);
  const [housingImages, setHousingImages] = useState([]);
  const [housingPrice, setHousingPrice] = useState([]);

  useEffect(() => {
    const fetchHousing = async () => {
      try {
        const response = await api.get(
          "http://localhost:8000/api/get-housing/"
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
          toast.error(
            "Une erreur est survenue lors du chargement des images !"
          );
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
            toast.error(
              "Une erreur est survenue lors du chargement des prix !"
            );
            return null;
          }
        }
      });
      return Promise.all(pricingPromises);
    };

    fetchHousing();
  }, []);

  const handlerDelete = async (id) => {
    if (
      confirm(
        "Voulez vous supprimer cet logement ? cette action sera irréversible !"
      )
    ) {
      try {
        const response = await api.delete(
          `http://localhost:8000/api/create-housing/${id}/`
        );
        toast.success("Opération éffectuée avec succès !");
        // console.log(response.data);
      } catch (error) {
        toast.error("Une erreur est survenue lors de l'opération !");
        // console.log(error);
      }
    }
  };
  const navigate = useNavigate();

  const handlerNavigate = (id) => {
    navigate(`/housing-details/${id}`, {
      state: {
        id: id,
      },
    });
  };

  return (
    <div>
      <ToastContainer stacked position="bottom-left" />
      {allHousing.map((housing, index) => (
        <div key={index}>
          {housingPrice[index] ? (
            <AdminHousingItems
              imgUrl={
                housingImages[index] ? housingImages[index].image_url : ""
              }
              title={housing.title}
              priceByNight={housingPrice[index].price_by_night}
              priceByWeek={housingPrice[index].price_by_week}
              priceByMonth={housingPrice[index].price_by_month}
              address={housing.address}
              municipality={housing.municipality}
              town={housing.town}
              country={housing.country}
              dimension={housing.dimension}
              onClick={() => handlerDelete(housing.id)}
              HandlerShow={() => handlerNavigate(housing.id)}
            />
          ) : (
            // "No price"
            ""
          )}
        </div>
      ))}
    </div>
  );
}
