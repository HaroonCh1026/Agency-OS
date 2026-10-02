"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

// Shared navigation items — single source of truth for both desktop and mobile
const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Workspaces", href: "/workspaces" },
];

function NavLinks({ isActive, onLinkClick }) {
  return (
    <div className="space-y-1">
      {navItems.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          onClick={onLinkClick}
          className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
            isActive(href)
              ? "bg-gray-900 text-white"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

function AgencyInfoBox() {
  return (
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
  );
}

export default function Sidebar({ mobileMenuOpen, onClose }) {
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  // Close drawer on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen, onClose]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r bg-white md:flex md:min-h-[calc(100vh-64px)] md:flex-col">
        <nav className="flex-1 px-3 py-5" aria-label="Main navigation">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Menu
          </p>

          <NavLinks isActive={isActive} />

          <AgencyInfoBox />
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t px-3 py-4">
          <p className="px-3 text-xs text-gray-400">Agency OS</p>
        </div>
      </aside>

      {/* Mobile Drawer */}

      {/* Backdrop */}
      {mobileMenuOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer Panel */}
      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed left-0 top-16 z-40 flex h-[calc(100vh-64px)] w-70 max-w-[calc(100vw-40px)] flex-col border-r bg-white shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b px-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
            Menu
          </p>

          <button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Drawer Navigation */}
        <nav
          className="flex-1 overflow-y-auto px-3 py-4"
          aria-label="Mobile navigation"
        >
          <NavLinks isActive={isActive} onLinkClick={onClose} />

          <AgencyInfoBox />
        </nav>

        {/* Drawer Footer */}
        <div className="shrink-0 border-t px-4 py-4">
          <p className="text-xs text-gray-400">Agency OS</p>
        </div>
      </div>
    </>
  );
}
