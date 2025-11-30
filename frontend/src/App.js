import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from './components/ui/sonner';

// Public Pages
import HomePage from './pages/public/HomePage';
import FeaturesPage from './pages/public/FeaturesPage';
import UseCasesPage from './pages/public/UseCasesPage';
import PricingPage from './pages/public/PricingPage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Dashboard Pages
import DashboardOverview from './pages/dashboard/DashboardOverview';
import DevicesPage from './pages/dashboard/DevicesPage';
import TicketsPage from './pages/dashboard/TicketsPage';
import CustomersPage from './pages/dashboard/CustomersPage';
import ReportsPage from './pages/dashboard/ReportsPage';
import SettingsPage from './pages/dashboard/SettingsPage';

// Admin Pages
import AdminOverview from './pages/admin/AdminOverview';
import UsersManagementPage from './pages/admin/UsersManagementPage';
import WorkspacesPage from './pages/admin/WorkspacesPage';
import RolesPage from './pages/admin/RolesPage';
import LogsPage from './pages/admin/LogsPage';
import BillingPage from './pages/admin/BillingPage';
import AdminToolsDemoPage from './pages/admin/AdminToolsDemoPage';

// Error Pages
import NotFoundPage from './pages/NotFoundPage';

// Legal Pages
import AboutPage from './pages/legal/AboutPage';
import PrivacyPage from './pages/legal/PrivacyPage';
import TermsPage from './pages/legal/TermsPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// App Routes Component
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/use-cases" element={<UseCasesPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      
      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Legal Routes */}
      <Route path="/about" element={<AboutPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      
      {/* Dashboard Routes (Protected) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardOverview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/devices"
        element={
          <ProtectedRoute>
            <DevicesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/devices/*"
        element={
          <ProtectedRoute>
            <DevicesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/tickets"
        element={
          <ProtectedRoute>
            <TicketsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/tickets/*"
        element={
          <ProtectedRoute>
            <TicketsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/customers"
        element={
          <ProtectedRoute>
            <CustomersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/customers/*"
        element={
          <ProtectedRoute>
            <CustomersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/reports"
        element={
          <ProtectedRoute>
            <ReportsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <DashboardOverview />
          </ProtectedRoute>
        }
      />
      
      {/* Admin Routes (Protected + Admin Only) */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminOverview />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <UsersManagementPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/workspaces"
        element={
          <AdminRoute>
            <WorkspacesPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/roles"
        element={
          <AdminRoute>
            <RolesPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/logs"
        element={
          <AdminRoute>
            <LogsPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/billing"
        element={
          <AdminRoute>
            <BillingPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/tools"
        element={
          <AdminRoute>
            <AdminToolsDemoPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <AdminOverview />
          </AdminRoute>
        }
      />
      
      {/* 404 Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster position="top-right" richColors />
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
