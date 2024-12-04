"use client"

import Image from "next/image";

import React, { useEffect } from 'react';

const Sidebar: React.FC = () => {
  // Function to handle sidebar responsiveness
  const handleResize = () => {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      if (window.innerWidth > 1090) {
        sidebar.classList.remove('collapse');
      } else {
        sidebar.classList.add('collapse');
      }
    }
  };

  useEffect(() => {
    // Initial resize check and event listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Sidebar link click handler
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach((link) => link.classList.remove('is-active'));
    e.currentTarget.classList.add('is-active');
  };

// type Props = {};

// const Sidebar = (props: Props) => {


  return (
    <div>
      <div className="sidebar">
        {/* <span className="logo">S</span> */}
        <a className="logo-expand" href="#">
          <Image src="/Soólè.svg" alt="Soólè" width={100} height={100} />
        </a>
        <div className="side-wrapper">
          <div className="side-menu">
            <a className="sidebar-link discover is-active" href="#" onClick={handleLinkClick}>
            <svg viewBox="0 0 20 21" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.2859 1.48224H17.2859C17.7592 1.48224 18.143 1.95558 18.143 2.33938V10.9108C18.143 11.3841 17.7592 11.7679 17.2859 11.7679H11.2859C10.8125 11.7679 10.4287 11.2946 10.4287 10.9108V2.33938C10.4287 1.86604 10.8125 1.48224 11.2859 1.48224Z" fill="currentcolor"/>
<path d="M1.85714 9.19656H7.85714C8.33048 9.19656 8.71428 9.66991 8.71428 10.0537V18.6251C8.71428 19.0985 8.33048 19.4823 7.85714 19.4823H1.85714C1.3838 19.4823 1 19.0089 1 18.6251V10.0537C1 9.58036 1.3838 9.19656 1.85714 9.19656Z" fill="currentcolor"/>
<path d="M1.85714 1.48224H7.85714C8.33048 1.48224 8.71428 1.95558 8.71428 2.33938V7.48223C8.71428 7.95558 8.33048 8.33938 7.85714 8.33938H1.85714C1.3838 8.33938 1 7.86603 1 7.48223V2.33938C1 1.86604 1.3838 1.48224 1.85714 1.48224Z" fill="currentcolor"/>
<path d="M11.2859 12.6251H17.2859C17.7592 12.6251 18.143 13.0984 18.143 13.4822V18.6251C18.143 19.0984 17.7592 19.4822 17.2859 19.4822H11.2859C10.8125 19.4822 10.4287 19.0089 10.4287 18.6251V13.4822C10.4287 13.0089 10.8125 12.6251 11.2859 12.6251Z" fill="currentcolor"/>
</svg>

              Dashboard
            </a>
            <a className="sidebar-link trending" href="#" onClick={handleLinkClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21" fill="currentcolor">
  <mask id="mask0_2348_3369" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="21">
    <rect y="0.392517" width="20" height="20" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_2348_3369)">
    <path d="M1.66683 18.7258C1.43072 18.7258 1.2328 18.646 1.07308 18.4862C0.913357 18.3265 0.833496 18.1286 0.833496 17.8925V11.2258L2.60433 6.99666C2.70155 6.76055 2.85433 6.57305 3.06266 6.43416C3.271 6.29527 3.50016 6.22583 3.75016 6.22583H11.2502C11.5002 6.22583 11.7293 6.29527 11.9377 6.43416C12.146 6.57305 12.2988 6.76055 12.396 6.99666L14.1668 11.2258V17.8925C14.1668 18.1286 14.087 18.3265 13.9272 18.4862C13.7675 18.646 13.5696 18.7258 13.3335 18.7258H12.5002C12.2641 18.7258 12.0661 18.646 11.9064 18.4862C11.7467 18.3265 11.6668 18.1286 11.6668 17.8925V17.0592H3.3335V17.8925C3.3335 18.1286 3.25364 18.3265 3.09391 18.4862C2.93419 18.646 2.73627 18.7258 2.50016 18.7258H1.66683ZM3.16683 9.55916H11.8127L11.1252 7.8925H3.87516L3.16683 9.55916ZM2.50016 15.3925H12.5002V11.2258H2.50016V15.3925ZM4.5835 14.5592C4.93072 14.5592 5.22586 14.4376 5.46891 14.1946C5.71197 13.9515 5.8335 13.6564 5.8335 13.3092C5.8335 12.9619 5.71197 12.6668 5.46891 12.4237C5.22586 12.1807 4.93072 12.0592 4.5835 12.0592C4.23627 12.0592 3.94114 12.1807 3.69808 12.4237C3.45502 12.6668 3.3335 12.9619 3.3335 13.3092C3.3335 13.6564 3.45502 13.9515 3.69808 14.1946C3.94114 14.4376 4.23627 14.5592 4.5835 14.5592ZM10.4168 14.5592C10.7641 14.5592 11.0592 14.4376 11.3022 14.1946C11.5453 13.9515 11.6668 13.6564 11.6668 13.3092C11.6668 12.9619 11.5453 12.6668 11.3022 12.4237C11.0592 12.1807 10.7641 12.0592 10.4168 12.0592C10.0696 12.0592 9.77447 12.1807 9.53141 12.4237C9.28836 12.6668 9.16683 12.9619 9.16683 13.3092C9.16683 13.6564 9.28836 13.9515 9.53141 14.1946C9.77447 14.4376 10.0696 14.5592 10.4168 14.5592ZM15.0002 16.2258V9.05916L13.4793 5.3925H4.72933L5.10433 4.49666C5.20155 4.26055 5.35433 4.07305 5.56266 3.93416C5.771 3.79527 6.00016 3.72583 6.25016 3.72583H13.7502C14.0002 3.72583 14.2293 3.79527 14.4377 3.93416C14.646 4.07305 14.7988 4.26055 14.896 4.49666L16.6668 8.72583V15.3925C16.6668 15.6286 16.587 15.8265 16.4272 15.9862C16.2675 16.146 16.0696 16.2258 15.8335 16.2258H15.0002ZM17.5002 13.7258V6.55916L15.9793 2.8925H7.22933L7.60433 1.99666C7.70155 1.76055 7.85433 1.57305 8.06266 1.43416C8.271 1.29527 8.50016 1.22583 8.75016 1.22583H16.2502C16.5002 1.22583 16.7293 1.29527 16.9377 1.43416C17.146 1.57305 17.2988 1.76055 17.396 1.99666L19.1668 6.22583V12.8925C19.1668 13.1286 19.087 13.3265 18.9272 13.4862C18.7675 13.646 18.5696 13.7258 18.3335 13.7258H17.5002Z" fill="currentcolor"/>
  </g>
</svg>
              Rides
            </a>
            <a className="sidebar-link" href="#" onClick={handleLinkClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 13" fill="none">
  <path d="M9.375 6.24023C9.73611 5.82357 10.0139 5.3644 10.2083 4.86273C10.4028 4.36107 10.5 3.84107 10.5 3.30273C10.5 2.76926 10.4028 2.25391 10.2083 1.75669C10.0139 1.25961 9.73611 0.79579 9.375 0.365234C9.48611 0.337457 9.59028 0.320095 9.6875 0.313151C9.78472 0.306207 9.88889 0.302734 10 0.302734C10.8333 0.302734 11.5417 0.594401 12.125 1.17773C12.7083 1.76107 13 2.4694 13 3.30273C13 4.13607 12.7083 4.8444 12.125 5.42773C11.5417 6.01107 10.8333 6.30273 10 6.30273C9.88889 6.30273 9.78125 6.29926 9.67708 6.29232C9.57292 6.28537 9.47222 6.26801 9.375 6.24023ZM13.5 12.3027V10.3861C13.5 9.81662 13.3681 9.28537 13.1042 8.79232C12.8403 8.29926 12.4722 7.87912 12 7.5319C12.9444 7.75412 13.8472 8.05968 14.7083 8.44857C15.5694 8.83746 16 9.48329 16 10.3861V12.3027H13.5ZM16.25 7.30273V5.55273H14.5V4.05273H16.25V2.30273H17.75V4.05273H19.5V5.55273H17.75V7.30273H16.25ZM6 6.30273C5.16667 6.30273 4.45833 6.01107 3.875 5.42773C3.29167 4.8444 3 4.13607 3 3.30273C3 2.4694 3.29167 1.76107 3.875 1.17773C4.45833 0.594401 5.16667 0.302734 6 0.302734C6.83333 0.302734 7.54167 0.594401 8.125 1.17773C8.70833 1.76107 9 2.4694 9 3.30273C9 4.13607 8.70833 4.8444 8.125 5.42773C7.54167 6.01107 6.83333 6.30273 6 6.30273ZM0 12.3027V10.3861C0 10.0332 0.0868056 9.70885 0.260417 9.41315C0.434028 9.11732 0.673611 8.87218 0.979167 8.67773C1.72917 8.20551 2.53153 7.85829 3.38625 7.63607C4.24097 7.41385 5.10903 7.30273 5.99042 7.30273C6.87181 7.30273 7.73611 7.42079 8.58333 7.6569C9.43056 7.89301 10.2431 8.23329 11.0208 8.67773C11.3125 8.87218 11.5486 9.11732 11.7292 9.41315C11.9097 9.70885 12 10.0332 12 10.3861V12.3027H0ZM5.98958 4.80273C6.39931 4.80273 6.75347 4.6569 7.05208 4.36523C7.35069 4.07343 7.5 3.72273 7.5 3.31315C7.5 2.90343 7.35069 2.54926 7.05208 2.25065C6.75347 1.95204 6.39931 1.80273 5.98958 1.80273C5.58 1.80273 5.22931 1.95204 4.9375 2.25065C4.64583 2.54926 4.5 2.90343 4.5 3.31315C4.5 3.72273 4.64583 4.07343 4.9375 4.36523C5.22931 4.6569 5.58 4.80273 5.98958 4.80273ZM1.5 10.8027H10.5V10.3861C10.5 10.3018 10.4792 10.2252 10.4375 10.1563C10.3958 10.0872 10.3403 10.025 10.2708 9.9694C9.60417 9.60829 8.91319 9.32357 8.19792 9.11523C7.48264 8.9069 6.74653 8.80273 5.98958 8.80273C5.23264 8.80273 4.49653 8.90343 3.78125 9.10482C3.06597 9.30621 2.38194 9.5944 1.72917 9.9694C1.65972 10.025 1.60417 10.0872 1.5625 10.1563C1.52083 10.2252 1.5 10.3018 1.5 10.3861V10.8027Z" fill="currentcolor"/>
</svg>
              Users
            </a>
            <a className="sidebar-link" href="#" onClick={handleLinkClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 15" fill="none">
  <path d="M8 7.21313L1.5 3.48397V10.7131H9.5V12.2131H1.5C1.0875 12.2131 0.734375 12.0662 0.440625 11.7723C0.146875 11.4784 0 11.1251 0 10.7123V1.7073C0 1.29452 0.146875 0.942301 0.440625 0.650635C0.734375 0.358968 1.0875 0.213135 1.5 0.213135H14.5C14.9125 0.213135 15.2656 0.36001 15.5594 0.65376C15.8531 0.94751 16 1.30063 16 1.71313V7.21313H14.5V3.48397L8 7.21313ZM8 5.4423L14.5 1.71313H1.5L8 5.4423ZM14 14.4631L12.9375 13.4006L14.125 12.2131H11V10.7131H14.125L12.9375 9.52563L14 8.46313L17 11.4631L14 14.4631ZM1.5 3.48397V11.4215V1.71313V3.48397Z" fill="currentcolor"/>
</svg>
              Inbox
            </a>
            <a className="sidebar-link" href="#" onClick={handleLinkClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21" fill="none">
  <mask id="mask0_2348_3510" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="21">
    <rect y="0.123291" width="20" height="20" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_2348_3510)">
    <path d="M8.396 18.1233L7.93766 15.7483C7.61822 15.6233 7.30919 15.4775 7.01058 15.3108C6.71197 15.1441 6.43072 14.9497 6.16683 14.7275L3.87516 15.4983L2.271 12.7275L4.0835 11.1441C4.05572 10.9775 4.03488 10.8108 4.021 10.6441C4.00711 10.4775 4.00016 10.3038 4.00016 10.1233C4.00016 9.94274 4.00711 9.76912 4.021 9.60246C4.03488 9.43579 4.05572 9.26912 4.0835 9.10246L2.271 7.51912L3.87516 4.74829L6.16683 5.51912C6.43072 5.2969 6.71197 5.10246 7.01058 4.93579C7.30919 4.76912 7.61822 4.62329 7.93766 4.49829L8.396 2.12329H11.6043L12.0627 4.49829C12.3821 4.62329 12.6911 4.76912 12.9897 4.93579C13.2884 5.10246 13.5696 5.2969 13.8335 5.51912L16.1252 4.74829L17.7293 7.51912L15.9168 9.10246C15.9446 9.26912 15.9654 9.43579 15.9793 9.60246C15.9932 9.76912 16.0002 9.94274 16.0002 10.1233C16.0002 10.3038 15.9932 10.4775 15.9793 10.6441C15.9654 10.8108 15.9446 10.9775 15.9168 11.1441L17.7293 12.7275L16.1252 15.4983L13.8335 14.7275C13.5696 14.9497 13.2884 15.1441 12.9897 15.3108C12.6911 15.4775 12.3821 15.6233 12.0627 15.7483L11.6043 18.1233H8.396ZM9.62516 16.6233H10.3752L10.771 14.5608C11.2988 14.4636 11.7918 14.283 12.2502 14.0191C12.7085 13.7552 13.1043 13.4219 13.4377 13.0191L15.4377 13.6858L15.8127 13.0608L14.2293 11.665C14.3127 11.4288 14.3786 11.1823 14.4272 10.9254C14.4759 10.6684 14.5002 10.4011 14.5002 10.1233C14.5002 9.84551 14.4759 9.57815 14.4272 9.32121C14.3786 9.06426 14.3127 8.81774 14.2293 8.58162L15.8127 7.18579L15.4377 6.56079L13.4377 7.22746C13.1043 6.82468 12.7085 6.49135 12.2502 6.22746C11.7918 5.96357 11.2988 5.78301 10.771 5.68579L10.3752 3.62329H9.62516L9.22933 5.68579C8.70155 5.78301 8.2085 5.96357 7.75016 6.22746C7.29183 6.49135 6.896 6.82468 6.56266 7.22746L4.56266 6.56079L4.18766 7.18579L5.771 8.58162C5.68766 8.81774 5.62169 9.06426 5.57308 9.32121C5.52447 9.57815 5.50016 9.84551 5.50016 10.1233C5.50016 10.4011 5.52447 10.6684 5.57308 10.9254C5.62169 11.1823 5.68766 11.4288 5.771 11.665L4.18766 13.0608L4.56266 13.6858L6.56266 13.0191C6.896 13.4219 7.29183 13.7552 7.75016 14.0191C8.2085 14.283 8.70155 14.4636 9.22933 14.5608L9.62516 16.6233ZM10.0002 13.1233C10.8335 13.1233 11.5418 12.8316 12.1252 12.2483C12.7085 11.665 13.0002 10.9566 13.0002 10.1233C13.0002 9.28996 12.7085 8.58162 12.1252 7.99829C11.5418 7.41496 10.8335 7.12329 10.0002 7.12329C9.16683 7.12329 8.4585 7.41496 7.87516 7.99829C7.29183 8.58162 7.00016 9.28996 7.00016 10.1233C7.00016 10.9566 7.29183 11.665 7.87516 12.2483C8.4585 12.8316 9.16683 13.1233 10.0002 13.1233Z" fill="currentcolor"/>
  </g>
</svg>
              Settings
            </a>
          </div>
        </div>
        <div className="side-wrapper">
          <div className="side-menu">
            <a className="sidebar-link" href="#" onClick={handleLinkClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
  <mask id="mask0_2348_3559" maskUnits="userSpaceOnUse" x="0" y="-1">
    <rect y="-0.00952148" width="20" height="20" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_2348_3559)">
    <path d="M16.625 10.7405H7V9.24048H16.625L15.4375 8.05298L16.5 6.99048L19.5 9.99048L16.5 12.9905L15.4375 11.928L16.625 10.7405ZM12.5 7.74048V4.49048H4.5V15.4905H12.5V12.2405H14V15.4905C14 15.903 13.8531 16.2561 13.5594 16.5499C13.2656 16.8436 12.9125 16.9905 12.5 16.9905H4.5C4.0875 16.9905 3.73437 16.8436 3.44062 16.5499C3.14687 16.2561 3 15.903 3 15.4905V4.49048C3 4.07798 3.14687 3.72485 3.44062 3.4311C3.73437 3.13735 4.0875 2.99048 4.5 2.99048H12.5C12.9125 2.99048 13.2656 3.13735 13.5594 3.4311C13.8531 3.72485 14 4.07798 14 4.49048V7.74048H12.5Z" fill="currentcolor"/>
  </g>
</svg>
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
