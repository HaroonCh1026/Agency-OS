"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "../../../services/api";

export default function WorkspacesPage() {
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    async function loadWorkspaces() {
      const response = await api("/workspaces");

      if (response.ok) {
        setWorkspaces(response.data);
      }
    }

    loadWorkspaces();
  }, []);

  return (
    <main>
      <h1>Workspaces</h1>

      {workspaces.length === 0 ? (
        <p>No workspaces found.</p>
      ) : (
        <ul>
          {workspaces.map((workspace) => (
            <li key={workspace.id}>
              <Link href={`/workspaces/${workspace.id}/clients`}>
                {workspace.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
