"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  DashboardIcon,
  InboxIcon,
  LogoutIcon,
  ManagementIcon,
  RidesIcon,
  SettingsIcon,
  UsersIcon,
} from "./Icons";
import Modal from "./Modal";

const Sidebar: React.FC = () => {
  // const router = useRouter();
  const pathname = usePathname();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleResize = () => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      if (window.innerWidth > 1090) {
        sidebar.classList.remove("collapse");
      } else {
        sidebar.classList.add("collapse");
      }
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const sidebarLinks = document.querySelectorAll(".sidebar-link");
    sidebarLinks.forEach((link) => link.classList.remove("is-active"));
    e.currentTarget.classList.add("is-active");
  };

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    console.log("User logged out"); // Replace with actual logout logic
    setIsModalOpen(false);
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false);
  };
 

  return (
    <div>
      <div className="sidebar">
        <Link  href="/" className="logo-expand">
          {/* <a className="logo-expand"> */}
            <Image src="/Soólè.svg" alt="Soólè" width={100} height={100} />
          {/* </a> */}
        </Link>

        <div className="side-wrapper">
          <div className="side-menu">
            <Link  href="/" className={`sidebar-link discover ${
                  isActive("/") ? "is-active" : ""
                }`} >
              {/* <a
                className={`sidebar-link discover ${
                  isActive("/") ? "is-active" : ""
                }`}
                onClick={handleLinkClick}
              > */}
                <DashboardIcon />
                Dashboard
              {/* </a> */}
            </Link>

            <Link  href="/rides" className={`sidebar-link trending ${
                  isActive("/rides") ? "is-active" : ""
                }` }
                // onClick={handleLinkClick}
                >
              {/* <a
                className="sidebar-link trending"
                href="/rides"
                onClick={handleLinkClick}
              > */}
                <RidesIcon />
                Rides
              {/* </a> */}
            </Link>
            <Link  href="/users" className={`sidebar-link ${
                  isActive("/users") ? "is-active" : ""
                }`}>
              {/* <a
                className={`sidebar-link ${
                  isActive("/users") ? "is-active" : ""
                }`}
                onClick={handleLinkClick}
              > */}
                <UsersIcon />
                Users
              {/* </a> */}
            </Link>
            <Link  href="/inbox"  className={`sidebar-link ${
                  isActive("/inbox") ? "is-active" : ""
                }`}>
              {/* <a
                className={`sidebar-link ${
                  isActive("/inbox") ? "is-active" : ""
                }`}
                onClick={handleLinkClick}
              > */}
                <InboxIcon />
                Inbox
              {/* </a> */}
            </Link>

            <Link  href="/management"  className={`sidebar-link ${
                  isActive("/management") ? "is-active" : ""
                }`}>
              {/* <a className="sidebar-link" onClick={handleLinkClick}> */}
                <ManagementIcon />
                Team Management
              {/* </a> */}
            </Link>

            <Link  href="/settings" className={`sidebar-link ${
                  isActive("/settings") ? "is-active " : ""
                }`}>
              {/* <a className="sidebar-link" onClick={handleLinkClick}> */}
                <SettingsIcon />
                Settings
              {/* </a> */}
            </Link>
          </div>
        </div>
        <div className="side-wrapper">
          <div className="side-menu">
            <a className="sidebar-link" href="#" onClick={
            () => setIsModalOpen(true)
            }>
              <LogoutIcon />
              Logout
            </a>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        title="Are you sure you want to logout?"
        onConfirm={handleLogout}
        onCancel={handleCancelLogout}
        actionButtons="confirm-cancel"
      />

    </div>
  );
};

export default Sidebar;
