"use client"

import React, { useState } from "react";
import UserSearchbar from "../components/UserSearchbar";
import StatusTable from "../components/StatusTable";

interface User {
  name: string;
  username: string;
  phone: string;
  totalRides: number;
  totalTrips: number;
  memberSince: string;
  status: "Active" | "Deactivated" | "Inactive" | "Suspended" | "All";
  profilePicture: string;
}


const Users: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;


  const users: User[] = [
   { name: "Jegede Glory",
    username: "@jegs",
    phone: "+234567890878",
    totalRides: 120,
    totalTrips: 80,
    memberSince: "Oct,2022",
    status: "Active",
    profilePicture: "/profilePic.png",
  },
  {
    name: "Adefarati Adedeji",
    username: "@adedeji56",
    phone: "+0987654321",
    totalRides: 50,
    totalTrips: 40,
    memberSince: "Oct,2022",
    status: "Deactivated",
    profilePicture: "/profilePic.png",

  },
  {
    name: "Alice Johnson",
    username: "@alicejohnson789",
    phone: "+1122334455",
    totalRides: 200,
    totalTrips: 150,
    memberSince: "Oct,2022",
    status: "Inactive",
    profilePicture: "/profilePic.png",

  },
  {
    name: "Alice Johnson",
    username: "@alicejohnson789",
    phone: "+1122334455",
    totalRides: 200,
    totalTrips: 150,
    memberSince: "Oct,2022",
    status: "Inactive",
    profilePicture: "/profilePic.png",

  },
  {
    name: "Bob Brown",
    username: "@bobbrown321",
    phone: "+2233445566",
    totalRides: 0,
    totalTrips: 0,
    memberSince: "Oct,2022",
    status: "Suspended",
    profilePicture: "/profilePic.png",

  },
  {
    name: "Jegede Glory",
    username: "@jegs",
    phone: "+234567890878",
    totalRides: 120,
    totalTrips: 80,
    memberSince: "Oct,2022",
    status: "Active",
    profilePicture: "/profilePic.png",
  },
  {
    name: "Adefarati Adedeji",
    username: "@adedeji56",
    phone: "+0987654321",
    totalRides: 50,
    totalTrips: 40,
    memberSince: "Oct,2022",
    status: "Deactivated",
    profilePicture: "/profilePic.png",

  },

  {
    name: "Bob Brown",
    username: "@bobbrown321",
    phone: "+2233445566",
    totalRides: 0,
    totalTrips: 0,
    memberSince: "Oct,2022",
    status: "Suspended",
    profilePicture: "/profilePic.png",

  },
  {
    name: "Bob Brown",
    username: "@bobbrown321",
    phone: "+2233445566",
    totalRides: 0,
    totalTrips: 0,
    memberSince: "Oct,2022",
    status: "Suspended",
    profilePicture: "/profilePic.png",

  },
  {
    name: "@Jegede Glory",
    username: "@jegs",
    phone: "+234567890878",
    totalRides: 120,
    totalTrips: 80,
    memberSince: "Oct,2022",
    status: "Active",
    profilePicture: "/profilePic.png",
  },
  {
    name: "Adefarati Adedeji",
    username: "@adedeji56",
    phone: "+0987654321",
    totalRides: 50,
    totalTrips: 40,
    memberSince: "Oct,2022",
    status: "Deactivated",
    profilePicture: "/profilePic.png",

  },
  {
    name: "Alice Johnson",
    username: "@alicejohnson789",
    phone: "+1122334455",
    totalRides: 200,
    totalTrips: 150,
    memberSince: "Oct,2022",
    status: "Inactive",
    profilePicture: "/profilePic.png",

  },

];

const filteredUsers = filterStatus
? users.filter((user) => user.status === filterStatus)
: users;

const totalItems = filteredUsers.length;
const totalPages = Math.ceil(totalItems / itemsPerPage);
const currentItems = filteredUsers.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

const handleNextPage = () => {
  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
};

const handlePreviousPage = () => {
  if (currentPage > 1) setCurrentPage(currentPage - 1);
};


return (
<div className="wrapper-container">
  <h2 className="ff-Mabry-Pro-bold fs-32">User Management</h2>
  <UserSearchbar onFilterChange={setFilterStatus} />

  <StatusTable users={currentItems} />
  <div className="pagination d-flex justify-between align-center mt-3">
        <div className="pagination-info">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}-
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
        </div>
        <div className="pagination-controls">
          <button
            className="pagination-button"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <button
            className="pagination-button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
</div>
);
};


export default Users;
