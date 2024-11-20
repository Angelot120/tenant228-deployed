import React, { useRef } from "react";
import { Button } from "../button/Button";
import close from "../../assets/Icons/close_24.svg";
import banner from "../../assets/Icons/banner-img.jpg";

export default function ShowHousingImages({
  housingImages,
  rooms,
  roomImages,
}) {
  const dialog = useRef();
  const openHandler = () => {
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };

  return (
    <div>
      <dialog ref={dialog} className="dialogue">
        <div className="dialog-close-btn-container">
          <button
            onClick={closeHandler}
            type="button"
            className="close-dialog-btn"
          >
            <img src={close} alt="close icon" />
          </button>
        </div>

        <div className="housing-all-images-detail">
          {housingImages.map((image, index) => (
            <div className="" key={index}>
              <img
                src={image.image_url || banner}
                alt="Housing img"
                className="housing-all-images-details"
              />
            </div>
          ))}
        </div>

        <div className="room-all-images-detail">
          <h1>Images détaillées des chambres</h1>
          {rooms.map((room, index) => (
            <div key={index} className="room-detail">
              <p>
                Chambre {index + 1}: {room.room_name}{" "}
                {room.room_empty ? "(non meublée)" : "(meublée)"}
              </p>
              <div className="room-images">
                {room.room_img_id.map((imageId) => {
                  // Vérifiez si l'image existe dans le tableau `roomImages`
                  const image = roomImages.find((img) => img.id === imageId);
                  return image ? (
                    <div key={image.id}>
                      <img
                        src={image.image_url}
                        alt={`Housing img for ${room.room_name}`}
                        className="housing-all-images-details"
                        height="100px"
                      />
                    </div>
                  ) : null; // Ne rien retourner si l'image n'existe pas
                })}
              </div>
            </div>
          ))}
        </div>
      </dialog>

      <Button text={"Tous voir..."} onClick={openHandler} />
    </div>
  );
}
