"use client";

import React, { useEffect, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import Searchbar from "./Searchbar";
import Sidebar from "./Sidebar";
import { AppContext } from "./ContextProvider";


export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const {isAuthenticated} = useContext(AppContext)
  const router = useRouter();
  const pathname = usePathname();
const authRoutes = ["/auth/login", "/auth/register"];
const isAuthRoute = authRoutes.includes(pathname)
 
const handleRedirect = () => {
  if (!isAuthenticated && !isAuthRoute) {
    router.push("/auth/login");
    return;
  }
  
  if (isAuthenticated && isAuthRoute) {
    router.push("/");
    return;
  }
};

  useEffect(()=>  {
    handleRedirect()
  },[isAuthenticated, pathname])

  return (
    <>
     {!isAuthRoute && (
  
  <Sidebar />

)}
      <div className="d-flex gap-2 d-flex-1 flex-column">
          { !isAuthRoute && <Searchbar /> }
          <div className="d-flex-1">
            {children}
          </div>
        </div>
     
      {/* {children} */}
    </>
  );
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
