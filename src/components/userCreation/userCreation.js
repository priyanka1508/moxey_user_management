import React, { useEffect, useState } from "react";
import "./userCreation.css";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const initialFormData = {
  country: "",
  role: "",
  supervisor: "",
  firstName: "",
  lastName: "",
  mobileCode: "",
  mobileNumber: "",
  email: "",
  cardLoadLimit: "",
  paymentLimit: "",
  status: "Active",
  id: "",
};

const UserCreation = (props) => {
  const { open, onClose, savedUsers, setSavedUsers } = props;
  const allowedMobileCodes = ["966", "971", "91"];

  const [errorFields, setErrorFields] = useState([]);
  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [roleList, setRoleList] = useState(["role 1", "role 2", "role 3"]);
  const [supervisorList, setSupervisorList] = useState([
    "sup 1",
    "sup 2",
    "sup 3",
  ]);
  const [formData, setFormData] = useState(initialFormData);

  const mandatoryField = [
    "country",
    "role",
    "supervisor",
    "firstName",
    "lastName",
    "mobileCode",
    "mobileNumber",
    "email",
    "cardLoadLimit",
    "paymentLimit",
  ];

  useEffect(() => {
    fetch("https://api.first.org/data/v1/countries").then(async (res) => {
      const countryData = await res.json();
      const countryDetails = Object.values(countryData.data);
      setCountryList(countryDetails);
    });
  }, []);

  useEffect(() => {
    if (isSaveClicked) {
      validateFormData();
    }
  }, [formData]);

  const handleClose = () => {
    onClose();
    setFormData(initialFormData);
    setIsSaveClicked(false);
    setErrorFields([]);
  };

  const handleChange = (event, type) => {
    setFormData({
      ...formData,
      [type]: event.target.value,
    });
  };

  const validateFormData = () => {
    let isValid = true;
    let errorFields = [];
    mandatoryField.forEach((field) => {
      if (!formData[field]) {
        isValid = isValid && false;
        errorFields.push(field);
      }
    });
    setErrorFields(errorFields);
    return isValid;
  };

  const handleSave = () => {
    setIsSaveClicked(true);
    const isValid = validateFormData();
    if (!isValid) {
      return;
    }
    setSavedUsers([
      ...savedUsers,
      { ...formData, id: uuidv4(), showActionDropdown: false },
    ]);
    setFormData(initialFormData);
    onClose();
    setIsSaveClicked(false);
    setErrorFields([]);
  };

  const isErrorField = (field) => {
    return errorFields.includes(field);
  };

  return open ? (
    <>
      <div
        className={`overlay overlayOpen`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div tabIndex="-1" className={`drawer animate right`}>
        <div className="header p-4 flex items-center flex flex-row gap-2 close-img">
          <img
            src="assets/icons/closeicon.png"
            alt="no image"
            onClick={() => {
              handleClose();
            }}
            className=""
          />{" "}
          Add New User
        </div>
        <div className="flex flex-col gap-2 p-4">
          <form>
            <div
              className={`${
                isErrorField("country") ? "error-border" : "creation-select"
              } mb-3 flex flex-col gap-2 text-sm text-slate-600 `}
            >
              <label htmlFor="country" className="form-label">
                COUNTRY <span className="text-red-500">*</span>
              </label>
              <select
                style={{ width: "100%" }}
                id="country"
                name="country"
                className="form-select"
                onChange={(e) => {
                  handleChange(e, "country");
                }}
                required
              >
                <option value="Select Country">{"Select Country"}</option>
                {countryList &&
                  countryList?.map((each) => {
                    return <option value={each.country}>{each.country}</option>;
                  })}
              </select>
              {isErrorField("country") && (
                <p className="error-message">Required Field</p>
              )}
            </div>
            <div
              className={`${
                isErrorField("role") ? "error-border" : " creation-select"
              } mb-3 flex flex-col gap-2 text-sm text-slate-600`}
            >
              <label htmlFor="role" className="form-label">
                SELECT ROLE <span className="text-red-500">*</span>
              </label>
              <select
                style={{ width: "100%" }}
                id="role"
                name="role"
                className="form-select"
                label="Select Role"
                onChange={(e) => {
                  handleChange(e, "role");
                }}
                required
              >
                <option value="Select Role">{"Select Role"}</option>
                {roleList &&
                  roleList?.map((each) => {
                    return <option value={each}>{each}</option>;
                  })}
              </select>
              {isErrorField("role") && (
                <p className="error-message">Required Field</p>
              )}
            </div>
            <div
              className={`${
                isErrorField("supervisor") ? "error-border" : "creation-select"
              } mb-3 flex flex-col gap-2 text-sm text-slate-600 `}
            >
              <label htmlFor="supervisor" className="form-label">
                SUPERVISOR <span className="text-red-500">*</span>
              </label>
              <select
                style={{ width: "100%" }}
                id="supervisor"
                name="supervisor"
                className="form-select"
                label="Select Supervisor"
                onChange={(e) => {
                  handleChange(e, "supervisor");
                }}
                required
              >
                <option value="Select Supervisor">{"Select Supervisor"}</option>
                {supervisorList &&
                  supervisorList?.map((each) => {
                    return <option value={each}>{each}</option>;
                  })}
              </select>
              {isErrorField("supervisor") && (
                <p className="error-message">Required Field</p>
              )}
            </div>
            <div className="flex flex-row gap-4 ">
              <div
                className={`${
                  isErrorField("firstName") ? "error-border" : "creation-input"
                } mb-3 flex flex-col gap-2 text-sm text-slate-600 `}
              >
                <div className="flex items-center">
                  FIRST NAME <span className="text-red-500 ml-1">*</span>
                </div>
                <input
                  //style={{ width: "50%" }}
                  type="text"
                  className="form-control"
                  name="firstName"
                  onChange={(e) => {
                    handleChange(e, "firstName");
                  }}
                  required
                />
                {isErrorField("firstName") && (
                  <p className="error-message">Required Field</p>
                )}
              </div>
              <div
                className={`${
                  isErrorField("lastName") ? "error-border" : "creation-input"
                } mb-3 flex flex-col gap-2 text-sm text-slate-600`}
              >
                <div className="flex items-center">
                  LAST NAME <span className="text-red-500 ml-1">*</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  onChange={(e) => {
                    handleChange(e, "lastName");
                  }}
                  required
                />
                {isErrorField("lastName") && (
                  <p className="error-message">Required Field</p>
                )}
              </div>
            </div>
            <div className="flex flex-row ">
              <div
                className={`${
                  isErrorField("mobileCode")
                    ? "error-border"
                    : "creation-select creation-input"
                } mb-3 flex flex-col gap-2 text-sm text-slate-600 w-full `}
              >
                <div className="flex items-center">
                  MOBILE NUMBER <span className="text-red-500 ml-1">*</span>
                </div>
                <div className="flex flex-row width">
                  <select
                    style={{ width: "30%" }}
                    id="mobileCode"
                    name="mobileCode"
                    className="form-select"
                    onChange={(e) => {
                      handleChange(e, "mobileCode");
                    }}
                    required
                  >
                    <option value=" "> </option>
                    {allowedMobileCodes &&
                      allowedMobileCodes?.map((each) => {
                        return <option value={each}>{each}</option>;
                      })}
                  </select>
                  <input
                    style={{ width: "70%" }}
                    type="number"
                    className="form-control"
                    name="mobileNumber"
                    onChange={(e) => {
                      handleChange(e, "mobileNumber");
                    }}
                    required
                  />
                </div>
              </div>
            </div>
            <div
              className={`${
                isErrorField("email") ? "error-border" : "creation-input"
              } mb-3 flex flex-col gap-2 text-sm text-slate-600 `}
            >
              <div className="flex items-center">
                EMAIL <span className="text-red-500 ml-1">*</span>
              </div>
              <input
                type="text"
                className="form-control"
                name="email"
                onChange={(e) => {
                  handleChange(e, "email");
                }}
                required
              />
              {isErrorField("email") && (
                <p className="error-message">Required Field</p>
              )}
            </div>
            <div className="flex flex-row gap-4 mb-3">
              <div
                className={`${
                  isErrorField("cardLoadLimit")
                    ? "error-border"
                    : "creation-input "
                } mb-3 flex flex-col gap-2 text-sm text-slate-600`}
              >
                <div className="flex items-center">
                  CARD LOAD LIMIT <span className="text-red-500 ml-1">*</span>
                </div>

                <input
                  type="number"
                  className="form-control"
                  name="cardLoadLimit"
                  onChange={(e) => {
                    handleChange(e, "cardLoadLimit");
                  }}
                  required
                />
                {isErrorField("cardLoadLimit") && (
                  <p className="error-message">Required Field</p>
                )}
              </div>
              <div
                className={`${
                  isErrorField("paymentLimit")
                    ? "error-border"
                    : "creation-input "
                } mb-3 flex flex-col gap-2 text-sm text-slate-600`}
              >
                <div className="flex items-center">
                  PAYMENT LIMIT <span className="text-red-500 ml-1">*</span>
                </div>

                <input
                  type="number"
                  className="form-control"
                  name="paymentLimit"
                  onChange={(e) => {
                    handleChange(e, "paymentLimit");
                  }}
                  required
                />
                {isErrorField("paymentLimit") && (
                  <p className="error-message">Required Field</p>
                )}
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <button
                type="button"
                className="add-new-bunit text-sm"
                onClick={() => handleSave()}
              >
                {"+ Add User"}
              </button>
              <button
                type="button"
                className="add-cancle-bunit text-sm"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  ) : null;
};

export default UserCreation;
