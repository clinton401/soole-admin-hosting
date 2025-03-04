import { FC } from "react";
import { User, UserStatus } from "../users/page";
import Image from "next/image";
import {EllipsisVertical} from "lucide-react";
import UsersTableMoreOption from "./UsersTableMoreOption"

const UsersTable: FC<{ users: User[], selectedFilter: string }> = ({ users, selectedFilter }) => {
  const getMonthYear = (dateString: string) => {
    let date = new Date(dateString);

    if (isNaN(date.getTime())) {
      date = new Date(); // Use current date if invalid
    }

    return date.toLocaleString("en-US", { month: "short", year: "numeric" });
  };
  return (
    <section className="ride-table-container">
      <table>
        <thead>
          <tr>
            <th style={{ width: "25%" }}>
              <p>Name</p>
            </th>
            <th>
              <p>Username</p>
            </th>
            <th>
              <p>Phone number</p>
            </th>
            <th>
              <p>Total rides</p>
            </th>
            <th>
              <p>Total trips</p>
            </th>
            <th>
              <p>Member since</p>
            </th>
            <th>
              <p>Status</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={`${user.id}${index}`}>
                <td className="name">
                  {" "}
                  <Image
                    className="user-img"
                    width={40}
                    height={40}
                    objectFit="cover"
                    src={user?.avatarUrl || "/profilePic.png"}
                    alt="user image"
                  />
                  <span>
                    <p className="truncate">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="email truncate">{user.email}</p>
                  </span>
                </td>
                <td>
                  <p>@{user.username}</p>
                </td>
                <td>
                  <p>{user.phone}</p>
                </td>
                <td >
                  <p>{user.totalRides || 0}</p>
                </td>
                <td >
                  <p>{user.totalTrips || 0}</p>
                </td>
                <td>
                  <p>{getMonthYear(user.createdAt)}</p>
                </td>
                <td className="sta">
                  <div>
                  <span className={`status user-${user.status.toLowerCase() || "deactivated"}`}>
                    <span className="dot"></span>
                    <p>
                    {user.status.charAt(0) + user.status.slice(1).toLowerCase() }</p>
                  </span>
                  <UsersTableMoreOption user={user} selectedFilter={selectedFilter}/>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default UsersTable;
