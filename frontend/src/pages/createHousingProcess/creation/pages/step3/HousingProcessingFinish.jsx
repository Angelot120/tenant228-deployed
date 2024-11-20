import React, { useEffect, useState } from "react";
import HousingProcessingMenu from "../../../menu/HousingProcessingMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { HousingProcessingStep3 } from "../../../menu/HousingProcessingSteps";
import { toast, ToastContainer } from "react-toastify";
import api from "../../../../../api";
import { PinkButton } from "../../../../../components/button/Button";
import banner from "../../../../../assets/images/process-banner.jpg";
import dimensionImg from "../../../../../assets/Icons/fit_width_24.png";
import locationIcon from "../../../../../assets/Icons/home_pin_24.png";

export default function HousingProcessingFinish() {
  const navigate = useNavigate();
  const location = useLocation();

  const { state } = location;
  const categoryId = state ? state.categoryId : null;
  const selectedOption = state ? state.selectedOption : null;
  const housingTitle = state ? state.housingTitle : null;
  const address = state ? state.address : null;
  const country = state ? state.country : null;
  const town = state ? state.town : null;
  const municipality = state ? state.municipality : null;
  const postalCode = state ? state.postalCode : null;
  const housingNo = state ? state.housingNo : null;
  const mapLong = state ? state.mapLong : null;
  const mapLat = state ? state.mapLat : null;
  const housingStatus = state ? state.housingStatus : null;
  const directOwner = state ? state.directOwner : null;
  const specialRequest = state ? state.specialRequest : null;
  const nbPeople = state ? state.nbPeople : null;
  const nbBath = state ? state.nbBath : null;
  const nbRoom = state ? state.nbRoom : null;
  const nbBed = state ? state.nbBed : null;
  const allowChild = state ? state.allowChild : null;
  const furniture = state ? state.furniture : null;
  const brefDescription = state ? state.brefDescription : null;
  const descriptiveOptionsId = state ? state.descriptiveOptionsId : null;
  const usefullEquipments = state ? state.usefullEquipments : null;
  const outstandingEquipments = state ? state.outstandingEquipments : null;
  const securityEquipments = state ? state.securityEquipments : null;
  const advantages = state ? state.advantages : null;
  const basicSuppliers = state ? state.basicSuppliers : null;
  const housingImages = location.state?.housingImages || [];
  const description = state ? state.description : null;
  const nearestLocations = location.state?.nearestLocations || [];
  const includServices = location.state?.includServices || [];
  const dimension = state ? state.dimension : null;
  const documents = state ? state.documents : null;
  const roomTitles = location.state?.roomTitles || {};
  const roomImages = location.state?.roomImages || {};
  const roomEmpty = location.state?.roomEmpty || {};
  const paymentByNight = state ? state.paymentByNight : null;
  const priceByNight = state ? state.priceByNight : null;
  const paymentByWeek = state ? state.paymentByWeek : null;
  const priceByWeek = state ? state.priceByWeek : null;
  const paymentByMonth = state ? state.paymentByMonth : null;
  const priceByMonth = state ? state.priceByMonth : null;
  const cancellationPaiment = state ? state.cancellationPaiment : null;
  const cancellationPrice = state ? state.cancellationPrice : null;
  const weAre = state ? state.weAre : null;
  const companyType = state ? state.companyType : null;
  const debatePrice = state ? state.debatePrice : null;
  const forSalePrice = state ? state.forSalePrice : null;
  const onlinePaiement = state ? state.onlinePaiement : false;

  const [existingProvider, setExistingProvider] = useState([]);

  useEffect(() => {
    const checkProvider = async () => {
      try {
        const res = await api.get("http://localhost:8000/api/get-provider/");
        setExistingProvider(res.data);
      } catch (err) {
        console.error("Erreur lors de la récupération du fournisseur :", err);
      }
    };

    checkProvider();
  }, []);

  const navigateHandler = (e) => {
    e.preventDefault();

    navigate("/processing/create-housing/preview", {
      state: {
        categoryId: categoryId,
        selectedOption: selectedOption,
        housingTitle: housingTitle,
        address: address,
        country: country,
        town: town,
        municipality: municipality,
        postalCode: postalCode,
        housingNo: housingNo,
        mapLong: mapLong,
        mapLat: mapLat,
        housingStatus: housingStatus,
        directOwner: directOwner,
        specialRequest: specialRequest,
        nbPeople: nbPeople,
        nbBath: nbBath,
        nbRoom: nbRoom,
        nbBed: nbBed,
        allowChild: allowChild,
        furniture: furniture,
        brefDescription: brefDescription,
        descriptiveOptionsId: descriptiveOptionsId,
        usefullEquipments: usefullEquipments,
        outstandingEquipments: outstandingEquipments,
        securityEquipments: securityEquipments,
        advantages: advantages,
        basicSuppliers: basicSuppliers,
        housingImages: housingImages,
        description: description,
        nearestLocations: nearestLocations,
        includServices: includServices,
        dimension: dimension,
        documents: documents,
        roomTitles: roomTitles,
        roomImages: roomImages,
        roomEmpty: roomEmpty,
        paymentByNight: paymentByNight,
        priceByNight: priceByNight,
        paymentByWeek: paymentByWeek,
        priceByWeek: priceByWeek,
        paymentByMonth: paymentByMonth,
        priceByMonth: priceByMonth,
        cancellationPaiment: cancellationPaiment,
        cancellationPrice: cancellationPrice,
        weAre: weAre,
        companyType: companyType,
        debatePrice: debatePrice,
        forSalePrice: forSalePrice,
        onlinePaiement: onlinePaiement,
      },
    });
  };

  const countFilesInSubarrays = (roomImages) => {
    return roomImages.map((images, index) => ({
      index,
      countImages: images.length,
    }));
  };

  const submitHandler = async () => {
    const formData = new FormData();
    let housing_img_id = [];
    let room_img_id = [];
    let allRoomsId = [];
    const paimentId = [];
    const includeServiceId = [];
    const nearestLocationsId = [];
    let providerId = null;

    if (!housingImages || housingImages.length === 0) {
      toast.error("Aucune image sélectionnée.");
      return;
    }

    try {
      for (const image of housingImages) {
        formData.append(`image_url`, image.file);
        const response = await api.post("api/create-housing-img/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const { id } = response.data;
        housing_img_id.push(id);
      }
    } catch (err) {
      // console.log(err);
      toast.error("Echec de l'opération !");
      return;
    }

    const flattenedImages = roomImages.flat();

    if (!flattenedImages || flattenedImages.length === 0) {
      toast.error("Aucune image sélectionnée pour les chambres.");
      return;
    }

    try {
      const roomData = new FormData();
      for (const roomImage of flattenedImages) {
        roomData.append(`image_url`, roomImage.file);
        const roomImgRes = await api.post("api/create-room-img/", roomData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const { id } = roomImgRes.data;
        room_img_id.push(id);
      }
    } catch (err) {
      // console.log(err);
      toast.error("Echec de l'opération !");
      return;
    }

    const roomImagesId = room_img_id;
    const fileCounts = countFilesInSubarrays(roomImages);

    let count = 0;

    const getRoomTitle = (roomTitles) => {
      return roomTitles.map((title, index) => ({
        index,
        title: title,
      }));
    };

    const title = getRoomTitle(roomTitles);

    const getEmpty = (roomEmpty) => {
      return roomEmpty.map((status, index) => ({
        index,
        status: status,
      }));
    };

    for (const i of fileCounts) {
      const formData = new FormData();

      count = i.countImages;

      for (let j = 0; j < count; j++) {
        if (roomImagesId.length > 0) {
          formData.append("room_img_id", roomImagesId[0]);
          roomImagesId.shift();
        } else {
          toast.error("Pas assez d'identifiants pour les images");
        }
      }

      const empty = getEmpty(roomEmpty);

      formData.append("room_name", title[i.index].title);
      formData.append("room_empty", empty[i.index].status);

      try {
        const roomIds = await api.post("api/create-room/", formData);

        const { id } = roomIds.data;
        allRoomsId.push(id);
      } catch (err) {
        toast.error("Une erreur est survenue lors du traitment!");
        // console.log(err);
      }
    }

    if (includServices.length > 1) {
      try {
        const included = new FormData();

        for (const includService of includServices) {
          included.append("service_name", includService);
          const service = await api.post(
            "api/create-included-services/",
            included,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          const { id } = service.data;

          includeServiceId.push(id);
        }
      } catch (err) {
        toast.error("Une erreur est survenue lors du traitment !");
        // console.log(err);
        return;
      }
    }

    if (nearestLocations.length > 1) {
      try {
        const nearestLoc = new FormData();

        for (const nearestLocation of nearestLocations) {
          nearestLoc.append("nameAndDistance", nearestLocation);
          const location = await api.post(
            "api/create-nearest-locations/",
            nearestLoc,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          const { id } = location.data;

          nearestLocationsId.push(id);
        }
      } catch (err) {
        toast.error("Une erreur est survenue lors du traitment !");
        // console.log(err);
        return;
      }
    }

    try {
      const pricing = new FormData();

      pricing.append("on_line_payment", onlinePaiement);
      pricing.append("payment_by_night", paymentByNight);
      pricing.append("price_by_night", priceByNight);
      pricing.append("payment_by_week", paymentByWeek);
      pricing.append("price_by_week", priceByWeek);
      pricing.append("payment_by_month", paymentByMonth);
      pricing.append("price_by_month", priceByMonth);
      pricing.append("cancellation_price_available", cancellationPaiment);
      pricing.append("cancellation_price", cancellationPrice);
      pricing.append("for_sale_pricing", forSalePrice);
      pricing.append("for_sale_pricing_discussed", debatePrice);

      const paiment = await api.post("api/create-house-pricing/", pricing, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { id } = paiment.data;

      paimentId.push(id);
    } catch (err) {
      toast.error("Une erreur est survenue lors du traitment !");
      // console.log(err);
      return;
    }

    if (!existingProvider) {
      try {
        const provider = new FormData();
        provider.append("whoAreYou", weAre);
        if (companyType) provider.append("company_type", companyType);

        const prov = await api.post("api/create-provider/", provider);
        providerId = prov.data.id; // Obtenir l'ID du fournisseur créé
      } catch (err) {
        toast.error("Une erreur est survenue lors du traitement !");
        console.error(err);
        return;
      }
    } else {
      providerId = existingProvider.id; // Utiliser l'ID du fournisseur existant
    }

    try {
      const housing = new FormData();

      housing.append("title", housingTitle);
      housing.append("bref_description", brefDescription);
      housing.append("description", description);
      housing.append("address", address);
      housing.append("country", country);
      housing.append("municipality", municipality);
      housing.append("town", town);
      housing.append("postal_code", postalCode);
      housing.append("map_long", mapLong);
      housing.append("map_lat", mapLat);
      housing.append("dimension", dimension);
      housing.append("nb_people", nbPeople);
      housing.append("all_nb_bed", nbBed);
      housing.append("nb_room", nbRoom);
      housing.append("total_nb_bath_room", nbBath);
      housing.append("special_request", !!specialRequest);
      housing.append("allow_child", !!allowChild);
      housing.append("housing_empty", !!furniture);
      housing.append("given_documents", documents);
      housing.append("housing_no", housingNo);
      housing.append("housing_kind", selectedOption);
      housing.append("service_type", housingStatus);
      housing.append("direct_owner", !!directOwner);
      housing.append("whoAreYou", weAre);
      housing.append("company_type", companyType);

      for (const images of housing_img_id) {
        housing.append("housing_img_id", images);
      }

      // housingImages.forEach((image) => {
      //   formData.append('housing_img_id', image.file);
      // });

      // for (const imgId of housing_img_id) {
      //   housing.append("housing_img_id", imgId);
      // }

      for (const roomId of allRoomsId) {
        housing.append("room_id", roomId);
      }

      housing.append("housing_category_id", categoryId);

      for (const serviceId of includeServiceId) {
        housing.append("included_services_id", serviceId);
      }

      for (const locationId of nearestLocationsId) {
        housing.append("nearest_location_id", locationId);
      }

      housing.append("house_pricing_id", paimentId);

      for (const outstandId of outstandingEquipments) {
        housing.append("outstanding_equipments_id", outstandId);
      }
      for (const securityId of securityEquipments) {
        housing.append("security_equipments_id", securityId);
      }

      housing.append("descriptive_options_id", descriptiveOptionsId);
      for (const advantageId of advantages) {
        housing.append("advantages_id", advantageId);
      }

      for (const supplierId of basicSuppliers) {
        housing.append("basic_suppliers_id", supplierId);
      }

      for (const usefullEquipmentId of usefullEquipments) {
        housing.append("usefull_eq_id", usefullEquipmentId);
      }

      housing.append("provider_id", providerId);

      await api.post("api/create-housing/", housing, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      // console.log(err);
      toast.error("Une erreur est survenue lors du traitement !");
      return;
    }

    toast.success("Logement créé avec succès !");

    navigate("/admin");
  };

  return (
    <div>
      <ToastContainer stacked position="bottom-left" />
      <HousingProcessingMenu
        to={"/"}
        text={"Terminer"}
        onClick={submitHandler}
      />
      <br />
      <br />
      <br />
      <br />
      <HousingProcessingStep3 />

      {/* <HousingProcessingMenu
        to={"#"}

      /> */}

      <div className="process-finish-full-banner">
        <div className="process-finish-top-items">
          <div>
            <h2 className="process-finish-title">
              Votre logment est prêt pour publier !
            </h2>
            <p>Vous pouvez éffectuer des modifications plus tard.</p>
          </div>
          <PinkButton text={"Prévisualiser"} onClick={navigateHandler} />
        </div>
        <br />
        <br />
        <div className="process-finish-banner">
          <div className="process-finish-banner-left-items">
            {/* <img src={banner} alt="" className="process-finish-banner-img" /> */}
            {housingImages.map((file, index) => (
              <div key={index}>
                {index === 0 && (
                  <img
                    src={file.preview || banner}
                    alt={file.name}
                    className="process-finish-banner-img"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="process-finish-banner-rigth-items">
            <h3 className="step1">{housingTitle}</h3>
            <p className="step1">
              {nbRoom} chambre{nbRoom > 1 && "s"}, {nbBed} Lit{nbBed > 1 && "s"}
            </p>

            <p>{brefDescription}</p>

            <p>
              {paymentByNight ? `${priceByNight} Xof/nuit` : ""}{" "}
              {paymentByWeek ? `${priceByWeek} Xof/semaine` : ""}{" "}
              {paymentByMonth ? `${priceByMonth} Xof/mois` : ""}{" "}
              {forSalePrice ? `${forSalePrice} Xof prix de vente` : ""}
            </p>

            <span>
              <img
                src={locationIcon}
                alt="location"
                className="process-finish-banner-ic"
              />
              <p>
                {address}, {municipality}, {town}, {country}
              </p>
            </span>
            <span>
              <img
                src={dimensionImg}
                alt="dimesion"
                className="process-finish-banner-ic"
              />
              <p>{dimension} m² en tout</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
