import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (form.email === "admin@acadm.edu" && form.password === "admin123") {
        navigate("/admin/dashboard");
      } else {
        setError("Invalid credentials. Use admin@acadm.edu / admin123");
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-base)",
        backgroundImage:
          "radial-gradient(ellipse at 20% 30%, rgba(99,102,241,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(6,182,212,0.08) 0%, transparent 60%)",
        padding: "1rem",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />

      <div
        className="fade-in"
        style={{ width: "100%", maxWidth: "420px", zIndex: 1 }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "18px",
              background:
                "linear-gradient(135deg, var(--primary), var(--accent))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              boxShadow: "0 8px 30px var(--primary-glow)",
            }}
          >
            <GraduationCap size={30} color="white" />
          </div>
          <h1
            style={{
              fontSize: "1.9rem",
              fontWeight: 800,
              fontFamily: "Outfit, sans-serif",
              marginBottom: "0.35rem",
            }}
            className="gradient-text"
          >
            AcadAlert
          </h1>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Academic Status Notification System
          </p>
        </div>

        {/* Card */}
        <div
          className="glass"
          style={{ borderRadius: "20px", padding: "2rem" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "1.5rem",
            }}
          >
            <Shield size={18} style={{ color: "var(--primary-light)" }} />
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              Admin Login
            </h2>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "1rem" }}>
              <label className="form-label">Email Address</label>
              <div style={{ position: "relative" }}>
                <Mail
                  size={15}
                  style={{
                    position: "absolute",
                    left: "0.9rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                  }}
                />
                <input
                  className="input-field"
                  type="email"
                  placeholder="admin@acadm.edu"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{ paddingLeft: "2.4rem" }}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label className="form-label">Password</label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={15}
                  style={{
                    position: "absolute",
                    left: "0.9rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                  }}
                />
                <input
                  className="input-field"
                  type={showPass ? "text" : "password"}
                  placeholder="Enter password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  style={{ paddingLeft: "2.4rem", paddingRight: "2.5rem" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute",
                    right: "0.9rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                    display: "flex",
                  }}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  borderRadius: "8px",
                  padding: "0.6rem 0.9rem",
                  marginBottom: "1rem",
                  fontSize: "0.8rem",
                  color: "var(--danger-light)",
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{
                width: "100%",
                justifyContent: "center",
                height: "44px",
              }}
            >
              {loading ? (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      width: "14px",
                      height: "14px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTop: "2px solid white",
                      borderRadius: "50%",
                      display: "inline-block",
                      animation: "spin 0.7s linear infinite",
                    }}
                  />
                  Authenticating...
                </span>
              ) : (
                "Sign In to Dashboard"
              )}
            </button>
          </form>

          <div
            style={{
              marginTop: "1.25rem",
              padding: "0.75rem",
              background: "rgba(99,102,241,0.08)",
              borderRadius: "8px",
              border: "1px solid rgba(99,102,241,0.15)",
            }}
          >
            <p
              style={{
                fontSize: "0.73rem",
                color: "var(--text-muted)",
                marginBottom: "0.2rem",
              }}
            >
              Demo Credentials
            </p>
            <p
              style={{
                fontSize: "0.78rem",
                color: "var(--primary-light)",
                fontFamily: "monospace",
              }}
            >
              admin@acadm.edu / admin123
            </p>
          </div>
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            marginTop: "1.5rem",
          }}
        >
          Academic Status Transparency Notification System — G14
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
