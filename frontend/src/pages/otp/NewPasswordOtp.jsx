import React, { useState } from "react";
import Loading from "../../components/Loading/Loading";
import { toast, ToastContainer } from "react-toastify";
import ForgottenImg from "../../assets/images/forgot-password-img.jpg";
import { Input } from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function NewPasswordOtp() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      const errorMessage = "L'email est requis";
      toast.error(errorMessage);
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("api/forgotten-pass-new-otp/", {
        email,
      });
      toast.success("Un email vous a été envoyé");
      navigate("/new-password/otp-check", {
        state: {
          email: email,
        },
      });
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.message
            ? error.response.data.message[0]
            : "Une erreur est survenue!"
        );
        toast.error("L' email n'a pas été retrouvé.");
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
        <div className="login-container">
          <div>
            <img src={ForgottenImg} alt="" className="registration-right-img" />
          </div>

          <div>
            <h1 className="righteous">Mot de passe oublié ?</h1>
            <form onSubmit={handleSubmit}>
              <p>
                Pas de pannique si vous avez oublié votre mot de passe votre
                compte est tout à fait récupérable.
              </p>

              <div className="form-conatainer">
                <Input
                  label={"Email"}
                  reference={"email"}
                  type={"email"}
                  placeholder={"Votre email ici..."}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className={"form-input"}
                />
              </div>
              <br />
              <br />
              <div>
                <Button type={"submit"} text={"Récupérer"} />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
