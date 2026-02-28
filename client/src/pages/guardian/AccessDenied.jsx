import { ShieldX, ArrowLeft } from "lucide-react";

export default function AccessDenied() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-base)",
        backgroundImage:
          "radial-gradient(ellipse at 50% 40%, rgba(239,68,68,0.08) 0%, transparent 60%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "420px" }}>
        <div
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "rgba(239,68,68,0.1)",
            border: "2px solid var(--danger)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            boxShadow: "0 0 30px rgba(239,68,68,0.15)",
          }}
        >
          <ShieldX size={40} color="var(--danger)" />
        </div>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            fontFamily: "Outfit, sans-serif",
            color: "var(--text-primary)",
            marginBottom: "0.75rem",
          }}
        >
          Access Denied
        </h1>
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "0.75rem",
          }}
        >
          The link you used is either{" "}
          <strong style={{ color: "var(--danger-light)" }}>invalid</strong>,{" "}
          <strong style={{ color: "var(--warning)" }}>expired</strong>, or has
          already been accessed.
        </p>
        <p
          style={{
            fontSize: "0.82rem",
            color: "var(--text-muted)",
            lineHeight: 1.6,
            marginBottom: "2rem",
          }}
        >
          For a new access link, please contact the institution admin. Links are
          valid for 24 hours from the time of dispatch.
        </p>

        <div
          className="card"
          style={{
            padding: "1rem 1.25rem",
            marginBottom: "1.25rem",
            textAlign: "left",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--text-muted)",
              marginBottom: "0.6rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Possible Reasons
          </p>
          {[
            "Link has expired (valid for 24 hrs only)",
            "Link was already accessed once",
            "Link was manually revoked by admin",
            "Token is malformed or tampered",
          ].map((r, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "0.5rem",
                marginBottom: "0.4rem",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  color: "var(--danger)",
                  fontSize: "0.8rem",
                  marginTop: "1px",
                }}
              >
                ✕
              </span>
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                {r}
              </p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
          🔒 Academic Status Transparency Notification System — Group 14
        </p>
      </div>
    </div>
  );
}
