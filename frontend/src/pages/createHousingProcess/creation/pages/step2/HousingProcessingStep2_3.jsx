import React, { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HousingProcessingMenu from "../../../menu/HousingProcessingMenu";
import { HousingProcessingStep2 } from "../../../menu/HousingProcessingSteps";
import "./step2.css";
import { useDropzone } from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export default function HousingProcessingStep2_3() {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024, // 5 MB
    onDrop: useCallback((acceptedFiles) => {
      const filePreviews = acceptedFiles.map((file) => ({
        id: uuidv4(),
        file,
        preview: URL.createObjectURL(file),
      }));
      setFiles((prevFiles) => [...prevFiles, ...filePreviews]);
      setIsDragActive(false);
    }, []),
    onDropRejected: useCallback((fileRejections) => {
      // console.log("Fichiers rejetés:", fileRejections);
      toast.error("Format d'image non valide");
      setIsDragActive(false);
      return;
    }, []),
    onDragEnter: () => {
      setIsDragActive(true);
    },
    onDragLeave: () => {
      setIsDragActive(false);
    },
    onDragOver: () => {
      setIsDragActive(true);
    },
  });

  const handleRemoveFile = (fileId) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
  };

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

  const navigateHandler = (e) => {
    e.preventDefault();

    if (files.length < 4) {
      toast.error("Vous devez choisir au moins 4 images !");
      return;
    }
    navigate("/processing/create-housing/step2-4", {
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
        housingImages: files,
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

      <div className="housing-images-container">
        <div>
          <h2>Choisissez des photos pour votre logement.</h2>
          <p>
            4 photos minimum. Vous pourriez ajouter d'autres photos plus tard !
          </p>

          <div
            {...getRootProps({
              className: `dropzone ${isDragActive ? "drag-active" : ""}`,
            })}
          >
            <input {...getInputProps()} />
            <p className="dz-message">
              Glissez et déposez des fichiers ici, ou cliquez pour sélectionner
              des fichiers
            </p>

            <div className="preview-container">
              {files.map((file) => (
                <div key={file.id} className="dz-preview">
                  <img src={file.preview} alt={file.file.name} />
                  <button onClick={() => handleRemoveFile(file.id)}>
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}
