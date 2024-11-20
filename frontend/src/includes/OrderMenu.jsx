import React from "react";
import { Link } from "react-router-dom";

export default function OrderMenu() {
  return (
    <div  className="order-menu">
      <ul>
        <li>
          <Link to={"/admin/orders"}>En attente</Link>
        </li>
        <li>
          <Link to={"/admin/orders-in-progress"}>En cours</Link>
        </li>
        <li>
          <Link to={"/admin/orders-completed"}>Achevées</Link>
        </li>
        <li>
          <Link to={"/admin/orders-cancelled"}>Annulées</Link>
        </li>
        <li>
          <Link to={"/admin/orders-refused"}>Refusées</Link>
        </li>
      </ul>
    </div>
  );
}
