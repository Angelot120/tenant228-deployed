import React, { useState } from "react";
import { Button } from "../../components/button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./Otp.css";
import otpImg from "../../assets/images/Otp-img.jpg";
import axios from "axios";
import Loading from "../../components/Loading/Loading";

export default function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const { state } = location;

  const email = state ? state.email : null;

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!otp) {
      toast.error("Le code OTP est requis");
      setLoading(false);
      return;
    }
    const formData = new FormData();

    formData.append("email", email);
    formData.append("otp_code", otp);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/verify-otp-code/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Opération éffectuée avec succès");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          "Une erreur est survenue lors de traitement veuillez réésayer!"
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestNewOtp = async () => {
    try {
      await axios.post("http://localhost:8000/api/request-new-otp/", { email });
      toast.success("Un nouvel OTP a été envoyé à votre adresse email.");
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          "Une erreur est survenue lors de l'envoi du nouvel OTP."
      );
    }
  };

  return (
    <div>
      <ToastContainer stacked position="bottom-left" />
      {loading ? (
        <Loading />
      ) : (
        <div className="verify-otp-container">
          <div>
            <img src={otpImg} alt="" className="registration-right-img" />
          </div>

          <div className="verify-otp-right-items">
            <h1 className="righteous">Verification d'email</h1>
            <p>
              Un code de vérification vous a été envoyé à ({email}). Veuillez
              vérifier votre boîte mail !
            </p>
            <br />
            <div className="verfify-code-items">
              <label htmlFor="code">Code de vérification</label>
              <input
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                minLength={6}
                className="form-input"
                id="code"
                placeholder="Veuillez entrer le code de vérification ici ..."
              />
            </div>
            <br />
            <p>
              Vous n’avez pas reçu le code ?{" "}
              <a
                href="#"
                onClick={handleRequestNewOtp}
                style={{ color: "blue", textDecoration: "none" }}
              >
                Cliquez ici
              </a>
            </p>
            <br />
            <Button text={"Vérifier"} type={"submit"} onClick={submitHandler} />
          </div>
        </div>
      )}
    </div>
  );
}
