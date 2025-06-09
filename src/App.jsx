
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import More from "./pages/More";
import Store from "./pages/Store";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/landing" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected routes with role-based access */}
              <Route path="/" element={
                <ProtectedRoute>
                  <RoleBasedRoute />
                </ProtectedRoute>
              } />
              
              {/* Admin-only routes */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <RoleBasedRoute requiredRole="admin">
                    <Index />
                  </RoleBasedRoute>
                </ProtectedRoute>
              } />
              <Route path="/products" element={
                <ProtectedRoute>
                  <RoleBasedRoute requiredRole="admin">
                    <Products />
                  </RoleBasedRoute>
                </ProtectedRoute>
              } />
              <Route path="/orders" element={
                <ProtectedRoute>
                  <RoleBasedRoute requiredRole="admin">
                    <Orders />
                  </RoleBasedRoute>
                </ProtectedRoute>
              } />
              <Route path="/customers" element={
                <ProtectedRoute>
                  <RoleBasedRoute requiredRole="admin">
                    <Customers />
                  </RoleBasedRoute>
                </ProtectedRoute>
              } />
              <Route path="/more" element={
                <ProtectedRoute>
                  <RoleBasedRoute requiredRole="admin">
                    <More />
                  </RoleBasedRoute>
                </ProtectedRoute>
              } />
              
              {/* Customer routes */}
              <Route path="/store" element={
                <ProtectedRoute>
                  <Store />
                </ProtectedRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
