"use client"

import React, { useState } from 'react';
import Image from 'next/image';

const TeamManagement = () => {
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: 'Korede Bello',
      title: 'Software Engineer',
      email: 'korede.bello@example.com',
      image: '/profilePic.png',
    },
    {
      id: 2,
      name: 'Jane Doe',
      title: 'Project Manager',
      email: 'jane.doe@example.com',
      image: '/profilePic.png',
    },
    {
      id: 3,
      name: 'John Smith',
      title: 'UI/UX Designer',
      email: 'john.smith@example.com',
      image: '/profilePic.png',
    },
    {
      id: 4,
      name: 'Sarah Lee',
      title: 'QA Specialist',
      email: 'sarah.lee@example.com',
      image: '/profilePic.png',
    },
  ]);

  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const addNewProfile = () => {
    const newProfile = {
      id: profiles.length + 1,
      name: 'New User',
      title: 'New Title',
      email: 'new.user@example.com',
      image: '/profilePic.png',
    };
    setProfiles([...profiles, newProfile]);
  };

  const handleMenuClick = (id: number) => {
    setActiveMenu((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <h2 className='ff-Mabry-Pro-bold fs-32'>Team Management</h2>
      <div className="profile-container ff-Mabry-Pro-bold ">
        {profiles.map((profile) => (
          <div key={profile.id} className="profile-card">
            <div className="menu-button" onClick={() => handleMenuClick(profile.id)}>
              ⋮
            </div>
            {activeMenu === profile.id && (
              <div className="popup-menu">
                <button className="popup-button">Make Super Admin</button>
                <button className="popup-button">Remove</button>
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
  <p className="add-text">Add New</p>
        </div>
      </div>
    </div>
  );
};

export default TeamManagement;
