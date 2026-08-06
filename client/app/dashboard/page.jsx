"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../services/api";
import { removeToken } from "../../utils/storage";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getProfile() {
      const response = await api("/profile");

      if (response.ok) {
        setUser(response.data);
      } else {
        removeToken();
        router.push("/login");
      }
    }

    getProfile();
  }, [router]);

  function handleLogout() {
    removeToken();
    router.push("/login");
  }

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <main>
      <h1>Dashboard</h1>

      <h3>Welcome, {user.username}</h3>

      <p>Email: {user.email}</p>

      <p>Phone: {user.phone}</p>

      <button onClick={handleLogout}>Logout</button>
    </main>
  );
}
