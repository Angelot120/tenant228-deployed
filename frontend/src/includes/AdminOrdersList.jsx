import React, { useEffect, useState } from "react";
import AdminOrdersItems from "../components/AdminOrdersItems/AdminOrdersItems";
import api from "../api";
import { toast, ToastContainer } from "react-toastify";
import { Button, PinkButton } from "../components/button/Button";
import Loading from "../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function AdminOrdersList(status) {
  const [allHousing, setAllHousing] = useState([]);
  const [housingImages, setHousingImages] = useState([]);
  const [housingPrice, setHousingPrice] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
      try {
        const response = await api.get(
          "http://localhost:8000/api/get-housing-order/"
        );
        setOrders(response.data);

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
      } finally {
        setLoading(false);
      }
    };

    const fetchHousing = async (id) => {
      try {
        const response = await api.get(
          `http://localhost:8000/api/get-ordred-housings/${id}/`
        );
        const housing = response.data;

        // console.log("Housing data:", housing); // Ajoutez cette ligne pour inspecter les données

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
      const data = housingData[0];

      if (!data?.house_pricing_id) return null;

      try {
        const response = await api.get(
          `http://localhost:8000/api/create-house-pricing/${housingData[0].house_pricing_id}`
        );
        // console.log("Pricing", response.data);
        // setHousingPrice(response.data);
        return response.data;
      } catch (err) {
        console.error(err);
        toast.error("Une erreur est survenue lors du chargement des prix !");
        return null;
      } finally {
        // console.log("All Pricings", housingPrice);
      }
    };

    fetchOrders();
  }, []);

  // console.log("Images", housingImages);
  // console.log("Prices", housingPrice);
  // console.log("Ordres", orders);
  // console.log("Housing", allHousing);

  const handlerReservationAccepted = (e, id) => {
    e.preventDefault();
    setLoading(true);

    if (confirm("Voulez vous vraiment accepter cette réservation ?")) {
      try {
        const response = api.put(
          `http://localhost:8000/api/edit-housing-order-accepted/${id}/`
        );
        toast.success("La demande de réservation vient d'être acceptée !");
        return response.data;
      } catch (err) {
        console.error(err);
        toast.error("Une erreur est survenue lors du traitement !");
        return;
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handlerReservationRefused = (e, id) => {
    e.preventDefault();
    setLoading(true);

    if (confirm("Voulez-vous vraiment refuser cette commande ?")) {
      try {
        const response = api.put(
          `http://localhost:8000/api/get-refused-housings/${id}/`
        );
        toast.success("La demande de réservation vient d'être annulée !");
        return response.data;
      } catch (err) {
        console.error(err);
        toast.error("Une erreur est survenue lors du traitement !");
        return;
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handlerReservationFinished = (e, id) => {
    e.preventDefault();
    setLoading(true);

    if (confirm("Voulez-vous vraiment achever cette la réservation ?")) {
      try {
        const response = api.put(
          `http://localhost:8000/api/get-completed-housings/${id}/`
        );
        toast.success("Réservation achevée !");
        return response.data;
      } catch (err) {
        console.error(err);
        toast.error("Une erreur est survenue lors du traitement !");
        return;
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handlerMore = () => {
    navigate("/404");
  };

  // console.log(status.status  == "1")

  // const status = status.status;

  // console.log(orders);
  // console.log(orders[0]?.completed);

  if (allHousing.length > 0) {
    return (
      <div>
        <ToastContainer stacked position="bottom-left" />
        {loading ? (
          <Loading />
        ) : (
          <div>
            {orders.map((housing, index) => (
              <div key={index}>
                {status.status === 1 &&
                housing.ordered == true &&
                housing.order_accepted == null &&
                housing.completed == false ? (
                  <div className="pending-order-container">
                    <AdminOrdersItems
                      // title={housing.title}
                      title={allHousing[index]?.[0]?.title || "Pas de titre"}
                      imgUrl={
                        housingImages[index] && housingImages[index].length > 0
                          ? housingImages[index][0].image_url
                          : ""
                      }
                      // Vérifiez que les prix existent avant de les passer
                      priceByNight={housingPrice[index]?.price_by_night || 0}
                      priceByWeek={housingPrice[index]?.price_by_week || 0}
                      priceByMonth={housingPrice[index]?.price_by_month || 0}
                      forSalePrice={housingPrice[index]?.for_sale_pricing || 0}
                      paymentChoice={housing.payment_choice}
                      address={allHousing[index]?.[0]?.address}
                      municipality={allHousing[index]?.[0]?.municipality}
                      town={allHousing[index]?.[0]?.town}
                      country={allHousing[index]?.[0]?.country}
                      dimension={
                        allHousing[index]?.[0]
                          ? allHousing[index]?.[0]?.dimension
                          : ""
                      }
                      // Utilisez les informations de l'ordre courant
                      firstName={housing.firstname}
                      lastName={housing.lastname}
                      sex={housing.gender ? "F" : "M"}
                      phoneNum={housing.phone_no}
                      email={housing.email}
                      nbPeople={housing.nb_peaple}
                      nbChildren={housing.nb_children}
                      startingDate={housing.starting_date}
                      startingHour={housing.starting_hour}
                      endingDate={housing.ending_date}
                      reservationForYou={housing.reservation_for_you}
                      forWhoEmail={housing.for_who_email}
                      forWhoFirstName={housing.for_who_first_name}
                      forWhoLastName={housing.for_who_last_name}
                      forWhoPhoneNo={housing.for_who_phone_no}
                    />
                    <div className="pending-order-btn">
                      <Button
                        text={"Accepter la réservation"}
                        onClick={(e) =>
                          handlerReservationAccepted(e, housing.id)
                        }
                      />
                      <PinkButton
                        text={"Refuser la réservation"}
                        onClick={(e) =>
                          handlerReservationRefused(e, housing.id)
                        }
                      />
                    </div>
                    <br />
                  </div>
                ) : status.status === 2 &&
                  housing.ordered &&
                  housing.order_accepted == true &&
                  housing.completed == false ? (
                  <div className="pending-order-container">
                    <AdminOrdersItems
                      // title={housing.title}
                      title={allHousing[index]?.[0]?.title || "Pas de titre"}
                      imgUrl={
                        housingImages[index] && housingImages[index].length > 0
                          ? housingImages[index][0].image_url
                          : ""
                      }
                      priceByNight={housingPrice[index]?.price_by_night || 0}
                      priceByWeek={housingPrice[index]?.price_by_week || 0}
                      priceByMonth={housingPrice[index]?.price_by_month || 0}
                      forSalePrice={housingPrice[index]?.for_sale_pricing || 0}
                      address={allHousing[index]?.[0]?.address}
                      municipality={allHousing[index]?.[0]?.municipality}
                      town={allHousing[index]?.[0]?.town}
                      country={allHousing[index]?.[0]?.country}
                      dimension={
                        allHousing[index]?.[0]
                          ? allHousing[index]?.[0]?.dimension
                          : ""
                      }
                      // Utilisez les informations de l'ordre courant
                      firstName={housing.firstname}
                      lastName={housing.lastname}
                      sex={housing.gender ? "F" : "M"}
                      phoneNum={housing.phone_no}
                      email={housing.email}
                      nbPeople={housing.nb_peaple}
                      nbChildren={housing.nb_children}
                      startingDate={housing.starting_date}
                      startingHour={housing.starting_hour}
                      endingDate={housing.ending_date}
                      reservationForYou={housing.reservation_for_you}
                      forWhoEmail={housing.for_who_email}
                      forWhoFirstName={housing.for_who_first_name}
                      forWhoLastName={housing.for_who_last_name}
                      forWhoPhoneNo={housing.for_who_phone_no}
                    />

                    <div className="pending-order-btn">
                      <Button
                        text={"Voir plus"}
                        onClick={(e) => handlerMore(e)}
                      />
                      <PinkButton
                        text={"Achever"}
                        onClick={(e) =>
                          handlerReservationFinished(e, housing.id)
                        }
                      />
                    </div>
                    <br />
                  </div>
                ) : status.status === 3 &&
                  housing.ordered &&
                  housing.order_accepted == true &&
                  housing.completed == true ? (
                  <div className="pending-order-container">
                    <AdminOrdersItems
                      // title={housing.title}
                      title={allHousing[index]?.[0]?.title || "Pas de titre"}
                      imgUrl={
                        housingImages[index] && housingImages[index].length > 0
                          ? housingImages[index][0].image_url
                          : ""
                      }
                      priceByNight={housingPrice[index]?.price_by_night || 0}
                      priceByWeek={housingPrice[index]?.price_by_week || 0}
                      priceByMonth={housingPrice[index]?.price_by_month || 0}
                      forSalePrice={housingPrice[index]?.for_sale_pricing || 0}
                      address={allHousing[index]?.[0]?.address}
                      municipality={allHousing[index]?.[0]?.municipality}
                      town={allHousing[index]?.[0]?.town}
                      country={allHousing[index]?.[0]?.country}
                      dimension={
                        allHousing[index]?.[0]
                          ? allHousing[index]?.[0]?.dimension
                          : ""
                      }
                      // Utilisez les informations de l'ordre courant
                      firstName={housing.firstname}
                      lastName={housing.lastname}
                      sex={housing.gender ? "F" : "M"}
                      phoneNum={housing.phone_no}
                      email={housing.email}
                      nbPeople={housing.nb_peaple}
                      nbChildren={housing.nb_children}
                      startingDate={housing.starting_date}
                      startingHour={housing.starting_hour}
                      endingDate={housing.ending_date}
                      reservationForYou={housing.reservation_for_you}
                      forWhoEmail={housing.for_who_email}
                      forWhoFirstName={housing.for_who_first_name}
                      forWhoLastName={housing.for_who_last_name}
                      forWhoPhoneNo={housing.for_who_phone_no}
                    />
                    <br />
                  </div>
                ) : status.status === 4 &&
                  !housing.ordered &&
                  (housing.order_accepted == true ||
                    housing.order_accepted == null) &&
                  housing.completed == false ? (
                  <div className="pending-order-container">
                    <AdminOrdersItems
                      // title={housing.title}
                      title={allHousing[index]?.[0]?.title || "Pas de titre"}
                      imgUrl={
                        housingImages[index] && housingImages[index].length > 0
                          ? housingImages[index][0].image_url
                          : ""
                      }
                      priceByNight={housingPrice[index]?.price_by_night || 0}
                      priceByWeek={housingPrice[index]?.price_by_week || 0}
                      priceByMonth={housingPrice[index]?.price_by_month || 0}
                      forSalePrice={housingPrice[index]?.for_sale_pricing || 0}
                      address={allHousing[index]?.[0]?.address}
                      municipality={allHousing[index]?.[0]?.municipality}
                      town={allHousing[index]?.[0]?.town}
                      country={allHousing[index]?.[0]?.country}
                      dimension={
                        allHousing[index]?.[0]
                          ? allHousing[index]?.[0]?.dimension
                          : ""
                      }
                      // Utilisez les informations de l'ordre courant
                      firstName={housing.firstname}
                      lastName={housing.lastname}
                      sex={housing.gender ? "F" : "M"}
                      phoneNum={housing.phone_no}
                      email={housing.email}
                      nbPeople={housing.nb_peaple}
                      nbChildren={housing.nb_children}
                      startingDate={housing.starting_date}
                      startingHour={housing.starting_hour}
                      endingDate={housing.ending_date}
                      reservationForYou={housing.reservation_for_you}
                      forWhoEmail={housing.for_who_email}
                      forWhoFirstName={housing.for_who_first_name}
                      forWhoLastName={housing.for_who_last_name}
                      forWhoPhoneNo={housing.for_who_phone_no}
                    />
                    <br />
                  </div>
                ) : status.status === 5 &&
                  housing.ordered &&
                  housing.order_accepted == false &&
                  housing.completed == false ? (
                  <div className="pending-order-container">
                    <AdminOrdersItems
                      // title={housing.title}
                      title={allHousing[index]?.[0]?.title || "Pas de titre"}
                      imgUrl={
                        housingImages[index] && housingImages[index].length > 0
                          ? housingImages[index][0].image_url
                          : ""
                      }
                      priceByNight={housingPrice[index]?.price_by_night || 0}
                      priceByWeek={housingPrice[index]?.price_by_week || 0}
                      priceByMonth={housingPrice[index]?.price_by_month || 0}
                      forSalePrice={housingPrice[index]?.for_sale_pricing || 0}
                      address={allHousing[index]?.[0]?.address}
                      municipality={allHousing[index]?.[0]?.municipality}
                      town={allHousing[index]?.[0]?.town}
                      country={allHousing[index]?.[0]?.country}
                      dimension={
                        allHousing[index]?.[0]
                          ? allHousing[index]?.[0]?.dimension
                          : ""
                      }
                      // Utilisez les informations de l'ordre courant
                      firstName={housing.firstname}
                      lastName={housing.lastname}
                      sex={housing.gender ? "F" : "M"}
                      phoneNum={housing.phone_no}
                      email={housing.email}
                      nbPeople={housing.nb_peaple}
                      nbChildren={housing.nb_children}
                      startingDate={housing.starting_date}
                      startingHour={housing.starting_hour}
                      endingDate={housing.ending_date}
                      reservationForYou={housing.reservation_for_you}
                      forWhoEmail={housing.for_who_email}
                      forWhoFirstName={housing.for_who_first_name}
                      forWhoLastName={housing.for_who_last_name}
                      forWhoPhoneNo={housing.for_who_phone_no}
                    />
                    <br />
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    {/* {index === 1 && "Aucun !"} */}
                  </div>
                )}
                {/* <br />
            <br /> */}
              </div>
            ))}
          </div>
        )}
        <br />
        <br />
      </div>
    );
  } else {
    if (status == 1) {
      return (
        <div>
          <p>Aucune commande en attente</p>
        </div>
      );
    } else if (status == 2) {
      return (
        <div>
          <p>Aucune commande en cours</p>
        </div>
      );
    } else if (status == 3) {
      return (
        <div>
          <p>Aucune commande achevée</p>
        </div>
      );
    } else if (status == 4) {
      return (
        <div>
          <p>Aucune commande annulée</p>
        </div>
      );
    } else if (status == 5) {
      return (
        <div>
          <p>Aucune commande refusée</p>
        </div>
      );
    }
  }
}
