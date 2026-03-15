"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    setLoading(false);
    if (!response.ok) {
      const data = await response.json();
      setError(data.message || "Access denied");
      return;
    }

    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#050414] text-white flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-900 border border-white/20 rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter admin email"
          className="w-full p-3 rounded-md bg-[#131025] border border-gray-600 focus:outline-none focus:border-purple-500"
          required
        />
        <div className="mt-4 flex gap-2">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter admin password"
          className="flex-1 p-3 rounded-md bg-[#131025] border border-gray-600 focus:outline-none focus:border-purple-500"
          required
        />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="rounded-md border border-gray-600 px-4 text-sm hover:border-purple-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {error ? <p className="text-red-400 text-sm mt-3">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-5 bg-gradient-to-r from-purple-600 to-pink-500 py-3 rounded-md font-semibold disabled:opacity-50"
        >
          {loading ? "Checking..." : "Login"}
        </button>
      </form>
    </div>
  );
}
