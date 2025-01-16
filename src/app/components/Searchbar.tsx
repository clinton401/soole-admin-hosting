import React from "react";
import Image from "next/image";

type Props = {
  isVisible?: boolean;
};

const Searchbar = ({ isVisible = true }: Props) => {
  if (!isVisible) return null;

  return (
    <div className="" style={{width: "100%"}}>
      <div className="header ">
        <div className="search-bar">
          <input type="text" placeholder="Search" />
        </div>
        <div className="user-settings">
          <div className="notify mx-1">
            <div className="notification"></div>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
  <path d="M10.1074 1.30153L10.1074 1.30153L10.2784 1.37747C10.2784 1.37748 10.2784 1.37748 10.2784 1.37748C10.293 1.38395 10.3075 1.39048 10.322 1.39707C9.54095 2.03091 9.04163 2.9984 9.04163 4.08335C9.04163 5.99334 10.59 7.54168 12.5 7.54168C12.7291 7.54168 12.9533 7.51932 13.1704 7.47662C13.2563 8.16341 13.4542 8.83405 13.7579 9.46331C13.7579 9.46334 13.7579 9.46336 13.7579 9.46339L13.979 9.92181L13.979 9.92184C14.7644 11.5497 13.7608 13.5053 11.8419 13.8463C11.8419 13.8463 11.8418 13.8463 11.8418 13.8464L11.7081 13.8701L11.7079 13.8701C8.85721 14.3766 5.93387 14.3766 3.0832 13.8701L3.08318 13.8701C1.15043 13.5268 0.196695 11.5089 1.09055 9.92073L1.27971 9.58471L1.27975 9.58464C1.80937 8.64361 2.08775 7.58849 2.08775 6.51493V5.45357C2.08775 3.73922 3.09752 2.1544 4.72444 1.37616L4.72445 1.37616C6.41309 0.568382 8.39463 0.540724 10.1074 1.30153Z" stroke="black" strokeWidth="1.5"/>
</svg>
          </div>
      <Image
        className="user-img"
        // src="https://images.unsplash.com/photo-1587918842454-870dbd18261a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=943&q=80"
        width={40}
        height={40}
        objectFit="cover"
        src="/profilePic.png"
        alt=""
      />
      <div>

          <div className="user-name ff-Mabry-Pro-semibold fs-16" style={{width: "140px"}}>Adeyemi Korede</div>
          <div className="user-name ff-Mabry-Pro-light fs-16 card-title" style={{color: "#"}}>Admin</div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
