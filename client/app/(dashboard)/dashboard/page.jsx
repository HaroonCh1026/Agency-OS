"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../../services/api";
import { removeToken } from "../../../utils/storage";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
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
        } else {
          setError("Unable to load your workspaces.");
        }
      } catch (error) {
        console.error(error);
        setError("Something went wrong while loading the dashboard.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [router]);

  if (loading) {
    return (
      <main className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 rounded bg-gray-200" />
          <div className="h-4 w-72 rounded bg-gray-200" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="h-28 rounded-xl bg-gray-200" />
            <div className="h-28 rounded-xl bg-gray-200" />
            <div className="h-28 rounded-xl bg-gray-200" />
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-full bg-gray-50 p-6">
      {/* Welcome Section */}
      <section className="mb-8">
        <p className="text-sm font-medium text-gray-500">Overview</p>

        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          Welcome back, {user.username} 👋
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage your workspaces and clients from one place.
        </p>
      </section>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Stats */}
      <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Workspaces</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {workspaces.length}
          </p>

          <p className="mt-1 text-xs text-gray-500">Workspaces you manage</p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Account</p>

          <p className="mt-2 text-lg font-semibold text-gray-900">Active</p>

          <p className="mt-1 text-xs text-gray-500">
            Your account is authenticated
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Email</p>

          <p className="mt-2 truncate text-sm font-semibold text-gray-900">
            {user.email}
          </p>

          <p className="mt-1 text-xs text-gray-500">Account email</p>
        </div>
      </section>

      {/* Workspaces */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Your Workspaces
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Select a workspace to manage its clients.
            </p>
          </div>

          <button
            onClick={() => router.push("/workspaces")}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            View All
          </button>
        </div>

        {workspaces.length === 0 ? (
          <div className="rounded-xl border border-dashed bg-white p-10 text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              No workspaces yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              Create your first workspace to start managing clients for your
              agency.
            </p>

            <button
              onClick={() => router.push("/workspaces")}
              className="mt-5 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Create Workspace
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workspaces.map((workspace) => (
              <div
                key={workspace.id}
                className="rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-sm font-bold text-gray-700">
                    {workspace.name.charAt(0).toUpperCase()}
                  </div>

                  <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                    Active
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {workspace.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Workspace #{workspace.id}
                </p>

                <button
                  onClick={() =>
                    router.push(`/workspaces/${workspace.id}/clients`)
                  }
                  className="mt-5 w-full rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Manage Clients
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
