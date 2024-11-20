import React, { useState } from "react";
import OrderMenu from "../../../includes/OrderMenu";
import AdminOrdersList from "../../../includes/AdminOrdersList";
import Slider from "../../../includes/Slider";
import AdminMenu from "../../../includes/AdminMenu";

export default function AdminOrdersCancelled() {
  const status = 4;
  const [siderVisible, setSiderVisible] = useState(true);

  const handlerShowSider = (show) => {
    setSiderVisible(show);
  };
  return (
    <div className="admin">
      <Slider showSider={siderVisible} />
      <div className="container main">
        <AdminMenu handlerShowSider={handlerShowSider} />
        <OrderMenu />
        <AdminOrdersList status={status} />
      </div>
    </div>
  );
}
