import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useMe } from "../hooks/useAuth";

// Shows a loading state while verifying session
function AuthVerifier({ children }) {
  const { isLoading } = useMe();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-[var(--color-rose-500)] border-t-transparent animate-spin" />
          <p className="text-[var(--color-text-secondary)] text-sm">Loading...</p>
        </div>
      </div>
    );
  }
  return children;
}

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const location = useLocation();
  return (
    <AuthVerifier>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </AuthVerifier>
  );
}

export function AdminRoute() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const location = useLocation();
  return (
    <AuthVerifier>
      {isAuthenticated && user?.role === "admin" ? (
        <Outlet />
      ) : isAuthenticated ? (
        <Navigate to="/" replace />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </AuthVerifier>
  );
}

export function PublicOnlyRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  if (isAuthenticated) {
    return (
      <Navigate to={user?.role === "admin" ? "/admin" : "/"} replace />
    );
  }
  return <Outlet />;
}
