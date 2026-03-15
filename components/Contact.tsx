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
    <section id="contact" className="flex flex-col items-center justify-center py-24 px-[12vw] md:px-[7vw] lg:px-[20vw]">
      <ToastContainer />

      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">CONTACT</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">Let&apos;s build something impactful together. Send a message and I&apos;ll get back quickly.</p>
      </div>

      <div className="mt-8 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-[#120d27] via-[#100b21] to-[#1f1542] shadow-[0_0_40px_rgba(130,69,236,0.18)]">
        <div className="grid gap-0 md:grid-cols-5">
          <div className="border-b border-white/10 p-7 md:col-span-2 md:border-b-0 md:border-r">
            <h3 className="text-2xl font-semibold text-white">Get in Touch</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Open to full-stack opportunities, freelance work, and product collaborations. Share your idea, timeline, and goals.
            </p>
            <div className="mt-8 space-y-4 text-sm text-slate-200">
              <p className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">Response Time: within 24 hours</p>
              <p className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">Preferred Stack: MERN, TypeScript, Next.js</p>
              <p className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">Timezone: IST (UTC+5:30)</p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-7 md:col-span-3">
            <input
              type="text"
              placeholder="Your Name"
              {...register("user_name", { required: true, minLength: 2 })}
              className="w-full rounded-lg border border-white/15 bg-[#131025] p-3 text-white placeholder:text-slate-400 focus:border-purple-500 focus:outline-none"
            />
            {formState.errors.user_name ? <p className="text-xs text-rose-300">Please enter a valid name.</p> : null}
            <input
              type="email"
              placeholder="Your Email"
              {...register("user_email", { required: true })}
              className="w-full rounded-lg border border-white/15 bg-[#131025] p-3 text-white placeholder:text-slate-400 focus:border-purple-500 focus:outline-none"
            />
            {formState.errors.user_email ? <p className="text-xs text-rose-300">Please enter a valid email.</p> : null}
            <input
              type="text"
              placeholder="Subject"
              {...register("subject", { required: true, minLength: 3 })}
              className="w-full rounded-lg border border-white/15 bg-[#131025] p-3 text-white placeholder:text-slate-400 focus:border-purple-500 focus:outline-none"
            />
            {formState.errors.subject ? <p className="text-xs text-rose-300">Subject should be at least 3 characters.</p> : null}
            <textarea
              placeholder="Message"
              rows={5}
              {...register("message", { required: true, minLength: 10 })}
              className="w-full rounded-lg border border-white/15 bg-[#131025] p-3 text-white placeholder:text-slate-400 focus:border-purple-500 focus:outline-none"
            />
            {formState.errors.message ? <p className="text-xs text-rose-300">Message should be at least 10 characters.</p> : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 py-3 text-white font-semibold transition hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
