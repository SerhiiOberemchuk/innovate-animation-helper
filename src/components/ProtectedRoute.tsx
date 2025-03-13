
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

type ProtectedRouteProps = {
  adminOnly?: boolean;
};

const ProtectedRoute = ({ adminOnly = false }: ProtectedRouteProps) => {
  const { user, loading, isAdmin } = useAuth();

  console.log('Protected Route:', { user: !!user, loading, isAdmin, adminOnly });

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // If admin only and user is not admin, redirect to home
  if (adminOnly && !isAdmin) {
    console.log('Not an admin, redirecting to home');
    return <Navigate to="/" replace />;
  }

  // Render child routes
  console.log('Authentication successful, rendering child routes');
  return <Outlet />;
};

export default ProtectedRoute;
