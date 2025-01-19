"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = Boolean(localStorage.getItem("token"));
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [router]);

  return <>{children}</>;
}





// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AuthWrapper({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       try {
//         // Call backend API to verify authentication status
//         const response = await fetch("/api/auth/verify", {
//           method: "GET",
//           credentials: "include", // Sends cookies with the request
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setIsAuthenticated(data.isAuthenticated);
//         } else {
//           router.push("/auth/login");
//         }
//       } catch (error) {
//         console.error("Failed to verify authentication:", error);
//         router.push("/auth/login");
//       }
//     };

//     checkAuthStatus();
//   }, [router]);

//   if (!isAuthenticated) {
//     return null; // Optionally, you can add a loading spinner here.
//   }

//   return <>{children}</>;
// }
