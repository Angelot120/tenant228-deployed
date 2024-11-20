import React, { useRef } from "react";
import close from "../../assets/Icons/close_24.svg";

function UsingConditions() {
  const dialog = useRef();
  const openHandler = () => {
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };

  return (
    <div>
      <dialog ref={dialog} className="dialogue">
        <div className="dialog-close-btn-container">
          <button
            onClick={closeHandler}
            type="button"
            className="close-dialog-btn"
          >
            <img src={close} alt="close icon" />
          </button>
        </div>

        <h2>Conditions générales d'utilisation</h2>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          distinctio neque ratione nam repellendus atque ad nihil facilis eius
          non rem voluptatibus corporis, id culpa debitis vel odit, voluptates
          quas? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
          fugiat debitis consequatur! Adipisci possimus distinctio labore fugit
          quaerat beatae nobis, laudantium eaque voluptate aliquid numquam
          facere doloribus animi quisquam error.
        </p>
      </dialog>
      <p onClick={openHandler} className="c-pointer footer-link">
        Conditions générales d'utilisation
      </p>
    </div>
  );
}

function ManageUserData() {
  const dialog = useRef();
  const openHandler = () => {
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };

  return (
    <div>
      <dialog ref={dialog} className="dialogue">
        <div className="dialog-close-btn-container">
          <button
            onClick={closeHandler}
            type="button"
            className="close-dialog-btn"
          >
            <img src={close} alt="close icon" />
          </button>
        </div>

        <h2>Gestion de donnés utilisateurs</h2>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          distinctio neque ratione nam repellendus atque ad nihil facilis eius
          non rem voluptatibus corporis, id culpa debitis vel odit, voluptates
          quas? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
          fugiat debitis consequatur! Adipisci possimus distinctio labore fugit
          quaerat beatae nobis, laudantium eaque voluptate aliquid numquam
          facere doloribus animi quisquam error.
        </p>
      </dialog>
      <p onClick={openHandler} className="c-pointer footer-link">
        Gestion de donnés utilisateurs
      </p>
    </div>
  );
}

function ManageCookies() {
  const dialog = useRef();
  const openHandler = () => {
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };

  return (
    <div>
      <dialog ref={dialog} className="dialogue">
        <div className="dialog-close-btn-container">
          <button
            onClick={closeHandler}
            type="button"
            className="close-dialog-btn"
          >
            <img src={close} alt="close icon" />
          </button>
        </div>

        <h2>Gestion de cookies</h2>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          distinctio neque ratione nam repellendus atque ad nihil facilis eius
          non rem voluptatibus corporis, id culpa debitis vel odit, voluptates
          quas? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
          fugiat debitis consequatur! Adipisci possimus distinctio labore fugit
          quaerat beatae nobis, laudantium eaque voluptate aliquid numquam
          facere doloribus animi quisquam error.
        </p>
      </dialog>
      <p onClick={openHandler} className="c-pointer footer-link">
        Gestion de cookies
      </p>
    </div>
  );
}

function RestrationUsingConditions() {
  const dialog = useRef();
  const openHandler = () => {
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };

  return (
    <div>
      <dialog ref={dialog} className="dialogue">
        <div className="dialog-close-btn-container">
          <button
            onClick={closeHandler}
            type="button"
            className="close-dialog-btn"
          >
            <img src={close} alt="close icon" />
          </button>
        </div>

        <h2>Conditions générales d'utilisation</h2>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          distinctio neque ratione nam repellendus atque ad nihil facilis eius
          non rem voluptatibus corporis, id culpa debitis vel odit, voluptates
          quas? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
          fugiat debitis consequatur! Adipisci possimus distinctio labore fugit
          quaerat beatae nobis, laudantium eaque voluptate aliquid numquam
          facere doloribus animi quisquam error.
        </p>
      </dialog>
      <p onClick={openHandler} className="c-pointer footer-link">
        J'accepte les <span className="termes">termes</span> et les{" "}
        <span className="termes">conditions d'utilisations</span>
      </p>
    </div>
  );
}

export {
  UsingConditions,
  ManageUserData,
  ManageCookies,
  RestrationUsingConditions,
};
