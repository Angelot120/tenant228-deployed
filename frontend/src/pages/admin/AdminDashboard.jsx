import React, { useEffect, useState } from "react";
import Slider from "../../includes/Slider";
import AdminHome from "../../includes/AdminHome";
import AdminMenu from "../../includes/AdminMenu";
import Cookies from "js-cookie";

export default function AdminDashboard() {
  const [isSuperUser, setIsSuperUser] = useState(false);
  const [siderVisible, setSiderVisible] = useState(true);

  const getCookie = () => {
    const cookieValue = Cookies.get("superAdmin");
    setIsSuperUser(cookieValue);
    // console.log(cookieValue);
  };

  useEffect(() => {
    getCookie();
  }, []);

  const handlerShowSider = (show) => {
    setSiderVisible(show);
  };

  return (
    <div className="admin">
      <Slider showSider={siderVisible} />
      <div className="main container">
        <div>
          <AdminMenu handlerShowSider={handlerShowSider} />
          <AdminHome />
        </div>
      </div>
    </div>
  );
}
