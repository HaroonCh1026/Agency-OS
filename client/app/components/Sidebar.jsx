"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-white md:flex md:min-h-[calc(100vh-64px)] md:flex-col">
      <nav className="flex-1 px-3 py-5">
        {/* Main Navigation */}
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Menu
        </p>

        <div className="space-y-1">
          <Link
            href="/dashboard"
            className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isActive("/dashboard")
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            Dashboard
          </Link>

          <Link
            href="/workspaces"
            className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isActive("/workspaces")
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            Workspaces
          </Link>
        </div>

        {/* Workspace Information */}
        <div className="mt-8">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Agency
          </p>

          <div className="rounded-lg bg-gray-50 px-3 py-3">
            <p className="text-sm font-medium text-gray-900">Workspaces</p>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Select a workspace to manage its clients.
            </p>
          </div>
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="border-t px-3 py-4">
        <p className="px-3 text-xs text-gray-400">Agency OS</p>
      </div>
    </aside>
  );
}
