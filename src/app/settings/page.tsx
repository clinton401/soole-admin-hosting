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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.80039 6.49998C4.16387 6.49998 3.55342 6.75283 3.10333 7.20292C2.65325 7.65301 2.40039 8.26346 2.40039 8.89998V18.5C2.40039 19.1365 2.65325 19.7469 3.10333 20.197C3.55342 20.6471 4.16387 20.9 4.80039 20.9H19.2004C19.8369 20.9 20.4474 20.6471 20.8974 20.197C21.3475 19.7469 21.6004 19.1365 21.6004 18.5V8.89998C21.6004 8.26346 21.3475 7.65301 20.8974 7.20292C20.4474 6.75283 19.8369 6.49998 19.2004 6.49998H17.2972C16.979 6.49991 16.6738 6.37343 16.4488 6.14838L15.1036 4.80318C14.6536 4.35306 14.0433 4.10011 13.4068 4.09998H10.594C9.95752 4.10011 9.34717 4.35306 8.89719 4.80318L7.55199 6.14838C7.327 6.37343 7.02182 6.49991 6.70359 6.49998H4.80039ZM12.0004 17.3C12.4732 17.3 12.9413 17.2069 13.3781 17.0259C13.8148 16.845 14.2117 16.5799 14.546 16.2456C14.8803 15.9113 15.1454 15.5144 15.3264 15.0776C15.5073 14.6409 15.6004 14.1727 15.6004 13.7C15.6004 13.2272 15.5073 12.7591 15.3264 12.3223C15.1454 11.8855 14.8803 11.4887 14.546 11.1544C14.2117 10.8201 13.8148 10.5549 13.3781 10.374C12.9413 10.1931 12.4732 10.1 12.0004 10.1C11.0456 10.1 10.1299 10.4793 9.45481 11.1544C8.77968 11.8295 8.40039 12.7452 8.40039 13.7C8.40039 14.6548 8.77968 15.5704 9.45481 16.2456C10.1299 16.9207 11.0456 17.3 12.0004 17.3Z" fill="black"/>
</svg>
                  Upload New Photo
                </button>
                <button className="remove-photo">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
  <path d="M21.5697 5.73C19.9597 5.57 18.3497 5.45 16.7297 5.36V5.35L16.5097 4.05C16.3597 3.13 16.1397 1.75 13.7997 1.75H11.1797C8.84967 1.75 8.62967 3.07 8.46967 4.04L8.25967 5.32C7.32967 5.38 6.39967 5.44 5.46967 5.53L3.42967 5.73C3.00967 5.77 2.70967 6.14 2.74967 6.55C2.78967 6.96 3.14967 7.26 3.56967 7.22L5.60967 7.02C10.8497 6.5 16.1297 6.7 21.4297 7.23C21.4597 7.23 21.4797 7.23 21.5097 7.23C21.8897 7.23 22.2197 6.94 22.2597 6.55C22.2897 6.14 21.9897 5.77 21.5697 5.73Z" fill="#FA4545"/>
  <path d="M19.7298 8.64C19.4898 8.39 19.1598 8.25 18.8198 8.25H6.17975C5.83975 8.25 5.49975 8.39 5.26975 8.64C5.03975 8.89 4.90975 9.23 4.92975 9.58L5.54975 19.84C5.65975 21.36 5.79975 23.26 9.28975 23.26H15.7098C19.1998 23.26 19.3398 21.37 19.4498 19.84L20.0698 9.59C20.0898 9.23 19.9598 8.89 19.7298 8.64ZM14.1597 18.25H10.8298C10.4198 18.25 10.0798 17.91 10.0798 17.5C10.0798 17.09 10.4198 16.75 10.8298 16.75H14.1597C14.5697 16.75 14.9097 17.09 14.9097 17.5C14.9097 17.91 14.5697 18.25 14.1597 18.25ZM14.9998 14.25H9.99975C9.58975 14.25 9.24975 13.91 9.24975 13.5C9.24975 13.09 9.58975 12.75 9.99975 12.75H14.9998C15.4097 12.75 15.7498 13.09 15.7498 13.5C15.7498 13.91 15.4097 14.25 14.9998 14.25Z" fill="#FA4545"/>
</svg>
                  Remove Photo</button>
              </div>
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
