import React, { useRef, useState } from "react";
import HousingCategoriesType from "../../includes/categories/HousingCategoriesType";
import { DialogBtn } from "../../components/button/Button";
import { AddHousingCategoryTypeDialogBox } from "../../components/Dialogue/InfoDialogueBox";
import axios from "axios";
import api from "../../api";
import { toast, ToastContainer } from "react-toastify";
import CategoriesMenu from "../../includes/CategoriesMenu";
import Slider from "../../includes/Slider";
import AdminMenu from "../../includes/AdminMenu";

export default function AllCategoriesType() {
  const [value, setValue] = useState("");
  const [siderVisible, setSiderVisible] = useState(true);
  const category_name = value;
  const dialog = useRef();

  const EventHandler = () => {
    try {
      api.post("api/create-equipments-categories/", {
        category_name,
      });
      toast.success("Le type de catégory a été créé avec succès !");
    } catch (err) {
      // console.log(err);
      toast.error("Une erreur est survenue lors de la création !");
    }
  };

  const handlerShowSider = (show) => {
    setSiderVisible(show);
  };

  return (
    <div className="admin">
      <Slider showSider={siderVisible} />

      <div className="container main">
        <AdminMenu handlerShowSider={handlerShowSider} />
        <div className="categories-type-margin">
          <span className="category-type-container">
            <CategoriesMenu />
            <p>Liste de tous les types de catégories :</p>

            {/* <DialogBtn text={"Ajouter un type +"} /> */}
            <AddHousingCategoryTypeDialogBox
              text={"Ajouter un type +"}
              onClick={EventHandler}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </span>
          <br />
          <br />
          <HousingCategoriesType />
        </div>
      </div>
    </div>
  );
}
