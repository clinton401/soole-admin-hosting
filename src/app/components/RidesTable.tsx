import {FC} from "react";
import { Ride } from "../rides/page";
import Image from "next/image"
import {formatDateTime, getValidDate} from "../../../lib/utils"


const RidesTable: FC<{rides: Ride[]}> = ({rides}) => {
  return (
    <section className="ride-table-container">
      <table>
        <thead>
          <tr>
            <th style={{ width: "30%" }}><p>Name</p></th>
            <th><p>Username</p></th>
            <th><p>Date & Time</p></th>
            <th><p>Fare per Seat</p></th>
            <th><p>No of Passengers</p></th>
            <th><p>Status</p></th>
          </tr>
        </thead>
        <tbody>
          {rides.map((ride, index) => {
            const noOfPassengers = ride.passengers.reduce((total, passenger) => total + passenger.seats, 0);
const date = getValidDate(ride);
const {formattedDate, formattedTime} = formatDateTime(date);
           return (
            <tr key={`${ride.id}${index}`}>
              <td className="name">   <Image
              className="user-img"
              width={40}
              height={40}
              objectFit="cover"
              src={ride?.userAvatarUrl || "/profilePic.png"}
              alt=""
            />
            <span>
                <p className="truncate">{ride.userFirstName} {ride.userLastName}</p>
                <p className="email truncate">{ride.userEmail}</p>
            </span>
            </td>
              <td><p>@{ride.userUsername}</p></td>
              <td className="date-time">
                <p>{formattedDate}</p>
                <p>{formattedTime}</p>
              </td>
              <td className="price"><p>₦{ride.pricePerSeat}</p></td>
              <td><p>{noOfPassengers}</p></td>
              <td className="">
                
                <span className={`status ${ride.status.toLowerCase()}`}>
                <span className="dot"></span>
                <p>  {ride.status}</p>
                </span>
              </td>
            </tr>
          )})}
        </tbody>
      </table>
    </section>
  );
};

export default RidesTable;
