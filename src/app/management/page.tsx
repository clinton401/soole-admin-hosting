"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Modal from "../components/Modal";

const TeamManagement = () => {
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "Korede Bello",
      title: "Software Engineer",
      email: "koredebello@example.com",
      image: "/profilePic.png",
    },
    {
      id: 2,
      name: "Jegede Glory",
      title: "Project Manager",
      email: "jegedeglory@gmail.com",
      image: "/profilePic.png",
    },
    {
      id: 3,
      name: "Banso Tolulope",
      title: "UI/UX Designer",
      email: "Bansotolulope@gmail.com",
      image: "/profilePic.png",
    },
    {
      id: 4,
      name: "Sarah Lee",
      title: "QA Specialist",
      email: "sarahlee@example.com",
      image: "/profilePic.png",
    },
  ]);

  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"action" | "add">("action");
  const [modalContent, setModalContent] = useState({
    preamble: "",
    action: () => {},
  });

  const [newAgent, setNewAgent] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
  });

  const handleMenuClick = (id: number) => {
    setActiveMenu((prev) => (prev === id ? null : id));
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (
      !target.closest(".popup-menu") && 
      !target.closest(".add") && 
      !target.closest(".modal-content")
    ) {
      setActiveMenu(null);
      if (isModalOpen) {
        setIsModalOpen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const openModal = (type: "action" | "add", preamble: string, action: () => void) => {
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

  const handleAddAgent = () => {
    setProfiles((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newAgent.name,
        title: newAgent.title,
        email: newAgent.email,
        phone: newAgent.phone,
        image: "/profilePic.png",
      },
    ]);
    setNewAgent({ name: "", title: "", email: "", phone: "" });
    setIsModalOpen(false);
  };


  // const handleAddAgent = () => {
  //   if (!newAgent.name || !newAgent.title || !newAgent.email) {
  //     alert("Please fill in all required fields (Name, Title, and Email).");
  //     return;
  //   }
  
  //   setProfiles((prev) => [
  //     ...prev,
  //     {
  //       id: Date.now(),
  //       name: newAgent.name,
  //       title: newAgent.title,
  //       email: newAgent.email,
  //       phone: newAgent.phone,
  //       image: "/profilePic.png",
  //     },
  //   ]);
  //   setNewAgent({ name: "", title: "", email: "", phone: "" });
  //   setIsModalOpen(false);
  // };
  
  

  return (
    <div className="ff-Mabry-Pro wrapper-container">
      <h2 className="ff-Mabry-Pro-bold fs-32">Team Management</h2>
      <div className="profile-container ff-Mabry-Pro-bold">
        {profiles.map((profile) => (
          <div key={profile.id} className="profile-card">
            <div className="menu-button" onClick={() => handleMenuClick(profile.id)}>
              ⋮
            </div>
            {activeMenu === profile.id && (
              <div className="popup-menu">
                <button
                  className="popup-button"
                  onClick={() =>
                    openModal(
                      "action",
                      `You are about to give full access to ${profile.name} by making them a Super Admin.`,
                      () => console.log(`${profile.name} is now a Super Admin.`)
                    )
                  }
                >
                  Make Super Admin
                </button>
                <button
                  className="popup-button"
                  onClick={() =>
                    openModal(
                      "action",
                      `You are about to remove ${profile.name}.`,
                      () =>
                        setProfiles((prev) =>
                          prev.filter((p) => p.id !== profile.id)
                        )
                    )
                  }
                >
                  Remove
                </button>
              </div>
            )}
            <Image
              src={profile.image}
              alt={profile.name}
              className="profile-picture"
              width={20}
              height={20}
            />
            <p className="profile-name">{profile.name}</p>
            <p className="profile-title">{profile.title}</p>
            <p className="profile-email">{profile.email}</p>
          </div>
        ))}
        <div
          className="add-card"
          onClick={() =>
            openModal(
              "add",
              "Add Admin",
              handleAddAgent
            )
          }
        >
          <div className="add-icon-container">
            <span className="add-icon">+</span>
          </div>
          <p className="add-text">Add new agent</p>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        preamble={modalContent.preamble}
        preambleStyle={{ fontSize: "1.5rem" }}
        onConfirm={modalType === "action" ? handleConfirm : undefined}
        onCancel={handleCancel}
        onAdd={modalType === "add" ? handleAddAgent : undefined}
        actionButtons={modalType === "add" ? "add" : "confirm-cancel"}
        showCloseButton={false}
      >
        {modalType === "add" && (
          <form>
            <label>Name</label>
            <input
              type="text"
              value={newAgent.name}
              onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
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
        )}
      </Modal>
    </div>
  );
};

export default TeamManagement;
