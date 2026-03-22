"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ContactFormData = {
  user_email: string;
  user_name: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState } = useForm<ContactFormData>();

  const onSubmit = async (values: ContactFormData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.user_email,
          name: values.user_name,
          subject: values.subject,
          message: values.message
        })
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to send message.", {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark"
        });
        return;
      }
      reset();
      toast.success("Message sent successfully! ✅", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      });
    } catch {
      toast.error("Failed to send message. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="flex flex-col items-center justify-center py-15 px-4 md:px-[7vw] lg:px-[15vw] relative overflow-hidden">
      <ToastContainer />

      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl -z-10"></div>

      {/* Header */}
      <div className="text-center mb-16 w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">LET&apos;S CONNECT</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"></div>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Have a project in mind? Let&apos;s talk! I&apos;m always interested in hearing about new opportunities and collaborations.
        </p>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 rounded-3xl overflow-hidden border border-purple-500/30 shadow-2xl backdrop-blur-sm">
          {/* Left Info Section */}
          <div className="md:col-span-2 bg-gradient-to-br from-purple-900/40 to-purple-800/20 p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-purple-500/20">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Contact Info</h3>
              <p className="text-gray-300 text-sm md:text-base leading-7 mb-8">
                Let me know about your project, idea, or opportunity. I&apos;ll respond within 24 hours with a personalized message.
              </p>

              {/* Info Cards */}
              <div className="space-y-4">
                <div className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300">
                  <p className="text-xs uppercase text-purple-400 font-semibold tracking-wide">Response Time</p>
                  <p className="text-white mt-2">Within 24 hours</p>
                </div>
                <div className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300">
                  <p className="text-xs uppercase text-purple-400 font-semibold tracking-wide">Timezone</p>
                  <p className="text-white mt-2">IST (UTC+5:30)</p>
                </div>
                <div className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300">
                  <p className="text-xs uppercase text-purple-400 font-semibold tracking-wide">Tech Stack</p>
                  <p className="text-white mt-2">MERN, Next.js, TypeScript</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-4 justify-center">
              <a href="https://github.com/adeshbhongale" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-purple-500 hover:bg-purple-500/20 transition-all duration-300">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="https://linkedin.com/in/adeshbhongale" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-purple-500 hover:bg-purple-500/20 transition-all duration-300">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.438-.103.249-.129.597-.129.946v5.421h-3.554s.047-8.789 0-9.701h3.554v1.373c.43-.664 1.199-1.61 2.919-1.61 2.134 0 3.734 1.398 3.734 4.402v5.536zM5.337 9.341c-1.144 0-1.915-.759-1.915-1.71 0-.956.768-1.71 1.959-1.71 1.19 0 1.912.754 1.937 1.71 0 .951-.747 1.71-1.981 1.71zm1.581 11.111H3.615V9.751h3.303v10.701zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
              <a href="mailto:adeshbhongale0#gmail.com" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-purple-500 hover:bg-purple-500/20 transition-all duration-300">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12.713l-11.99-7.713v13.713h23.98v-13.713l-11.99 7.713zm0-2.427l10.99-7.086h-21.98l10.99 7.086z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Form Section */}
          <form onSubmit={handleSubmit(onSubmit)} className="md:col-span-3 p-8 md:p-12 bg-gradient-to-br from-slate-900/80 to-slate-950/80">
            <div className="space-y-5">
              {/* Name Input */}
              <div>
                <label className="text-sm font-semibold text-purple-300 uppercase tracking-wide">Your Name</label>
                <input
                  type="text"
                  placeholder="Adesh"
                  {...register("user_name", { required: true, minLength: 2 })}
                  className="w-full mt-2 rounded-lg bg-white/5 border border-white/15 p-3 text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
                />
                {formState.errors.user_name && <p className="text-xs text-rose-400 mt-1">Please enter a valid name.</p>}
              </div>

              {/* Email Input */}
              <div>
                <label className="text-sm font-semibold text-purple-300 uppercase tracking-wide">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("user_email", { required: true })}
                  className="w-full mt-2 rounded-lg bg-white/5 border border-white/15 p-3 text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
                />
                {formState.errors.user_email && <p className="text-xs text-rose-400 mt-1">Please enter a valid email.</p>}
              </div>

              {/* Subject Input */}
              <div>
                <label className="text-sm font-semibold text-purple-300 uppercase tracking-wide">Subject</label>
                <input
                  type="text"
                  placeholder="Project Inquiry"
                  {...register("subject", { required: true, minLength: 3 })}
                  className="w-full mt-2 rounded-lg bg-white/5 border border-white/15 p-3 text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
                />
                {formState.errors.subject && <p className="text-xs text-rose-400 mt-1">Subject should be at least 3 characters.</p>}
              </div>

              {/* Message Textarea */}
              <div>
                <label className="text-sm font-semibold text-purple-300 uppercase tracking-wide">Message</label>
                <textarea
                  placeholder="Tell me about your project, goals, and timeline..."
                  rows={5}
                  {...register("message", { required: true, minLength: 10 })}
                  className="w-full mt-2 rounded-lg bg-white/5 border border-white/15 p-3 text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 resize-none transition-all duration-300"
                />
                {formState.errors.message && <p className="text-xs text-rose-400 mt-1">Message should be at least 10 characters.</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white font-bold text-lg uppercase tracking-wide hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⚡</span> Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
