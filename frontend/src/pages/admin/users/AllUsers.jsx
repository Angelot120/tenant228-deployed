import React, { useState } from "react";
import UsersList from "../../../includes/UsersList";
import AdminMenu from "../../../includes/AdminMenu";
import Slider from "../../../includes/Slider";

export default function AllUsers() {
  const [siderVisible, setSiderVisible] = useState(true);

  const handlerShowSider = (show) => {
    setSiderVisible(show);
  };

  return (
    <div>
      <Slider showSider={siderVisible} />

      <div>
        <AdminMenu handlerShowSider={handlerShowSider} />

        <UsersList />
      </div>
    </div>
  );
}
