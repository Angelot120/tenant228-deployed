import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../api";
import { toast, ToastContainer } from "react-toastify";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import Cookies from "js-cookie";
import LoginImg from "../../assets/images/Login-img.jpg";

import "./Login.css";
import Loading from "../../components/Loading/Loading";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const route = "api/token/";

  const setCookie = (admin) => {
    Cookies.set("superAdmin", admin, { expires: 30 }); // Cookie valable 30 jours
    Cookies.set("conected", true, { expires: 30 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!username) {
      toast.error("Le nom d'utilisateur est requis");
      setLoading(false);
      return;
    } else if (!password) {
      toast.error("Le mot de passe est requis");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post(route, { username, password });

      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

      api
        .get("api/get-admin-user/")
        .then((res) => res.data)
        .then((data) => {
          // console.log(data);
          if (data.is_superuser) {
            setCookie(data.is_superuser);
          } else {
            setCookie(false);
          }
        })
        .catch((err) => console.log(err));

      toast.success(`Bienvenue parmis nous ${username} !`);

      navigate("/");
    } catch (error) {
      // console.log(error);

      if (error.response.status === 401) {
        toast.error(
          "Informations invalides : Nom d'utilisateur ou mot de passe incorrect."
        );
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer stacked position="bottom-left" />
      {loading ? (
        <Loading />
      ) : (
        <div className="login-container">
          <div>
            <img src={LoginImg} alt="" className="registration-right-img" />
          </div>

          <div>
            <h1 className="righteous">Connectez-vous</h1>
            <form onSubmit={handleSubmit}>
              <p>
                Veuillez vous connecter à votre compte pour éffectuer vos
                actions désirées.
              </p>

              <div className="form-conatainer">
                <Input
                  label={"Nom d'utilisateur"}
                  reference={"username"}
                  type={"text"}
                  placeholder={"Votre nom d'utilisateur ici..."}
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  className={"form-input"}
                />

                <br />

                <Input
                  label={"Mot de passe"}
                  reference={"password"}
                  type={"password"}
                  placeholder={"Votre mot de passe ici..."}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className={"form-input"}
                />
              </div>

              <p>
                Mot de passe oublié ?{" "}
                <Link to={"/new-password/otp"} className="termes">
                  Cliquez ici
                </Link>
              </p>

              <div>
                <p>
                  Vous n'avez pas encore de compte ?{" "}
                  <Link to={"/registration"} className="termes">
                    Inscrivez-vous
                  </Link>
                </p>
              </div>

              <div>
                <Button type={"submit"} text={"Se connecter"} />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
