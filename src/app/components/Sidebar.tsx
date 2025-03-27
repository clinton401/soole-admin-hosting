"use client";
import Image from "next/image";
import React, { useEffect, useState, useContext } from "react";
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
import {Hourglass} from "lucide-react"
import Modal from "./Modal";
import fetchData from "../../../hooks/fetch-data";
import { AppContext } from "./ContextProvider";
import { QueryFunctionContext } from "@tanstack/react-query";
import api from "../../../config/api";
import axios from "axios"
type RequestCountQueryKey = ["request-count"];
type RequestCountResponse = {
  totalLength: number;
};
const fetchRequestCount = async ({
 
  signal,
}: QueryFunctionContext<RequestCountQueryKey>): Promise<RequestCountResponse> => {
  try {
    const response = await api.get(`/requests`, {
      signal,
    });

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Unknown error occurred");
  } else {
      throw new Error("An unexpected error occurred");
  }
  }
};
const Sidebar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout } = useContext(AppContext); 
  const {
    data: request_count,
    error,
    isLoading,
    
  } = fetchData<RequestCountResponse, RequestCountQueryKey>(
    ["request-count"],
    fetchRequestCount
  );


  const pathname = usePathname();


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

  // const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  //   const sidebarLinks = document.querySelectorAll(".sidebar-link");
  //   sidebarLinks.forEach((link) => link.classList.remove("is-active"));
  //   e.currentTarget.classList.add("is-active");
  // };

  const isActive = (path: string) => pathname === path;
  const handleLogout = () => {
    logout();
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
            <Link  href="/inbox/all"  className={`sidebar-link ${
                  pathname.startsWith("/inbox") ? "is-active" : ""
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
            <Link  href="/requests"  className={`sidebar-link ${
                  isActive("/requests") ? "is-active" : ""
                }`}>
              {/* <a className="sidebar-link" onClick={handleLinkClick}> */}
                <Hourglass />
                Requests  {!isLoading &&
                  !error &&
                  request_count &&
                  request_count.totalLength   > 0 && (
                    <span className="" style={{marginLeft: 4, height: 20, width: 20, borderRadius: 9999, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ec5252", fontSize: 12, color: "#fff"}}>{request_count.totalLength < 100 ? request_count.totalLength : " 99+"}</span>
                  )}
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
