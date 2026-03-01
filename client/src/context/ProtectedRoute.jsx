import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0b14]">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-[120px] bg-indigo-500/10" />
      </div>

      <div className="relative flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-indigo-500/30 border-t-indigo-400 rounded-full animate-spin" />
        <p className="text-sm text-slate-400 font-medium tracking-wide">
          Verifying session…
        </p>
      </div>
    </div>
  );
}

export default function ProtectedRoute({ children }) {
  const { loading, isAuthenticated, authChecked, checkAuth } = useAuth();
  const location = useLocation();

  // Lazy auth check — only runs when navigating to a protected route
  useEffect(() => {
    if (!authChecked) {
      checkAuth();
    }
  }, [authChecked, checkAuth]);

  // Still checking session
  if (loading || !authChecked) {
    return <LoadingScreen />;
  }

  // Not authenticated → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authenticated → render children
  return children;
}
