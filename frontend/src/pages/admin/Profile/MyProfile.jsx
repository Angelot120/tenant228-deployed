import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileIcon from "../../../assets/Icons/profile_user.svg";
import { Input } from "../../../components/input/Input";
import { useDropzone } from "react-dropzone";
import { Button } from "../../../components/button/Button";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "./Profile.css";
import api from "../../../api";
import Cookies from "js-cookie";

export default function MyProfile() {
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [phoneNum, setPhoneNum] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [post, setPost] = useState("");
  const [link, setLink] = useState("");
  const [files, setFiles] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("http://127.0.0.1:8000/api/get-provider/")
      .then((res) => res.data)
      .then((data) => {
        setProvider(data[0]);

        setProfilePreview(data[0].profile_img);
        setPhoneNum(data[0].phone_num);
        setFirstName(data[0].firstname);
        setLastName(data[0].lastname);
        setBirthDate(data[0].birth_data);
        setPost(data[0].post);
        setLink(data[0].web_site_url);
      });
  }, []);

  const logout = () => {
    Cookies.remove("conected");
    Cookies.remove("superAdmin");
    navigate("/login");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (!phoneNum) {
      toast.error("Le numéro de téléphone est requis!");
      return;
    } else if (!firstName) {
      toast.error("Le nom est requis!");
      return;
    } else if (!lastName) {
      toast.error("Le prénom est requis!");
      return;
    } else if (!birthDate) {
      toast.error("La date de naissance est requise!");
      return;
    } else if (!post) {
      toast.error("Veullez renseigner le poste que vous occupez !");
      return;
    } else if (
      !provider?.cni_tof_url_one &&
      !provider?.cni_tof_url_two &&
      files.length < 2
    ) {
      toast.error("Vous devez choisir au moins 2 images !");
      return;
    }

    const formData = new FormData();

    formData.append("phone_num", phoneNum);
    formData.append("firstname", firstName);
    formData.append("lastname", lastName);
    formData.append("birth_data", birthDate);
    formData.append("post", post);
    if (files.length > 0) {
      formData.append("cni_tof_url_one", files[0]?.file);
      formData.append("cni_tof_url_two", files[1]?.file);
    }
    formData.append("web_site_url", link);

    if (profile) {
      formData.append("profile_img", profile);
    }

    // console.log("File", files[0]);

    try {
      api
        .put(
          `http://127.0.0.1:8000/api/edit-provider/${provider?.id}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => toast.success("Profile modifiée avec succès !"))
        .catch((error) => {
          // console.log(error);
          toast.error("Une erreur est survenue lors de l'enregistrement");
        });
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="admin-profile-container">
      <ToastContainer stacked position="bottom-left" />
      <div className="admin-profile-header">
        <Link to={"/admin"} className="profile-menu-left-item">
          Retours
        </Link>
        <p onClick={logout} className="profile-menu-fight-item">
          Se déconnecter
        </p>
      </div>
      <br />
      <br />
      <form onSubmit={handlerSubmit}>
        <div className="admin-profile-img text-center">
          <img src={profilePreview || ProfileIcon} alt="profile" />
        </div>

        <Input
          label={"Proto de profile"}
          reference={"profile"}
          type={"file"}
          placeholder={"Votre email ici..."}
          onChange={handleFileChange}
          className={"form-input"}
        />

        {/* <Input
          label={"Email"}
          reference={"email"}
          type={"email"}
          placeholder={"Votre email ici..."}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className={"form-input"}
        /> */}

        <Input
          label={"Numero de téléphone"}
          reference={"num"}
          type={"number"}
          placeholder={"Votre numero de téléphone ici..."}
          onChange={(e) => setPhoneNum(e.target.value)}
          value={phoneNum}
          className={"form-input"}
        />

        <Input
          label={"Nom"}
          reference={"firstName"}
          type={"text"}
          placeholder={"Votre nom ici..."}
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          className={"form-input"}
        />

        <Input
          label={"Prénom"}
          reference={"lastName"}
          type={"text"}
          placeholder={"Votre prénom ici..."}
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          className={"form-input"}
        />

        <Input
          label={"Date de naissance"}
          reference={"birthDate"}
          type={"date"}
          placeholder={"Votre date de naissance ici..."}
          onChange={(e) => setBirthDate(e.target.value)}
          value={birthDate}
          className={"form-input"}
        />

        <Input
          label={"Poste"}
          reference={"text"}
          type={"text"}
          placeholder={"Quelle poste occupez-vous au travail ?"}
          onChange={(e) => setPost(e.target.value)}
          value={post}
          className={"form-input"}
        />

        <Input
          label={"Site web"}
          reference={"text"}
          type={"text"}
          placeholder={"Lien vers votre site web (Facultatif)"}
          onChange={(e) => setLink(e.target.value)}
          value={link}
          className={"form-input"}
        />

        <br />
        <br />

        <div>
          {provider.cni_tof_url_one && provider.cni_tof_url_two ? (
            <div className="cni-tof-img-container">
              <img src={provider?.cni_tof_url_one} alt="cni tof" />
              <img src={provider?.cni_tof_url_two} alt="" />
            </div>
          ) : (
            ""
          )}

          <p>
            Veuillez choisir les images recto et verso de votre carte
            d'identitée (2 photos).
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
          <p>
            Attention rique d’expulsion en cas d’uploadation de fausse photos de
            carte d’identitée.
          </p>

          <div className="text-center">
            <Button
              text={"Appliquer les modifications"}
              onClick={handlerSubmit}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
