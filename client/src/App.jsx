import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./context/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import LoginForm from "./components/LoginPage/LoginForm";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import UploadData from "./pages/admin/uploadFile/UploadData";
import StudentDetail from "./pages/admin/students/StudentDetail";
import SendNotification from "./pages/admin/notifications/SendNotification";
import TokenManagement from "./pages/admin/tokenManagement/TokenManagement";
import GuardianDashboard from "./pages/guardian/GuardianDashboard";
import AccessDenied from "./pages/guardian/AccessDenied";
import StudentList from "./pages/admin/students/StudentList";
import Home from "./LandngPage/Home";
import "./index.css";

function LoginGate() {
  const { isAuthenticated, authChecked } = useAuth();
  if (authChecked && isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return <LoginForm />;
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
          {/* Default redirect */}
          <Route path="/" element={<Home />} />

          {/* Auth */}
          <Route path="/login" element={<LoginGate />} />

          {/* Admin Panel — protected */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="upload" element={<UploadData />} />
            <Route path="students" element={<StudentList />} />
            <Route path="students/:id" element={<StudentDetail />} />
            <Route path="notifications" element={<SendNotification />} />
            <Route path="tokens" element={<TokenManagement />} />
          </Route>

          {/* Guardian Portal */}
          <Route path="/guardian" element={<GuardianDashboard />} />
          <Route path="/access-denied" element={<AccessDenied />} />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
