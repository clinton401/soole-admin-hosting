"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterSchema } from "../../../../schema";
import showToast from "../../../../hooks/use-toast";
import { handleAxiosError } from "../../../../config/handleAxiosError";
import SubmitButton from "@/app/components/SubmitButton";
import { z } from "zod";
import api from "../../../../config/api";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { HeadPhoneIcon } from "@/app/components/Icons";

export default function Register() {
  const [formData, setFormData] = useState<z.infer<typeof RegisterSchema>>({
    personalEmail: "",
    phone: "",
    password: "",
    name: "",
    workEmail: "",
  });
  const [isPending, setIsPending] = useState(false);
  const { push } = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { personalEmail, phone, password, name, workEmail } = formData;
  const clearFormData = () => {
    setFormData({
      personalEmail: "",
      phone: "",
      password: "",
      name: "",
      workEmail: "",
    });
  };
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const validatedFields = RegisterSchema.safeParse(formData);
    if (!validatedFields.success) {
      showToast(
        "Invalid input detected. Ensure all fields are filled correctly.",
        "error"
      );
      return;
    }
    try {
      setIsPending(true);
      const response = await api.post("/auth/register", formData);
      if (response.status === 201 && response.data) {
        showToast(
          response.data.message || "Admin request submitted!",
          "success"
        );
        clearFormData();
        push("/auth/login");
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      const { message } = handleAxiosError(error);
      showToast(message, "error");

      console.error(`Unable to register: ${message}`);
    } finally {
      setIsPending(false);
    }
  };

  const handleFormChange = (
    type: "personalEmail" | "phone" | "password" | "name" | "workEmail",
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [type]: value }));
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
    <div className="auth-container">
      <h1 className="ff-Mabry-Pro-bold">Admin Dashboard</h1>
      <form onSubmit={handleRegister}>
        <input
          disabled={isPending}
          value={name}
          onChange={(e) => handleFormChange("name", e.target.value)}
          placeholder="Enter your name"
          minLength={3}
          maxLength={50}
          required
          className=""
        />
        <input
          disabled={isPending}
          type="email"
          value={workEmail}
          onChange={(e) => handleFormChange("workEmail", e.target.value)}
          placeholder="Enter your work email address"
          required
        />
        <input
          disabled={isPending}
          type="email"
          value={personalEmail}
          onChange={(e) => handleFormChange("personalEmail", e.target.value)}
          placeholder="Enter your personal email address"
          required
        />
        <input
          disabled={isPending}
          type="tel"
          value={phone}
          onChange={(e) => handleFormChange("phone", e.target.value)}
          placeholder="Enter phone number"
          pattern="[0-9]{10,15}"
          minLength={10}
          maxLength={15}
          required
        />
          <div className="password-input-container">

        <input
          disabled={isPending}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => handleFormChange("password", e.target.value)}
          placeholder="Create password"
          minLength={6}
          required
        />
                    <button
              type="button"
              onClick={togglePasswordVisibility}
              className="light password-toggle-button"
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
        <SubmitButton text="Register" isPending={isPending} />
      </form>
      <p>
        Already have an account? <a href="/auth/login">Login</a>
      </p>
    </div>
    <div
      className="d-flex flex-column align-center justify-center text-center p-1"
    >
      <p className="mb-1">Need Help?</p>
      <span className="align-center d-flex gap-0-5">
        <HeadPhoneIcon />
        Contact Support
      </span>
    </div>
    </>
  );
}
