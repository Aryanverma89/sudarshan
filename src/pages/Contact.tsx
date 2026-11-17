import { useState } from "react";
import emailjs from '@emailjs/browser';
import { toast } from "sonner";
import Layout from "../components/Layout";
import ScrollReveal from "../components/ScrollReveal";
import { Mail, Phone, MapPin, Send, Clock, Loader2, MessageCircle, Instagram, Facebook, Linkedin } from "lucide-react";
import SEO from "../components/SEO";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionFallback, setSubmissionFallback] = useState<{ whatsappUrl: string; mailtoUrl: string; errorDetail?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionFallback(null);

    const emailParams = {
      name: formData.name,
      email: formData.email,
      company: formData.company || "Not specified",
      service: formData.service || "General Inquiry",
      message: formData.message,
    };

    const whatsappUrl = `https://wa.me/917376742022?text=${encodeURIComponent(
      `Hello Sudarshan Technologies! My name is ${formData.name}. Email: ${formData.email}. Company: ${formData.company || "N/A"}. Service: ${formData.service || "General Inquiry"}. Message: ${formData.message}`
    )}`;

    const mailtoUrl = `mailto:connect@sudarshantechnologies.com?subject=${encodeURIComponent(
      `New Project Inquiry from ${formData.name} - ${formData.service || "Services"}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || "N/A"}\nService: ${formData.service || "N/A"}\n\nMessage:\n${formData.message}`
    )}`;

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_dyplmeg",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_2nny7ms",
        emailParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "LB1pJyTPVBbpafaAG"
      );
      toast.success("Message sent successfully! We'll be in touch within 24 hours.");
      setFormData({ name: "", email: "", company: "", service: "", message: "" });
    } catch (error: any) {
      console.error("EmailJS Submission Error:", error);
      const errorMsg = error?.text || error?.message || "Gmail token expired / reconnect needed";
      
      setSubmissionFallback({
        whatsappUrl,
        mailtoUrl,
        errorDetail: errorMsg,
      });

      toast.error("Email Server Notice: Gmail account needs reconnection in EmailJS", {
        description: "Your message is saved. Click below to send directly via WhatsApp.",
        action: {
          label: "Open WhatsApp",
          onClick: () => window.open(whatsappUrl, "_blank"),
        },
        duration: 9000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEO 
        title="Contact Us | Best IT & Software Company in Lucknow"
        description="Get in touch with Sudarshan Technologies for custom software development, web applications, and AI automation inquiries. Let's build something great."
        keywords="contact software company lucknow, hire web developers lucknow, IT company contact, custom software consulting, app developers lucknow"
      />
      <section className="pt-32 lg:pt-40 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <ScrollReveal>
                <span className="text-xs uppercase tracking-wider text-primary font-display font-medium">Contact Us</span>
                <h1 className="mt-3 text-4xl sm:text-5xl font-display font-bold tracking-tighter">
                  Start your digital <span className="text-gradient">journey</span>
                </h1>
                <p className="mt-4 text-muted-foreground leading-relaxed text-lg">
                  Book a free 30-minute consultation with Lucknow's top digital agency. We'll audit your systems and map a growth strategy tailored for your business.
                </p>
              </ScrollReveal>

              <ScrollReveal>
                <div className="mt-10 space-y-6">
                  {[
                    { icon: MessageCircle, label: "+91 73767 42022 (WhatsApp)", href: "https://wa.me/917376742022" },
                    { icon: Phone, label: "+91 8960804082", href: "tel:+918960804082" },
                    { icon: Mail, label: "connect@sudarshantechnologies.com", href: "mailto:connect@sudarshantechnologies.com" },
                    { icon: MapPin, label: "Adarsh Nagar, Matyari, Lucknow, Uttar Pradesh, India", href: "https://maps.app.goo.gl/MEzbKv3nMMHUV8w57" },
                    { icon: Clock, label: "Mon - Sat: 9:00 AM - 6:00 PM", href: null },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      {item.href ? (
                        <a href={item.href} className="text-muted-foreground text-sm hover:text-primary transition-colors" target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                          {item.label}
                        </a>
                      ) : (
                        <span className="text-muted-foreground text-sm">{item.label}</span>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="mt-10">
                  <h3 className="font-display font-semibold text-sm text-foreground mb-4">Connect With Us</h3>
                  <div className="flex gap-4">
                    <a href="https://www.linkedin.com/company/sudarshanttechnologies/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-[#0a66c2] hover:text-white transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="https://www.facebook.com/share/1BmrPZpLYc/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-[#1877f2] hover:text-white transition-colors">
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a href="https://www.instagram.com/sudarshan.technologies" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-[#E1306C] hover:text-white transition-colors">
                      <Instagram className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.1}>
              <form onSubmit={handleSubmit} className="glass-card p-6 lg:p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-display uppercase tracking-wider text-muted-foreground mb-2 block">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-display uppercase tracking-wider text-muted-foreground mb-2 block">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-display uppercase tracking-wider text-muted-foreground mb-2 block">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="text-xs font-display uppercase tracking-wider text-muted-foreground mb-2 block">Service Interest</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground text-sm focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
                  >
                    <option value="">Select a service</option>
                    <option>Digital Marketing</option>
                    <option>Website Development</option>
                    <option>SEO Optimization</option>
                    <option>AI & Automation</option>
                    <option>ERP / CRM Solutions</option>
                    <option>Social Media Management</option>
                    <option>Google Ads Management</option>
                    <option>E-commerce Development</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-display uppercase tracking-wider text-muted-foreground mb-2 block">Message</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-70 disabled:cursor-not-allowed">
                  {isSubmitting ? (
                    <>Sending <Loader2 className="w-4 h-4 animate-spin ml-2" /></>
                  ) : (
                    <>Send Message <Send className="w-4 h-4 ml-2" /></>
                  )}
                </button>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-border"></div>
                  <span className="flex-shrink mx-4 text-xs text-muted-foreground uppercase font-mono">Or Connect Directly</span>
                  <div className="flex-grow border-t border-border"></div>
                </div>

                <a
                  href={`https://wa.me/917376742022?text=${encodeURIComponent(
                    formData.name
                      ? `Hello Sudarshan Technologies! My name is ${formData.name}. I am interested in ${formData.service || "your services"}. ${formData.message || ""}`
                      : "Hello Sudarshan Technologies! I would like to inquire about your services."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white border border-[#25D366]/30 transition-all duration-300 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp (+91 73767 42022)</span>
                </a>

                {submissionFallback && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-foreground text-sm space-y-2.5 animate-in fade-in duration-300">
                    <div className="flex items-center gap-2 font-semibold text-amber-500 text-xs uppercase tracking-wider">
                      <span>⚠️ EmailJS Gmail Reconnect Required</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      EmailJS dashboard mein connected Gmail account ka token expire ho gaya hai. Aapka message taiyaar hai, neeche se direct bhejein:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 pt-1">
                      <a
                        href={submissionFallback.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold bg-[#25D366] text-white hover:bg-[#20ba59] transition-all shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> Send on WhatsApp
                      </a>
                      <a
                        href={submissionFallback.mailtoUrl}
                        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold bg-muted hover:bg-muted/80 text-foreground transition-all border border-border"
                      >
                        <Mail className="w-3.5 h-3.5" /> Send via Email App
                      </a>
                    </div>
                  </div>
                )}
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
