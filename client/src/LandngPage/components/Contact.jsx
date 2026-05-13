import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await emailjs.send(
        "service_4tvqwrq",
        "template_c5o3rpg",
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          time: new Date().toLocaleString(),
        },
        "jRMbQjRPMDA4PVvUv"
      );

      toast.success("Message sent successfully! ✅");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again ❌");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <section
        id="contact"
        className="relative py-32 overflow-hidden border-t border-[#1d2138]"
      >
        {/* Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#4f46e5]/10 blur-[140px] pointer-events-none"></div>

        <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[70px_70px]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#6366f1]/20 bg-[#6366f1]/10 text-[#a5b4fc] text-sm font-medium mb-8 backdrop-blur-xl">
              <Sparkles size={16} />
              Contact ASTNS
            </div>

            <h2
              className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white mb-8"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Let's build better
              <br />
              <span className="bg-linear-to-r from-[#818cf8] via-[#60a5fa] to-[#22d3ee] bg-clip-text text-transparent">
                academic transparency.
              </span>
            </h2>

            <p className="text-lg md:text-xl text-[#98a2c3] leading-9">
              Have questions, suggestions, or institutional inquiries? Reach out
              to us and we'll help you get started with ASTNS.
            </p>
          </div>

          {/* Main Layout */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            {/* Left Info */}
            <div className="space-y-6 md:w-[40%]">
              {/* Contact Card */}
              <div className="rounded-[32px] border border-[#232844] bg-[linear-gradient(180deg,rgba(18,20,38,0.96),rgba(10,12,24,0.96))] p-8 shadow-[0_0_40px_rgba(0,0,0,0.35)]">
                <h3 className="text-2xl font-bold text-white mb-8">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#6366f1]/10 flex items-center justify-center border border-[#2d3252]">
                      <Mail size={22} className="text-[#818cf8]" />
                    </div>

                    <div>
                      <p className="text-[#7f88a8] text-sm mb-1">Email</p>

                      <h4 className="text-white font-medium">
                        support@astns.edu
                      </h4>
                    </div>
                  </div>

                  {/* <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-[#2d3252]">
                    <Phone size={22} className="text-cyan-400" />
                  </div>

                  <div>
                    <p className="text-[#7f88a8] text-sm mb-1">Phone</p>

                    <h4 className="text-white font-medium">+91 XXXXX-XXXXX</h4>
                  </div>
                </div> */}

                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-[#2d3252]">
                      <MapPin size={22} className="text-emerald-400" />
                    </div>

                    <div>
                      <p className="text-[#7f88a8] text-sm mb-1">Institution</p>

                      <h4 className="text-white font-medium">
                        ASTNS Academic Platform
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Bottom Notice */}
                <div className="mt-10 p-5 rounded-2xl border border-[#222742] bg-[rgba(255,255,255,0.02)]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 flex items-center justify-center shrink-0">
                      <ShieldCheck size={18} className="text-[#818cf8]" />
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">
                        Secure Communication
                      </h4>

                      <p className="text-[#8f9bb3] text-sm leading-7">
                        All guardian and student-related information shared
                        through ASTNS is securely protected and tokenized.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Time */}
              <div className="rounded-[28px] border border-[#232844] bg-[rgba(255,255,255,0.02)] p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#6366f1]/10 flex items-center justify-center">
                    <Clock size={20} className="text-[#818cf8]" />
                  </div>

                  <div>
                    <h4 className="text-white font-semibold">
                      Support Availability
                    </h4>

                    <p className="text-[#8f9bb3] text-sm mt-1">
                      Monday — Saturday • 9:00 AM to 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="relative overflow-hidden rounded-[34px] border border-[#232844] bg-[linear-gradient(180deg,rgba(18,20,38,0.98),rgba(9,10,22,0.98))] shadow-[0_0_60px_rgba(0,0,0,0.45)] md:w-[50%]">
              {/* Glow */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#6366f1]/10 blur-[120px] rounded-full"></div>

              <div className="relative p-8 md:p-10">
                <div className="mb-10">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Send us a message
                  </h3>

                  <p className="text-[#8f9bb3] leading-8">
                    Fill out the form below and our team will get back to you
                    shortly.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm text-[#c7d0ea] mb-3">
                      Full Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter your full name"
                      {...register("name", { required: true })}
                      className="w-full rounded-2xl border border-[#2a2f4f] bg-[rgba(255,255,255,0.03)] px-5 py-4 text-white placeholder:text-[#6f7898] outline-none focus:border-[#6366f1] transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm text-[#c7d0ea] mb-3">
                      Email Address
                    </label>

                    <input
                      type="email"
                      placeholder="Enter your email address"
                      {...register("email", { required: true })}
                      className="w-full rounded-2xl border border-[#2a2f4f] bg-[rgba(255,255,255,0.03)] px-5 py-4 text-white placeholder:text-[#6f7898] outline-none focus:border-[#6366f1] transition-all"
                    />
                  </div>

                  {/* phone */}
                  <div>
                    <label className="block text-sm text-[#c7d0ea] mb-3">
                      Phone Number
                    </label>

                    <input
                      type="number"
                      placeholder="Enter your phone number"
                      {...register("phone", { required: true })}
                      className="w-full rounded-2xl border border-[#2a2f4f] bg-[rgba(255,255,255,0.03)] px-5 py-4 text-white placeholder:text-[#6f7898] outline-none focus:border-[#6366f1] transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm text-[#c7d0ea] mb-3">
                      Message
                    </label>

                    <textarea
                      rows="6"
                      placeholder="Write your message here..."
                      {...register("message", { required: true })}
                      className="w-full rounded-2xl border border-[#2a2f4f] bg-[rgba(255,255,255,0.03)] px-5 py-4 text-white placeholder:text-[#6f7898] outline-none focus:border-[#6366f1] transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#6366f1] hover:bg-[#5855eb] text-white font-semibold shadow-[0_0_30px_rgba(99,102,241,0.45)] hover:shadow-[0_0_45px_rgba(99,102,241,0.65)] transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && (
                      <Send
                        size={18}
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      />
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
