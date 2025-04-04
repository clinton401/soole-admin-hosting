"use client";

import React, { useState, useContext, ChangeEvent } from "react";
import Image from "next/image";
import { BinRedIcon, CameraIcon, MoreIcon } from "../components/Icons";
import Modal from "../components/Modal";
import PasswordResetForm from "../components/PasswordResetForm";
import { AppContext } from '../components/ContextProvider';
import axios from 'axios';
import api from '../../../config/api';

interface FormData {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const Settings = () => {
  const [newAgent, setNewAgent] = useState({
    name: "",
    workEmail: "",
    email: "",
    phone: "",
    avatarUrl: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
  const [passwordChangeError, setPasswordChangeError] = useState<string | null>(null);
  const { user, setUser } = useContext(AppContext);
  const [passwordFormData, setPasswordFormData] = useState<FormData>({});
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

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
      setAvatarFile(file); // Store the selected file
    }
  };

  const handleRemovePhoto = () => {
    setUser((prevUser) => {
      if (prevUser) {
        return {
          ...prevUser,
          avatarUrl: "/Default-Img.jpg", // Set to default image path
        };
      }
      return null;
    });
    setAvatarFile(null);
  };

  const handleSaveChanges = async () => {
    const updatedData = {
      name: newAgent.name || undefined,
      personalEmail: newAgent.email || undefined,
      phone: newAgent.phone || undefined,
      workEmail: newAgent.workEmail || undefined,
      avatarUrl: newAgent.avatarUrl || undefined, // Update avatar URL if it exists
    };

    if (avatarFile) {
      try {
        const formData = new FormData();
        formData.append('image', avatarFile);

        const uploadResponse = await axios.post('https://soole-backend.onrender.com/api/upload-images', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log("Upload Response:", uploadResponse.data);
        
        // Make sure to adjust this path based on your actual response structure
        const avatarUrl = uploadResponse.data.data.url; 
        updatedData.avatarUrl = avatarUrl; // Update the data with the new avatar URL
      } catch (error) {
        console.error("Error uploading avatar:", error);
        alert("Failed to upload avatar. Please try again.");
        return;
      }
    } else {
      // Use existing avatar URL if no new file is uploaded
      updatedData.avatarUrl = user?.avatarUrl;
    }

    try {
      const response = await api.put('/me/update', updatedData);
      if (response.status === 200) {
        setUser((prevUser) => ({
          ...prevUser,
          avatarUrl: updatedData.avatarUrl, // Ensure the new avatar URL updates in the context
          ...response.data.user, // Optionally merge other user data
        }));
        alert(response?.data.message); // Alert upon successful update
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.error || "Failed to update profile. Please try again.");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    }
  };

  const handlePasswordChange = async (formData: FormData) => {
    try {
      const response = await api.patch('/me/update/password', formData);
      if (response.status === 200) {
        setIsPasswordUpdated(true);
        alert(response.data.message);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      if (axios.isAxiosError(error)) {
        setPasswordChangeError(error.response?.data?.error || "Unknown error occurred");
      } else {
        setPasswordChangeError("An unexpected error occurred");
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
              onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
            />
            <label>Title</label>
            <input
              type="text"
              defaultValue={user?.workEmail}
              onChange={(e) => setNewAgent({ ...newAgent, workEmail: e.target.value })}
            />
            <label>Work Email</label>
            <input
              type="email"
              defaultValue={user?.personalEmail}
              onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
            />
            <label>Phone Number</label>
            <input
              type="tel"
              defaultValue={user?.phone}
              onChange={(e) => setNewAgent({ ...newAgent, phone: e.target.value })}
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