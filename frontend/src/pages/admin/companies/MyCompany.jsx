import React, { useState } from "react";
import EnterpriseMenu from "../../../includes/EnterpriseMenu";
import MyCompanyItemsList from "../../../includes/MyCompanyItemsList";
import Slider from "../../../includes/Slider";
import AdminMenu from "../../../includes/AdminMenu";

export default function MyCompany() {
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
        <MyCompanyItemsList />
      </div>
    </div>
  );
}
