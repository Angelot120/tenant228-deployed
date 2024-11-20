import React, { useEffect, useRef, useState } from "react";
import "./Dialogue.css";
import { Button, DialogBtn, PinkButton } from "../button/Button";
import SelectInput from "../selectInput/SelectInput";
import api from "../../api";
import { toast, ToastContainer } from "react-toastify";
import { FloatInput, Input } from "../input/Input";
import close from "../../assets/Icons/close_24.svg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function ShowProfile({ text, onClick, value, onChange }) {
  const dialog = useRef();
  const navigate = useNavigate();
  const [connectedUser, setConnectedUser] = useState(null);

  useEffect(() => {
    api
      .get("http://127.0.0.1:8000/api/get-user/")
      .then((res) => res.data)
      .then((data) => {
        setConnectedUser(data);
      });
  }, []);

  const logout = () => {
    Cookies.remove("conected");
    Cookies.remove("superAdmin");
    navigate("/login");
  };

  const openHandler = () => {
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };

  const onSubmit = () => {
    closeHandler();
  };
  // const formData = new FormData();

  return (
    <div className="dialogue-container">
      <ToastContainer stacked position="bottom-left" />
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

        <div className="logout-btn-container">
          {connectedUser && (
            <div>
              <br />
              <p>Email : {connectedUser.email}</p>
              <br />
              <p>Nom d'utilisateur : {connectedUser.username}</p>

              <br />
              <br />
            </div>
          )}
          <PinkButton text={"Se déconnecter"} onClick={logout}></PinkButton>
          {/* <button onClick={logout}></button> */}
        </div>
        <br />
      </dialog>
      {/* <DialogBtn text={text}  /> */}
      <p className="cursor-pointer" onClick={openHandler}>
        {text}
      </p>
    </div>
  );
}

function InfoDialogueBox() {
  const dialog = useRef();

  const openHandler = () => {
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };
  return (
    <div className="dialogue-container">
      <dialog ref={dialog} className="dialogue">
        <p>Je suis le dialogue</p>
        <div className="dialog-close-btn-container">
          <button
            onClick={closeHandler}
            type="button"
            className="close-dialog-btn"
          >
            <img src={close} alt="close icon" />
          </button>
        </div>
      </dialog>
      <button type="button" onClick={openHandler}>
        Ouvrir le dialogue
      </button>
    </div>
  );
}

function AddHousingCategoryTypeDialogBox({ text, onClick, value, onChange }) {
  const dialog = useRef();

  const openHandler = () => {
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };
  // const formData = new FormData();

  return (
    <div className="dialogue-container">
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
        <div className="admin-create-category">
          <Input
            label={"Type de catégorie"}
            reference={"categoryType"}
            value={value}
            type={"text"}
            onChange={onChange}
            placeholder={"Le type ici..."}
            className={"form-input"}
          />
        </div>
        <br />
        <div className="admin-create-category-btn">
          <Button type={"submit"} text={"Créer"} onClick={onClick} />
        </div>
      </dialog>
      <DialogBtn text={text} onClick={openHandler} />
    </div>
  );
}

function AddHousingCategoryDialogBox({ text, onClick, value, onChange }) {
  const dialog = useRef();

  const [file, setFile] = useState(null);
  const formData = new FormData();

  const openHandler = () => {
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };

  const onSubmit = () => {
    if (!file) {
      toast.error("Veuillez choisir une icon !");
      return;
    } else if (!value) {
      toast.error("Veuillez renter le nom de la catégorie !");
      return;
    }
    formData.append("category_img_url", file);
    formData.append("category_name", value);
    api
      .post("api/create-housing-categories/", formData)
      .then((res) => {
        console.log(res);
        toast.success("Catégorie créée avec succès !");
        closeHandler();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Une erreur est survenue.");
      });

    setFile("");
    closeHandler();
  };
  // const formData = new FormData();

  return (
    <div className="dialogue-container">
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

        <div className="admin-create-category">
          <h4>Créer une catégorie</h4>
          <Input
            label={"Nom de la catégorie"}
            reference={"category"}
            value={value}
            type={"text"}
            onChange={onChange}
            placeholder={"La catégorie ici..."}
            className={"form-input"}
          />
          <br />
          <Input
            label={"Choisissez une icône"}
            reference={"categoryImg"}
            type={"file"}
            onChange={(e) => setFile(e.target.files[0])}
            placeholder={"L'icône ici..."}
            className={"form-input"}
          />
        </div>

        <br />

        <div className="admin-create-category-btn">
          <Button type={"submit"} text={"Créer"} onClick={onSubmit} />
        </div>
      </dialog>
      <DialogBtn text={text} onClick={openHandler} />
    </div>
  );
}

function AddOutStandingEqDialogBox({ text, onClick, value, onChange }) {
  const dialog = useRef();

  const [file, setFile] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const formData = new FormData();

  const openHandler = () => {
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };

  const onSubmit = () => {
    if (!file) {
      toast.error("Veuillez choisir une icon !");
      return;
    } else if (!value) {
      toast.error("Veuillez renter le nom de l'équipement !");
      return;
    } else if (!selectedCategoryId) {
      toast.error("Veuillez choisir une catégorie !");
      return;
    }

    formData.append("equipment_img_url", file);
    formData.append("equipment_name", value);
    formData.append("equipment_category_id", selectedCategoryId);

    api
      .post("api/create-outstanding-equipments/", formData)
      .then((res) => {
        console.log(res);
        toast.success("Equipement créé avec succès !");
      })
      .catch((error) => console.log(error));

    closeHandler();
  };
  // const formData = new FormData();

  return (
    <div className="dialogue-container">
      <ToastContainer stacked position="bottom-left" />
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

        <div className="admin-create-category">
          <h4>Créer un équipement hors du commun</h4>
          <SelectInput
            label={"Type de catégorie"}
            reference={"category"}
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className={"form-input"}
          />
          <Input
            label={"Nom de l'équipement"}
            reference={"category"}
            value={value}
            type={"text"}
            onChange={onChange}
            placeholder={"Nom de l'équipement ici..."}
            className={"form-input"}
          />
          <Input
            label={"Choissez une icon"}
            reference={"categoryImg"}
            // value={file}
            type={"file"}
            onChange={(e) => setFile(e.target.files[0])}
            placeholder={"L'icon ici..."}
            className={"form-input"}
          />
        </div>

        <br />
        <div className="admin-create-category-btn">
          <Button type={"submit"} text={"Créer"} onClick={onSubmit} />
        </div>
      </dialog>
      <DialogBtn text={text} onClick={openHandler} />
    </div>
  );
}

function UsefullEquipmentsDialogBox({ text, onClick, value, onChange }) {
  const dialog = useRef();

  const [file, setFile] = useState(null);

  const formData = new FormData();

  const openHandler = () => {
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };

  const onSubmit = () => {
    if (!file) {
      toast.error("Veuillez choisir une icon !");
      return;
    } else if (!value) {
      toast.error("Veuillez renter le nom de l'équipement !");
      return;
    }

    formData.append("usefull_equipment_img_url", file);
    formData.append("usefull_equipment_name", value);

    api
      .post("api/create-usefull-equipments/", formData)
      .then((res) => {
        console.log(res);
        toast.success("Equipement créé avec succès !");
      })
      .catch((error) => console.log(error));

    closeHandler();
  };
  // const formData = new FormData();

  return (
    <div className="dialogue-container">
      {/* <ToastContainer stacked position="bottom-left" /> */}
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

        <div className="admin-create-category">
          <h4>Créer un équipement souvant utilisé</h4>
          <Input
            label={"Nom de l'équipement"}
            reference={"category"}
            value={value}
            type={"text"}
            onChange={onChange}
            placeholder={"Nom de l'équipement ici..."}
            className={"form-input"}
          />
          <Input
            label={"Choissez une icon"}
            reference={"usefullEquipmentImg"}
            type={"file"}
            onChange={(e) => setFile(e.target.files[0])}
            placeholder={"L'icon ici..."}
            className={"form-input"}
          />
        </div>
        <br />
        <div className="admin-create-category-btn">
          <Button type={"submit"} text={"Créer"} onClick={onSubmit} />
        </div>
      </dialog>
      <DialogBtn text={text} onClick={openHandler} />
    </div>
  );
}

function SecurityEquipmentDialogBox({ text, onClick, value, onChange }) {
  const dialog = useRef();

  const [file, setFile] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const formData = new FormData();

  const openHandler = () => {
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFile(file);
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       setImagePreview(event.target.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const onSubmit = () => {
    if (!file) {
      toast.error("Veuillez choisir une icon !");
      return;
    } else if (!value) {
      toast.error("Veuillez renter le nom de l'équipement !");
      return;
    } else if (!selectedCategoryId) {
      toast.error("Veuillez choisir une catégorie !");
      return;
    }

    formData.append("equipment_image_url", file);
    formData.append("equipment_name", value);
    formData.append("equipment_category_id", selectedCategoryId);

    api
      .post("api/create-security-equipments/", formData)
      .then((res) => {
        console.log(res);
        toast.success("Equipement de sécurité créé avec succès !");
      })
      .catch((error) => console.log(error));

    closeHandler();
  };
  // const formData = new FormData();

  return (
    <div className="dialogue-container">
      {/* <ToastContainer stacked position="bottom-left" /> */}
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
        <div className="admin-create-category">
          <h4>Créer un équipement de sécurité</h4>
          <SelectInput
            label={"Type de catégorie"}
            reference={"category"}
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className={"form-input"}
          />
          <Input
            label={"Nom de l'équipement"}
            reference={"category"}
            value={value}
            type={"text"}
            onChange={onChange}
            placeholder={"Nom de l'équipement ici..."}
            className={"form-input"}
          />
          <Input
            label={"Choissez une icon"}
            reference={"categoryImg"}
            // value={file}
            type={"file"}
            onChange={(e) => setFile(e.target.files[0])}
            placeholder={"L'icon ici..."}
            className={"form-input"}
          />
        </div>
        <br />
        <div className="admin-create-category-btn">
          <Button type={"submit"} text={"Créer"} onClick={onSubmit} />
        </div>
      </dialog>
      <DialogBtn text={text} onClick={openHandler} />
    </div>
  );
}

function DescriptiveOptionsDialogBox({ text, onClick, value, onChange }) {
  const dialog = useRef();

  const [file, setFile] = useState(null);

  const formData = new FormData();

  const openHandler = () => {
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };

  const onSubmit = () => {
    if (!file) {
      toast.error("Veuillez choisir une icon !");
      return;
    } else if (!value) {
      toast.error("Veuillez renter une option descriptive !");
      return;
    }

    formData.append("descriptive_options_img_url", file);
    formData.append("descriptive_options_name", value);

    api
      .post("api/create-descriptive-options/", formData)
      .then((res) => {
        console.log(res);
        toast.success("Option descriptive créée avec succès !");
      })
      .catch((error) => console.log(error));

    setFile("");
    closeHandler();
  };
  // const formData = new FormData();

  return (
    <div className="dialogue-container">
      {/* <ToastContainer stacked position="bottom-left" /> */}
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

        <div className="admin-create-category">
          <h4>Créer une option descriptive</h4>
          <Input
            label={"Nom de l'option"}
            reference={"option"}
            value={value}
            type={"text"}
            onChange={onChange}
            placeholder={"L'option ici..."}
            className={"form-input"}
          />
          <Input
            label={"Choissez une icon"}
            reference={"option"}
            // value={file}
            type={"file"}
            onChange={(e) => setFile(e.target.files[0])}
            placeholder={"L'icon ici..."}
            className={"form-input"}
          />
        </div>

        <br />

        <div className="admin-create-category-btn">
          <Button type={"submit"} text={"Créer"} onClick={onSubmit} />
        </div>
      </dialog>
      <DialogBtn text={text} onClick={openHandler} />
    </div>
  );
}

function BasicSuppliersDialogBox({ text, onClick, value, onChange }) {
  const dialog = useRef();
  const formData = new FormData();

  const openHandler = () => {
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };

  const onSubmit = () => {
    if (!value) {
      toast.error("Veuillez renter le nom de l'équipement !");
      return;
    }

    formData.append("basic_suppliers_name", value);
    api
      .post("api/create-basic-suppliers/", formData)
      .then((res) => toast.success("Equipement créé avec succès !"))
      .catch((error) => {
        console.log(error);
        toast.error("Une erreur est survenue lors de l'enregistrement");
      });

    closeHandler();
  };

  return (
    <div className="dialogue-container">
      {/* <ToastContainer stacked position="bottom-left" /> */}
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

        <div className="admin-create-category">
          <h4>Créer un équipement de base</h4>
          <Input
            label={"Nom de l'équipement"}
            reference={"category"}
            value={value}
            type={"text"}
            onChange={onChange}
            placeholder={"Nom de l'équipement ici..."}
            className={"form-input"}
          />
        </div>
        <br />
        <div className="admin-create-category-btn">
          <Button type={"submit"} text={"Créer"} onClick={onSubmit} />
        </div>
      </dialog>
      <DialogBtn text={text} onClick={openHandler} />
    </div>
  );
}

function HousingAdvantageDialogBox({ text, onClick, value, onChange }) {
  const dialog = useRef();
  const formData = new FormData();

  const openHandler = () => {
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };

  const onSubmit = () => {
    if (!value) {
      toast.error("Veuillez renter le nom de l'avantage !");
      return;
    }

    formData.append("adventages_name", value);
    api
      .post("api/create-advantages/", formData)
      .then((res) => toast.success("Avantage créé avec succès !"))
      .catch((error) => {
        console.log(error);
        toast.error("Une erreur est survenue lors de l'enregistrement");
      });

    closeHandler();
  };

  return (
    <div className="dialogue-container">
      {/* <ToastContainer stacked position="bottom-left" /> */}
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

        <div className="admin-create-category">
          <h4>Créer un avantage</h4>
          <Input
            label={"Nom de l'avantage"}
            reference={"advantage"}
            value={value}
            type={"text"}
            onChange={onChange}
            placeholder={"Nom de l'avantage ici..."}
            className={"form-input"}
          />
        </div>
        <br />
        <div className="admin-create-category-btn">
          <Button type={"submit"} text={"Créer"} onClick={onSubmit} />
        </div>
      </dialog>
      <DialogBtn text={text} onClick={openHandler} />
    </div>
  );
}

function HousingOrderDialogBox({ price, text, housingId, specialRequest }) {
  const dialog = useRef();
  const formData = new FormData();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [isForMe, setIsForMe] = useState(true);

  const [isChecked, setIsChecked] = useState(false);
  const [gender, setGender] = useState("");
  const [forWhoFirstName, setForWhoFirstName] = useState("");
  const [forWhoLastName, setForWhoLastName] = useState("");
  const [forWhoEmail, setForWhoEmail] = useState("");
  const [forWhoPhoneNum, setForWhoPhoneNum] = useState("");
  const [nbMaxPeaple, setNbMaxPeaple] = useState("");
  const [nbMaxChild, setNbMaxChild] = useState("");
  const [nbNight, setNbNight] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [startingHour, setStartingHour] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [specialReq, setSpecialReq] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [paimentPlan, setPaimentPlan] = useState("");
  const [onlinePayment, setOnlinePayment] = useState("");
  const [conditions, setConditions] = useState("");

  useEffect(() => {
    api
      .get(`http://localhost:8000/api/create-housing-order/`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data[0]);

        if (data.length > 0) {
          setFirstName(data[0].firstname);
          setLastName(data[0].lastname);
          setEmail(data[0].email);
          setBirthDate(data[0].birth_date);
          setGender(data[0].gender ? "F" : "M");
          setPhoneNum(data[0].phone_no);
        }
      });
    // const fetchHousing = async () => {
    //   try {
    //     const response = await api.get(
    //       `http://localhost:8000/api/create-housing/${housingId}/`
    //     );
    //     setHousing(response.data);
    //     console.log(response.data);

    //     const pricingData = await fetchHousingPricing(response.data);
    //     setPrice(pricingData.price); // Assurez-vous que le bon champ est utilisé ici
    //   } catch (err) {
    //     console.log(err);
    //     toast.error("Une erreur est survenue lors du chargement des données !");
    //   }
    // };

    // const fetchHousingPricing = async (housingData) => {
    //   if (housingData.house_pricing_id) {
    //     try {
    //       const response = await api.get(
    //         `http://localhost:8000/api/create-house-pricing/${housingData.house_pricing_id}/`
    //       );
    //       console.log(response.data);
    //       return response.data; // Retournez directement les données de prix
    //     } catch (err) {
    //       console.log(err);
    //       toast.error("Une erreur est survenue lors du chargement des prix !");
    //       return null; // Vous pouvez également gérer l'erreur ici si nécessaire
    //     }
    //   }
    //   return null; // Retourne null si aucune ID de prix n'est disponible
    // };

    // fetchHousing();
  }, []);

  const handleSelectChange = (e) => {
    setGender(e.target.value);
  };

  const payhandleSelectChange = (e) => {
    setPaimentPlan(e.target.value);
  };

  const durationhandleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleCheckboxChange = () => {
    setIsForMe(!isForMe);
  };

  const onLinehandleCheckboxChange = () => {
    setOnlinePayment(!onlinePayment);
  };

  const conditionshandleCheckboxChange = () => {
    setConditions(!conditions);
  };

  const textChange = (e) => {
    setSpecialReq(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const openHandler = () => {
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (!firstName) {
      toast.error("Veuillez renter le votre prenom !");
      return;
    } else if (!lastName) {
      toast.error("Veuillez renter votre nom !");
      return;
    } else if (!email) {
      toast.error("Veuillez renter votre email !");
      return;
    } else if (!birthDate) {
      toast.error("Veuillez renter votre date de naissance !");
      return;
    } else if (!gender) {
      toast.error("Veuillez renseigner votre sexe !");
      return;
    } else if (!isForMe && !forWhoFirstName) {
      toast.error("Veuillez renter le prénon du bénéficiaire !");
      return;
    } else if (!isForMe && !forWhoLastName) {
      toast.error("Veuillez renter le nom du bénéficiaire !");
      return;
    } else if (!isForMe && !forWhoEmail) {
      toast.error("Veuillez renter l'email du bénéficiaire !");
      return;
    } else if (!isForMe && !forWhoPhoneNum) {
      toast.error("Veuillez renter le numéro de téléphone du bénéficiaire !");
      return;
    } else if (!nbMaxPeaple) {
      toast.error("Veuillez rensegner le nombre de personnes !");
      return;
    } else if (!nbMaxChild) {
      toast.error(
        "Veuillez rensegner le nombre d'enfants (0 s'il nexiste pas !) !"
      );
      return;
    } else if (!startingDate) {
      toast.error("Veuillez renter la date du début de votre séjour !");
      return;
    } else if (!startingHour) {
      toast.error("Veuillez renter l'heure du début de votre séjour !");
      return;
    } else if (!endingDate) {
      toast.error("Veuillez renter la date de fin de votre séjour !");
      return;
    } else if (!paimentPlan) {
      toast.error("Veuillez choisir une séquence de paiement !");
      return;
    } else if (!phoneNum) {
      toast.error("Veuillez renter votre numéro de téléphone !");
      return;
    } else if (!conditions) {
      toast.error(
        "Veuillez accepter les termes et les conditions d'utilisations !"
      );
      return;
    }

    formData.append("housing_id", parseInt(housingId));
    formData.append("firstname", firstName);
    formData.append("lastname", lastName);
    formData.append("email", email);
    formData.append("birth_date", birthDate);
    formData.append("gender", gender == "F" ? true : false);
    formData.append("reservation_for_you", isForMe);
    formData.append("for_who_first_name", forWhoFirstName);
    formData.append("for_who_last_name", forWhoLastName);
    formData.append("for_who_email", forWhoEmail);
    formData.append("for_who_phone_no", forWhoPhoneNum);
    formData.append("nb_peaple", nbMaxPeaple);
    formData.append("nb_children", nbMaxChild);
    formData.append("duration", nbNight);
    formData.append("starting_date", startingDate);
    formData.append("starting_hour", startingHour);
    formData.append("ending_date", endingDate);
    formData.append("un_know_duration", isChecked);
    formData.append("ordered", true);
    formData.append("payment_choice", paimentPlan);
    formData.append("special_request", specialReq);
    formData.append("phone_no", phoneNum);
    formData.append("on_line_paiment", onlinePayment);

    try {
      api
        .post("api/create-housing-order/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => toast.success("Commande éffectuée avec succès !"))
        .catch((error) => {
          console.log(error);
          toast.error("Une erreur est survenue lors de l'enregistrement");
        });
    } catch (error) {
      console.log(error);
    }

    closeHandler();
  };

  return (
    <div className="dialogue-container">
      {/* <ToastContainer stacked position="bottom-left" /> */}
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

        <label>
          Quelle est votre prénom?
          <FloatInput
            label={"Quelle est votre prénom?"}
            reference={"firstName"}
            value={firstName}
            type={"text"}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={"Votre nom ici..."}
          />
        </label>

        <label>
          Quelle est votre nom?
          <FloatInput
            label={"Quelle est votre nom?"}
            reference={"lastName"}
            value={lastName}
            type={"text"}
            onChange={(e) => setLastName(e.target.value)}
            placeholder={"Votre nom ici..."}
          />
        </label>

        <label>
          Quelle est votre email?
          <FloatInput
            label={"Quelle est votre email?"}
            reference={"email"}
            value={email}
            type={"email"}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"Votre email ici..."}
          />
        </label>

        <label>
          Quelle est votre date de naissance?
          <FloatInput
            label={"Quelle est votre date de naissance?"}
            reference={"date"}
            value={birthDate ? birthDate.substring(0, 10) : ""}
            type={"date"}
            onChange={(e) => setBirthDate(e.target.value)}
            placeholder={"Votre date de naissance ici..."}
          />
        </label>

        <div>
          <label>
            Quelle est votre sexe ?
            <select
              value={gender}
              onChange={handleSelectChange}
              className={"form-input"}
            >
              <option value="">Sélectionnez votre sexe</option>
              <option value="M">Masculin (M)</option>
              <option value="F">Féminin (F)</option>
            </select>
          </label>
        </div>
        <br />
        <label>
          <input
            type="checkbox"
            checked={isForMe}
            onChange={handleCheckboxChange}
          />
          La réservation est pour moi
        </label>
        <br />
        <br />
        {!isForMe && (
          <div>
            <div>
              <label>Pour qui réservez-vous ?</label>
              <br />
              <br />
              <label>
                Veuillez renseigner le prénom de la personne
                <FloatInput
                  label={"Le prénom de la personne ici..."}
                  type={"text"}
                  // name="firstname"
                  reference={"forWhoFirstName"}
                  value={forWhoFirstName}
                  onChange={(e) => setForWhoFirstName(e.target.value)}
                  placeholder={"Le prénom de la personne ici..."}
                />
              </label>
            </div>
            <div>
              <label>
                Veuillez renseigner le nom de la personne
                <FloatInput
                  label={"Le nom de la personne ici..."}
                  reference={"forWhoLastName"}
                  type={"text"}
                  value={forWhoLastName}
                  onChange={(e) => setForWhoLastName(e.target.value)}
                  placeholder={"Le nom de la personne ici..."}
                />
              </label>
            </div>
            <div>
              <label>
                Veuillez renseigner l'email de la personne
                <FloatInput
                  label={"L'email de la personne ici..."}
                  type={"email"}
                  // name="email"
                  reference={"forWhoEmail"}
                  value={forWhoEmail}
                  onChange={(e) => setForWhoEmail(e.target.value)}
                  placeholder={"L'email de la personne ici..."}
                />
              </label>
            </div>
            <div>
              <label>
                Veuillez renseigner le numéro de téléphone de la personne
                <FloatInput
                  label={"Le numéro de téléphone de la personne ici..."}
                  type={"tel"}
                  // name="phone"
                  reference={"forWhoPhone"}
                  value={forWhoPhoneNum}
                  onChange={(e) => setForWhoPhoneNum(e.target.value)}
                  placeholder={"Le numéro de téléphone de la personne ici..."}
                />
              </label>
            </div>
          </div>
        )}

        <br />
        <br />
        <div>
          <label>
            Réservation pour combiend de personnes? (enfants inclus)
            <FloatInput
              label={"Réservation pour combiend de personnes? (enfants inclus)"}
              reference={"nbPeaple"}
              value={nbMaxPeaple}
              type={"number"}
              onChange={(e) => setNbMaxPeaple(e.target.value)}
              placeholder={"Le nombre totale de personnes ici..."}
            />
          </label>
        </div>
        <div>
          <label>
            Combien d'enfants inclus ? (0 s'il n'y en a pas)
            <FloatInput
              label={"Combien d'enfants inclus ? (0 s'il n'y en a pas)"}
              reference={"nbChild"}
              value={nbMaxChild}
              type={"number"}
              onChange={(e) => setNbMaxChild(e.target.value)}
              placeholder={"Le nombre totale d'enfants ici..."}
            />
          </label>
        </div>
        <div>
          <label>
            Pour combien de nuits ? (Facultatif)
            <FloatInput
              label={"Pour combien de nuits ? (Facultatif)"}
              reference={"nbNight"}
              value={nbNight}
              type={"text"}
              onChange={(e) => setNbNight(e.target.value)}
              placeholder={"Pour combien de nuits ?"}
            />
          </label>
        </div>

        <div>
          <label>
            Quand commencez-vous ?
            <FloatInput
              label={"Quand commencez-vous ?"}
              reference={"startingDate"}
              value={startingDate}
              type={"date"}
              onChange={(e) => setStartingDate(e.target.value)}
              placeholder={"Date de début"}
            />
          </label>
        </div>

        <div>
          <label>
            À quel heure commencez-vous ?
            <FloatInput
              label={"À quel heure commencez-vous ?"}
              reference={"statingHour"}
              value={startingHour}
              type={"Time"}
              onChange={(e) => setStartingHour(e.target.value)}
              placeholder={"Date de début"}
            />
          </label>
        </div>

        <div>
          <label>
            Quand finissez-vous ? (facultatif)
            <FloatInput
              label={"Quand finissez-vous ? (facultatif) "}
              reference={"endingDate"}
              value={endingDate}
              type={"date"}
              onChange={(e) => setEndingDate(e.target.value)}
              placeholder={"Date de début"}
            />
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={durationhandleCheckboxChange}
            />
            Il s'agit d'une location à durée indéterminée
          </label>
        </div>
        <br />
        <div>
          <label>
            Comment souhatez-vous payer ?
            <select
              value={paimentPlan}
              onChange={payhandleSelectChange}
              className={"form-input"}
            >
              <option value="">Sélectionnez</option>

              {price.payment_by_night && (
                <option value="N">
                  {price.price_by_night} Xof par nuit (location)
                </option>
              )}
              {price.payment_by_week && (
                <option value="W">
                  {price.price_by_week} Xof par semaine (location)
                </option>
              )}
              {price.payment_by_month && (
                <option value="M">
                  {price.price_by_month} Xof par mois (location)
                </option>
              )}
              {price.for_sale_pricing && (
                <option value="V">
                  {price.for_sale_pricing} Xof prix de vente{" "}
                  {price.for_sale_pricing_discussed
                    ? " à débattre"
                    : " à ne pas débattre"}
                </option>
              )}
            </select>
          </label>
        </div>
        <br />
        <label htmlFor="request">
          Avez vous des requettes spéciaux à soumettre ? (facultatif)
        </label>

        {specialRequest && (
          // <textarea name="" id="request" cols="30" rows="10"></textarea>
          <textarea
            value={specialReq}
            onChange={textChange}
            placeholder="Écris quelque chose..."
            className="Texterea"
            rows={10}
          />
        )}
        <br />
        <div>
          <label>
            Dites nous comment pouvons nous vous contacter ?
            <FloatInput
              label={"Dites nous comment pouvons nous vous contacter ?"}
              reference={"phone"}
              value={phoneNum}
              type={"number"}
              onChange={(e) => setPhoneNum(e.target.value)}
              placeholder={"votre numéro de téléphone ici..."}
            />
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={onlinePayment}
              onChange={onLinehandleCheckboxChange}
            />
            <b>Cochez ceci si vous souhaitez payer en ligne.</b>
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={conditions}
              onChange={conditionshandleCheckboxChange}
            />
            <b>
              J'accept les <a href="#">termes</a> et les{" "}
              <a href="#">conditions d'utilisations</a>.
            </b>
          </label>
        </div>

        <br />
        <div className="text-center">
          <Button type={"submit"} text={"Soumettre"} onClick={onSubmit} />
        </div>
      </dialog>
      <Button text={text} onClick={openHandler} />
    </div>
  );
}

export {
  InfoDialogueBox,
  ShowProfile,
  AddHousingCategoryTypeDialogBox,
  AddHousingCategoryDialogBox,
  AddOutStandingEqDialogBox,
  UsefullEquipmentsDialogBox,
  SecurityEquipmentDialogBox,
  DescriptiveOptionsDialogBox,
  BasicSuppliersDialogBox,
  HousingAdvantageDialogBox,
  HousingOrderDialogBox,
};
