"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BinRedIcon, CameraIcon, MoreIcon } from "../components/Icons";
import Modal from "../components/Modal";
import PasswordResetForm from "../components/PasswordResetForm";

const Settings = () => {
  const [newAgent, setNewAgent] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="wrapper-container ff-Mabry-Pro">
      <h2 className="ff-Mabry-Pro-bold fs-32">Settings</h2>
      <div className="settings-content">
        <div className="left-section">
          <div>
            <div className="personal-details">
              <h3>Personal Details</h3>
            </div>
            <div className="profile-details">
              <div className="profile-picture-container">
                <Image
                  src="/profilePic.png"
                  alt="Profile"
                  className="profile-pix"
                  width={120}
                  height={120}
                />
                <div className="profile-actions">
                  <button className="upload-photo">
                    <CameraIcon />
                    Upload New Photo
                  </button>
                  <button className="remove-photo">
                    <BinRedIcon />
                    Remove Photo
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="login-details">
            <h3>Login Details</h3>
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
              value={newAgent.name}
              onChange={(e) =>
                setNewAgent({ ...newAgent, name: e.target.value })
              }
            />
            <label>Title</label>
            <input
              type="text"
              value={newAgent.title}
              onChange={(e) =>
                setNewAgent({ ...newAgent, title: e.target.value })
              }
            />
            <label>Work Email</label>
            <input
              type="email"
              value={newAgent.email}
              onChange={(e) =>
                setNewAgent({ ...newAgent, email: e.target.value })
              }
            />
            <label>Phone Number</label>
            <input
              type="tel"
              value={newAgent.phone}
              onChange={(e) =>
                setNewAgent({ ...newAgent, phone: e.target.value })
              }
            />
          </form>
          <div className="save-button-container">
            <button className="save-changes">Save Changes</button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        title="Reset Password"
        onCancel={() => setIsModalOpen(false)}
        actionButtons="confirm-cancel"
        showCloseButton={true}
      >
        <PasswordResetForm />
      </Modal>
    </div>
  );
};

export default Settings;
