import { lazy, Suspense } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import { RefreshCw } from "lucide-react";

// ── Lazy-loaded admin bundle (recharts + heavy deps split into separate chunk) ─
const Admin = lazy(() => import("./pages/Admin"));

const AdminFallback = () => (
  <div className="flex h-screen items-center justify-center bg-background gap-3">
    <RefreshCw size={18} className="animate-spin text-primary" />
    <span className="text-sm text-muted-foreground font-mono">Loading admin…</span>
  </div>
);

const App = () => (
  <AuthProvider>
    <TooltipProvider>
      <BrowserRouter>
        {/* Toaster inside BrowserRouter so it can use router context if needed */}
        <Toaster richColors position="top-right" closeButton />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin-only route — lazy loaded, split into separate JS chunk */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Suspense fallback={<AdminFallback />}>
                  <Admin />
                </Suspense>
              </AdminRoute>
            }
          />

          {/* 404 catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </AuthProvider>
);

export default App;

