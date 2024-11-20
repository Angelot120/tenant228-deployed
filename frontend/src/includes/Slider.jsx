import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../api";
import Logo from "../assets/logo/Tenant288.png";
import housingWhiteLogo from "../assets/Icons/account_balance_wallet_24.svg";

export default function Slider(showSider) {
  const [activeIndex, setActiveIndex] = useState(null);
  // const [showSider, setShowSider] = useState(true);
  const [isSuperUser, setIsSuperUser] = useState(null);
  const [provider, setProvider] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const getCookie = () => {
    const isConnected = Cookies.get("conected");
    if (!isConnected) {
      navigate("/login");
    }
    const cookieValue = Cookies.get("superAdmin");
    setIsSuperUser(cookieValue);
  };

  useEffect(() => {
    getCookie();
    api
      .get("http://localhost:8000/api/get-provider/")
      .then((res) => res.data)
      .then((data) => {
        setProvider(data[0]);
        // console.log("Proviser", data[0]);
      });
  }, []);

  useEffect(() => {
    if (location.pathname === "/admin") setActiveIndex(1);
    else if (location.pathname === "/admin/housing") setActiveIndex(2);
    else if (location.pathname === "/admin/orders") setActiveIndex(3);
    else if (location.pathname === "/admin/my-company") setActiveIndex(4);
    else if (location.pathname === "/admin/categories") setActiveIndex(5);
  }, [location]);

  // const handleClick = (id) => {
  //   setActiveIndex(id || null);
  // };

  // const toggleSider = () => {
  //   setShowSider((prev) => !prev);
  // };

  return (
    <div className={`slider-all-items ${showSider.showSider ? "" : "show"}`}>
      <div className="navigation">
        <ul>
          <li className="sider-logo">
            <Link to={"/"}>
              <img src={Logo} alt="" className="sider-bar-icon" />
            </Link>
          </li>
          <li
            className={`slider-item ${
              activeIndex === 1 ? "active" : ""
            } sider-distinct-item`}
          >
            <Link to="/admin" onClick={() => setActiveIndex(1)}>
              <div>
                <i className="material-icons">home</i>
                <p>Tableau de bord</p>
              </div>
            </Link>
          </li>
          <li
            className={`slider-item ${
              activeIndex === 2 ? "active" : ""
            } sider-distinct-item`}
          >
            <Link to="/admin/housing" onClick={() => setActiveIndex(2)}>
              <div>
                <i className="material-icons">villa</i>
                <p>{isSuperUser ? "Logements" : "Mes logement"}</p>
              </div>
            </Link>
          </li>
          <li
            className={`slider-item ${
              activeIndex === 3 ? "active" : ""
            } sider-distinct-item`}
          >
            <Link to="/admin/orders" onClick={() => setActiveIndex(3)}>
              <div>
                <i className="material-icons">shopping_cart</i>
                <p> {isSuperUser ? "Commandes" : "Commandes reçues"}</p>
              </div>
            </Link>
          </li>
          {provider?.whoAreYou && (
            <li
              className={`slider-item ${
                activeIndex === 4 ? "active" : ""
              } sider-distinct-item`}
            >
              <Link to="/admin/my-company" onClick={() => setActiveIndex(4)}>
                <div>
                  <i className="material-icons">business</i>

                  <p>{isSuperUser ? "Entreprises" : "Mon entreprise"}</p>
                </div>
              </Link>
            </li>
          )}

          {isSuperUser == "true" ? (
            <li
              className={`slider-item ${
                activeIndex === 5 ? "active" : ""
              } sider-distinct-item`}
            >
              <Link to="/admin/categories" onClick={() => setActiveIndex(5)}>
                <div>
                  <i className="material-icons">category</i>
                  <p>Catégories</p>
                </div>
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
}
