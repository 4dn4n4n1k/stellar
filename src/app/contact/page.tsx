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
      <section className="bg-navy pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        <div className="hero-arc w-[400px] h-[400px] -top-40 -right-40 opacity-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-3">
            Get In Touch
          </p>
          <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Contact Us
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Ready to discuss your next project? Reach out and let&apos;s explore
            how we can support your development goals.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <ScrollReveal variant="left">
                {submitted ? (
                  <div className="bg-slate rounded-2xl p-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="text-green-500" size={32} />
                    </div>
                    <h3 className="text-navy font-semibold text-2xl mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-warm-grey text-base">
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
                      className="mt-6 bg-navy hover:bg-navy-light text-white"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="heading-section text-2xl text-navy mb-6">
                      Send Us a Message
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-charcoal mb-2 block text-sm font-medium">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={`bg-slate border-gray-200 focus:border-gold focus:ring-gold ${
                            errors.name ? "border-red-400" : ""
                          }`}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-charcoal mb-2 block text-sm font-medium">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={`bg-slate border-gray-200 focus:border-gold focus:ring-gold ${
                            errors.email ? "border-red-400" : ""
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-charcoal mb-2 block text-sm font-medium">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        className={`bg-slate border-gray-200 focus:border-gold focus:ring-gold ${
                          errors.subject ? "border-red-400" : ""
                        }`}
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-charcoal mb-2 block text-sm font-medium">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project or inquiry..."
                        rows={6}
                        className={`bg-slate border-gray-200 focus:border-gold focus:ring-gold resize-none ${
                          errors.message ? "border-red-400" : ""
                        }`}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-gold to-gold-light text-navy font-semibold hover:from-gold-light hover:to-gold shadow-lg shadow-gold/20 px-10"
                    >
                      <Send className="mr-2" size={18} />
                      Send Message
                    </Button>
                  </form>
                )}
              </ScrollReveal>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <ScrollReveal variant="right">
                <div className="bg-navy rounded-2xl p-8 h-full">
                  <h3 className="heading-section text-2xl text-white mb-8">
                    Contact Information
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                        <Mail className="text-gold" size={18} />
                      </div>
                      <div>
                        <p className="text-white/50 text-sm mb-1">Email</p>
                        <a
                          href={`mailto:${siteConfig.email}`}
                          className="text-white hover:text-gold transition-colors text-sm"
                        >
                          {siteConfig.email}
                        </a>
                      </div>
                    </div>

                    {siteConfig.phones.map((phone) => (
                      <div key={phone} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                          <Phone className="text-gold" size={18} />
                        </div>
                        <div>
                          <p className="text-white/50 text-sm mb-1">Phone</p>
                          <a
                            href={`tel:${phone}`}
                            className="text-white hover:text-gold transition-colors text-sm"
                          >
                            {phone}
                          </a>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                        <MapPin className="text-gold" size={18} />
                      </div>
                      <div>
                        <p className="text-white/50 text-sm mb-1">Office</p>
                        <p className="text-white text-sm leading-relaxed">
                          {siteConfig.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="mt-10 pt-8 border-t border-white/10">
                    <h4 className="text-white font-semibold text-base mb-4">
                      Office Hours
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/50">Sunday – Thursday</span>
                        <span className="text-white">9:00 AM – 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Friday – Saturday</span>
                        <span className="text-white/40">Closed</span>
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
