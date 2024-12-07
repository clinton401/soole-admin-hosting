import React from 'react'
import Image from 'next/image';

interface User {
    name: string;
    username: string;
    phone: string;
    totalRides: number;
    totalTrips: number;
    memberSince: string;
    status: "Active" | "Deactivated" | "Inactive" | "Suspended";
    profilePicture: string;
  }
  
  const users: User[] = [
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

const StatusTable: React.FC = () => {
  return (
    <div className="table-container">
    <table className="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Phone</th>
          <th>Total Rides</th>
          <th>Total Trips</th>
          <th>Member Since</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td className="name-cell">
              <Image
                src={user.profilePicture}
                alt={user.name}
                className="profile-picture"
                width={40}
                height={40}
              />
              <span>{user.name}</span>
            </td>
            <td>{user.username}</td>
            <td>{user.phone}</td>
            <td>{user.totalRides}</td>
            <td>{user.totalTrips}</td>
            <td>{user.memberSince}</td>
            <td className={`status ${user.status.toLowerCase()}`}>
              {user.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};


export default StatusTable;