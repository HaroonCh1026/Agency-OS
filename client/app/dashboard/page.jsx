"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../services/api";
import { removeToken } from "../../utils/storage";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    async function loadDashboard() {
      const profileResponse = await api("/profile");

      if (!profileResponse.ok) {
        removeToken();
        router.push("/login");
        return;
      }

      setUser(profileResponse.data);

      const workspaceResponse = await api("/workspaces");

      if (workspaceResponse.ok) {
        setWorkspaces(workspaceResponse.data);
      }
    }

    loadDashboard();
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

      <hr />

      <h2>Your Workspaces</h2>

      {workspaces.length === 0 ? (
        <p>No workspaces found.</p>
      ) : (
        <ul>
          {workspaces.map((workspace) => (
            <li key={workspace.id}>{workspace.name}</li>
          ))}
        </ul>
      )}

      <br />

      <button onClick={handleLogout}>Logout</button>
    </main>
  );
}
