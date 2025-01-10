"use client"

import React, { useState } from "react";
import Image from "next/image";

const Settings = () => {
  const [newAgent, setNewAgent] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
  });

  return (
    <div className="settings-container ff-Mabry-Pro">
      <h2 className="ff-Mabry-Pro-bold fs-32">Settings</h2>
      <div className="settings-content">
        {/* Left Section */}
        <div className="left-section">
                      {/* Personal Details */}
          <div className="personal-details">
            <h3>Personal Details</h3>
          </div>
          <div className="profile-details">
            <div className="profile-picture-container">
              <Image
                src="/profilePic.png"
                alt="Profile"
                className="profile-picture"
                width={120}
                height={120}
              />
              <div className="profile-actions">
                <button className="upload-photo">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-camera"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 2a.5.5 0 0 1 .5.5V3h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h1v-.5a.5.5 0 0 1 .5-.5h6zM1 4a2 2 0 0 1 2-2h1a2 2 0 0 1 2 0h2a2 2 0 0 1 2 0h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4z" />
                    <path d="M8 10.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                    <path d="M8 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                  </svg>
                  Upload New Photo
                </button>
                <button className="remove-photo">Remove Photo</button>
              </div>
            </div>
          </div>

          {/* Login Details */}
          <div className="login-details">
            <h3>Login Details</h3>
            <button className="change-password">
              Change Password
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clipPath="url(#clip0_2381_1033)">
                  <path
                    d="M9 6L15 12L9 18"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2381_1033">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>

        {/* Separator */}
        <div className="separator"></div>

        {/* Right Section */}
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
    </div>
  );
};

export default Settings;
