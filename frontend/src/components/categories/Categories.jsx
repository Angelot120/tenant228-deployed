import React from "react";

function Categories({ name, imgUrl }) {
  // const BASE_URL = "http://localhost:8000";

  return (
    <div className="detail-options-card">
      {/* <img src={`${BASE_URL}${imgUrl}`} alt={name} /> */}
      <img src={`${imgUrl}`} alt={name} className="detail-options-card-img" />
      <p>{name}</p>
    </div>
  );
}

function Equipments({ name, imgUrl }) {
  return (
    <div className="detail-options-card">
      <img src={`${imgUrl}`} alt={name} className="detail-options-card-img" />
      <p>{name}</p>
    </div>
  );
}

function UsefullEquipments({ name, imgUrl, onClick }) {
  return (
    <div className="detail-options-card" onClick={onClick}>
      <img src={imgUrl} alt="Equipment" className="detail-options-card-img" />
      <p>{name}</p>
    </div>
  );
}

function SecurityEquipments({ name, imgUrl, onClick }) {
  return (
    <div className="detail-options-card" onClick={onClick}>
      <img
        src={imgUrl}
        alt="Catogory img"
        className="detail-options-card-img"
      />
      <p>{name}</p>
    </div>
  );
}

function DescrptiveOptions({ name, imgUrl, onClick }) {
  return (
    <div className="detail-options-card" onClick={onClick}>
      <img
        src={imgUrl}
        alt="Catogory img"
        className="detail-options-card-img"
      />
      <p>{name}</p>
    </div>
  );
}

function BasicSuppliers({ name }) {
  return (
    <div>
      <p>{name}</p>
    </div>
  );
}

function Adventages({ name }) {
  return (
    <div>
      <p>{name}</p>
    </div>
  );
}

export {
  Categories,
  Equipments,
  UsefullEquipments,
  SecurityEquipments,
  DescrptiveOptions,
  BasicSuppliers,
  Adventages,
};
