import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShowProfile } from "../../components/Dialogue/InfoDialogueBox";
import "./header.css";
import logo from "../../assets/logo/Tenant288.png";
import Cookies from "js-cookie";
import api from "../../api";
import Menu from "../../assets/Icons/menu_24.png";
import Close from "../../assets/Icons/close_24.svg";

export default function HomeMenu() {
  const token = localStorage.getItem("access");
  const [cookie, setCookie] = useState(null);
  const [provider, setProvider] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getCookie = () => {
      const isConnected = Cookies.get("conected");
      if (isConnected) {
        setCookie(true);
      }
    };
    getCookie();

    api
      .get("http://localhost:8000/api/get-provider/")
      .then((res) => res.data)
      .then((data) => {
        setProvider(data[0]);
        // console.log("Yes", data[0]);
      });
  });

  const showHandler = () => {
    // console.log("Wep");
    setShow(!show);
  };

  // console.log("Yes", provider);

  return (
    <div>
      <header className="home-main-menu home-menu">
        <Link to={"/"}>
          <img src={logo} alt="Logo" className="header-logo" />
        </Link>

        {provider?.id && (
          <p>
            <Link to={"/admin"} className="show-admin">
              Logements
            </Link>
          </p>
        )}
        <ul className="home-list-items">
          <li>
            <Link to={"/processing/start"}>Publier un logement</Link>
          </li>
          <li>
            <Link to={"/cart"}>Mes commandes</Link>
          </li>
          <li>
            {!cookie ? (
              <Link to={"/login"}>Se connecter</Link>
            ) : (
              <ShowProfile text={"Profile"} />
            )}
          </li>
        </ul>
      </header>

      <header className=" responsive-home-menu">
        <div className="home-menu">
          <Link to={"/"}>
            <img src={logo} alt="Logo" className="menu-header-icon" />
          </Link>

          <ul className="home-list-items">
            <a onClick={showHandler}>
              {show ? (
                <img src={Menu} alt="menu" className="menu-header-icon" />
              ) : (
                <img src={Close} alt="menu" className="menu-header-icon" />
              )}
            </a>
          </ul>
        </div>
        <div className={`res-menu-sider ${show && "show-menu"}`}>
          <div>
            <p>
              <Link to={"/processing/start"} className="color-black">
                Publier un logement
              </Link>
            </p>

            <br />
            <p>
              <Link to={"/cart"} className="color-black">
                Mes commandes
              </Link>
            </p>

            <br />

            <p>
              {!cookie ? (
                <Link to={"/login"} className="color-black">
                  Se connecter
                </Link>
              ) : (
                <ShowProfile text={"Profile"} />
              )}
            </p>
          </div>
        </div>
      </header>
    </div>
  );
}
