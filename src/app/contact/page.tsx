"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = "Name is required";
    if (!formState.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email))
      newErrors.email = "Please enter a valid email";
    if (!formState.subject.trim()) newErrors.subject = "Subject is required";
    if (!formState.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Placeholder — no actual backend
      setSubmitted(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  return (
    <div className="page-enter">
      {/* Hero Banner */}
      <section className="bg-navy-950 pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        {/* Brand Pattern Background */}
        <svg
          className="absolute -top-20 -right-20 w-[40%] h-[60%] opacity-15 pointer-events-none"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle cx="400" cy="0" r="100" stroke="white" strokeWidth="1" />
          <circle cx="400" cy="0" r="200" stroke="white" strokeWidth="1" />
          <circle cx="400" cy="0" r="300" stroke="white" strokeWidth="1" />
        </svg>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <p 
            className="text-teal-100 font-bold text-xs uppercase tracking-[0.15em] mb-3 animate-fade-slide-up"
            style={{ animationDelay: '100ms' }}
          >
            Get In Touch
          </p>
          <h1 
            className="heading-display text-4xl md:text-5xl lg:text-6xl text-white font-extrabold mb-6 font-heading animate-fade-slide-up"
            style={{ animationDelay: '250ms' }}
          >
            Contact Us
          </h1>
          <p 
            className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto animate-fade-slide-up"
            style={{ animationDelay: '400ms' }}
          >
            Ready to discuss your next project? Reach out and let&apos;s explore
            how we can support your development goals.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <ScrollReveal variant="left">
                {submitted ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-[10px] p-10 text-center shadow-xs">
                    <div className="w-16 h-16 rounded-full bg-status-success-bg flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="text-status-success" size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-navy-900 font-extrabold text-2xl mb-2 font-heading">
                      Message Sent!
                    </h3>
                    <p className="text-gray-600 text-base">
                      Thank you for reaching out. We&apos;ll get back to you within
                      1-2 business days.
                    </p>
                    <Button
                      onClick={() => {
                        setSubmitted(false);
                        setFormState({
                          name: "",
                          email: "",
                          subject: "",
                          message: "",
                        });
                      }}
                      className="mt-6 w-full sm:w-auto h-12 lg:h-8 bg-navy-900 hover:bg-navy-800 text-white font-semibold text-sm rounded-[6px] focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:outline-none"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="heading-section text-2xl text-gray-900 font-extrabold mb-6 font-heading">
                      Send Us a Message
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-gray-900 mb-2 block text-sm font-semibold">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={`h-12 lg:h-8 bg-gray-50 border-gray-200 focus-visible:ring-teal-700 focus-visible:border-teal-700 rounded-[6px] ${errors.name ? "border-red-400" : ""
                            }`}
                        />
                        {errors.name && (
                          <p className="text-status-error text-xs mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-gray-900 mb-2 block text-sm font-semibold">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={`h-12 lg:h-8 bg-gray-50 border-gray-200 focus-visible:ring-teal-700 focus-visible:border-teal-700 rounded-[6px] ${errors.email ? "border-red-400" : ""
                            }`}
                        />
                        {errors.email && (
                          <p className="text-status-error text-xs mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-gray-900 mb-2 block text-sm font-semibold">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        className={`h-12 lg:h-8 bg-gray-50 border-gray-200 focus-visible:ring-teal-700 focus-visible:border-teal-700 rounded-[6px] ${errors.subject ? "border-red-400" : ""
                          }`}
                      />
                      {errors.subject && (
                        <p className="text-status-error text-xs mt-1">
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-gray-900 mb-2 block text-sm font-semibold">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project or inquiry..."
                        rows={6}
                        className={`bg-gray-50 border-gray-200 focus-visible:ring-teal-700 focus-visible:border-teal-700 rounded-[6px] resize-none ${errors.message ? "border-red-400" : ""
                          }`}
                      />
                      {errors.message && (
                        <p className="text-status-error text-xs mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-center">
                      <Button
                        type="submit"
                        className="w-full sm:w-auto h-12 px-10 text-sm font-semibold rounded-[12px] bg-[#156E67] hover:bg-[#1C857D] text-white shadow-[0_4px_14px_rgba(21,110,103,0.15)] hover:shadow-[0_6px_20px_rgba(21,110,103,0.25)] hover:translate-y-[-2px] transition-all duration-[250ms] ease-in-out font-heading"
                      >
                        <Send className="mr-2" size={16} strokeWidth={2} />
                        Send Message
                      </Button>
                    </div>
                  </form>
                )}
              </ScrollReveal>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <ScrollReveal variant="right">
                <div className="bg-navy-brand rounded-[10px] p-8 h-full shadow-sm">
                  <h3 className="heading-section text-2xl text-white font-extrabold mb-8 font-heading">
                    Contact Information
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-[6px] bg-teal-700/20 flex items-center justify-center shrink-0 border border-teal-700/10">
                        <Mail className="text-teal-100" size={18} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-white/50 text-sm mb-1">Email</p>
                        <a
                          href={`mailto:${siteConfig.email}`}
                          className="text-white hover:text-teal-100 transition-colors duration-180 text-sm font-semibold"
                        >
                          {siteConfig.email}
                        </a>
                      </div>
                    </div>

                    {siteConfig.phones.map((phone) => (
                      <div key={phone} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-[6px] bg-teal-700/20 flex items-center justify-center shrink-0 border border-teal-700/10">
                          <Phone className="text-teal-100" size={18} strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-white/50 text-sm mb-1">Phone</p>
                          <a
                            href={`tel:${phone}`}
                            className="text-white hover:text-teal-100 transition-colors duration-180 text-sm font-semibold"
                          >
                            {phone}
                          </a>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-[6px] bg-teal-700/20 flex items-center justify-center shrink-0 border border-teal-700/10">
                        <MapPin className="text-teal-100" size={18} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-white/50 text-sm mb-1">Office</p>
                        <p className="text-white text-sm leading-relaxed font-semibold">
                          {siteConfig.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="mt-10 pt-8 border-t border-white/5">
                    <h4 className="text-white font-extrabold text-base mb-4 font-heading">
                      Office Hours
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/50">Sunday – Thursday</span>
                        <span className="text-white font-semibold">9:00 AM – 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Friday – Saturday</span>
                        <span className="text-white/40 font-semibold">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
