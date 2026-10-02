"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../services/api";
import { removeToken } from "../../../utils/storage";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
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
  };

  useEffect(() => {
    loadDashboard();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-full min-w-0 bg-gray-50 px-4 py-5 sm:p-6 lg:px-8">
        <div className="animate-pulse space-y-5 sm:space-y-6">
          <div>
            <div className="h-8 w-48 max-w-full rounded bg-gray-200" />
            <div className="mt-2 h-4 w-72 max-w-full rounded bg-gray-200" />
          </div>

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
    <main className="min-h-full min-w-0 bg-gray-50 px-4 py-5 sm:p-6 lg:px-8">
      <section className="mb-6 sm:mb-8">
        <p className="text-sm font-medium text-gray-500">Overview</p>

        <h1 className="mt-1 wrap-break-word text-2xl font-bold text-gray-900 sm:text-3xl">
          Welcome back, {user.username} 👋
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-5 text-gray-500">
          Manage your workspaces and clients from one place.
        </p>
      </section>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600">
          {error}
        </div>
      )}

      <section className="mb-6 grid gap-4 sm:mb-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border bg-white p-4 shadow-sm sm:p-5">
          <p className="text-sm text-gray-500">Total Workspaces</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {workspaces.length}
          </p>

          <p className="mt-1 text-xs text-gray-500">Workspaces you manage</p>
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm sm:p-5">
          <p className="text-sm text-gray-500">Account</p>

          <p className="mt-2 text-lg font-semibold text-gray-900">Active</p>

          <p className="mt-1 text-xs text-gray-500">
            Your account is authenticated
          </p>
        </div>

        <div className="min-w-0 rounded-xl border bg-white p-4 shadow-sm sm:p-5">
          <p className="text-sm text-gray-500">Email</p>

          <p className="mt-2 truncate text-sm font-semibold text-gray-900">
            {user.email}
          </p>

          <p className="mt-1 text-xs text-gray-500">Account email</p>
        </div>
      </section>

      <section className="min-w-0">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-xl font-semibold text-gray-900">
              Your Workspaces
            </h2>

            <p className="mt-1 text-sm leading-5 text-gray-500">
              Select a workspace to manage its clients.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/workspaces")}
            className="w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 sm:w-auto"
          >
            View All
          </button>
        </div>

        {workspaces.length === 0 ? (
          <div className="rounded-xl border border-dashed bg-white p-6 text-center sm:p-10">
            <h3 className="text-lg font-semibold text-gray-900">
              No workspaces yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-5 text-gray-500">
              Create your first workspace to start managing clients for your
              agency.
            </p>

            <button
              type="button"
              onClick={() => router.push("/workspaces")}
              className="mt-5 w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 sm:w-auto"
            >
              Create Workspace
            </button>
          </div>
        ) : (
          <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workspaces.map((workspace) => (
              <div
                key={workspace.id}
                className="min-w-0 rounded-xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm font-bold text-gray-700">
                    {workspace.name.charAt(0).toUpperCase()}
                  </div>

                  <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                    Active
                  </span>
                </div>

                <h3 className="mt-4 wrap-break-word text-lg font-semibold text-gray-900">
                  {workspace.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Workspace #{workspace.id}
                </p>

                <button
                  type="button"
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
