import React, { useState } from "react";
import Slider from "../../includes/Slider";
import AdminHousingList from "../../includes/AdminHousingList";
// import { InfoDialogueBox } from "../../components/Dialogue/InfoDialogueBox";
import AdminMenu from "../../includes/AdminMenu";
import { Link, useNavigate } from "react-router-dom";

export default function AdminHousing() {
  const navigate = useNavigate();
  const [siderVisible, setSiderVisible] = useState(true);

  const handlerCreate = (e) => {
    e.preventDefault();
    navigate("/processing/create-housing/start");
  };

  const handlerShowSider = (show) => {
    setSiderVisible(show);
  };

  return (
    <div className="admin">
      <Slider showSider={siderVisible} />
      <div className="container main">
        <AdminMenu handlerShowSider={handlerShowSider} />
        <span className="admin-housing-first-items">
          <p style={{ marginLeft: "10px" }}>Liste des logements:</p>

          {/* <Link to="processing/create-housing/start"></Link> */}

          <p onClick={(e) => handlerCreate(e)}>Ajouter un logement +</p>
        </span>

        <br />

        <AdminHousingList />

        {/* <InfoDialogueBox /> */}
      </div>
    </div>
  );
}
