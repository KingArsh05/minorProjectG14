import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  Users,
  Send,
  KeyRound,
  BookOpen,
  ChevronRight,
  GraduationCap,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/admin/dashboard" },
  { label: "Upload Data", icon: Upload, to: "/admin/upload" },
  { label: "Students", icon: Users, to: "/admin/students" },
  { label: "Send Notifications", icon: Send, to: "/admin/notifications" },
  { label: "Token Management", icon: KeyRound, to: "/admin/tokens" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div
        style={{
          padding: "1.5rem 1.2rem 1rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background:
                "linear-gradient(135deg, var(--primary), var(--accent))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 4px 15px var(--primary-glow)",
            }}
          >
            <GraduationCap size={20} color="white" />
          </div>
          <div>
            <p
              style={{
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                lineHeight: 1.2,
                fontFamily: "Outfit, sans-serif",
              }}
            >
              AcadAlert
            </p>
            <p
              style={{
                fontSize: "0.65rem",
                color: "var(--text-muted)",
                letterSpacing: "0.05em",
              }}
            >
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, paddingTop: "0.75rem" }}>
        <p
          style={{
            fontSize: "0.65rem",
            fontWeight: 600,
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "0.5rem 1.5rem",
            marginBottom: "0.25rem",
          }}
        >
          Main Menu
        </p>
        {navItems.map((item) => {
          const active = location.pathname.startsWith(item.to);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`nav-item ${active ? "active" : ""}`}
            >
              <item.icon size={18} strokeWidth={1.8} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {active && <ChevronRight size={14} style={{ opacity: 0.6 }} />}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: "1rem", borderTop: "1px solid var(--border)" }}>
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(6,182,212,0.05))",
            border: "1px solid rgba(99,102,241,0.2)",
            borderRadius: "12px",
            padding: "0.85rem 1rem",
            marginBottom: "0.75rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                background:
                  "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "white",
                flexShrink: 0,
              }}
            >
              A
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  lineHeight: 1.2,
                }}
              >
                Admin
              </p>
              <p
                style={{
                  fontSize: "0.68rem",
                  color: "var(--text-muted)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                admin@acadm.edu
              </p>
            </div>
          </div>
        </div>

        <button
          className="btn-ghost"
          style={{ width: "100%", justifyContent: "center" }}
          onClick={() => (window.location.href = "/")}
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
