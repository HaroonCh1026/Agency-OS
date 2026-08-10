"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { removeToken } from "@/utils/storage";

export default function Sidebar() {
  const router = useRouter();

  function handleLogout() {
    removeToken();
    router.push("/login");
  }

  return (
    <aside>
      <h2>Menu</h2>

      <nav>
        <Link href="/dashboard">Dashboard</Link>
        <br />

        <Link href="/workspaces">Workspaces</Link>
        <br />

        <Link href="/clients">Clients</Link>
        <br />

        <button onClick={handleLogout}>Logout</button>
      </nav>
    </aside>
  );
}
