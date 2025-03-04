"use client";

import React, { useState, useContext, ChangeEvent } from "react";
import Image from "next/image";
import { BinRedIcon, CameraIcon, MoreIcon } from "../components/Icons";
import Modal from "../components/Modal";
import PasswordResetForm from "../components/PasswordResetForm";
import { AppContext } from '../components/ContextProvider';
import axios, { AxiosError } from 'axios';

interface FormData {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const Settings = () => {
  const [newAgent, setNewAgent] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
  const [passwordChangeError, setPasswordChangeError] = useState<string | null>(null);
  const { user, setUser, accessToken } = useContext(AppContext);
  const [passwordFormData, setPasswordFormData] = useState<FormData>({});

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevUser) => {
          if (prevUser) {
            return {
              ...prevUser,
              avatarUrl: reader.result as string,
            };
          }
          return null;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setUser((prevUser) => {
      if (prevUser) {
        return {
          ...prevUser,
          avatarUrl: "/Default-Img.jpg"
        };
      }
      return null;
    });
  };

  const handleSaveChanges = async () => {
    const updatedData = {
      name: newAgent.name || user?.name,
      personalEmail: newAgent.email || user?.personalEmail,
      phone: newAgent.phone || user?.phone,
      avatarUrl: user?.avatarUrl || null
    };

    console.log("Updated Data:", updatedData);
    
    const token = accessToken || localStorage.getItem("access_token");
    try {
      const response = await axios.put('https://soole-backend.onrender.com/api/admin/me/update', updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });
      if (response.status === 200) {
        setUser((prevUser) => ({
          ...prevUser,
          ...response?.data?.user
        }));
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handlePasswordChange = async (formData: FormData) => {
    const token = accessToken || localStorage.getItem("access_token");

    try {
      const response = await axios.patch('https://soole-backend.onrender.com/api/admin/me/update/password', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });
      if (response.status === 200) {
        setIsPasswordUpdated(true);
        alert(response.data.message);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        setPasswordChangeError(axiosError.response?.data?.message || "Failed to change password. Please try again.");
      } else {
        setPasswordChangeError("Failed to change password. Please try again.");
      }
    }
  };

  return (
    <div className="wrapper-container ff-Mabry-Pro">
      <h2 className="ff-Mabry-Pro-bold fs-32">Settings</h2>
      <div className="settings-content">
        <div className="left-section">
          <div>
            <div className="personal-details">
              <h3 className="ff-Mabry-Pro-bold">Personal Details</h3>
            </div>
            <div className="profile-details">
              <div className="profile-picture-container">
                <Image
                  src={user?.avatarUrl || "/Default-Img.jpg"}
                  alt="Profile"
                  className="profile-pix"
                  width={120}
                  height={120}
                />
                <div className="profile-actions">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="file-input" 
                    onChange={handleImageChange} 
                    style={{ display: 'none' }} 
                    id="avatar-upload" 
                  />
                  <label htmlFor="avatar-upload" className="upload-photo">
                    <CameraIcon />
                    Upload New Photo
                  </label>
                  <button className="remove-photo" onClick={handleRemovePhoto}>
                    <BinRedIcon />
                    Remove Photo
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="login-details">
            <h3 className="ff-Mabry-Pro-bold">Login Details</h3>
            <button
              className="change-password"
              onClick={() => setIsModalOpen(true)}
            >
              Change Password
              <MoreIcon />
            </button>
          </div>
        </div>

        <div className="separator"></div>

        <div className="right-section">
          <form>
            <label>Name</label>
            <input
              type="text"
              defaultValue={user?.name}
              onChange={(e) =>
                setNewAgent({ ...newAgent, name: e.target.value })
              }
            />
            <label>Title</label>
            <input
              type="text"
              defaultValue={user?.title}
              onChange={(e) =>
                setNewAgent({ ...newAgent, title: e.target.value })
              }
            />
            <label>Work Email</label>
            <input
              type="email"
              defaultValue={user?.personalEmail}
              onChange={(e) =>
                setNewAgent({ ...newAgent, email: e.target.value })
              }
            />
            <label>Phone Number</label>
            <input
              type="tel"
              defaultValue={user?.phone}
              onChange={(e) =>
                setNewAgent({ ...newAgent, phone: e.target.value })
              }
            />
          </form>
          <div className="save-button-container">
            <button className="save-changes" onClick={handleSaveChanges}>
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        title="Reset Password"
        onCancel={() => setIsModalOpen(false)}
        actionButtons="confirm-cancel"
        showCloseButton={true}
        onConfirm={() => handlePasswordChange(passwordFormData)}
      >
        <PasswordResetForm
          setFormData={setPasswordFormData}
          formData={passwordFormData}
        />
        {passwordChangeError && (
          <div className="error-message">{passwordChangeError}</div>
        )}
        {isPasswordUpdated && (
          <div className="success-message">Password changed successfully!</div>
        )}
      </Modal>
    </div>
  );
};

export default Settings;
