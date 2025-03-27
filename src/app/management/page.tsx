"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Modal from "../components/Modal";
import api from "../../../config/api";
import axios from "axios";
import useInfiniteScroll from "../../../hooks/use-infinite-scroll";
import { useQueryClient } from "@tanstack/react-query";
import LoaderComp from "../components/LoaderComp";
import ErrorComp from "../components/ErrorComp";
import { useInView } from "react-intersection-observer";


enum AdminRole {
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}
interface Admin {
  id: string;
  phone: string;
  name: string;
  password: string;
  workEmail: string;
  role: AdminRole;
  personalEmail: string;
  avatarUrl?: string;
  adminViewable: boolean;
}
type FetchAdminsResult = {
  data: Admin[];
  nextPage?: number;
  prevPage?: number;
};
const TeamManagement = () => {
  // const { accessToken } = useContext(AppContext);
  // const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"action" | "add">("action");
  const [modalContent, setModalContent] = useState({
    preamble: "",
    action: () => {},
  });

  const [newAgent, setNewAgent] = useState({
    id: null,
    name: "",
    title: "",
    email: "",
    phone: "",
  });
  const fetchAdmins = async ({
    pageParam = 1,
    signal,
  }: {
    pageParam: number;
    signal: AbortSignal;
  }): Promise<FetchAdminsResult> => {
    try {
      const response = await api.get(`/?page=${pageParam}`, {
        signal,
      });

      const data = response.data.data;
      return {
        data: data.admins,
        nextPage: data.nextPage,
        // prevPage: data.prevPage,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || "Unknown error occurred"
        );
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  };

  const {
    data: admins,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    fetchPreviousPage,
    hasPreviousPage,
    isFetchingPreviousPage,
    isLoading,
    error,
    refetch,
  } = useInfiniteScroll<Admin, FetchAdminsResult>(
    ({ pageParam = 1, signal }) => fetchAdmins({ pageParam, signal }),
    ["admins"]
  );

  const queryClient = useQueryClient();
  const { ref, inView } = useInView();
  // useEffect(() => {
  //   const fetchProfiles = async () => {
  //     try {
  //       const response = await api.get("/");
  //       console.log("Fetch Profiles Response:", response.data);

  //       if (response.data && response.data.status === "success" && Array.isArray(response.data.data.admins)) {
  //         const fetchedProfiles: Profile[] = response.data.data.admins.map((admin: Admin) => ({
  //           id: admin.id,
  //           name: admin.name,
  //           title: admin.role,
  //           email: admin.personalEmail,
  //           phone: admin.phone,
  //           image: admin.avatarUrl || "/profilePic.png",
  //           role: admin.role,
  //         }));
  //         setProfiles(fetchedProfiles);
  //       } else {
  //         alert(response.data.message || "Unknown error");
  //       }
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         console.error("Error fetching profiles:", error.response?.data);
  //         alert("Failed to load profiles: " + (error.response?.data?.error || "Unknown error."));
  //       } else {
  //         console.error("Unexpected error:", error);
  //         alert("An unexpected error occurred.");
  //       }
  //     }
  //   };

  //   fetchProfiles();
  // }, []);
  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, isFetchingNextPage, hasNextPage]);
  if (isLoading) {
    return (
      <div className="container">
        <LoaderComp />
      </div>
    );
  }
  if (error || !admins) {
    return (
      <div className="container">
        <ErrorComp error={error} refetch={refetch} />
      </div>
    );
  }

  const handleMenuClick = (id: string) => {
    setActiveMenu((prev) => (prev === id ? null : id));
  };

  const openModal = (
    type: "action" | "add",
    preamble: string,
    action: () => void
  ) => {
    setModalType(type);
    setModalContent({ preamble, action });
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    modalContent.action();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddAdmin = async () => {
    if (
      !newAgent.name ||
      !newAgent.email ||
      !newAgent.phone ||
      !newAgent.title
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const requestBody = {
      personalEmail: newAgent.title,
      phone: newAgent.phone,
      name: newAgent.name,
      workEmail: newAgent.email,
    };

    try {
      const response = await api.post("/create", requestBody);

      if (response.data.status === "success") {
        const newAdmin = response.data.admin;
        // console.log(newAdmin);
        queryClient.setQueryData(["admins"], (old:  {pageParams: number[],pages: {data: Admin[]}[]} | null) => {
          if (!old) return old;
          return {
              ...old,
              pages: old.pages.map((page: any, index: number) => {
      
                if(index === 0){
                  return { ...page, data: [newAdmin, ...page.data] };
                }
                return page;
              }),
            };
      })
        // setProfiles((prev) => [
        //   ...prev,
        //   {
        //     id: newAdmin.id,
        //     name: newAdmin.name,
        //     title: newAgent.title,
        //     email: newAdmin.personalEmail,
        //     phone: newAdmin.phone,
        //     image: newAdmin.image || "/profilePic.png",
        //     role: newAdmin.role,
        //   },
        // ]);

        setNewAgent({
          id: null,
          name: "",
          title: "",
          email: "",
          phone: "",
        });
        setIsModalOpen(false);
        alert("Admin added successfully!");
      } else {
        alert(
          `Failed to add admin: ${response.data.message || "Unknown error"}`
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error adding admin:", error.response?.data);
        alert(
          "Failed to add admin: " +
            (error.response?.data?.error || "Unknown error.")
        );
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred.");
      }
    }
  };

  const handleMakeSuperAdmin = async (profile: Admin) => {
  
    try {
     await api.patch(
        `/${profile.id}/super-admin/promote`,
      );

      // console.log("Super Admin promotion successful:", response.data);
      queryClient.setQueryData(["admins"], (old: {pageParams: number[],pages: {data: Admin[]}[]} | null) => {
        if (!old) return old;
      
      
        return {
          ...(old),
          pages: (old).pages.map((page) => ({
            ...page,
            data: page.data.map((admin) => 
              admin.id === profile.id ? {...admin ,  role: AdminRole.SUPER_ADMIN} : admin
            ),
          })),
        };
      });
      // setProfiles((prev) =>
      //   prev.map((p) =>
      //     p.id === profile.id ? { ...p, role: "SUPER_ADMIN" } : p
      //   )
      // );

      alert(`${profile.name} is now a Super Admin!`);
    } catch (error) {
      console.error("Error making Super Admin:", error);
      alert("Failed to promote to Super Admin. Please try again.");
    }
  };

  const handleRemoveSuperAdmin = async (profile: Admin) => {
   
    try {
    await api.patch(
        `/${profile.id}/super-admin/demote`,
       
      );

      // console.log("Admin removal successful:", response.data);
      queryClient.setQueryData(["admins"], (old: {pageParams: number[],pages: {data: Admin[]}[]} | null) => {
        if (!old) return old;
      
      
        return {
          ...(old),
          pages: (old).pages.map((page) => ({
            ...page,
            data: page.data.map((admin) => 
              admin.id === profile.id ? {...admin ,  role: AdminRole.ADMIN} : admin
            ),
          })),
        };
      });
      // setProfiles((prev) =>
      //   prev.map((p) => (p.id === profile.id ? { ...p, role: "ADMIN" } : p))
      // );

      alert(`${profile.name} is no longer a Super Admin!`);
    } catch (error) {
      console.error("Error removing Admin:", error);
      alert("Failed to remove Admin. Please try again.");
    }
  };

  return (
    <div className="ff-Mabry-Pro wrapper-container">
      <h2 className="ff-Mabry-Pro-bold fs-32">Team Management</h2>
      <div className="profile-container ff-Mabry-Pro-bold">
        <div
          className="add-card"
          onClick={() => openModal("add", "Add Admin", handleAddAdmin)}
        >
          <div className="add-icon-container">
            <span className="add-icon">+</span>
          </div>
          <p className="add-text">Add new admin</p>
        </div>
        {admins.map((profile) => (
          <div key={profile.id || profile.name} className="profile-card">
            <div
              className="menu-button"
              onClick={() => handleMenuClick(profile.id as string)}
            >
              ⋮
            </div>
            {activeMenu === profile.id && (
              <div className="popup-menu">
                {profile.role !== "SUPER_ADMIN" && (
                  <button
                    className="popup-button"
                    onClick={() =>
                      openModal(
                        "action",
                        `You are about to give full access to ${profile.name} by making them a Super Admin.`,
                        () => handleMakeSuperAdmin(profile)
                      )
                    }
                  >
                    Make Super Admin
                  </button>
                )}
                <button
                  className="popup-button"
                  onClick={() =>
                    openModal(
                      "action",
                      `You are about to remove ${profile.name}.`,
                      () => handleRemoveSuperAdmin(profile)
                    )
                  }
                >
                  Remove
                </button>
              </div>
            )}
            <Image
              src={profile.avatarUrl || "/profilePic.png"}
              alt={profile.name}
              className="profile-picture"
              width={50}
              height={50}
            />
            <p className="profile-name">{profile.name}</p>
            <p className="profile-title">{profile.role}</p>
            <p className="profile-email">{profile.personalEmail}</p>
            {/* {profile.role === "SUPER_ADMIN" && (
              <p className="super-admin-badge">Super Admin</p>
            )} */}
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        preamble={modalContent.preamble}
        preambleStyle={{ fontSize: "1.5rem" }}
        onConfirm={modalType === "action" ? handleConfirm : undefined}
        onCancel={handleCancel}
        onAdd={modalType === "add" ? handleAddAdmin : undefined}
        actionButtons={modalType === "add" ? "add" : "confirm-cancel"}
        showCloseButton={false}
      >
        {modalType === "add" && (
          <form>
            <label>Name</label>
            <input
              type="text"
              required
              value={newAgent.name}
              onChange={(e) =>
                setNewAgent({ ...newAgent, name: e.target.value })
              }
            />
            <label>Personal Email</label>
            <input
              type="text"
              required
              value={newAgent.title}
              onChange={(e) =>
                setNewAgent({ ...newAgent, title: e.target.value })
              }
            />
            <label>Work Email</label>
            <input
              type="email"
              required
              value={newAgent.email}
              onChange={(e) =>
                setNewAgent({ ...newAgent, email: e.target.value })
              }
            />
            <label>Phone Number</label>
            <input
              type="tel"
              required
              value={newAgent.phone}
              onChange={(e) =>
                setNewAgent({ ...newAgent, phone: e.target.value })
              }
            />
          </form>
        )}
      </Modal>
      {isFetchingNextPage && <LoaderComp />}
      <section ref={ref} className=""></section>
    </div>
  );
};

export default TeamManagement;
