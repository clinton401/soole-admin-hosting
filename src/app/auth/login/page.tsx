"use client";

import Image from "next/image";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "@/app/components/ContextProvider";
import SubmitButton from "@/app/components/SubmitButton";
import api from "../../../../config/api";
import { LoginSchema } from "../../../../schema";
import { z } from "zod";
import showToast from "../../../../hooks/use-toast";
import { handleAxiosError } from "../../../../config/handleAxiosError";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function Login() {
  const [contactInfo, setContactInfo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  // const toast = useToast();
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
    showToast("Invalid input. Please check your email and password.", "error");
      return;
    }
    try {
      setIsPending(true);
      const body = validatedFields.data;
      // console.log(body)
      const response = await api.post("/auth/login", body);
      if (response.status === 200 && response.data) {
        setAccessToken(response.data.access_token);
        setUser(response.data.user);
        setIsAuthenticated(true);

      showToast(response.data.message || "Login successful", "success");
        setPassword("");
        setContactInfo("");
        push("/");
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      const { message } = handleAxiosError(error);
      showToast(message, "error");

      console.error(`Unable to login: ${error}`);
    } finally {
      setIsPending(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
<<<<<<< HEAD
        <label> Phone number or email address</label>
=======
>>>>>>> 5e31741506ee94bffef375b6c2b45d062aa69c92
        <input
          disabled={isPending}
          type="text"
          name="contact_info"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          required
          placeholder="Enter phone number or email address"
          className="px-2"
        />
          <div className="password-input-container">
        <input
          disabled={isPending}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter password"

        />
                    <button
              type="button"
              onClick={togglePasswordVisibility}
              className="light password-toggle-button"
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
        <SubmitButton isPending={isPending} text="Login" />
      </form>
      <p>
        Don&lsquo;t have an account? <a href="/auth/register">Register</a>
      </p>
    </div>
  );
}
