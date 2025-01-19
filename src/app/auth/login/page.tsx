"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const isAuthenticated = email === "test@example.com" && password === "password"; // Mock validation

    if (isAuthenticated) {
      localStorage.setItem("isAuthenticated", "true");
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
                  <Image src="/Soólè.svg" className="auth-image" alt="Soólè" width={100} height={100} />
      
      <h1 className="ff-Mabry-Pro-bold">Admin Dashboard</h1>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don&lsquo;t have an account? <a href="/auth/register">Register</a>
      </p>
    </div>
  );
}
