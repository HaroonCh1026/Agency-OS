"use client";

import { useRouter } from "next/navigation";
import { removeToken } from "../../utils/storage";

export default function Navbar() {
  const router = useRouter();

  function handleLogout() {
    removeToken();
    router.push("/login");
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 sm:px-6">
      {/* Brand */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Agency OS</h1>

        <p className="hidden text-xs text-gray-500 sm:block">
          Manage your agency
        </p>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden items-center gap-3 sm:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-medium text-white">
            HR
          </div>

          <div className="leading-tight">
            <p className="text-sm font-medium text-gray-900">User</p>

            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg border px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
