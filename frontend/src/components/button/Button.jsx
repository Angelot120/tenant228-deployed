import React, { useState } from "react";
import "./Button.css";
import {
  BasicSuppliers,
  Categories,
  Equipments,
} from "../categories/Categories";

function Button({ text, onClick, type }) {
  // onContextMenu={e.preventDefault()}
  return (
    <div>
      <button type={type} className="button" onClick={onClick}>
        {text || "Opérations"}
      </button>
    </div>
  );
}

function OutlineButton({ text, onClick, type }) {
  // onContextMenu={e.preventDefault()}
  return (
    <div>
      <button type={type} className="button button-outlined" onClick={onClick}>
        {text || "Opérations"}
      </button>
    </div>
  );
}

function PinkButton({ text, onClick, type, disabled }) {
  // onContextMenu={e.preventDefault()}
  return (
    <div>
      <button
        type={type}
        className="button pink-button"
        onClick={onClick}
        disabled={disabled}
      >
        {text || "Opérations"}
      </button>
    </div>
  );
}

function DialogBtn({ text, onClick }) {
  return (
    <div>
      <button className="dialog-btn" onClick={onClick}>
        {text || "Opérations"}
      </button>
    </div>
  );
}

function CategoriesDialogBtn({ name, imgUrl, onClick }) {
  // const BASE_URL = "http://localhost:8000";

  return (
    <span onClick={onClick}>
      {/* <img src={`${BASE_URL}${imgUrl}`} alt={name} /> */}
      <div>
        <Categories name={name} imgUrl={imgUrl} />
      </div>
    </span>
  );
}

function OtstandingDialogBtn({ CategoryType, name, imgUrl, onClick }) {
  return (
    <span onClick={onClick}>
      <div>
        <Equipments name={name} imgUrl={imgUrl} />
      </div>
    </span>
  );
}
function BasicSuppliersBtn({ name, onClick }) {
  return (
    <div onClick={onClick}>
      <BasicSuppliers name={name} />
    </div>
  );
}
function HousingAdvantagesBtn({ name, onClick }) {
  return (
    <div onClick={onClick}>
      <BasicSuppliers name={name} />
    </div>
  );
}

export {
  Button,
  OutlineButton,
  PinkButton,
  DialogBtn,
  CategoriesDialogBtn,
  OtstandingDialogBtn,
  BasicSuppliersBtn,
  HousingAdvantagesBtn,
};
