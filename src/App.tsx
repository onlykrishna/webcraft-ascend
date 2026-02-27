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
import ProjectDetailView from "./pages/ProjectDetailView";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import { CookieBanner } from "./components/CookieBanner";
import { RefreshCw } from "lucide-react";

// ── Lazy-loaded admin bundle (recharts + heavy deps split into separate chunk) ─
const Admin = lazy(() => import("./pages/Admin"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail").then(module => ({ default: module.ServiceDetailPage })));
const ProblemDetail = lazy(() => import("./pages/ProblemDetail").then(module => ({ default: module.ProblemDetailPage })));
const ProcessDetail = lazy(() => import("./pages/ProcessDetail").then(module => ({ default: module.ProcessDetailPage })));
const PortfolioDetail = lazy(() => import("./pages/PortfolioDetail").then(module => ({ default: module.PortfolioDetailPage })));

const Careers = lazy(() => import("./pages/company/Careers"));
const Terms = lazy(() => import("./pages/company/Terms"));
const Privacy = lazy(() => import("./pages/company/Privacy"));

import { BottomCTAPopup } from "./components/BottomCTAPopup";

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
          <Route
            path="/portal/project/:id"
            element={
              <ProtectedRoute>
                <ProjectDetailView />
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

          <Route path="/services/:slug" element={<Suspense fallback={<AdminFallback />}><ServiceDetail /></Suspense>} />
          <Route path="/problems/:slug" element={<Suspense fallback={<AdminFallback />}><ProblemDetail /></Suspense>} />
          <Route path="/process/:slug" element={<Suspense fallback={<AdminFallback />}><ProcessDetail /></Suspense>} />
          <Route path="/portfolio/:slug" element={<Suspense fallback={<AdminFallback />}><PortfolioDetail /></Suspense>} />

          {/* Blog — public, lazy loaded */}
          <Route
            path="/blog"
            element={
              <Suspense fallback={<AdminFallback />}>
                <Blog />
              </Suspense>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <Suspense fallback={<AdminFallback />}>
                <BlogPost />
              </Suspense>
            }
          />

          {/* Company pages */}
          <Route path="/careers" element={<Suspense fallback={<AdminFallback />}><Careers /></Suspense>} />
          <Route path="/terms" element={<Suspense fallback={<AdminFallback />}><Terms /></Suspense>} />
          <Route path="/privacy" element={<Suspense fallback={<AdminFallback />}><Privacy /></Suspense>} />

          {/* 404 catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieBanner />
        <BottomCTAPopup />
      </BrowserRouter>
    </TooltipProvider>
  </AuthProvider>
);

export default App;

