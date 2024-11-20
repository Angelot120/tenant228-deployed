import React, { useEffect, useRef, useState } from "react";
import CategoriesType from "../../components/categories/CategoriesType";
import api from "../../api";
import { toast, ToastContainer } from "react-toastify";
import { Button, DialogBtn } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import close from "../../assets/Icons/close_24.svg";
import DeleteIcon from "../../assets/Icons/delete_red_24dp.svg";

export default function HousingCategoriesType() {
  const [value, setValue] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // ID de la catégorie sélectionnée
  const [categoryType, setCategoryType] = useState([]);

  useEffect(() => {
    getCategoriesType();
  }, []);

  const getCategoriesType = () => {
    api
      .get("api/create-equipments-categories/")
      .then((res) => res.data)
      .then((data) => {
        setCategoryType(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err),
          toast.error(
            "Une erreur est survenue lors du chargement des données!"
          );
      });
  };

  const dialog = useRef();

  const openHandler = (category) => {
    setValue(category.category_name); // Préremplir l'input avec le nom de la catégorie
    setSelectedCategoryId(category.id); // Stocker l'ID de la catégorie sélectionnée
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };

  const eventHandler = () => {
    if (selectedCategoryId) {
      api
        .put(`api/create-equipments-categories/${selectedCategoryId}/`, {
          category_name: value,
        })
        .then((res) => {
          toast.success("Category type updated!");
          getCategoriesType();
          closeHandler();
        })
        .catch((error) => toast.error("Failed to update category type."));
    }
  };

  const deleteBtn = () => {
    if (
      confirm(
        "Voulez-vous vraiment supprimer ce Type ? Cette action est irréversible !"
      )
    ) {
      if (selectedCategoryId) {
        api
          .delete(`api/create-equipments-categories/${selectedCategoryId}/`)
          .then((res) => {
            if (res.status === 204) {
              toast.success("Category type deleted!");
              getCategoriesType();
              closeHandler();
            } else {
              toast.error("Failed to delete category type.");
            }
          })
          .catch((error) => toast.error(error));
      }
    }
  };

  return (
    <div>
      <ToastContainer position="bottom-left" stacked />
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
              onChange={(e) => setValue(e.target.value)}
              placeholder={"Le type ici..."}
              className={"form-input"}
            />
          </div>

          <br />

          <div className="text-center">
            <Button type={"submit"} text={"Modifier"} onClick={eventHandler} />
            <br />
            <button className="category-delete-btn">
              <img src={DeleteIcon} alt="delete" onClick={deleteBtn} />
            </button>
          </div>
        </dialog>
      </div>
      {categoryType.map((category, key) => (
        <div key={key}>
          <DialogBtn
            onClick={() => openHandler(category)}
            text={category.category_name}
          >
            <CategoriesType categoryName={category.category_name} />
          </DialogBtn>
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}

/**
 * 
 import React, { useEffect, useRef, useState } from "react";
import CategoriesType from "../../components/categories/CategoriesType";
import api from "../../api";
import { toast, ToastContainer } from "react-toastify";
import { Button, DialogBtn } from "../../components/button/Button";
import Input from "../../components/input/Input";

export default function HousingCategoriesType() {
  const [value, setValue] = useState("");

  // const onChange = () => {
  //   (e) => setValue(e.target.value);
  // };

  const [categoryType, setCategoryType] = useState([]);

  useEffect(() => {
    getCategoriesType();
  }, []);

  const getCategoriesType = () => {
    api
      .get("api/create-equipments-categories/")
      .then((res) => res.data)
      .then((data) => {
        setCategoryType(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err),
          toast.error(
            "Une erreur est survenue lours du chargement des données!"
          );
      });
  };

  const dialog = useRef();

  const openHandler = () => {
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };

  const eventHandler = () => {
    // e.preventDefault();
    // btnClicked();
  };

  const deleteBtn = (id) => {
    toast.success("Button cliqué !");
    api
      .delete(`api/create-equipments-categories/`)
      .then((res) => {
        if (res.status === 204) toast.error("Category type deleted!");
        else toast.error("Failed to delete category type.");
        // getNotes();
      })
      .catch((error) => toast.error(error));
  };

  return (
    <div>
      <ToastContainer />
      <div className="dialogue-container">
        <dialog ref={dialog} className="dialogue">
          <button onClick={closeHandler} type="button">
            Fermer
          </button>
          <Input
            label={"Type de catégorie"}
            reference={"categoryType"}
            value={value}
            type={"text"}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Le type ici..."}
          />
          <Button type={"submit"} text={"Modifier"} onClick={eventHandler} />
          <br />
          <Button type={"submit"} text={"supprimer"} onClick={deleteBtn} />
        </dialog>
      </div>
      {categoryType.map((category, key) => {
        return (
          <div key={key}>
            <DialogBtn onClick={openHandler} text={category.category_name}>
              <CategoriesType categoryName={category.category_name} />
            </DialogBtn>
          </div>
        );
      })}
    </div>
  );
}

 * 
 */
