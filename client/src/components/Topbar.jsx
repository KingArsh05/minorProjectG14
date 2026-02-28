import { useState } from "react";
import { Search, Bell, ChevronDown } from "lucide-react";

export default function Topbar({ title, subtitle }) {
  const [showNotif, setShowNotif] = useState(false);

  return (
    <header className="topbar">
      <div>
        <h1
          style={{
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            fontFamily: "Outfit, sans-serif",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              marginTop: "1px",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {/* Search */}
        <div style={{ position: "relative" }}>
          <Search
            size={15}
            style={{
              position: "absolute",
              left: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
            }}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Search..."
            style={{
              paddingLeft: "2.2rem",
              width: "220px",
              height: "36px",
              fontSize: "0.8rem",
            }}
          />
        </div>

        {/* Notifications */}
        <div style={{ position: "relative" }}>
          <button
            className="btn-icon"
            onClick={() => setShowNotif(!showNotif)}
            style={{ position: "relative" }}
          >
            <Bell size={16} />
            <span
              style={{
                position: "absolute",
                top: "6px",
                right: "6px",
                width: "7px",
                height: "7px",
                background: "var(--danger)",
                borderRadius: "50%",
                border: "1.5px solid var(--bg-surface)",
              }}
            />
          </button>
          {showNotif && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "calc(100% + 8px)",
                width: "280px",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-light)",
                borderRadius: "12px",
                padding: "0.75rem",
                zIndex: 200,
                boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  marginBottom: "0.5rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Notifications
              </p>
              {[
                {
                  msg: "14 notifications sent today",
                  time: "2 min ago",
                  type: "info",
                },
                {
                  msg: "CSV upload completed – CSE Sem 4",
                  time: "1 hour ago",
                  type: "success",
                },
                {
                  msg: "3 tokens expired – action needed",
                  time: "3 hours ago",
                  type: "warning",
                },
              ].map((n, i) => (
                <div
                  key={i}
                  style={{
                    padding: "0.6rem 0.75rem",
                    borderRadius: "8px",
                    background: "var(--bg-hover)",
                    marginBottom: "0.35rem",
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-primary)",
                      lineHeight: 1.4,
                    }}
                  >
                    {n.msg}
                  </p>
                  <p
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--text-muted)",
                      marginTop: "2px",
                    }}
                  >
                    {n.time}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "var(--bg-hover)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "0.35rem 0.75rem 0.35rem 0.4rem",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "7px",
              background:
                "linear-gradient(135deg, var(--primary), var(--accent))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "white",
            }}
          >
            A
          </div>
          <span
            style={{
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            Admin
          </span>
          <ChevronDown size={13} style={{ color: "var(--text-muted)" }} />
        </div>
      </div>
    </header>
  );
}
