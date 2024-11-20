import React, { useState } from "react";
import AdminOrdersList from "../../../includes/AdminOrdersList";
import OrderMenu from "../../../includes/OrderMenu";
import Slider from "../../../includes/Slider";
import AdminMenu from "../../../includes/AdminMenu";

export default function AdminOrders() {
  const status = 1;

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
