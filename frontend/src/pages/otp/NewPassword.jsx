import React, { useState } from "react";
import ResetPasswd from "../../assets/images/reset-password.jpg";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import { Input } from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api";

export default function NewPassword() {
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const location = useLocation();

  const { state } = location;

  const email = state ? state.email : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email.trim()) {
      const errorMessage = "L'email est requis";
      toast.error(errorMessage);
      setLoading(false);
      return;
    } else if (
      newPassword.trim().length < 6 ||
      newPassword.trim().length >= 32
    ) {
      const errorMessage =
        "Le mot de passe doit comprendre entre 6 et 32 caractères !";
      toast.error(errorMessage);
      setLoading(false);
      return;
    } else if (!newPassword.trim()) {
      const errorMessage = "Le mot de passe est requis !";
      toast.error(errorMessage);
      setLoading(false);
      return;
    } else if (!confirmPassword.trim()) {
      const errorMessage = "Le mot de passe de confirmation est requis !";
      toast.error(errorMessage);
      setLoading(false);
      return;
    } else if (confirmPassword.trim() !== newPassword.trim()) {
      const errorMessage = "Les deux mot de passe doivent être identique !";
      toast.error(errorMessage);
      setLoading(false);
      return;
    }

    try {
      const response = await api.put(`api/update-password/${email}/`, {
        password: newPassword,
      });
      toast.success("Mot de passe modifié avec succès !");
      navigate("/login");
    } catch (error) {
      // console.log(error);
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.message
            ? error.response.data.message[0]
            : "Une erreur est survenue!"
        );
        // toast.error("L'email n'a pas été retrouvé.");
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
      <div>
        <ToastContainer stacked position="bottom-left" />
        {loading ? (
          <Loading />
        ) : (
          <div className="login-container">
            <div>
              <img
                src={ResetPasswd}
                alt=""
                className="registration-right-img"
              />
            </div>

            <div>
              <h1 className="righteous">Nouveau mot de passe</h1>
              <form onSubmit={handleSubmit}>
                <p>Veuillez renseigner votre nouveau mot passe.</p>
                <br />
                <div className="form-conatainer">
                  <Input
                    label={"Nouveau mot de passe"}
                    reference={"password"}
                    type={"password"}
                    placeholder={
                      "Veillez entrer le nouveau mot de passe ici ..."
                    }
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    className={"form-input"}
                  />
                  <br />
                  <Input
                    label={"Confirmation de mot de passe"}
                    reference={"conformPassword"}
                    type={"password"}
                    placeholder={"Confirmer votre mot de passe ici ..."}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    className={"form-input"}
                  />
                </div>

                <br />
                <div>
                  <Button type={"submit"} text={"Changer"} />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
