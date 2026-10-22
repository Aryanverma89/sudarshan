import { useState, useMemo } from "react";
import Layout from "../components/Layout";
import ScrollReveal from "../components/ScrollReveal";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import { 
  ExternalLink, 
  ArrowUpRight, 
  Search, 
  Sparkles, 
  Layers, 
  Building2, 
  ShoppingBag, 
  Bot, 
  GraduationCap, 
  Camera, 
  Briefcase, 
  TrendingUp, 
  Globe, 
  CheckCircle2,
  Code2,
  Filter
} from "lucide-react";
import portfolioShowcase from "../assets/portfolio-showcase.jpg";

interface Project {
  title: string;
  url: string;
  image: string;
  category: "Real Estate & Infra" | "E-Commerce & D2C" | "AI & Automation" | "Agency & Software" | "Education & Media";
  industry: string;
  tagline: string;
  desc: string;
  tech: string[];
  result: string;
  statusBadge: string;
  gradient: string;
  icon: typeof Building2;
}

const projects: Project[] = [
  {
    title: "VANTA Streetwear & Accessories",
    url: "https://ecommercenitin.lovable.app",
    image: "/portfolio/vanta.jpg",
    category: "E-Commerce & D2C",
    industry: "Fashion & D2C Accessories",
    tagline: "Engineered Wardrobe Essentials & Phone Accessories Store",
    desc: "A sleek, high-conversion D2C e-commerce platform built with modern minimalist dark aesthetics, responsive catalog filters, interactive cart drawer, and optimized checkout flow.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "D2C Storefront"],
    result: "Sub-second load times & seamless cart checkout UX",
    statusBadge: "Live Prototype",
    gradient: "from-zinc-900 via-neutral-900 to-stone-900",
    icon: ShoppingBag,
  },
  {
    title: "Krishna Photo Studio",
    url: "https://krishnastudio.sudarshantechnologies.com/",
    image: "/portfolio/krishna-studio.jpg",
    category: "Education & Media",
    industry: "Photography & Cinematic Media",
    tagline: "Top-Rated Wedding & Event Photography in Lucknow",
    desc: "Professional photography & cinematic videography studio showcase in Lucknow featuring high-resolution visual galleries, package pricing tiers, customer reviews, and direct booking engine.",
    tech: ["React", "Tailwind CSS", "High-Res Gallery", "Lead Engine"],
    result: "4.7⭐ rated showcase with 225+ client bookings",
    statusBadge: "Live Project",
    gradient: "from-amber-950 via-yellow-950 to-stone-900",
    icon: Camera,
  },
  {
    title: "Trehan Luxury Floors",
    url: "https://trehan.sudarshantechnologies.com/",
    image: "/portfolio/trehan.jpg",
    category: "Real Estate & Infra",
    industry: "Luxury Housing & Smart Homes",
    tagline: "Premium 3 BHK Smart Home Floors in Sector 35, Gurugram",
    desc: "Luxury residential real estate platform nestled in Aravali Hills, featuring interactive smart floor plans, downloadable brochures, amenities showcase, and high-intent buyer lead capture.",
    tech: ["React", "Tailwind CSS", "Interactive Floorplans", "Lead Capture"],
    result: "+140% growth in qualified buyer lead generation",
    statusBadge: "Live Project",
    gradient: "from-slate-900 via-emerald-950 to-stone-900",
    icon: Building2,
  },
  {
    title: "PropPartners",
    url: "https://proppartner.sudarshantechnologies.com/",
    image: "/portfolio/proppartners.jpg",
    category: "Real Estate & Infra",
    industry: "PropTech & Real Estate Investments",
    tagline: "Smart Fractional & Commercial Real Estate Partnerships",
    desc: "Democratized property investment portal allowing investors to co-invest in high-yield commercial & residential properties starting at ₹10 Lakhs with transparent legal structures and ROI projections.",
    tech: ["React", "TypeScript", "Tailwind CSS", "ROI Calculator"],
    result: "Democratized ₹10L+ commercial real estate co-investments",
    statusBadge: "Live Project",
    gradient: "from-blue-950 via-indigo-950 to-slate-900",
    icon: TrendingUp,
  },
  {
    title: "HX9 Fragrances",
    url: "https://hx9.sudarshantechnologies.com/",
    image: "/portfolio/hx9.jpg",
    category: "E-Commerce & D2C",
    industry: "Luxury Eau De Parfum (D2C)",
    tagline: "Premium IFRA-Certified Unisex Fragrance Storefront",
    desc: "Direct-to-consumer luxury fragrance platform highlighting 4 signature scents (Amber, Wave, Coco, Lemon) crafted with imported French oils, olfactory notes visualizer, and instant ordering.",
    tech: ["React", "Tailwind CSS", "Vite", "D2C E-Commerce"],
    result: "8–9 hours long-lasting EDP showcase & rapid sales pipeline",
    statusBadge: "Live Project",
    gradient: "from-amber-950 via-rose-950 to-zinc-900",
    icon: Sparkles,
  },
  {
    title: "Ashoveena Construction",
    url: "https://ashoveena.sudarshantechnologies.com/",
    image: "/portfolio/ashoveena.jpg",
    category: "Real Estate & Infra",
    industry: "Turnkey Construction & Architecture",
    tagline: "IITian-Managed Premium Construction Across UP",
    desc: "Civil engineering & architecture platform for an IITian-managed firm, showcasing 70+ completed residential, commercial, and turnkey construction projects across Lucknow, Varanasi & Gorakhpur.",
    tech: ["Next.js / React", "Tailwind CSS", "Project Explorer", "Consultation Engine"],
    result: "70+ completed landmark projects across 3 major cities",
    statusBadge: "Live Project",
    gradient: "from-sky-950 via-blue-950 to-slate-900",
    icon: Building2,
  },
  {
    title: "Shiv Shakti Career Academy",
    url: "https://shivshakticoaching.sudarshantechnologies.com/",
    image: "/portfolio/shiv-shakti.jpg",
    category: "Education & Media",
    industry: "EdTech & Competitive Coaching",
    tagline: "Best CTET, UPTET & Super TET Coaching Institute",
    desc: "Educational institute platform in Barabanki providing structured syllabus breakdowns, exam preparation roadmaps, faculty showcases, and seamless student online enrollment inquiries.",
    tech: ["React", "Tailwind CSS", "Course Catalog", "Enrollment Portal"],
    result: "1,000+ teacher aspirants guided to examination success",
    statusBadge: "Live Project",
    gradient: "from-orange-950 via-amber-950 to-stone-900",
    icon: GraduationCap,
  },
  {
    title: "KidsVardaan",
    url: "https://kidsvardaan.lovable.app/",
    image: "/portfolio/kidsvardaan.jpg",
    category: "E-Commerce & D2C",
    industry: "Pediatric Health & Nutrition",
    tagline: "Plant-Based Daily Nutrition & Supplements for Kids",
    desc: "Engaging, parent-focused product showcase for pediatric nutrition containing 23 vitamins, 8g plant protein, zero refined sugar, pediatrician formulations, and quick online purchasing.",
    tech: ["React", "Tailwind CSS", "Interactive Nutritional Tour", "Lovable"],
    result: "23 Essential Vitamins & 8g Plant Protein per serving showcase",
    statusBadge: "Live Prototype",
    gradient: "from-emerald-950 via-teal-950 to-slate-900",
    icon: ShoppingBag,
  },
  {
    title: "Elite Technologies",
    url: "https://elitedigitalmarketing.co.in/",
    image: "/portfolio/elite-technologies.jpg",
    category: "Agency & Software",
    industry: "Global Software & Digital Marketing",
    tagline: "Global IT Solutions & Full-Funnel Digital Agency",
    desc: "Comprehensive corporate IT and digital marketing agency platform featuring product engineering, cloud DevOps, custom AI solutions, and full-funnel digital marketing services.",
    tech: ["Modern Web", "Tailwind CSS", "Mega Menu", "SaaS Solutions"],
    result: "Global multi-industry software delivery & scalable client funnels",
    statusBadge: "Live Project",
    gradient: "from-cyan-950 via-blue-950 to-slate-900",
    icon: Briefcase,
  },
  {
    title: "Sevak AI",
    url: "https://digitalsevakai.com/",
    image: "/portfolio/sevak-ai.jpg",
    category: "AI & Automation",
    industry: "Agentic AI & Lead Generation",
    tagline: "Autonomous AI Agents for Business Growth & Lead Generation",
    desc: "Intelligent agentic automation platform powering autonomous B2B lead generation, social media automation, 24/7 customer engagement, and automated daily performance analytics.",
    tech: ["React", "AI Agent Pipeline", "Tailwind CSS", "Analytics Engine"],
    result: "10x lead conversion with 24/7 autonomous intelligent agents",
    statusBadge: "Live Project",
    gradient: "from-violet-950 via-purple-950 to-slate-900",
    icon: Bot,
  },
  {
    title: "AK Infra & Reality Developers",
    url: "https://akinfrareality.com/",
    image: "/portfolio/ak-infra.jpg",
    category: "Real Estate & Infra",
    industry: "Gated Townships & Real Estate Development",
    tagline: "ISO 9001:2000 Certified Real Estate Developer in Lucknow",
    desc: "Flagship real estate development portal for a 25+ years legacy brand in Lucknow, showcasing Dream Green City integrated townships, plots, modern villas, and online site visit scheduling.",
    tech: ["React", "Tailwind CSS", "Township Explorer", "Site Visit Scheduler"],
    result: "25+ years trusted legacy with thousands of delivered plots & homes",
    statusBadge: "Live Project",
    gradient: "from-emerald-950 via-green-950 to-slate-900",
    icon: Building2,
  },
  {
    title: "Jupiter Properties Group",
    url: "https://jupiterpropertiesgroup.com/",
    image: "/portfolio/jupiter-properties.jpg",
    category: "Real Estate & Infra",
    industry: "Global Real Estate & Florida Brokerage",
    tagline: "Florida & Global Real Estate with $100M+ Volume",
    desc: "International real estate brokerage platform with 47+ years of expertise, connecting Florida buyers and global investors across 6 world regions with property search and Urbanvest LLC investments.",
    tech: ["Next.js", "Tailwind CSS", "Global Property Search", "Urbanvest LLC"],
    result: "$100M+ sales volume with 50+ global multilingual agents",
    statusBadge: "Live Project",
    gradient: "from-slate-900 via-blue-950 to-indigo-950",
    icon: Globe,
  },
  {
    title: "Makaan Ventures",
    url: "https://makaanventures.com/",
    image: "/portfolio/makaan-ventures.jpg",
    category: "Real Estate & Infra",
    industry: "Florida Real Estate Investment & Repositioning",
    tagline: "Institutional Value-Add Real Estate in Florida",
    desc: "Florida-based real estate investment and development firm acquiring, renovating, and repositioning underperforming residential, commercial, and hospitality assets for strong risk-adjusted returns.",
    tech: ["Next.js / React", "Tailwind CSS", "Ken Burns Visuals", "Asset Portfolio"],
    result: "Institutional asset transformation across Orlando, Tampa & Florida",
    statusBadge: "Live Project",
    gradient: "from-amber-950 via-stone-900 to-zinc-900",
    icon: Building2,
  },
];

const categories = [
  "All",
  "Real Estate & Infra",
  "E-Commerce & D2C",
  "AI & Automation",
  "Agency & Software",
  "Education & Media",
] as const;

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;
      
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        project.title.toLowerCase().includes(query) ||
        project.tagline.toLowerCase().includes(query) ||
        project.desc.toLowerCase().includes(query) ||
        project.industry.toLowerCase().includes(query) ||
        project.tech.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <Layout>
      <SEO
        title="Our Portfolio & Live Projects | Web & Software Development in Lucknow"
        description="Explore our rich portfolio of live websites, real estate portals, e-commerce stores, AI automation tools, and corporate web applications built by Sudarshan Technologies."
        keywords="portfolio sudarshan technologies, live websites portfolio, real estate web development, ecommerce website lucknow, AI software portfolio, custom web applications"
        url="https://sudarshantech.com/portfolio"
      />

      <section className="pt-32 lg:pt-40 pb-20 section-padding relative overflow-hidden">
        {/* Background Subtle Gradient Blobs */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto">
          {/* Header Banner */}
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-display font-medium bg-primary/10 text-primary border border-primary/20">
                <Sparkles className="w-3.5 h-3.5" /> Proven Engineering Excellence
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tighter text-foreground">
              Our <span className="text-gradient">Portfolio & Live Projects</span>
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-3xl text-lg sm:text-xl">
              Explore real-world websites, interactive prototypes, enterprise web applications, 
              and AI platforms engineered by <span className="font-semibold text-foreground">Sudarshan Technologies</span> across diverse industries.
            </p>
          </ScrollReveal>

          {/* Quick Metrics Bar */}
          <ScrollReveal delay={0.1}>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 glass-card border border-border/80 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold font-display text-foreground">{projects.length}+</div>
                  <div className="text-xs text-muted-foreground">Live Websites & Apps</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-amber-500 flex-shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold font-display text-foreground">6+</div>
                  <div className="text-xs text-muted-foreground">Industry Verticals</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold font-display text-foreground">100%</div>
                  <div className="text-xs text-muted-foreground">Production Responsive</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 flex-shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold font-display text-foreground">Global</div>
                  <div className="text-xs text-muted-foreground">India, USA & Beyond</div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Hero Showcase Image */}
          <ScrollReveal delay={0.15}>
            <div className="mt-8 relative rounded-2xl overflow-hidden shadow-xl border border-border group">
              <img 
                src={portfolioShowcase} 
                alt="Sudarshan Technologies software and web development portfolio showcase" 
                className="w-full h-56 sm:h-72 lg:h-80 object-cover transform group-hover:scale-[1.02] transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6 sm:p-8">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-sm border border-amber-400/20">
                    Live Client Deployments & Prototypes
                  </span>
                  <p className="text-white text-base sm:text-lg font-medium mt-2 max-w-xl">
                    High performance architectures delivering tangible growth, verified speed, and sleek UI/UX.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Search & Category Filter Controls */}
          <ScrollReveal delay={0.2}>
            <div className="mt-12 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1 mr-1">
                  <Filter className="w-3 h-3" /> Filter:
                </span>
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  const count =
                    cat === "All"
                      ? projects.length
                      : projects.filter((p) => p.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-display font-medium uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md scale-105"
                          : "border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 bg-card/60"
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[260px] sm:min-w-[300px]">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search projects, tech, industry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Project Grid */}
          {filteredProjects.length === 0 ? (
            <div className="mt-16 text-center py-16 bg-card border border-border rounded-2xl p-8">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground">No projects found</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                No matching projects found for "{searchQuery}". Try selecting another category or clear your search term.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 btn-ghost text-xs uppercase tracking-wider text-primary"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((p, i) => {
                const IconComponent = p.icon;
                const formattedHost = p.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

                return (
                  <ScrollReveal key={p.title} delay={(i % 6) * 0.05}>
                    <div className="glass-card-hover group overflow-hidden h-full flex flex-col rounded-2xl border border-border hover:border-primary/40 bg-card transition-all duration-300">
                      
                      {/* Landing Page Preview Mockup with Browser Frame */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 border-b border-border/80 group-hover:border-primary/30 transition-colors">
                        {/* Browser Top Bar */}
                        <div className="absolute top-0 left-0 right-0 z-20 h-7 bg-background/90 backdrop-blur-md border-b border-border/60 px-3 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-red-400/80" />
                            <div className="w-2 h-2 rounded-full bg-amber-400/80" />
                            <div className="w-2 h-2 rounded-full bg-emerald-400/80" />
                          </div>
                          <div className="text-[10px] font-mono text-muted-foreground truncate max-w-[170px] sm:max-w-[200px] bg-muted/60 px-2 py-0.5 rounded-full border border-border/40 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                            {formattedHost}
                          </div>
                          <span className="text-[9px] uppercase tracking-wider font-semibold text-primary font-mono">
                            LIVE
                          </span>
                        </div>

                        {/* Real Landing Page Screenshot */}
                        <img
                          src={p.image}
                          alt={`${p.title} landing page website screenshot`}
                          className="w-full h-full object-cover object-top pt-7 transform group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />

                        {/* Badges Overlay at Bottom of Preview */}
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-display font-medium bg-background/90 backdrop-blur-md text-foreground border border-border shadow-sm">
                            <IconComponent className="w-3 h-3 text-primary" />
                            {p.category}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-primary text-primary-foreground shadow-sm">
                            {p.statusBadge}
                          </span>
                        </div>
                      </div>

                      {/* Card Content Body */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Title & External Link Header */}
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-snug">
                              {p.title}
                            </h3>
                            <a
                              href={p.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors flex-shrink-0"
                              title={`Open ${p.title} in new tab`}
                              aria-label={`Visit ${p.title}`}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>

                          {/* Tagline */}
                          <p className="mt-1.5 text-xs font-medium text-primary">
                            {p.tagline}
                          </p>

                          {/* Description */}
                          <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                            {p.desc}
                          </p>

                          {/* Tech Stack Pills */}
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {p.tech.map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 rounded-md text-[11px] font-mono border border-border/80 text-muted-foreground bg-muted/60"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Card Footer: Key Result & Visit Button */}
                        <div className="mt-6 pt-4 border-t border-border/80 flex flex-col gap-3">
                          <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            <span className="text-muted-foreground truncate">{p.result}</span>
                          </div>

                          <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-display font-semibold uppercase tracking-wider bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20 hover:border-primary transition-all duration-300 shadow-sm"
                          >
                            <span>Visit Live Website</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>

                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}

          {/* Bottom CTA Banner */}
          <ScrollReveal delay={0.25}>
            <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-primary/15 via-primary/5 to-card border border-primary/20 shadow-lg text-center relative overflow-hidden">
              <div className="max-w-2xl mx-auto relative z-10">
                <span className="text-xs uppercase tracking-widest text-primary font-display font-semibold bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
                  Ready To Build Your Next Big Idea?
                </span>
                <h2 className="mt-4 text-3xl sm:text-4xl font-display font-bold text-foreground">
                  Let's Turn Your Concept Into a High-Converting Digital Platform
                </h2>
                <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
                  From custom web applications and e-commerce portals to AI automation and real estate platforms, 
                  our team brings your vision to life with modern speed and design.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Link to="/contact" className="btn-primary">
                    <span>Start Your Project</span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Link>
                  <Link to="/services" className="btn-secondary">
                    <span>Explore Our Services</span>
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
