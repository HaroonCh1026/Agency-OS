import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen min-w-0 bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-gray-900">Agency OS</h1>
            <p className="text-xs text-gray-500">Manage your agency</p>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-3">
            <Link
              href="/login"
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 sm:px-4"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-gray-800 sm:px-4"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Agency Management Platform
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Manage your agency
            <span className="block text-gray-500">from one place.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
            Agency OS helps you manage workspaces, clients, and agency
            operations through one simple dashboard.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <Link
              href="/signup"
              className="w-full rounded-lg bg-gray-900 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800 sm:w-auto"
            >
              Create an Account
            </Link>

            <Link
              href="/login"
              className="w-full rounded-lg border bg-white px-6 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50 sm:w-auto"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mb-8 sm:mb-10">
            <h3 className="text-2xl font-bold text-gray-900">
              Everything in one place
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-5 text-gray-500">
              Simple tools for managing your agency operations.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            <div className="rounded-xl border bg-gray-50 p-5 sm:p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-sm font-bold text-white">
                W
              </div>

              <h4 className="mt-5 text-lg font-semibold text-gray-900">
                Workspaces
              </h4>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Create and manage separate workspaces for your agency projects.
              </p>
            </div>

            <div className="rounded-xl border bg-gray-50 p-5 sm:p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-sm font-bold text-white">
                C
              </div>

              <h4 className="mt-5 text-lg font-semibold text-gray-900">
                Client Management
              </h4>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Keep client information organized inside each workspace.
              </p>
            </div>

            <div className="rounded-xl border bg-gray-50 p-5 sm:p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-sm font-bold text-white">
                A
              </div>

              <h4 className="mt-5 text-lg font-semibold text-gray-900">
                Agency Dashboard
              </h4>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Access your agency information through a clean, centralized
                dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">
            © 2026 Agency OS. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
