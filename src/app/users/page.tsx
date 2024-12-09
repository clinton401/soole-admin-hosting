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

  const users: User[] = [
   { name: "Jegede Glory",
    username: "jegs",
    phone: "+234567890878",
    totalRides: 120,
    totalTrips: 80,
    memberSince: "2020-01-15",
    status: "Active",
    profilePicture: "/profilePic.png",
  },
  {
    name: "Adefarati Adedeji",
    username: "Adedeji56",
    phone: "+0987654321",
    totalRides: 50,
    totalTrips: 40,
    memberSince: "2021-05-22",
    status: "Deactivated",
    profilePicture: "/profilePic.png",

  },
  {
    name: "Alice Johnson",
    username: "alicejohnson789",
    phone: "+1122334455",
    totalRides: 200,
    totalTrips: 150,
    memberSince: "2019-03-11",
    status: "Inactive",
    profilePicture: "/profilePic.png",

  },
  {
    name: "Alice Johnson",
    username: "alicejohnson789",
    phone: "+1122334455",
    totalRides: 200,
    totalTrips: 150,
    memberSince: "2019-03-11",
    status: "Inactive",
    profilePicture: "/profilePic.png",

  },
  {
    name: "Bob Brown",
    username: "bobbrown321",
    phone: "+2233445566",
    totalRides: 0,
    totalTrips: 0,
    memberSince: "2022-07-18",
    status: "Suspended",
    profilePicture: "/profilePic.png",

  },
  {
    name: "Jegede Glory",
    username: "jegs",
    phone: "+234567890878",
    totalRides: 120,
    totalTrips: 80,
    memberSince: "2020-01-15",
    status: "Active",
    profilePicture: "/profilePic.png",
  },
  {
    name: "Adefarati Adedeji",
    username: "Adedeji56",
    phone: "+0987654321",
    totalRides: 50,
    totalTrips: 40,
    memberSince: "2021-05-22",
    status: "Deactivated",
    profilePicture: "/profilePic.png",

  },

  {
    name: "Bob Brown",
    username: "bobbrown321",
    phone: "+2233445566",
    totalRides: 0,
    totalTrips: 0,
    memberSince: "2022-07-18",
    status: "Suspended",
    profilePicture: "/profilePic.png",

  },
  {
    name: "Bob Brown",
    username: "bobbrown321",
    phone: "+2233445566",
    totalRides: 0,
    totalTrips: 0,
    memberSince: "2022-07-18",
    status: "Suspended",
    profilePicture: "/profilePic.png",

  },
  {
    name: "Jegede Glory",
    username: "jegs",
    phone: "+234567890878",
    totalRides: 120,
    totalTrips: 80,
    memberSince: "2020-01-15",
    status: "Active",
    profilePicture: "/profilePic.png",
  },
  {
    name: "Adefarati Adedeji",
    username: "Adedeji56",
    phone: "+0987654321",
    totalRides: 50,
    totalTrips: 40,
    memberSince: "2021-05-22",
    status: "Deactivated",
    profilePicture: "/profilePic.png",

  },
  {
    name: "Alice Johnson",
    username: "alicejohnson789",
    phone: "+1122334455",
    totalRides: 200,
    totalTrips: 150,
    memberSince: "2019-03-11",
    status: "Inactive",
    profilePicture: "/profilePic.png",

  },

];

const filteredUsers = filterStatus
? users.filter((user) => user.status === filterStatus)
: users;

return (
<div>
  <UserSearchbar onFilterChange={setFilterStatus} />

  <StatusTable users={filteredUsers} />
</div>
);
};


export default Users;
