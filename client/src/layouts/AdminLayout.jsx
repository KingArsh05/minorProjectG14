import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet, useLocation } from "react-router-dom";

const pageMeta = {
  "/admin/dashboard": {
    title: "Dashboard",
    subtitle: "Academic overview & real-time stats",
  },
  "/admin/upload": {
    title: "Upload Data",
    subtitle: "Import CSV or Excel student records",
  },
  "/admin/students": {
    title: "Students",
    subtitle: "Search and manage student profiles",
  },
  "/admin/notifications": {
    title: "Send Notifications",
    subtitle: "Generate and dispatch secure parent links",
  },
  "/admin/tokens": {
    title: "Token Management",
    subtitle: "Monitor access tokens & link activity",
  },
};

export default function AdminLayout() {
  const location = useLocation();
  const meta = Object.entries(pageMeta).find(([path]) =>
    location.pathname.startsWith(path),
  );
  const { title, subtitle } = meta ? meta[1] : { title: "Admin", subtitle: "" };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Topbar title={title} subtitle={subtitle} />
      <main className="flex-1 ml-[260px] pt-[68px] min-h-screen bg-[#0a0b14]">
        <div className="p-8 max-w-[1400px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
