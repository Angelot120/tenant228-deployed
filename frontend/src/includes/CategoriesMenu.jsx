import React from "react";
import { Link } from "react-router-dom";

export default function CategoriesMenu() {
  return (
    <div className="categories-menu">
      <ul>
        <li>
          <Link to={"/admin/categories"}>Catégories</Link>
        </li>
        <li>
          <Link to={"/admin/categories-type"}>Type de catégories</Link>
        </li>
      </ul>
    </div>
  );
}
