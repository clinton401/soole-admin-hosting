"use client";
import {
  createContext,
  FC,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import axios from "axios";
import api from "../../../config/api";
import {  useRouter } from "next/navigation";
export enum UserRole {
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export type User = {
  id: string;
  createdAt: string;
  updatedAt: string;
  phone: string;
  name: string;
  password: string;
  workEmail: string;
  role: UserRole;
  personalEmail: string;
  avatarUrl?: string;
};

type ContextProviderType = {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  getHeaders: () => { Authorization: string; "Content-Type": string };
  logout: () => void;
};

export const AppContext = createContext<ContextProviderType>({
  user: null,
  setUser: () => {},
  accessToken: null,
  setAccessToken: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  getHeaders: () => ({
    Authorization: "Bearer",
    "Content-Type": "application/json",
  }),
  logout: ()=> {}
});

 const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("authToken") ?? null;
    }
    return null;
  });

  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("authToken");
    }
    return false;
  });
  const {push} = useRouter()
  const fetchUser = async () => {
    try {
      const response = await api.get("/me");

      if (response.status === 200 && response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Unable to fetch user details:",
          error.response?.data?.error || error
        );
        if (error.response?.status === 401) {
          console.warn("Unauthorized access - logging out.");

          window.localStorage.removeItem("authToken");
          setUser(null);
          setAccessToken(null);
          setIsAuthenticated(false);
        }
      } else {
        console.error(`Unable to fetch user details: ${error}`);
      }
    }
  };

  useEffect(() => {
    const storedToken = window.localStorage.getItem("authToken");
    if (accessToken !== storedToken) {
      if (accessToken) {
        window.localStorage.setItem("authToken", accessToken);
      } else {
        window.localStorage.removeItem("authToken");
      }
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      setIsAuthenticated(true);
      fetchUser();
    } else {
      setIsAuthenticated(false);
    }
  }, [accessToken]);

  const getHeaders = () => ({
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  });
  const logout = () => {
    setAccessToken(null)
    setIsAuthenticated(false);
    setUser(null);
push("/auth/login")
  }

  const values = {
    accessToken,
    setAccessToken,
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    getHeaders,
    logout
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};


export default ContextProvider