import React from "react";
import { Button } from "../../../components/button/Button";
import "./Menu.css";
import Logo from "../../../assets/logo/Tenant288.png";
import { Link } from "react-router-dom";

export default function HousingProcessingMenu({ to, text, onClick }) {
  return (
    <header className="second-menu-bar">
      <nav>
        <Link to={"/"}>
          <img src={Logo} alt="Logo" className="header-logo" />
        </Link>

        <Button text={text} onClick={onClick} />
      </nav>
    </header>
  );
}
