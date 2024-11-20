import React, { useEffect, useState } from "react";
import api from "../../api";
import viewImg from "../../assets/icons/visibility_yellow.png";
import { Link } from "react-router-dom";

export default function UsersCompaniesItems() {
  const [companies, setComanies] = useState([]);
  const [provider, setProvider] = useState([]);

  useEffect(() => {
    api
      .get("http://127.0.0.1:8000/api/get-company-all/")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setComanies(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .get("http://127.0.0.1:8000/api/get-company-all/")
      .then((res) => res.data)
      .then((data) => {
        console.log(data[0]);
        setCompany(data[0]);
      })
      .catch((err) => console.log(err));

    api
      .get("http://localhost:8000/api/get-provider/")
      .then((res) => res.data)
      .then((data) => {
        setProvider(data[0]);
      });
  }, []);

  return (
    <div className="admin-company-table">
      <table>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Nombre d'employés</th>
            <th>Phone num</th>
            <th>Secteur d'activité</th>
            <th>Catégories</th>
            <th>Voir plus</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((companie, index) => (
            <tr key={index}>
              <td>
                <img
                  src={companie.company_logo}
                  alt="Company logo"
                  height={80}
                  width={80}
                />
              </td>
              <td>{companie.company_name}</td>
              <td>{companie.company_email}</td>
              <td>{companie.nb_employees}</td>
              <td>{companie.company_phone_no}</td>
              <td>{companie.activity_sector}</td>
              <td>{provider?.whoAreYou && <p>{provider.company_type}</p>}</td>
              <td>
                <Link>
                  <img src={viewImg} alt="Show more" height={30} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
