import React, { useEffect, useState } from "react";
import api from "../../api";

export default function SelectInput({
  label,
  reference,
  name,
  value,
  onChange,
  className,
}) {
  const [categoryType, setCategoryType] = useState([]);

  useEffect(() => {
    LoadCategoryType();
  }, []);

  const LoadCategoryType = () => {
    api
      .get("api/create-equipments-categories/")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setCategoryType(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <label htmlFor={reference}>{label}</label>
      <select
        name={name}
        id={reference}
        value={value ? value : "Veuillez sélectionner une option"}
        onChange={onChange}
        className={className}
        required
      >
        <option>Veuillez choisir une option</option>
        {categoryType.map((option) => (
          <option key={option.id} value={option.id}>
            {option.category_name}
          </option>
        ))}
      </select>
    </div>
  );
}
