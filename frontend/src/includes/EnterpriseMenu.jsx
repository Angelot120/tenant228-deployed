import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function EnterpriseMenu() {
  const [isSuperUser, setIsSuperUser] = useState(false);

  const getCookie = () => {
    const cookieValue = Cookies.get("superAdmin");
    setIsSuperUser(cookieValue);
    // console.log(cookieValue);
  };

  useEffect(() => {
    getCookie();
  }, []);

  return (
    <div className="company-menu">
      {isSuperUser && (
        <ul>
          {/* <li>
            <Link to={"/admin/my-company"}>Moi</Link>
          </li> */}
          {/* <li>
            <Link to={"/admin/users-company"}>Utilisateurs</Link>
          </li> */}
        </ul>
      )}
    </div>
  );
}
