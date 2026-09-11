"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "../../services/auth";
import { saveToken } from "../../utils/storage";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.login || !form.password) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await login(form);

      if (response.ok) {
        saveToken(response.data.token);
        router.push("/dashboard");
      } else {
        alert(response.data?.error || "Invalid username/email or password.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-lg font-bold text-white">
            A
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-900">Agency OS</h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to manage your agency
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Welcome back
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter your account details to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Login */}
            <div>
              <label
                htmlFor="login"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Username or Email
              </label>

              <input
                id="login"
                type="text"
                name="login"
                placeholder="Enter username or email"
                value={form.login}
                onChange={handleChange}
                autoComplete="username"
                className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Signup */}
          <div className="mt-6 border-t pt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-gray-900 hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">Agency OS</p>
      </div>
    </main>
  );
}
