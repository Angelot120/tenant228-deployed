import React, { useEffect, useRef, useState } from "react";
import {
  DescrptiveOptions,
  SecurityEquipments,
  UsefullEquipments,
} from "../../components/categories/Categories";
import api from "../../api";
import { toast } from "react-toastify";
import {
  BasicSuppliersBtn,
  Button,
  CategoriesDialogBtn,
  HousingAdvantagesBtn,
  OtstandingDialogBtn,
} from "../../components/button/Button";
import SelectInput from "../../components/selectInput/SelectInput";
import { Input } from "../../components/input/Input";
import close from "../../assets/Icons/close_24.svg";
import DeleteIcon from "../../assets/Icons/delete_red_24dp.svg";

function HousingCategories() {
  const [housingCategories, setHousingCategory] = useState([]);
  const [value, setValue] = useState("");
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const formData = new FormData();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    getEquipments();
  });

  const getEquipments = () => {
    api
      .get("api/create-housing-categories/")
      .then((res) => res.data)
      .then((data) => {
        setHousingCategory(data);
      })
      .catch((err) => console.log(err));
  };

  const dialog = useRef();

  const openHandler = (category) => {
    setValue(category.category_name);
    setPreview(category.category_img_url);
    setSelectedCategoryId(category.id);
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };

  const eventHandler = () => {
    console.log(file);

    if (selectedCategoryId) {
      formData.append("category_name", value);
      if (file !== null) formData.append("category_img_url", file);

      api
        .put(`api/create-housing-category/${selectedCategoryId}/`, formData)
        .then((res) => {
          toast.success("Category updated!");
          getEquipments();
          closeHandler();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to update category.");
        });
    }
  };

  const deleteBtn = () => {
    if (
      confirm(
        "Voulez-vous vraiment supprimer cette Catégorie ? Cette action est irréversible !"
      )
    ) {
      if (selectedCategoryId) {
        api
          .delete(`api/create-housing-category/${selectedCategoryId}/`)
          .then((res) => {
            if (res.status === 204) {
              toast.success("Category type deleted!");
              getEquipments();
              closeHandler();
            } else {
              toast.error("Failed to delete category type.");
            }
          })
          .catch((error) => toast.error(error));
      }
    }
  };

  return (
    <div>
      <div>
        <div className="dialogue-container">
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

            <div className="admin-create-category">
              <Input
                label={"Type de catégorie"}
                reference={"categoryType"}
                value={value}
                type={"text"}
                onChange={(e) => setValue(e.target.value)}
                placeholder={"Le type ici..."}
                className={"form-input"}
              />
              <Input
                label={"Choisissez une icône"}
                reference={"categoryImg"}
                type={"file"}
                // onChange={(e) => setFile(e.target.files[0])}
                onChange={(e) => handleFileChange(e)}
                placeholder={"L'icône ici..."}
                // value={file}
                className={"form-input"}
              />
            </div>

            <div className="admin-create-category-btn">
              <img src={preview} alt="Category icon" />
              <Button
                type={"submit"}
                text={"Modifier"}
                onClick={eventHandler}
              />
              <br />
              <button className="category-delete-btn">
                <img src={DeleteIcon} alt="delete" onClick={deleteBtn} />
              </button>
            </div>
          </dialog>
        </div>
        <div className="detail-center-items">
          <div className="detail-options-container">
            {housingCategories.map((category, key) => (
              <div key={key}>
                <CategoriesDialogBtn
                  onClick={() => openHandler(category)}
                  name={category.category_name}
                  imgUrl={category.category_img_url}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HousingEquipments() {
  const [housingEquipments, setHhousingEquipments] = useState([]);
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);
  const [categoryTypeId, setCategoryTypeId] = useState(null);

  const formData = new FormData();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    getEquipments();
  });

  const getEquipments = () => {
    api
      .get("api/create-outstanding-equipments/")
      .then((res) => res.data)
      .then((data) => {
        setHhousingEquipments(data);
      })
      .catch((err) => console.log(err));
  };

  const dialog = useRef();

  const openHandler = (outstandingEq) => {
    setValue(outstandingEq.equipment_name);
    setPreview(outstandingEq.equipment_img_url || null);
    setSelectedEquipmentId(outstandingEq.id);
    setCategoryTypeId(outstandingEq.equipment_category_id);

    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };

  const eventHandler = () => {
    if (selectedEquipmentId) {
      formData.append("equipment_name", value);
      if (file !== null) formData.append("equipment_img_url", file);
      formData.append("equipment_category_id", categoryTypeId);
      console.log("Fies ");
      console.log("File", file);
      // alert(categoryTypeId);
      api
        .put(
          `api/create-outstanding-equipments/${selectedEquipmentId}/`,
          formData
        )
        .then((res) => {
          toast.success("Categorie mis à jour!");
          getEquipments();
          closeHandler();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Erreur lors de la mise à jour de la catégorie.");
        });
    }
  };

  const deleteBtn = () => {
    if (
      confirm(
        "Voulez-vous vraiment supprimer cet Equipement ? Cette action est irréversible !"
      )
    ) {
      if (selectedEquipmentId) {
        api
          .delete(`api/create-outstanding-equipments/${selectedEquipmentId}/`)
          .then((res) => {
            if (res.status === 204) {
              toast.success("Equipment deleted successfully!");
              getEquipments();
              closeHandler();
            } else {
              toast.error("Failed to delete equipment.");
            }
          })
          .catch((error) => toast.error(error));
      }
    }
  };

  return (
    <div>
      <div>
        <div>
          <div className="dialogue-container">
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

              <div className="admin-create-category text-center">
                <SelectInput
                  label={"Type de catégorie"}
                  reference={"type"}
                  name={"select"}
                  value={categoryTypeId}
                  onChange={(e) => setCategoryTypeId(e.target.value)}
                  className={"form-input"}
                />
                <Input
                  label={"Nom de l'équipement"}
                  reference={"eq"}
                  value={value}
                  type={"text"}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={"Le nom de l'équipement ici..."}
                  className={"form-input"}
                />
                <Input
                  label={"Choisissez une icône"}
                  reference={"categoryimg"}
                  type={"file"}
                  onChange={(e) => handleFileChange(e)}
                  placeholder={"L'icône ici..."}
                  // value={file}
                  className={"form-input"}
                />
                <img src={preview} alt="Equipment icon" />
              </div>

              <div className="admin-create-category-btn">
                <Button
                  type={"submit"}
                  text={"Modifier"}
                  onClick={eventHandler}
                />
                <br />

                <button className="category-delete-btn">
                  <img src={DeleteIcon} alt="delete" onClick={deleteBtn} />
                </button>
              </div>
            </dialog>
          </div>
          <div className="detail-options-container">
            {housingEquipments.map((outstandingEq, key) => (
              <div key={key}>
                <OtstandingDialogBtn
                  onClick={() => openHandler(outstandingEq)}
                  name={outstandingEq.equipment_name}
                  imgUrl={outstandingEq.equipment_img_url}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HousingUsefullEquipments() {
  const [usefullEquipments, setUsefullEquipments] = useState([]);
  const [preview, setPreview] = useState(null);
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);

  const formData = new FormData();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    getEquipments();
  });

  const getEquipments = () => {
    api
      .get("api/create-usefull-equipments/")
      .then((res) => res.data)
      .then((data) => {
        setUsefullEquipments(data);
      })
      .catch((err) => console.log(err));
  };

  const dialog = useRef();

  const openHandler = (usefullEquipment) => {
    setValue(usefullEquipment.usefull_equipment_name);
    setPreview(usefullEquipment.usefull_equipment_img_url || null);
    setSelectedEquipmentId(usefullEquipment.id);
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };

  const eventHandler = () => {
    if (selectedEquipmentId) {
      formData.append("usefull_equipment_name", value);
      if (file !== null) formData.append("usefull_equipment_img_url", file);

      api
        .put(`api/create-usefull-equipments/${selectedEquipmentId}/`, formData)
        .then((res) => {
          toast.success("Category updated!");
          getEquipments();
          closeHandler();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to update category.");
        });
    }
  };

  const deleteBtn = () => {
    if (
      confirm(
        "Voulez-vous vraiment supprimer cet Equipement ? Cette action est irréversible !"
      )
    ) {
      if (selectedEquipmentId) {
        api
          .delete(`api/create-usefull-equipments/${selectedEquipmentId}/`)
          .then((res) => {
            if (res.status === 204) {
              toast.success("Equipment deleted successfully!");
              getEquipments();
              closeHandler();
            } else {
              toast.error("Failed to delete equipment.");
            }
          })
          .catch((error) => toast.error(error));
      }
    }
  };

  return (
    <div>
      <div className="dialogue-container">
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

          <div className="admin-create-category text-center">
            <Input
              label={"Nom de l'équipement"}
              reference={"eq"}
              value={value}
              type={"text"}
              onChange={(e) => setValue(e.target.value)}
              placeholder={"Le nom de l'équipement ici..."}
              className={"form-input"}
            />
            <Input
              label={"Choisissez une icône"}
              reference={"categoryimg"}
              type={"file"}
              onChange={(e) => handleFileChange(e)}
              placeholder={"L'icône ici..."}
              // value={file}
              className={"form-input"}
            />
            <img src={preview} alt="Equipment icon" />
          </div>
          <div className="admin-create-category-btn">
            <Button type={"submit"} text={"Modifier"} onClick={eventHandler} />
            <br />
            <button className="category-delete-btn">
              <img src={DeleteIcon} alt="delete" onClick={deleteBtn} />
            </button>
          </div>
        </dialog>
      </div>

      <div className="detail-options-container">
        {usefullEquipments.map((usefullEquipment, key) => (
          <div key={key}>
            <UsefullEquipments
              onClick={() => openHandler(usefullEquipment)}
              name={usefullEquipment.usefull_equipment_name}
              imgUrl={usefullEquipment.usefull_equipment_img_url}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function HousingSecurityEquipments() {
  const [securityEquipments, setSecurityEquipments] = useState([]);
  const [value, setValue] = useState("");
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const formData = new FormData();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    getEquipments();
  });

  const getEquipments = () => {
    api
      .get("api/create-security-equipments/")
      .then((res) => res.data)
      .then((data) => {
        setSecurityEquipments(data);
      })
      .catch((err) => console.log(err));
  };

  const dialog = useRef();

  const openHandler = (securityEquipment) => {
    setValue(securityEquipment.equipment_name);
    setPreview(securityEquipment.equipment_image_url || null);
    setSelectedEquipmentId(securityEquipment.id);
    setSelectedCategoryId(securityEquipment.equipment_category_id);
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };

  const eventHandler = () => {
    if (selectedEquipmentId) {
      formData.append("equipment_name", value);
      if (file !== null) formData.append("equipment_image_url", file);
      formData.append("equipment_category_id", selectedCategoryId);

      api
        .put(`api/create-security-equipments/${selectedEquipmentId}/`, formData)
        .then((res) => {
          toast.success("Category updated!");
          getEquipments();
          closeHandler();
        })
        .catch((error) => toast.error("Failed to update category."));
    }
  };

  const deleteBtn = () => {
    if (
      confirm(
        "Voulez-vous vraiment supprimer cet Equipement ? Cette action est irréversible !"
      )
    ) {
      if (selectedEquipmentId) {
        api
          .delete(`api/create-security-equipments/${selectedEquipmentId}/`)
          .then((res) => {
            if (res.status === 204) {
              toast.success("Equipment deleted successfully!");
              getEquipments();
              closeHandler();
            } else {
              toast.error("Failed to delete equipment.");
            }
          })
          .catch((error) => toast.error(error));
      }
    }
  };

  return (
    <div>
      <div className="dialogue-container">
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

          <div className="admin-create-category">
            <SelectInput
              label={"Type de catégorie"}
              reference={"category"}
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className={"form-input"}
            />

            <Input
              label={"Nom de l'équipement"}
              reference={"eq"}
              value={value}
              type={"text"}
              onChange={(e) => setValue(e.target.value)}
              placeholder={"Le nom de l'équipement ici..."}
              className={"form-input"}
            />
            <Input
              label={"Choisissez une icône"}
              reference={"categoryimg"}
              type={"file"}
              onChange={(e) => handleFileChange(e)}
              placeholder={"L'icône ici..."}
              // value={file}
              className={"form-input"}
            />
          </div>
          <div className="admin-create-category-btn">
            <img src={preview} alt="Equipment icon" />
            <Button type={"submit"} text={"Modifier"} onClick={eventHandler} />
            <br />
            <button className="category-delete-btn">
              <img src={DeleteIcon} alt="delete" onClick={deleteBtn} />
            </button>
          </div>
        </dialog>
      </div>

      <div className="detail-options-container">
        {securityEquipments.map((securityEquipment, key) => (
          <div key={key}>
            <SecurityEquipments
              onClick={() => openHandler(securityEquipment)}
              name={securityEquipment.equipment_name}
              imgUrl={securityEquipment.equipment_image_url}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function HousingDescrptiveOptions() {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState([]);

  const formData = new FormData();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    getOptions();
  });

  const getOptions = () => {
    api
      .get("api/create-descriptive-options/")
      .then((res) => res.data)
      .then((data) => {
        setOptions(data);
      })
      .catch((err) => console.log(err));
  };

  const dialog = useRef();

  const openHandler = (option) => {
    setValue(option.descriptive_options_name);
    setPreview(option.descriptive_options_img_url || null);
    setSelectedOptionId(option.id);
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };

  const eventHandler = () => {
    formData.append("descriptive_options_name", value);
    if (file !== null) formData.append("descriptive_options_img_url", file);

    api
      .put(`api/create-descriptive-options/${selectedOptionId}/`, formData)
      .then((res) => {
        toast.success("Category updated!");
        getOptions();
        closeHandler();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to update category.");
      });
  };

  const deleteBtn = () => {
    if (
      confirm(
        "Voulez-vous vraiment supprimer cette option ? Cette action est irréversible !"
      )
    ) {
      if (selectedOptionId) {
        api
          .delete(`api/create-descriptive-options/${selectedOptionId}/`)
          .then((res) => {
            if (res.status === 204) {
              toast.success("Equipment deleted successfully!");
              getOptions();
              closeHandler();
            } else {
              toast.error("Failed to delete equipment.");
            }
          })
          .catch((error) => toast.error(error));
      }
    }
  };

  return (
    <div>
      <div className="dialogue-container">
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
          <div className="admin-create-category">
            <Input
              label={"Nom de l'équipement"}
              reference={"eq"}
              value={value}
              type={"text"}
              onChange={(e) => setValue(e.target.value)}
              placeholder={"Le nom de l'équipement ici..."}
              className={"form-input"}
            />
            <Input
              label={"Choisissez une icône"}
              reference={"categoryimg"}
              type={"file"}
              // onChange={(e) => setFile(e.target.files[0])}
              onChange={(e) => handleFileChange(e)}
              placeholder={"L'icône ici..."}
              // value={file}
              className={"form-input"}
            />

            <div className="admin-create-category-btn">
              <img src={preview} alt="Equipment icon" />
              <Button
                type={"submit"}
                text={"Modifier"}
                onClick={eventHandler}
              />
              <br />
              <button className="category-delete-btn">
                <img src={DeleteIcon} alt="delete" onClick={deleteBtn} />
              </button>
            </div>
          </div>
        </dialog>
      </div>

      <div className="detail-options-container">
        {options.map((option, key) => (
          <div key={key}>
            <DescrptiveOptions
              onClick={() => openHandler(option)}
              name={option.descriptive_options_name}
              imgUrl={option.descriptive_options_img_url}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function HousingBasicSuppliers() {
  const [value, setValue] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState([]);

  const formData = new FormData();
  useEffect(() => {
    getEquipments();
  });

  const getEquipments = () => {
    api
      .get("api/create-basic-suppliers/")
      .then((res) => res.data)
      .then((data) => {
        setSuppliers(data);
      })
      .catch((err) => console.log(err));
  };

  const dialog = useRef();

  const openHandler = (supplier) => {
    setSelectedSupplierId(supplier.id);
    setValue(supplier.basic_suppliers_name);
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };

  const eventHandler = () => {
    if (selectedSupplierId) {
      formData.append("basic_suppliers_name", value);
      api
        .put(`api/create-basic-suppliers/${selectedSupplierId}/`, formData)
        .then((res) => {
          toast.success("Category updated!");
          getEquipments();
          closeHandler();
        })
        .catch((error) => toast.error("Failed to update category."));
    }
  };

  const deleteBtn = () => {
    if (
      confirm(
        "Voulez-vous vraiment supprimer cet Equipement ? Cette action est irréversible !"
      )
    ) {
      if (selectedSupplierId) {
        api
          .delete(`api/create-basic-suppliers/${selectedSupplierId}/`)
          .then((res) => {
            if (res.status === 204) {
              toast.success("Equipment deleted successfully!");
              getEquipments();
              closeHandler();
            } else {
              toast.error("Failed to delete equipment.");
            }
          })
          .catch((error) => toast.error(error));
      }
    }
  };

  return (
    <div>
      <div>
        <div>
          <div className="dialogue-container">
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

              <div className="admin-create-category">
                <Input
                  label={"Nom de l'équipement"}
                  reference={"eq"}
                  value={value}
                  type={"text"}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={"Le nom de l'équipement ici..."}
                  className={"form-input"}
                />
              </div>

              <br />

              <div className="admin-create-category-btn">
                <Button
                  type={"submit"}
                  text={"Modifier"}
                  onClick={eventHandler}
                />
                <br />

                <button className="category-delete-btn">
                  <img src={DeleteIcon} alt="delete" onClick={deleteBtn} />
                </button>
              </div>
            </dialog>
          </div>
          {suppliers.map((supplier, key) => (
            <div key={key}>
              <BasicSuppliersBtn
                onClick={() => openHandler(supplier)}
                name={supplier.basic_suppliers_name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HousingAdventages() {
  const [value, setValue] = useState("");
  const [advantages, setAdvantage] = useState([]);
  const [selectedAdvantageId, setSelectedAdvantageId] = useState([]);

  const formData = new FormData();
  useEffect(() => {
    getEquipments();
  }, []);

  const getEquipments = () => {
    api
      .get("api/create-advantages/")
      .then((res) => res.data)
      .then((data) => {
        setAdvantage(data);
      })
      .catch((err) => console.log(err));
  };

  const dialog = useRef();

  const openHandler = (advantage) => {
    setSelectedAdvantageId(advantage.id);
    setValue(advantage.adventages_name);
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };

  const eventHandler = () => {
    if (advantage) {
      formData.append("adventages_name", value);
      api
        .put(`api/create-advantages/${selectedAdvantageId}/`, formData)
        .then((res) => {
          toast.success("Category updated!");
          getEquipments();
          closeHandler();
        })
        .catch((error) => toast.error("Failed to update category."));
    }
  };

  const deleteBtn = () => {
    if (
      confirm(
        "Voulez-vous vraiment supprimer cet Equipement ? Cette action est irréversible !"
      )
    ) {
      if (selectedAdvantageId) {
        api
          .delete(`api/create-advantages/${selectedAdvantageId}/`)
          .then((res) => {
            if (res.status === 204) {
              toast.success("Equipment deleted successfully!");
              getEquipments();
              closeHandler();
            } else {
              toast.error("Failed to delete equipment.");
            }
          })
          .catch((error) => toast.error(error));
      }
    }
  };

  return (
    <div>
      <div>
        <div>
          <div className="dialogue-container">
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

              <div className="admin-create-category">
                <h4>Modifier l'avantage du logement</h4>
                <Input
                  label={"Nom de l'équipement"}
                  reference={"eq"}
                  value={value}
                  type={"text"}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={"Le nom de l'équipement ici..."}
                  className={"form-input"}
                />
                <br />
              </div>
              <div className="admin-create-category-btn">
                <Button
                  type={"submit"}
                  text={"Modifier"}
                  onClick={eventHandler}
                />
                <br />

                <button className="category-delete-btn">
                  <img src={DeleteIcon} alt="delete" onClick={deleteBtn} />
                </button>
              </div>
            </dialog>
          </div>
          {advantages.map((advantage, key) => (
            <div key={key}>
              <HousingAdvantagesBtn
                onClick={() => openHandler(advantage)}
                name={advantage.adventages_name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export {
  HousingCategories,
  HousingEquipments,
  HousingUsefullEquipments,
  HousingSecurityEquipments,
  HousingDescrptiveOptions,
  HousingBasicSuppliers,
  HousingAdventages,
};
