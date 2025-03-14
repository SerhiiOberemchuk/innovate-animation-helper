
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import ProjectsPage from "./pages/ProjectsPage";
import SkillsPage from "./pages/SkillsPage";
import ExperiencePage from "./pages/ExperiencePage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminProjectsPage from "./pages/admin/ProjectsPage";
import AdminExperiencePage from "./pages/admin/ExperiencePage";
import AddProjectPage from "./pages/admin/AddProjectPage";
import EditProjectPage from "./pages/admin/EditProjectPage";
import AddExperiencePage from "./pages/admin/AddExperiencePage";
import EditExperiencePage from "./pages/admin/EditExperiencePage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

// Create a QueryClient for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected admin routes */}
            <Route element={<ProtectedRoute adminOnly />}>
              <Route path="/admin/projects" element={<AdminProjectsPage />} />
              <Route path="/admin/add-project" element={<AddProjectPage />} />
              <Route path="/admin/edit-project/:id" element={<EditProjectPage />} />
              <Route path="/admin/experiences" element={<AdminExperiencePage />} />
              <Route path="/admin/add-experience" element={<AddExperiencePage />} />
              <Route path="/admin/edit-experience/:id" element={<EditExperiencePage />} />
            </Route>
            
            {/* Redirect old paths to new admin routes */}
            <Route path="/add-project" element={<Navigate to="/admin/add-project" replace />} />
            <Route path="/edit-project/:id" element={<Navigate to="/admin/edit-project/:id" replace />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
