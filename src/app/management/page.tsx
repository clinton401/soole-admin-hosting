"use client";

import React, { useState, useContext } from "react";
import Image from "next/image";
import { AppContext } from "../components/ContextProvider";
import Modal from "../components/Modal";
import api from "../../../config/api";
import axios from "axios";

interface Profile {
  id: string | null;
  name: string;
  title: string;
  email: string;
  phone: string;
  image?: string;
  role: string;
}

const TeamManagement = () => {
  const { accessToken } = useContext(AppContext);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"action" | "add">("action");
  const [modalContent, setModalContent] = useState({
    preamble: "",
    action: () => {},
  });

  const [newAgent, setNewAgent] = useState({
    id: null,
    name: "",
    title: "",
    email: "",
    phone: "",
  });

  const handleMenuClick = (id: string) => {
    setActiveMenu((prev) => (prev === id ? null : id));
  };

  const openModal = (
    type: "action" | "add",
    preamble: string,
    action: () => void
  ) => {
    setModalType(type);
    setModalContent({ preamble, action });
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    modalContent.action();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddAdmin = async () => {
    if (
      !newAgent.name ||
      !newAgent.email ||
      !newAgent.phone ||
      !newAgent.title
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const requestBody = {
      personalEmail: newAgent.email,
      phone: newAgent.phone,
      name: newAgent.name,
      workEmail: newAgent.email,
    };

    const token = accessToken;

    if (!token) {
      alert("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        "https://soole-backend.onrender.com/api/admin/create",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle the response
      if (response.data.status === "success") {
        const newAdmin = response.data.admin;
        console.log(newAdmin);

        setProfiles((prev) => [
          ...prev,
          {
            id: newAdmin.id,
            name: newAdmin.name,
            title: newAgent.title,
            email: newAdmin.personalEmail,
            phone: newAdmin.phone,
            image: "/profilePic.png",
            role: newAdmin.role,
          },
        ]);

        setNewAgent({
          id: null,
          name: "",
          title: "",
          email: "",
          phone: "",
        });
        setIsModalOpen(false);
        alert("Admin added successfully!");
      } else {
        alert(
          `Failed to add admin: ${response.data.message || "Unknown error"}`
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error adding admin:", error.response?.data); // Log specific error message
        alert(
          "Failed to add admin: " +
            (error.response?.data?.error || "Unknown error.")
        );
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred.");
      }
    }
  };

  const handleMakeSuperAdmin = async (profile: Profile) => {
    const token = accessToken || localStorage.getItem("access_token");

    if (!token) {
      alert("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      const response = await api.patch(
        `/${profile.id}/super-admin/promote`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Super Admin promotion successful:", response.data);
      setProfiles((prev) =>
        prev.map((p) =>
          p.id === profile.id ? { ...p, role: "SUPER_ADMIN" } : profile
        )
      );

      alert(`${profile.name} is now a Super Admin!`);
    } catch (error) {
      console.error("Error making Super Admin:", error);
      alert("Failed to promote to Super Admin. Please try again.");
    }
  };

  const handleRemoveSuperAdmin = async (profile: Profile) => {
    const token = accessToken || localStorage.getItem("access_token");

    if (!token) {
      alert("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      const response = await api.patch(
        `/${profile.id}/super-admin/demote`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Admin removal successful:", response.data);

      setProfiles((prev) =>
        prev.map((p) => (p.id === profile.id ? { ...p, role: "ADMIN" } : p))
      );

      alert(`${profile.name} is no longer a super Admin!`);
    } catch (error) {
      console.error("Error removing Admin:", error);
      alert("Failed to remove Admin. Please try again.");
    }
  };

  return (
    <div className="ff-Mabry-Pro wrapper-container">
      <h2 className="ff-Mabry-Pro-bold fs-32">Team Management</h2>
      <div className="profile-container ff-Mabry-Pro-bold">
        {profiles.map((profile) => (
          <div key={profile.id || profile.name} className="profile-card">
            <div
              className="menu-button"
              onClick={() => handleMenuClick(profile.id as string)}
            >
              ⋮
            </div>
            {activeMenu === profile.id && (
              <div className="popup-menu">
                {profile.role !== "SUPER_ADMIN" && (
                  <button
                    className="popup-button"
                    onClick={() =>
                      openModal(
                        "action",
                        `You are about to give full access to ${profile.name} by making them a Super Admin.`,
                        () => handleMakeSuperAdmin(profile)
                      )
                    }
                  >
                    Make Super Admin
                  </button>
                )}
                <button
                  className="popup-button"
                  onClick={() =>
                    openModal(
                      "action",
                      `You are about to remove ${profile.name}.`,
                      // () =>
                      //   setProfiles((prev) =>
                      //     prev.filter((p) => p.id !== profile.id)
                      //   )
                      () => handleRemoveSuperAdmin(profile)
                    )
                  }
                >
                  Remove
                </button>
              </div>
            )}
            <Image
              src={profile.image || "/profilePic.png"}
              alt={profile.name}
              className="profile-picture"
              width={50}
              height={50}
            />
            <p className="profile-name">{profile.name}</p>
            <p className="profile-title">{profile.title}</p>
            <p className="profile-email">{profile.email}</p>
            {/* <p className="profile-phone">{profile.phone}</p> */}
            {profile.role === "SUPER_ADMIN" && (
              <p className="super-admin-badge">Super Admin</p>
            )}
          </div>
        ))}
        <div
          className="add-card"
          onClick={() => openModal("add", "Add Admin", handleAddAdmin)}
        >
          <div className="add-icon-container">
            <span className="add-icon">+</span>
          </div>
          <p className="add-text">Add new admin</p>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        preamble={modalContent.preamble}
        preambleStyle={{ fontSize: "1.5rem" }}
        onConfirm={modalType === "action" ? handleConfirm : undefined}
        onCancel={handleCancel}
        onAdd={modalType === "add" ? handleAddAdmin : undefined}
        actionButtons={modalType === "add" ? "add" : "confirm-cancel"}
        showCloseButton={false}
      >
        {modalType === "add" && (
          <form>
            <label>Name</label>
            <input
              type="text"
              required
              value={newAgent.name}
              onChange={(e) =>
                setNewAgent({ ...newAgent, name: e.target.value })
              }
            />
            <label>Title</label>
            <input
              type="text"
              required
              value={newAgent.title}
              onChange={(e) =>
                setNewAgent({ ...newAgent, title: e.target.value })
              }
            />
            <label>Work Email</label>
            <input
              type="email"
              required
              value={newAgent.email}
              onChange={(e) =>
                setNewAgent({ ...newAgent, email: e.target.value })
              }
            />
            <label>Phone Number</label>
            <input
              type="tel"
              required
              value={newAgent.phone}
              onChange={(e) =>
                setNewAgent({ ...newAgent, phone: e.target.value })
              }
            />
          </form>
        )}
      </Modal>
    </div>
  );
};

export default TeamManagement;
