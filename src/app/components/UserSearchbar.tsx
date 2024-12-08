"use client"
import React, { useState } from 'react'

interface UserSearchbarProps {
  onFilterChange: (status: string) => void;
}

const UserSearchbar: React.FC<UserSearchbarProps> = ({ onFilterChange }) => {

  const [filterOpen, setFilterOpen] = useState(false);

  const handleFilterClick = (status: string) => {
    onFilterChange(status);
    setFilterOpen(false);
  };

  return (
    <div>

<div className="Search-bar">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="search-icon"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-4.35-4.35m1.2-6.6a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
    />
  </svg>
  <input type="text" placeholder="Search by name, number of trips, number of rides" />
  <button className="filter-btn"
            onClick={() => setFilterOpen((prev) => !prev)}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="filter-icon"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 6h3m-6 6h9m-12 6h15"
        />
    </svg>
        <p>Filter</p>
  </button>
</div>
{filterOpen && (
        <div className="filter-dropdown">
          {["Active", "Deactivated", "Inactive", "Suspended"].map((status) => (
            <button
              key={status}
              className="filter-option"
              onClick={() => handleFilterClick(status)}
            >
              {status}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserSearchbar