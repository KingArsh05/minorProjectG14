import { ShieldX } from "lucide-react";

export default function AccessDenied() {
  return (
    <div
      className="min-h-screen bg-[#0a0b14] flex items-center justify-center p-6"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 50% 40%, rgba(239,68,68,0.08) 0%, transparent 60%)",
      }}
    >
      <div className="text-center max-w-[420px]">
        <div className="w-[90px] h-[90px] rounded-full bg-[rgba(239,68,68,0.1)] border-2 border-[#ef4444] flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(239,68,68,0.15)]">
          <ShieldX size={40} color="#ef4444" />
        </div>
        <h1
          className="text-[2rem] font-extrabold text-[#f0f1fa] mb-3"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Access Denied
        </h1>
        <p className="text-[0.9rem] text-[#9ba2c0] leading-relaxed mb-2">
          The link you used is either{" "}
          <strong className="text-[#f87171]">invalid</strong>,{" "}
          <strong className="text-[#fbbf24]">expired</strong>, or has already
          been accessed.
        </p>
        <p className="text-[0.82rem] text-[#5c6385] leading-relaxed mb-8">
          For a new access link, please contact the institution admin. Links are
          valid for 24 hours from the time of dispatch.
        </p>

        <div className="bg-[#13162b] border border-[#252840] rounded-2xl p-5 mb-5 text-left">
          <p className="text-[0.75rem] font-semibold text-[#5c6385] mb-3 uppercase tracking-widest">
            Possible Reasons
          </p>
          {[
            "Link has expired (valid for 24 hrs only)",
            "Link was already accessed once",
            "Link was manually revoked by admin",
            "Token is malformed or tampered",
          ].map((r, i) => (
            <div key={i} className="flex gap-2 mb-2 items-start">
              <span className="text-[#ef4444] text-[0.8rem] mt-px">✕</span>
              <p className="text-[0.8rem] text-[#9ba2c0]">{r}</p>
            </div>
          ))}
        </div>

        <p className="text-[0.72rem] text-[#5c6385]">
          🔒 Academic Status Transparency Notification System — Group 14
        </p>
      </div>
    </div>
  );
}
