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
      name: "Jane Doe",
      title: "Project Manager",
      email: "janedoe@example.com",
      image: "/profilePic.png",
    },
    {
      id: 3,
      name: "John Smith",
      title: "UI/UX Designer",
      email: "johnsmith@example.com",
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
  const [modalContent, setModalContent] = useState({
    preamble: "",
    action: () => {},
  });

  const addNewProfile = () => {
    const newProfile = {
      id: profiles.length + 1,
      name: "New User",
      title: "New Title",
      email: "new.user@example.com",
      image: "/profilePic.png",
    };
    setProfiles([...profiles, newProfile]);
  };

  const handleMenuClick = (id: number) => {
    setActiveMenu((prev) => (prev === id ? null : id));
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".popup-menu") && !target.closest(".menu-button")) {
      setActiveMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openModal = (preamble: string, action: () => void) => {
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

  return (
    <div className="ff-Mabry-Pro">
      <h2 className="ff-Mabry-Pro-bold fs-32">Team Management</h2>
      <div className="profile-container ff-Mabry-Pro-bold ">
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
            <h3 className="profile-name">{profile.name}</h3>
            <p className="profile-title">{profile.title}</p>
            <p className="profile-email">{profile.email}</p>
          </div>
        ))}
        <div className="add-card" onClick={addNewProfile}>
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
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default TeamManagement;
