import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";
import api from "../../api";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import registrationImg from "../../assets/images/registration.jpg";
import "./Registration.css";
import {
  RestrationUsingConditions,
  UsingConditions,
} from "../../components/Dialogue/ConditionsDialog";
import Loading from "../../components/Loading/Loading";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const route = "api/user/register/";

  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    if (email.trim().length < 6 || email.trim().length >= 32) {
      setError(true);
      const errorMessage = "L'email doit comprendre entre 6 et 32 caractères !";
      // setErrorText(errorMessage)
      toast.error(errorMessage);
      setLoading(false);
      return;
    }
    if (username.trim().length < 3) {
      setError(true);
      const errorMessage =
        "Le nom d'utilisateur doit contenir au moins 3 caractères";
      // setErrorText(errorMessage)
      toast.error(errorMessage);
      setLoading(false);
      return;
    }
    if (password.trim().length < 6 || password.trim().length >= 32) {
      setError(true);
      const errorMessage =
        "Le mot de passe doit comprendre entre 6 et 32 caractères !";
      // setErrorText(errorMessage)
      toast.error(errorMessage);
      return;
    }
    if (passwordConfirm.trim() !== password.trim()) {
      setError(true);
      const errorMessage = "Les deux mot de passe ne correspondent pas !";
      // setErrorText(errorMessage)
      toast.error(errorMessage);
      setLoading(false);
      return;
    }

    if (!isChecked) {
      const errorMessage =
        "Veuillez accepter les termes et les conditions d'utilisations";
      toast.error(errorMessage);
      setLoading(false);
      return;
    }

    // localStorage.setItem("email", email);
    // localStorage.setItem("username", username);
    // localStorage.setItem("password", password);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/register/",
        {
          email,
          username,
          password,
        }
      );
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
      toast.success("Opération éffectuée avec succès");
      navigate("/otp-code", {
        state: {
          email: email,
        },
      });
    } catch (error) {
      // console.log(error);
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.username
            ? error.response.data.username[0]
            : error.response.data.message
            ? error.response.data.message
            : "Une erreur est survenue!"
        );
      } else {
        toast.error(
          "Une erreur est survenue lors de traitement veuillez réésayer!"
        );
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
        <div className="registration-container">
          <div className="registration-left-items">
            <h1>Inscription</h1>

            <p>
              Veuillez créer un compte pour pouvoir éffectuer toutes actions que
              vous souhaitez.
            </p>

            <form onSubmit={handleSubmit}>
              {error && <Alert text={errorText} />}

              <div className="registration-all-input">
                <Input
                  label={"Email"}
                  reference={"email"}
                  type={"email"}
                  placeholder={"Saisir l'email ici..."}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className={"form-input"}
                />

                <br />

                <Input
                  label={"Username"}
                  reference={"username"}
                  type={"text"}
                  placeholder={"Saisir l'e nom d'utilisateur ici..."}
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  className={"form-input"}
                />

                <br />

                <Input
                  label={"Mot de passe"}
                  reference={"password"}
                  type={"password"}
                  placeholder={"Saisir le mot de passe ici..."}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className={"form-input"}
                />

                <br />

                <Input
                  label={"Confirmation de mot de passe"}
                  reference={"passwordConfirm"}
                  type={"password"}
                  placeholder={"Saisir le mot de passe ici..."}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  value={passwordConfirm}
                  className={"form-input"}
                />
              </div>

              <br />
              <label className="registration-terms">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <RestrationUsingConditions />.
              </label>

              <p>
                Avez-vous déjà un compte ?{" "}
                <Link to={"/login"}>Se connecter</Link>
              </p>
              <div>
                <Button type={"submit"} text={"S'inscrire"} />
              </div>
            </form>
          </div>
          <div>
            <img
              src={registrationImg}
              alt="registration img"
              className="registration-right-img"
            />
          </div>
        </div>
      )}
    </div>
  );
}
