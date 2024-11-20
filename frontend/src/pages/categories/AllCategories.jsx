import React, { useState } from "react";
import {
  HousingAdventages,
  HousingBasicSuppliers,
  HousingCategories,
  HousingDescrptiveOptions,
  HousingEquipments,
  HousingSecurityEquipments,
  HousingUsefullEquipments,
} from "../../includes/categories/HousingCategories";
import {
  BasicSuppliers,
  Equipments,
  UsefullEquipments,
} from "../../components/categories/Categories";
import { DialogBtn } from "../../components/button/Button";
import {
  AddHousingCategoryDialogBox,
  AddOutStandingEqDialogBox,
  BasicSuppliersDialogBox,
  DescriptiveOptionsDialogBox,
  HousingAdvantageDialogBox,
  SecurityEquipmentDialogBox,
  UsefullEquipmentsDialogBox,
} from "../../components/Dialogue/InfoDialogueBox";
import Slider from "../../includes/Slider";
import CategoriesMenu from "../../includes/CategoriesMenu";
import AdminMenu from "../../includes/AdminMenu";

export default function AllCategories() {
  const [value, setValue] = useState("");
  const [outstandingvalue, setOutstandingvalue] = useState("");
  const [useFull, setUseFull] = useState("");
  const [security, setSecurity] = useState("");
  const [option, setOption] = useState("");
  const [basicSupplier, setBasicSupplier] = useState("");
  const [advantage, setAdvantage] = useState("");
  const [siderVisible, setSiderVisible] = useState(true);

  const handlerShowSider = (show) => {
    setSiderVisible(show);
  };

  const EventHandler = () => {};

  return (
    <div className="admin">
      <Slider showSider={siderVisible} />

      <div className="container main admin-categories-container">
        <div>
          <AdminMenu handlerShowSider={handlerShowSider} />
          <br />
          <span>
            <CategoriesMenu />
            <h4>Liste de toutes les catégories : </h4>
            <br />

            <div className="admin-category-top-items">
              <p className="admin-category-title">catégories de logements:</p>

              <AddHousingCategoryDialogBox
                text={"Ajouter une catégorie +"}
                onClick={EventHandler}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </span>
          <br />
          <HousingCategories />
        </div>

        <br />
        <br />

        <div>
          <span className="admin-category-top-items">
            <p className="admin-category-title">Equipments hors du commun:</p>

            <AddOutStandingEqDialogBox
              text={"Ajouter un équipement +"}
              onClick={EventHandler}
              value={outstandingvalue}
              onChange={(e) => setOutstandingvalue(e.target.value)}
            />
          </span>
          <br />
          <HousingEquipments />
        </div>

        <br />
        <br />

        <div>
          <span className="admin-category-top-items">
            <p className="admin-category-title">Equipments souvant utilisés:</p>

            <UsefullEquipmentsDialogBox
              text={"Ajouter un équipement +"}
              onClick={EventHandler}
              value={useFull}
              onChange={(e) => setUseFull(e.target.value)}
            />
          </span>
          <br />
          <HousingUsefullEquipments />
        </div>

        <br />
        <br />

        <div>
          <span className="admin-category-top-items">
            <p className="admin-category-title">Equipments de sécurité:</p>

            <SecurityEquipmentDialogBox
              text={"Ajouter un équipement +"}
              onClick={EventHandler}
              value={security}
              onChange={(e) => setSecurity(e.target.value)}
            />
          </span>
          <br />
          <HousingSecurityEquipments />
        </div>

        <br />
        <br />

        <div>
          <span className="admin-category-top-items">
            <p className="admin-category-title">
              Option descriptives d'un logement:
            </p>

            <DescriptiveOptionsDialogBox
              text={"Ajouter un équipement +"}
              onClick={EventHandler}
              value={option}
              onChange={(e) => setOption(e.target.value)}
            />
          </span>
          <br />
          <HousingDescrptiveOptions />
        </div>

        <br />
        <br />

        <div>
          <span className="admin-category-top-items">
            <p className="admin-category-title">Equipments de base:</p>

            <BasicSuppliersDialogBox
              value={basicSupplier}
              text={"Ajouter un équipement de base +"}
              onChange={(e) => setBasicSupplier(e.target.value)}
            />
          </span>
          <br />
          <HousingBasicSuppliers />
        </div>

        <br />
        <br />
        <br />

        <div>
          <span className="admin-category-top-items">
            <p className="admin-category-title">Avantages des logements:</p>

            <HousingAdvantageDialogBox
              value={advantage}
              text={"Ajouter un avantage +"}
              onChange={(e) => setAdvantage(e.target.value)}
            />
          </span>
          <br />
          <HousingAdventages />
        </div>
        <br />
        <br />
      </div>
    </div>
  );
}
