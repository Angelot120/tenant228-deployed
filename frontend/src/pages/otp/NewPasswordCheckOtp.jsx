import React, { useState } from "react";
import Loading from "../../components/Loading/Loading";
import { toast, ToastContainer } from "react-toastify";
import OtpImg from "../../assets/images/Otp-img.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import api from "../../api";

export default function NewPasswordCheckOtp() {
  const [loading, setLoading] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const navigate = useNavigate();

  const location = useLocation();

  const { state } = location;

  const email = state ? state.email : null;

  const handleRequestNewOtp = async () => {
    setLoading(true);
    try {
      await api.post("/api/request-new-otp/", { email });
      toast.success("Un nouvel OTP a été envoyé à votre adresse email.");
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          "Une erreur est survenue lors de l'envoi du nouvel OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email.trim()) {
      const errorMessage = "L'email est requis";
      toast.error(errorMessage);
      setLoading(false);
      return;
    } else if (!otpCode.trim()) {
      const errorMessage = "Le code otp est requis";
      toast.error(errorMessage);
      setLoading(false);
      return;
    } else if (otpCode.trim().length < 6 || otpCode.trim().length > 6) {
      const errorMessage = "Le code otp doit contenir 6 caractères";
      toast.error(errorMessage);
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("api/verify-otp-code/", {
        email: email,
        otp_code: otpCode,
      });
      toast.success("Opération éffectuée avec succès");
      navigate("/reset-password", {
        state: {
          email: email,
        },
      });
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          "Une erreur est survenue lors de traitement veuillez réésayer!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <ToastContainer stacked position="bottom-left" />
        {loading ? (
          <Loading />
        ) : (
          <div className="login-container">
            <div>
              <img src={OtpImg} alt="" className="registration-right-img" />
            </div>

            <div>
              <h1 className="righteous">Verification d'email</h1>
              <form onSubmit={handleSubmit}>
                <p>
                  Un code de vérification vous a été envoyé par e-mail vérifiez
                  dans votre boite mail ({email}) .
                </p>

                <div className="form-conatainer">
                  <Input
                    label={"Code de vérification"}
                    reference={"otp"}
                    type={"number"}
                    placeholder={
                      "Veillez entrer le code de vérification ici ..."
                    }
                    onChange={(e) => setOtpCode(e.target.value)}
                    value={otpCode}
                    className={"form-input"}
                  />
                </div>

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

                {/* <p>
                  Mot de passe oublié ?{" "}
                  <Link to={"/new-password/otp"} className="termes">
                    Cliquez ici
                  </Link>
                </p> */}

                <br />
                <div>
                  <Button type={"submit"} text={"Vérifier"} />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
