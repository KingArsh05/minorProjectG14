import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UploadData from "./pages/admin/UploadData";
import StudentList from "./pages/admin/StudentList";
import StudentDetail from "./pages/admin/StudentDetail";
import SendNotification from "./pages/admin/SendNotification";
import TokenManagement from "./pages/admin/TokenManagement";
import GuardianDashboard from "./pages/guardian/GuardianDashboard";
import AccessDenied from "./pages/guardian/AccessDenied";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Admin Panel */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="upload" element={<UploadData />} />
          <Route path="students" element={<StudentList />} />
          <Route path="students/:id" element={<StudentDetail />} />
          <Route path="notifications" element={<SendNotification />} />
          <Route path="tokens" element={<TokenManagement />} />
        </Route>

        {/* Guardian Portal */}
        <Route path="/dashboard" element={<GuardianDashboard />} />
        <Route path="/access-denied" element={<AccessDenied />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
