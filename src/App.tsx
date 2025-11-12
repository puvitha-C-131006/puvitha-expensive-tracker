import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Expenses from "./pages/Expenses.tsx";
import IncomePage from "./pages/Income.tsx"; // Import the new Income page
import Settings from "./pages/Settings.tsx";
import Login from "./pages/Login.tsx";
import { AuthProvider, useAuth } from "./context/AuthContext.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import React from "react";

const queryClient = new QueryClient();

// Component to handle the root path logic
const RootRedirect = () => {
  const { isAuthenticated } = useAuth();
  
  // If authenticated, go to dashboard, otherwise go to login
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};


const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<RootRedirect />} />
    <Route path="/login" element={<Login />} />
    <Route path="/index" element={<Index />} /> {/* Keeping index for reference, but main entry is / */}

    {/* Protected Routes */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/expenses"
      element={
        <ProtectedRoute>
          <Expenses />
        </ProtectedRoute>
      }
    />
    <Route
      path="/income"
      element={
        <ProtectedRoute>
          <IncomePage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/settings"
      element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      }
    />
    
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);


const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" attribute="class">
      <TooltipProvider>
        <Toaster />
        <Sonner duration={10000} />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;