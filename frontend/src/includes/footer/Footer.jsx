import React, { useEffect, useState } from "react";
import "./Footer.css";
import {
  ManageCookies,
  ManageUserData,
  UsingConditions,
} from "../../components/Dialogue/ConditionsDialog";
import Cookies from "js-cookie";

import Logo from "../../assets/logo/Tenant288.png";
import facebook from "../../assets/Icons/facebook.png";
import linkedin from "../../assets/Icons/linkedin.png";
import twitter from "../../assets/Icons/twitter.png";
import { ShowProfile } from "../../components/Dialogue/InfoDialogueBox";
import { Link } from "react-router-dom";

export default function Footer() {
  const [cookie, setCookie] = useState(null);

  useEffect(() => {
    const isConnected = Cookies.get("conected");
    if (isConnected) {
      setCookie(true);
    }
  });

  return (
    <footer>
      <div className="footer">
        <div>
          <Link to={"/"}>
            <img src={Logo} alt="Logo" className="footer-logo" />
          </Link>

          <p className="tenant-footer">
            <span className="tenant">Tenant228</span>, la plate-forme à votre
            service pour mêtre en relation les chercheurs de logements et les
            promoteurs.
          </p>
        </div>

        <div className="footer-center-items">
          <div>
            <h3>Menu</h3>
            <Link to={"processing/start"} className="footer-link">
              <p>Publier un logement</p>
            </Link>

            <Link to={"/cart"} className="footer-link">
              <p>Mes commandes</p>
            </Link>
            {cookie ? (
              <p className="footer-link">
                <ShowProfile text={"Profile"} />
              </p>
            ) : (
              <div>
                <Link to={"/login"} className="footer-link">
                  <p>Se connecter</p>
                </Link>
                <Link to={"/registration"} className="footer-link">
                  <p>S'inscrire</p>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3>Suivez-nous</h3>

          <div className="footer-social">
            <a href="https://www.facebook.com">
              <img
                src={facebook}
                alt="facebook"
                className="footer-social-network"
              />
            </a>
            <a href="https://www.linkedin.com/">
              <img
                src={linkedin}
                alt="linkedin"
                className="footer-social-network"
              />
            </a>
            <a href="https://x.com/">
              <img
                src={twitter}
                alt="twitter"
                className="footer-social-network"
              />
            </a>
          </div>

          <UsingConditions />

          <ManageUserData />

          <ManageCookies />
        </div>
      </div>

      <div className="second-footer">
        <p>
          Tenant228 © 2024 - Powered by and disigned by{" "}
          <a href="mailto:douvonangelotadn@gmail.com">
            douvonangelotadn@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}
