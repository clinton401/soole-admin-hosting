import React, { useState } from "react";
import { EyeIcon, EyeOffIcon, LockIcon } from "../components/Icons"; // Assume icons exist in your project

const PasswordResetForm = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [visibility, setVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const toggleVisibility = (field: keyof typeof visibility) => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="password-reset-form">
      {["oldPassword", "newPassword", "confirmPassword"].map((field) => (
        <div key={field} className="password-field">
          <label htmlFor={field} className="password-label">
            {field === "oldPassword" && "Old Password"}
            {field === "newPassword" && "New Password"}
            {field === "confirmPassword" && "Confirm Password"}
          </label>
          <div className="password-input-container">
            <span className="input-icon">
              <LockIcon />
            </span>
            <input
              type={visibility[field as keyof typeof visibility] ? "text" : "password"}
              id={field}
              name={field}
              placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`}
              value={formData[field as keyof typeof formData]}
              onChange={handleInputChange}
              className="password-input"
            />
            <span
              className="toggle-visibility-icon"
              onClick={() => toggleVisibility(field as keyof typeof visibility)}
            >
              {visibility[field as keyof typeof visibility] ? <EyeOffIcon /> : <EyeIcon />}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PasswordResetForm;
