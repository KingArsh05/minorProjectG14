import React from "react";
import {
  Bell,
  LineChart,
  ShieldCheck,
  Lock,
  Users,
  Zap,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const FeatureCard = ({ icon, title, description, index }) => {
  const Icon = icon;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[rgba(99,102,241,0.14)] bg-[linear-gradient(180deg,rgba(17,19,36,0.92)_0%,rgba(10,11,24,0.96)_100%)] p-2 group transition-all duration-500 hover:-translate-y-2 hover:border-[#6366f1]/60 hover:shadow-[0_0_40px_rgba(99,102,241,0.18)]">
      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_60%)]"></div>

      {/* Card Content */}
      <div className="relative h-full rounded-3xl bg-[rgba(7,9,20,0.96)] p-8 backdrop-blur-xl">
        {/* Top */}
        <div className="flex items-start justify-between mb-10">
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-[#6366f1]/30 blur-xl opacity-60 group-hover:opacity-100 transition-opacity"></div>

            <div className="relative w-16 h-16 rounded-2xl border border-[#6366f1]/20 bg-[linear-gradient(135deg,rgba(99,102,241,0.2),rgba(99,102,241,0.06))] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <Icon size={30} className="text-[#8b91ff]" strokeWidth={2.2} />
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#5f6485] group-hover:text-[#a5b4fc] transition-colors">
            <span className="text-sm font-medium">0{index + 1}</span>

            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-2xl font-bold text-white mb-4 tracking-tight leading-tight"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-[15.5px] leading-8 text-[#9098b7] group-hover:text-[#b3bdd9] transition-colors duration-300">
          {description}
        </p>

        {/* Bottom Accent */}
        <div className="mt-8 flex items-center gap-2">
          <div className="h-[4px] w-10 rounded-full bg-[#6366f1]"></div>
          <div className="h-[4px] w-4 rounded-full bg-[#6366f1]/50"></div>
        </div>
      </div>
    </div>
  );
};

export default function Features() {
  const features = [
    {
      icon: LineChart,
      title: "Performance Tracking",
      description:
        "Visualize student progress with advanced dashboards, detailed analytics, and real-time academic insights.",
    },
    {
      icon: Bell,
      title: "Automated Notifications",
      description:
        "Instantly notify guardians through WhatsApp or SMS regarding attendance, marks, and important updates.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Access",
      description:
        "Enterprise-grade authentication and role-based permissions ensure complete academic data protection.",
    },
    {
      icon: Zap,
      title: "Seamless Uploads",
      description:
        "Upload CSV or Excel files effortlessly and update thousands of student records in seconds.",
    },
    {
      icon: Users,
      title: "Guardian Portal",
      description:
        "Provide parents with a modern portal to monitor attendance, marks, and academic performance.",
    },
    {
      icon: Lock,
      title: "Token Management",
      description:
        "Generate secure and time-limited verification tokens for safe external access and validation.",
    },
  ];

  return (
    <section
      id="features"
      className="relative py-32 overflow-hidden border-t border-[rgba(37,40,64,0.55)]"
    >
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#4f46e5]/10 blur-[140px] pointer-events-none"></div>

      <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[70px_70px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#6366f1]/20 bg-[#6366f1]/10 text-[#a5b4fc] text-sm font-medium mb-8 backdrop-blur-xl">
            <Sparkles size={16} />
            Powerful Features
          </div>

          <h2
            className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white mb-8"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Everything you need for{" "}
            <span className="bg-linear-to-r from-[#818cf8] via-[#60a5fa] to-[#38bdf8] bg-clip-text text-transparent">
              academic oversight.
            </span>
          </h2>

          <p className="text-lg md:text-xl text-[#8f9bb3] leading-9 max-w-3xl mx-auto">
            A complete academic management ecosystem designed for
            administrators, institutions, and guardians with speed, security,
            and elegance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
