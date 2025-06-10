// src/routes/__root.tsx
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="min-h-screen">
      {/* Navigation Header */}
      <nav className="p-4 bg-gray-100 border-b">
        <div className="flex gap-4">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 [&.active]:font-bold [&.active]:text-blue-900"
          >
            Home
          </Link>
          <Link
            to="/users"
            className="text-blue-600 hover:text-blue-800 [&.active]:font-bold [&.active]:text-blue-900"
          >
            Users
          </Link>
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 [&.active]:font-bold [&.active]:text-blue-900"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="p-4">
        <Outlet />
      </main>

      {/* Dev Tools */}
      <TanStackRouterDevtools initialIsOpen={false} />
    </div>
  );
}
