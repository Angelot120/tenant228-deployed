import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "../assets/Icons/menu_24.png";
import profile from "../assets/Icons/profile_user.svg";

export default function AdminMenu({ handlerShowSider }) {
  const [showSider, setShowSider] = useState(true);
  const location = useLocation();

  const toggleSider = () => {
    setShowSider((prev) => !prev);
    handlerShowSider(showSider);
  };

  // useEffect(() => {
  //   if (location.pathname === "/admin") setShowSider(1);
  //   else if (location.pathname === "/admin/housing") setShowSider(true);
  //   else if (location.pathname === "/admin/orders") setShowSider(true);
  //   else if (location.pathname === "/admin/my-company") setShowSider(true);
  //   else if (location.pathname === "/admin/categories") setShowSider(true);
  // }, [location]);

  return (
    <header className="admin-header">
      <div className="admin-menu">
        <ul>
          <ul className="admin-menu-left-items">
            <li onClick={toggleSider}>
              <img src={MenuIcon} alt="Menu icon" />
            </li>

            <li>
              <Link to={"/"}>Page d'accueil</Link>
            </li>
          </ul>
          <li>
            <Link to={"/admin/profile"}>
              <img src={profile} alt="" />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
