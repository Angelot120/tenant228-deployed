import React, { useState } from "react";
import EnterpriseMenu from "../../../includes/EnterpriseMenu";
import CompaniesList from "../../../includes/CompaniesList";
import Slider from "../../../includes/Slider";
import AdminMenu from "../../../includes/AdminMenu";

export default function UsersCompany() {
  const [siderVisible, setSiderVisible] = useState(true);

  const handlerShowSider = (show) => {
    setSiderVisible(show);
  };
  return (
    <div className="admin">
      <Slider showSider={siderVisible} />
      <div className="container main">
        <AdminMenu handlerShowSider={handlerShowSider} />
        <EnterpriseMenu />
        <h1>Thi is all users companies</h1>
        <CompaniesList />
      </div>
    </div>
  );
}
