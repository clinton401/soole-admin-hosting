"use client";

import Image from "next/image";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "@/app/components/ContextProvider";
import SubmitButton from "@/app/components/SubmitButton";
import api from "../../../../config/api";
import { LoginSchema } from "../../../../schema";
import { z } from "zod";
import useToast from "../../../../hooks/use-toast";
import { handleAxiosError } from "../../../../config/handleAxiosError";
export default function Login() {
  const [contactInfo, setContactInfo] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { push } = useRouter();
  const { setIsAuthenticated, setUser, setAccessToken } =
    useContext(AppContext);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: z.infer<typeof LoginSchema> = {
      contactInfo,
      password,
    };
    const validatedFields = LoginSchema.safeParse(data);
    if (!validatedFields.success) {
      useToast("Invalid input. Please check your email and password.", "error");
      return;
    }
    try {
      setIsPending(true);
      const body = validatedFields.data;
      const response = await api.post("/auth/login", body);
      if (response.status === 200 && response.data) {
        setAccessToken(response.data.access_token);
        setUser(response.data.user);
        setIsAuthenticated(true);

        useToast(response.data.message || "Login successful", "success");
        setPassword("");
        setContactInfo("");
        push("/");
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      const { message } = handleAxiosError(error);
      useToast(message, "error");

      console.error(`Unable to login: ${error}`);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="auth-container">
      <Image
        src="/Soólè.svg"
        className="auth-image"
        alt="Soólè"
        width={100}
        height={100}
      />

      <h1 className="ff-Mabry-Pro-bold">Admin Dashboard</h1>
      <form onSubmit={handleLogin}>
        <label> Phone number or email address</label>
        <input
          disabled={isPending}
          type="text"
          name="contact_info"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          disabled={isPending}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SubmitButton isPending={isPending} text="Login" />
      </form>
      <p>
        Don&lsquo;t have an account? <a href="/auth/register">Register</a>
      </p>
    </div>
  );
}
