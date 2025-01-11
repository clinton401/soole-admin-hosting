"use client";
import Image from "next/image";
import React, { useEffect } from "react";
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

const Sidebar: React.FC = () => {
  // const router = useRouter();
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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const sidebarLinks = document.querySelectorAll(".sidebar-link");
    sidebarLinks.forEach((link) => link.classList.remove("is-active"));
    e.currentTarget.classList.add("is-active");
  };

  const isActive = (path: string) => pathname === path;

  return (
    <div>
      <div className="sidebar">
        <Link legacyBehavior href="/">
          <a className="logo-expand">
            <Image src="/Soólè.svg" alt="Soólè" width={100} height={100} />
          </a>
        </Link>

        <div className="side-wrapper">
          <div className="side-menu">
            <Link legacyBehavior href="/">
              <a
                className={`sidebar-link discover ${
                  isActive("/") ? "is-active" : ""
                }`}
                onClick={handleLinkClick}
              >
                <DashboardIcon />
                Dashboard
              </a>
            </Link>

            <Link legacyBehavior href="/rides">
              <a
                className="sidebar-link trending"
                href="/rides"
                onClick={handleLinkClick}
              >
                <RidesIcon />
                Rides
              </a>
            </Link>
            <Link legacyBehavior href="/users">
              <a
                className={`sidebar-link ${
                  isActive("/users") ? "is-active" : ""
                }`}
                onClick={handleLinkClick}
              >
                <UsersIcon />
                Users
              </a>
            </Link>
            <Link legacyBehavior href="/inbox">
              <a
                className={`sidebar-link ${
                  isActive("/inbox") ? "is-active" : ""
                }`}
                onClick={handleLinkClick}
              >
                <InboxIcon />
                Inbox
              </a>
            </Link>

            <Link legacyBehavior href="/management">
              <a className="sidebar-link" onClick={handleLinkClick}>
                <ManagementIcon />
                Team Management
              </a>
            </Link>

            <Link legacyBehavior href="/settings">
              <a className="sidebar-link" onClick={handleLinkClick}>
                <SettingsIcon />
                Settings
              </a>
            </Link>
          </div>
        </div>
        <div className="side-wrapper">
          <div className="side-menu">
            <a className="sidebar-link" href="#" onClick={handleLinkClick}>
              <LogoutIcon />
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
