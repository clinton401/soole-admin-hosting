import React from 'react'
import Image from 'next/image';

interface User {
    name: string;
    username: string;
    phone: string;
    totalRides: number;
    totalTrips: number;
    memberSince: string;
    status: "All" | "Active" | "Deactivated" | "Inactive" | "Suspended";
    profilePicture: string;
  }

  interface StatusTableProps {
    users: User[];
  }

const StatusTable: React.FC<StatusTableProps> = ({ users }) => {
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