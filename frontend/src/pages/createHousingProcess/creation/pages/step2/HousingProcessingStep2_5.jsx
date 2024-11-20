import React, { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HousingProcessingMenu from "../../../menu/HousingProcessingMenu";
import { HousingProcessingStep2 } from "../../../menu/HousingProcessingSteps";
import { DistanceInput, Input } from "../../../../../components/input/Input";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import { Toggle } from "../../../../../includes/createHousingProcessing/step1/Step1_6Items";

export default function HousingProcessingStep2_5() {
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

  const [roomTitles, setRoomTitles] = useState(Array(nbRoom).fill(""));
  const [roomFiles, setRoomFiles] = useState(Array(nbRoom).fill([]));
  const [housingEmpty, setHousingEmpty] = useState(Array(nbRoom).fill(false));

  const handleRoomTitleChange = (index, value) => {
    const newRoomTitles = [...roomTitles];
    newRoomTitles[index] = value;
    setRoomTitles(newRoomTitles);
  };

  const handleDrop = useCallback(
    (index, acceptedFiles) => {
      const newRoomFiles = [...roomFiles];
      const filePreviews = acceptedFiles.map((file) => ({
        id: uuidv4(),
        file,
        preview: URL.createObjectURL(file),
      }));
      newRoomFiles[index] = [...newRoomFiles[index], ...filePreviews];
      setRoomFiles(newRoomFiles);
    },
    [roomFiles]
  );

  const handleRemoveFile = (index, fileId) => {
    const newRoomFiles = [...roomFiles];
    newRoomFiles[index] = newRoomFiles[index].filter(
      (file) => file.id !== fileId
    );
    setRoomFiles(newRoomFiles);
  };

  const handleToggleSwitch = (index) => {
    const newHousingEmpty = [...housingEmpty];
    newHousingEmpty[index] = !newHousingEmpty[index];
    setHousingEmpty(newHousingEmpty);
  };

  const navigateHandler = (event) => {
    event.preventDefault();

    const isRoomTitleValid = roomTitles.every((title) => title.trim() !== "");
    if (!isRoomTitleValid) {
      toast.error("Veuillez renseigner un titre pour chaque chambre !");
      return;
    }

    const isRoomFilesValid = roomFiles.every((files) => files.length > 0);
    if (!isRoomFilesValid) {
      toast.error("Veuillez choisir au moins une image pour chaque chambre !");
      return;
    }

    navigate("/processing/create-housing/step3-start", {
      state: {
        categoryId: categoryId,
        housingTitle: housingTitle,
        address: address,
        country: country,
        town: town,
        municipality: municipality,
        postalCode: postalCode,
        housingNo: housingNo,
        mapLong: mapLong,
        mapLat: mapLat,
        selectedOption: selectedOption,
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
        roomImages: roomFiles,
        roomEmpty: housingEmpty,
      },
    });
  };
  return (
    <div>
      <ToastContainer stacked position="bottom-left" />
      <HousingProcessingMenu
        to={"/"}
        text={"Suivant"}
        onClick={navigateHandler}
      />
      <br />
      <br />
      <br />
      <br />
      <HousingProcessingStep2 />
      <div className="room-img-session">
        <div>
          <h4>
            Choisissez des photos pour toutes vos chambres pour augmenter vos
            chances d’être choisi.
          </h4>
          <p>
            Cette étape est facultative vous pouvez passer, vous pouvez le
            rajouter plus tard.
          </p>
          <p>Votre logement a {nbRoom} chambres.</p>
          <h6>Donnez un titre et des images pour toutes vos chambres.</h6>

          {Array.from({ length: nbRoom }).map((_, index) => (
            <div key={index}>
              <p>
                Titre de la {index === 0 ? "1ère" : `${index + 1}e`} chambre
              </p>
              <p>
                {index === 0
                  ? "Exemple: Sallon, Cuisine, Chambre 1, Salle de gym, Dexièmme sallon ..."
                  : ""}
              </p>
              <DistanceInput
                type={"text"}
                value={roomTitles[index]}
                onChange={(e) => handleRoomTitleChange(index, e.target.value)}
                placeholder={"Votre titre ici..."}
                label={"Titre de la chambre"}
                reference={`roomTitle${index}`}
              />

              <br />
              <br />

              <Dropzone
                onDrop={(acceptedFiles) => handleDrop(index, acceptedFiles)}
                roomFiles={roomFiles[index]}
                handleRemoveFile={(fileId) => handleRemoveFile(index, fileId)}
              />
              <br />

              <p>
                Cochez l’option chambre vide pour indiquer que la chambre n’est
                pas meublée.
              </p>
              <Toggle
                text={"Chambre vide"}
                checked={housingEmpty[index]}
                onChange={() => handleToggleSwitch(index)}
              />

              <br /><br /><br />
            </div>
          ))}
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

function Dropzone({ onDrop, roomFiles, handleRemoveFile }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif"] },
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
    onDrop,
  });

  return (
    <div
      {...getRootProps({
        className: `dropzone ${isDragActive ? "drag-active" : ""}`,
      })}
    >
      <input {...getInputProps()} />
      <p className="dz-message">
        Glissez et déposez des fichiers ici, ou cliquez pour sélectionner des
        fichiers
      </p>

      <div className="preview-container">
        {roomFiles.map((file) => (
          <div key={file.id} className="dz-preview">
            <img src={file.preview} alt={file.file.name} />
            <button onClick={() => handleRemoveFile(file.id)}>Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
}
