"use client";

import Image from "next/image";
import { MotionConfig, motion } from "motion/react";
import { useState } from "react";
import AnimatedBackground from "./components/AnimatedBackground";

const navItems = [
  ["Work", "#work"],
  ["Pricing", "#pricing"],
  ["Services", "#services"],
  ["Process", "#process"],
  ["Payments", "#payments"],
  ["About", "#about"],
  ["FAQ", "#faq"],
  ["Contact", "#contact"],
];

const contactEmail = "roheensharifi39@gmail.com";
const contactPhone = "703-593-4536";
const contactPhoneHref = "tel:+17035934536";
const startSiteSubject = encodeURIComponent("Start a website with Sites by Roheen");
const questionSubject = encodeURIComponent("Website question for Sites by Roheen");

const benefits = [
  {
    title: "Student portfolio websites",
    copy: "Resume, projects, skills, GitHub, LinkedIn, and contact links shaped into one professional page.",
    tone: "cyan",
    span: "md:col-span-4",
  },
  {
    title: "Local business websites",
    copy: "Simple service pages that explain what you do, where you work, and how customers can reach you.",
    tone: "slate",
    span: "md:col-span-4",
  },
  {
    title: "Restaurant and menu websites",
    copy: "Mobile-friendly menus, hours, location details, and contact buttons for people checking fast.",
    tone: "lime",
    span: "md:col-span-4",
  },
  {
    title: "Landing pages",
    copy: "Google-ready pages for offers, services, events, products, and one-link campaigns.",
    tone: "amber",
    span: "md:col-span-4",
  },
  {
    title: "Personal brand websites",
    copy: "Clean pages for creators, professionals, and brands that need a polished place online.",
    tone: "violet",
    span: "md:col-span-4",
  },
  {
    title: "Website updates and redesigns",
    copy: "Refresh old copy, improve layout, update sections, or make an existing site easier to use.",
    tone: "cyan",
    span: "md:col-span-4",
  },
  {
    title: "Domain and deployment setup",
    copy: "Help connecting a custom domain, publishing the site, and getting the basics ready to share.",
    tone: "slate",
    span: "md:col-span-12",
  },
];

const caseStudies = [
  {
    id: "dmv",
    title: "DMVOFFGRID community website",
    type: "Local community website",
    href: "https://dmvoffgrid.com",
    description:
      "A live community website with a custom domain, mobile design, founder page, event sections, clothing drop area, deployment, and AI assistant.",
    tags: ["Community site", "Custom domain", "Mobile-friendly", "AI assistant"],
    cta: "View dmvoffgrid.com",
    span: "lg:col-span-7",
  },
  {
    id: "student",
    title: "Student Portfolio Website",
    type: "Student website",
    href: "https://student-portfolio-website-tau.vercel.app/",
    description:
      "A polished portfolio example with About, Projects, Resume, GitHub, LinkedIn, and contact links in one professional website.",
    tags: ["Student portfolio", "Resume", "Projects", "Contact links"],
    cta: "View example",
    span: "lg:col-span-5",
  },
  {
    id: "finance",
    title: "Finance and Accounting Student Portfolio",
    type: "Student portfolio",
    href: "https://mannank.com",
    description:
      "A dark gray and blue finance portfolio example for accounting experience, analytics projects, resume details, and professional contact links.",
    tags: ["Finance", "Accounting", "Resume", "Analytics"],
    cta: "View mannank.com",
    span: "lg:col-span-5",
  },
  {
    id: "biomed",
    title: "Biomedical Engineering Portfolio",
    type: "Research portfolio",
    href: "https://v0-biomedical-engineering-portfolio-ten.vercel.app/",
    description:
      "A research-forward biomedical engineering portfolio example for biosignals, embedded systems, ML projects, resume links, and contact.",
    tags: ["Biomedical engineering", "Research", "Projects"],
    cta: "View example",
    span: "lg:col-span-7",
  },
  {
    id: "basedandfit",
    title: "Based & Fit DMV Food Ratings",
    type: "Searchable ratings website",
    href: "https://basedandfit.icu",
    description:
      "A black, white, and red searchable DMV restaurant rating database with TikTok sources, leaderboards, filters, and ranked results.",
    tags: ["Ratings database", "DMV", "TikTok sources", "Custom domain"],
    cta: "View basedandfit.icu",
    span: "lg:col-span-12",
  },
] as const;

const plans = [
  {
    name: "Student Portfolio Sites",
    price: "Starting at $5/month",
    badge: "Lowest starting price",
    summary: "Perfect for resumes, internships, research, projects, GitHub, LinkedIn, and contact links.",
    cta: "Start Student Site",
    featured: true,
    includes: [
      "Resume-to-website layout",
      "Projects and skills section",
      "GitHub/LinkedIn/contact links",
      "Mobile-friendly design",
      "Updates available",
      "Flexible pricing",
    ],
  },
  {
    name: "Business Websites",
    price: "Affordable & negotiable",
    badge: "Flexible scope",
    summary: "Simple, professional websites for local businesses, services, restaurants, creators, and brands.",
    cta: "Start Business Site",
    featured: false,
    includes: [
      "One-page business website",
      "Services, menu, or product sections",
      "Contact buttons and inquiry flow",
      "Mobile-friendly layout",
      "Google-ready structure",
      "Pricing based on project size",
    ],
  },
];

const processSteps = [
  {
    title: "Send your info",
    copy: "Send your resume, project links, business details, menu, services, photos, brand notes, or anything you want included.",
  },
  {
    title: "Pick the right scope",
    copy: "Student sites can start as low as $5/month. Business website pricing is affordable and negotiable based on what you need.",
  },
  {
    title: "I build the first version",
    copy: "The site gets designed, written, organized, made mobile-friendly, and prepared for launch.",
  },
  {
    title: "Review and go live",
    copy: "You send feedback, I polish the details, and your site becomes a shareable live link.",
  },
];

const payments = [
  {
    brand: "stripe",
    title: "Stripe student subscription",
    copy: "Preferred for student sites starting as low as $5/month.",
    value: "Pay $5/month securely on Stripe",
    href: "https://buy.stripe.com/fZucN6feZ2iucVOe74d7q02",
  },
  {
    brand: "stripe",
    title: "Stripe business payment",
    copy: "Use this after we agree on the scope for a business website or local service site.",
    value: "Pay for a business website on Stripe",
    href: "https://buy.stripe.com/4gM9AU9UFcX85tm3sqd7q03",
  },
  {
    brand: "venmo",
    title: "Venmo",
    copy: "Good for agreed project deposits, one-time work, or first payments.",
    value: "@Roheen-Sharifi",
  },
  {
    brand: "zelle",
    title: "Zelle",
    copy: "Good for agreed project deposits, one-time work, or first payments.",
    value: "7039196589",
  },
] as const;

const trustBullets = [
  "Biomedical Engineering student at Virginia Tech",
  "Made and deployed real websites",
  "Student and business pricing stays flexible",
  "Mobile-friendly, professional, and easy to share",
];

const faqs = [
  {
    question: "What can I get for $5/month?",
    answer:
      "Student websites start as low as $5/month. The exact setup depends on what you need, but the goal is a clean, shareable portfolio with the essentials.",
  },
  {
    question: "How much does a business website cost?",
    answer:
      "Business website pricing is affordable and negotiable. I price it based on the number of sections, content, setup needs, and whether you want ongoing updates.",
  },
  {
    question: "Can I request updates?",
    answer:
      "Yes. Updates can be included in a monthly student plan or priced separately for business projects depending on the size of the changes.",
  },
  {
    question: "Can you make a one-page business site?",
    answer:
      "Yes. I can build one-page websites for local services, restaurants, creators, personal brands, and businesses that need a first web presence.",
  },
  {
    question: "Do I need a custom domain?",
    answer:
      "No. You can start with a simple live website link. If you want a custom domain, I can help connect one after you buy it.",
  },
  {
    question: "Can you use my resume or business info?",
    answer:
      "Yes. Resumes, LinkedIn, GitHub, menus, service lists, photos, logos, and existing pages can all help shape the site.",
  },
  {
    question: "How long does it take?",
    answer:
      "Most simple websites move quickly once the content, links, and project scope are ready.",
  },
  {
    question: "Is this an agency?",
    answer:
      "No. Sites by Roheen is a personal, direct website-building service. You work with Roheen, and pricing stays practical.",
  },
  {
    question: "Can I start small and add more later?",
    answer:
      "Yes. You can start with a focused site and add sections, updates, a domain, or redesign work later.",
  },
];

type CaseId = (typeof caseStudies)[number]["id"];

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const sectionRevealInitial = { opacity: 0, y: 14 };
const sectionRevealVisible = { opacity: 1, y: 0 };
const sectionRevealViewport = { once: true, amount: 0.2 };
const sectionRevealTransition = {
  duration: 0.42,
  ease: [0.22, 1, 0.36, 1] as const,
};

function PreviewButton({
  children,
  className,
  onClick,
  type = "button",
  ariaLabel,
  ariaExpanded,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
  ariaExpanded?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
    >
      {children}
    </button>
  );
}

function SectionReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cx("section-reveal", className)}
      initial={sectionRevealInitial}
      whileInView={sectionRevealVisible}
      viewport={sectionRevealViewport}
      transition={sectionRevealTransition}
    >
      {children}
    </motion.div>
  );
}

function SectionShell({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cx("relative z-10 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16", className)}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

function SectionIntro({
  eyebrow,
  title,
  copy,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  center?: boolean;
}) {
  return (
    <SectionReveal className={cx("mb-7 max-w-3xl lg:mb-9", center && "mx-auto text-center")}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-sky-200">{eyebrow}</p>
      ) : null}
      <h2 className="text-balance text-[clamp(2.15rem,10vw,3rem)] font-semibold leading-[1] tracking-[-0.035em] text-zinc-50 sm:text-5xl lg:text-[3.45rem]">
        {title}
      </h2>
      {copy ? (
        <p className={cx("mt-4 text-base leading-7 text-zinc-300 sm:text-lg", center && "mx-auto max-w-2xl")}>
          {copy}
        </p>
      ) : null}
    </SectionReveal>
  );
}

function CTA({
  href,
  children,
  variant = "primary",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cx(
        "group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full px-5 text-sm font-semibold outline-none transition-[transform,opacity,background-color,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070a11] sm:w-auto sm:px-6",
        variant === "primary"
          ? "bg-sky-300 text-[#061018] shadow-[0_18px_58px_rgba(125,211,252,0.2)] hover:bg-sky-200"
          : "border border-white/12 bg-white/[0.045] text-zinc-50 hover:border-sky-200/40 hover:bg-white/[0.075]"
      )}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={cx(
          "grid h-7 w-7 place-items-center rounded-full text-xs transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5",
          variant === "primary" ? "bg-[#061018] text-sky-200" : "bg-white/10 text-zinc-100"
        )}
      >
        &gt;
      </span>
    </a>
  );
}

function BrowserDots() {
  return (
    <div className="flex gap-1.5" aria-hidden="true">
      <span className="h-2.5 w-2.5 rounded-full bg-red-300/80" />
      <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
      <span className="h-2.5 w-2.5 rounded-full bg-lime-300/80" />
    </div>
  );
}

function CodedMark({ tone = "cyan" }: { tone?: string }) {
  const colors: Record<string, string> = {
    cyan: "bg-sky-300/12 border-sky-200/26 text-sky-100",
    slate: "bg-white/[0.055] border-white/12 text-zinc-100",
    lime: "bg-lime-300/12 border-lime-200/24 text-lime-100",
    amber: "bg-amber-300/12 border-amber-200/24 text-amber-100",
    violet: "bg-violet-300/12 border-violet-200/24 text-violet-100",
  };

  return (
    <div className={cx("relative h-11 w-11 overflow-hidden rounded-2xl border", colors[tone] || colors.cyan)}>
      <span className="absolute left-3 top-3 h-2 w-5 rounded-full bg-current opacity-80" />
      <span className="absolute bottom-3 left-3 h-2 w-2 rounded-full bg-current opacity-55" />
      <span className="absolute bottom-3 right-3 h-2 w-3 rounded-full bg-current opacity-35" />
    </div>
  );
}

type PaymentBrand = (typeof payments)[number]["brand"];

function PaymentSymbol({ brand }: { brand: PaymentBrand }) {
  const symbols: Record<
    PaymentBrand,
    {
      label: string;
      mark: string;
      shell: string;
      text: string;
    }
  > = {
    stripe: {
      label: "Stripe",
      mark: "stripe",
      shell: "border-indigo-200/26 bg-indigo-400/14 shadow-[0_18px_52px_rgba(129,140,248,0.12)]",
      text: "text-[17px] font-bold text-indigo-100",
    },
    venmo: {
      label: "Venmo",
      mark: "v",
      shell: "border-sky-200/28 bg-sky-300/16 shadow-[0_18px_52px_rgba(56,189,248,0.12)]",
      text: "text-[28px] font-black leading-none text-sky-50",
    },
    zelle: {
      label: "Zelle",
      mark: "Zelle",
      shell: "border-violet-200/28 bg-violet-400/16 shadow-[0_18px_52px_rgba(167,139,250,0.12)]",
      text: "text-[17px] font-extrabold text-violet-50",
    },
  };
  const symbol = symbols[brand];

  return (
    <div
      aria-label={`${symbol.label} payment option`}
      className={cx(
        "inline-flex h-11 min-w-24 items-center justify-center rounded-2xl border px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        symbol.shell
      )}
    >
      <span aria-hidden="true" className={symbol.text}>
        {symbol.mark}
      </span>
    </div>
  );
}

function DMVOFFGRIDPreview() {
  return (
    <div className="relative h-full min-h-[260px] overflow-hidden rounded-[22px] border border-white/10 bg-[#080d14] p-3 sm:min-h-[300px] sm:rounded-[24px] sm:p-4">
      <div
        aria-hidden="true"
        className="absolute inset-x-4 top-0 h-64 bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.18),transparent_68%)]"
      />
      <div className="relative rounded-[20px] border border-white/12 bg-[#10141c] shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <BrowserDots />
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">dmvoffgrid.com</p>
        </div>
        <div className="relative overflow-hidden p-4 sm:p-7">
          <div className="mb-4 inline-flex rounded-full border border-orange-200/24 bg-orange-300/12 px-3 py-1 text-xs font-semibold text-orange-100 sm:absolute sm:right-6 sm:top-6 sm:mb-0">
            Mobile-friendly
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-200">Outdoor community</p>
          <h3 className="mt-4 max-w-sm text-[2.45rem] font-semibold leading-[0.92] tracking-[-0.045em] text-zinc-50 sm:mt-10 sm:text-[3.45rem]">
            Hike. Run. Repeat.
          </h3>
          <div className="mt-6 inline-flex rounded-full bg-orange-300 px-4 py-2 text-sm font-bold text-[#1b1008]">
            Join the community
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2">
            {["Events", "Trails", "Gear"].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.055] p-3"
              >
                <p className="text-xs font-semibold text-zinc-200">{item}</p>
                <div className="mt-6 h-1 rounded-full bg-orange-200/60" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentPreview({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState("Projects");
  const tabs = ["About", "Projects", "Resume", "GitHub"];

  return (
    <div className={cx("relative overflow-hidden rounded-[22px] border border-white/10 bg-[#08111a] p-2.5 sm:rounded-[24px] sm:p-3", compact ? "min-h-[260px] sm:min-h-[300px]" : "min-h-[260px] sm:min-h-[300px]")}>
      <div className="rounded-[20px] border border-white/12 bg-[#0d1622]">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <BrowserDots />
          <p className="text-[11px] font-semibold text-zinc-400">student-site.dev</p>
        </div>
        <div className="p-3 sm:p-5">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <PreviewButton
                key={tab}
                onClick={() => setActive(tab)}
                className={cx(
                  "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                  active === tab
                    ? "border-sky-200/40 bg-sky-300 text-[#071019]"
                    : "border-white/10 bg-white/[0.045] text-zinc-300 hover:border-sky-200/30"
                )}
              >
                {tab}
              </PreviewButton>
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-[0.72fr_1fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-200">Student portfolio</p>
              <h3 className="mt-3 text-[2rem] font-semibold leading-[0.95] tracking-[-0.045em] text-zinc-50 sm:text-4xl">
                John Adams
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                Computer science student building web apps, research tools, and fast prototypes.
              </p>
            </div>
            <div
              key={active}
              className="rounded-[20px] border border-sky-200/18 bg-sky-300/[0.075] p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-zinc-50">{active}</p>
                <span className="h-2.5 w-2.5 rounded-full bg-sky-300" />
              </div>
              <div className="mt-5 grid gap-2">
                {["AI study planner", "React dashboard", "Resume PDF"].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.055] p-3 text-xs font-medium text-zinc-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BiomedicalPreview() {
  const bars = [28, 54, 38, 72, 34, 66, 44, 82, 36, 58, 30, 68, 42, 74];

  return (
    <div className="relative min-h-[260px] overflow-hidden rounded-[22px] border border-white/10 bg-[#090f18] p-3 sm:min-h-[280px] sm:rounded-[24px] sm:p-5">
      <div className="grid h-full gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[20px] border border-white/10 bg-white/[0.045] p-4 sm:rounded-[22px] sm:p-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">Research portfolio</p>
          <h3 className="mt-5 text-[2.65rem] font-semibold leading-[0.92] tracking-[-0.045em] text-zinc-50 sm:text-5xl">
            Biosignals + ML
          </h3>
          <div className="mt-8 flex flex-wrap gap-2">
            {["ECG", "Python", "Embedded", "Signal processing"].map((chip) => (
              <span key={chip} className="rounded-full border border-emerald-200/18 bg-emerald-300/[0.07] px-3 py-1 text-xs font-semibold text-emerald-100">
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-8 flex gap-2">
            <span className="rounded-full bg-emerald-300 px-4 py-2 text-xs font-bold text-[#06140f]">Resume</span>
            <span className="rounded-full border border-white/12 px-4 py-2 text-xs font-bold text-zinc-200">Contact</span>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[#0d151d] p-4 sm:rounded-[22px] sm:p-5">
          <div className="absolute inset-x-6 top-8 h-px bg-emerald-200/20" />
          <div className="flex h-36 items-center gap-2">
            {bars.map((height, index) => (
              <span
                key={`${height}-${index}`}
                className="w-full rounded-full bg-emerald-300/70"
                style={{ height }}
              />
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {["Neural interface notes", "Lab project archive", "Device prototype", "Signal dashboard"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.045] p-3 text-xs font-medium text-zinc-300">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FinancePreview() {
  const rows = [
    ["Audit prep", "$14.2k", "72%"],
    ["Forecast", "$8.7k", "58%"],
    ["Tax notes", "$3.1k", "66%"],
  ];

  return (
    <div className="relative min-h-[260px] overflow-hidden rounded-[22px] border border-white/10 bg-[#080d14] p-3 sm:min-h-[280px] sm:rounded-[24px] sm:p-4">
      <div
        aria-hidden="true"
        className="absolute -right-12 -top-16 h-72 w-72 bg-[radial-gradient(circle,rgba(59,130,246,0.2),transparent_68%)]"
      />
      <div className="relative flex h-full flex-col rounded-[20px] border border-white/10 bg-[#0d1520] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-5">
        <div className="flex items-start gap-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-[22px] border border-blue-200/24 bg-blue-300/[0.09] text-[3.1rem] font-semibold leading-none text-blue-100 shadow-[0_22px_70px_rgba(37,99,235,0.18)] sm:h-20 sm:w-20 sm:text-[3.8rem]">
            <span className="-mt-1">$</span>
          </div>
          <div className="min-w-0 pt-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-200">Finance/accounting</p>
            <h3 className="mt-3 text-[1.85rem] font-semibold leading-[0.96] tracking-[-0.04em] text-zinc-50 sm:text-[2.25rem]">
              Ledger-ready portfolio
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Resume", "CPA track", "Contact"].map((item) => (
                <span key={item} className="rounded-full border border-blue-200/16 bg-blue-300/[0.08] px-3 py-1.5 text-[11px] font-bold text-blue-100">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-[18px] border border-white/10 bg-[#111923] p-3 sm:mt-6 sm:p-4">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
            <p className="truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">mannank.com</p>
            <span className="shrink-0 rounded-full bg-blue-300 px-3 py-1 text-[11px] font-bold text-[#061018]">
              Live
            </span>
          </div>
          <div className="mt-4 grid gap-2.5">
            {rows.map(([label, value, width]) => (
              <div
                key={label}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-zinc-100">{label}</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <span
                      className="block h-full rounded-full bg-blue-300/80"
                      style={{ width }}
                    />
                  </div>
                </div>
                <p className="font-mono text-sm font-semibold text-blue-100">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {["Valuation", "Tax", "Excel"].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-2 py-2 text-[11px] font-semibold text-zinc-300">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BasedFitPreview() {
  const resultRows = [
    ["#1", "Halal Eatz", "Chantilly burger board", "9.5", "border-yellow-300/70 bg-yellow-300/[0.14] text-yellow-100 shadow-[0_0_34px_rgba(250,204,21,0.18),inset_0_1px_0_rgba(255,255,255,0.08)]"],
    ["#2", "Charred", "Herndon burger board", "8.2", "border-amber-400/45 bg-amber-400/[0.08] text-amber-200"],
    ["#3", "Big Bunz", "Ashburn burger board", "8.5", "border-amber-400/45 bg-amber-400/[0.08] text-amber-200"],
  ];

  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-[22px] border border-white/10 bg-[#030303] p-3 sm:min-h-[390px] sm:rounded-[24px] sm:p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(235,55,47,0.22),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.075),transparent_22%),linear-gradient(180deg,#050505_0%,#020202_100%)]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.09] [background-image:linear-gradient(rgba(255,255,255,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:32px_32px]"
      />
      <div className="relative grid h-full gap-4 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="flex min-h-[300px] flex-col justify-between rounded-[20px] border border-white/10 bg-black/62 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <Image
            src="/images/based-fit-logo-cropped-transparent.png"
            alt="Based & Fit"
            width={983}
            height={157}
            sizes="(max-width: 1023px) calc(100vw - 5rem), 24rem"
            className="h-auto w-full max-w-[19rem] object-contain"
          />
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              {["Searchable ratings", "TikTok sources"].map((item) => (
                <span key={item} className="rounded-full border border-red-400/45 bg-red-500/[0.08] px-3 py-1.5 text-[11px] font-black text-red-300">
                  {item}
                </span>
              ))}
            </div>
            <h3 className="max-w-[8.5ch] text-[3.25rem] font-black leading-[0.86] tracking-[-0.065em] text-white sm:text-[4.4rem]">
              DMV food ratings.
            </h3>
            <p className="mt-4 max-w-sm text-sm font-medium leading-6 text-zinc-300">
              Search rankings, reviews, and restaurant ratings across the DMV in seconds.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              ["80", "Restaurants"],
              ["10", "Boards"],
              ["20", "Locations"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.045] p-3">
                <p className="text-xl font-black text-white">{value}</p>
                <p className="mt-1 text-[11px] font-bold text-zinc-400">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[20px] border border-white/12 bg-[#0a0b0f]/92 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full border border-red-400/45 bg-red-500/[0.08] px-3 py-1.5 text-xs font-black text-red-300">
              Live database preview
            </span>
            <span className="rounded-full border border-white/12 bg-black px-3 py-1.5 text-xs font-black text-zinc-300">
              Original TikTok review
            </span>
          </div>
          <h3 className="mt-5 max-w-xl text-3xl font-black leading-[0.96] tracking-[-0.045em] text-white sm:text-[2.6rem]">
            Search the review archive before you spend money.
          </h3>
          <div className="mt-5 rounded-2xl border border-white/14 bg-black px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xl font-black text-red-400">Q</span>
              <span className="min-w-0 flex-1 font-mono text-lg font-black text-white">burger</span>
              <span className="hidden rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-black text-zinc-300 sm:inline-flex">
                80 indexed restaurants
              </span>
            </div>
          </div>
          <div className="mt-4 grid gap-3 border-b border-white/10 pb-4 text-xs font-bold text-zinc-400 sm:grid-cols-[auto_1fr]">
            <span>Queries</span>
            <div className="flex flex-wrap gap-2">
              {["burger", "kunafa", "rice", "Chantilly"].map((item) => (
                <span key={item} className="rounded-full border border-white/12 px-3 py-1 text-zinc-300">
                  {item}
                </span>
              ))}
            </div>
            <span>Filters</span>
            <div className="flex flex-wrap gap-2">
              {["Burger board", "Herndon", "8+"].map((item) => (
                <span key={item} className="rounded-full border border-red-400/45 bg-red-500/[0.08] px-3 py-1 text-red-300">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="font-mono text-xs font-black text-white">3 ranked results</p>
            <span className="rounded-full border border-white/12 bg-white/[0.055] px-3 py-1.5 text-xs font-black text-zinc-300">
              Highest rated
            </span>
          </div>
          <div className="mt-3 grid gap-2.5">
            {resultRows.map(([rank, name, board, score, tone]) => (
              <div
                key={name}
                className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border p-3 ${tone}`}
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-yellow-400 text-xs font-black text-black">
                  {rank}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-base font-black text-white">{name}</p>
                  <p className="truncate text-xs font-bold text-zinc-400">{board}</p>
                </div>
                <span className="rounded-xl border border-current px-3 py-2 font-mono text-sm font-black">
                  {score}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CasePreview({ id }: { id: CaseId }) {
  if (id === "dmv") return <DMVOFFGRIDPreview />;
  if (id === "student") return <StudentPreview />;
  if (id === "finance") return <FinancePreview />;
  if (id === "basedandfit") return <BasedFitPreview />;
  return <BiomedicalPreview />;
}

function HeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[23rem] min-w-0 sm:max-w-none">
      <div
        aria-hidden="true"
        className="absolute -inset-8 bg-[radial-gradient(ellipse_at_center,rgba(125,211,252,0.14),transparent_70%)]"
      />
      <div>
        <div className="relative rounded-[28px] border border-white/14 bg-white/[0.055] p-1.5 shadow-[0_36px_130px_rgba(8,16,28,0.72)] sm:rounded-[34px] sm:p-2">
          <StudentPreview compact />
        </div>
      </div>
      <div className="absolute -bottom-3 left-3 max-w-[calc(100%-1.5rem)] rounded-2xl border border-white/12 bg-[#0b111b] px-3 py-2.5 shadow-[0_20px_70px_rgba(0,0,0,0.34)] sm:-bottom-4 sm:left-5 sm:px-4 sm:py-3">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-200">Live website preview</p>
        <p className="mt-1 text-sm font-semibold text-zinc-50">Portfolios, businesses, brands</p>
      </div>
    </div>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  const menuId = "mobile-navigation-menu";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="absolute right-2 top-1/2 z-[60] grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-white/[0.06] text-zinc-50 outline-none transition hover:bg-white/[0.1] focus-visible:ring-2 focus-visible:ring-sky-200 sm:right-3 lg:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={menuId}
      >
        <span className="relative h-4 w-5">
          <span
            className={cx(
              "absolute left-0 top-1 h-0.5 w-5 rounded-full bg-current transition duration-300",
              open && "translate-y-1.5 rotate-45"
            )}
          />
          <span
            className={cx(
              "absolute bottom-1 left-0 h-0.5 w-5 rounded-full bg-current transition duration-300",
              open && "-translate-y-1.5 -rotate-45"
            )}
          />
        </span>
      </button>

      {open ? (
        <>
          <div
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-[#030712]/18 lg:hidden"
            onClick={() => setOpen(false)}
          />
          <div
            id={menuId}
            className="absolute right-0 top-[calc(100%+0.75rem)] z-[55] w-[min(calc(100vw-1.5rem),22rem)] overflow-hidden rounded-[28px] border border-white/14 bg-[#0b1019] p-2 shadow-[0_8px_24px_rgba(0,0,0,0.42)] lg:hidden"
          >
            <div className="grid gap-1">
              {navItems.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center rounded-[20px] px-4 text-base font-semibold text-zinc-50 transition-[transform,opacity,background-color] duration-200 active:scale-[0.99] active:bg-white/[0.08] hover:bg-white/[0.07]"
                >
                  {label}
                </a>
              ))}
              <div className="mt-2 border-t border-white/10 px-1 pt-3">
                <CTA href="#contact" onClick={() => setOpen(false)}>
                  Start a Website
                </CTA>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

function FAQItem({ item, index }: { item: (typeof faqs)[number]; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-1 transition-colors hover:border-sky-200/24">
      <PreviewButton
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 rounded-[20px] px-5 py-4 text-left text-base font-semibold text-zinc-50 outline-none focus-visible:ring-2 focus-visible:ring-sky-200"
        ariaExpanded={open}
      >
        <span>{item.question}</span>
        <span
          aria-hidden="true"
          className={cx(
            "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky-300/10 text-sky-200 transition-transform duration-200",
            open && "rotate-45",
          )}
        >
          +
        </span>
      </PreviewButton>
      {open ? <p className="px-5 pb-5 text-sm leading-6 text-zinc-300">{item.answer}</p> : null}
    </div>
  );
}

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="galaxy-mode relative min-h-[100dvh] w-full max-w-full overflow-x-hidden bg-[#030712] text-zinc-100">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_14%_8%,rgba(59,130,246,0.18),transparent_28%),radial-gradient(circle_at_84%_12%,rgba(168,85,247,0.14),transparent_26%),radial-gradient(circle_at_48%_88%,rgba(14,165,233,0.12),transparent_34%),linear-gradient(180deg,#030712_0%,#07111f_42%,#040815_100%)]" />
      <AnimatedBackground />
      <div className="site-grain" />

      <header className="sticky top-0 z-40 px-3 py-3 sm:px-5">
        <nav className="nav-glass relative mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3 rounded-full border border-white/10 bg-[#0b1019]/78 px-3 pr-14 shadow-[0_18px_70px_rgba(0,0,0,0.28)] sm:h-16 sm:px-5 sm:pr-16 lg:pr-5">
          <a href="#" className="flex min-w-0 items-center gap-2 font-semibold tracking-tight text-zinc-50 sm:gap-3">
            <span className="relative grid h-9 w-9 shrink-0 overflow-hidden rounded-full border border-sky-200/24 bg-[#050914] shadow-[0_0_22px_rgba(125,211,252,0.16)]">
              <Image
                src="/images/icon.png"
                alt=""
                fill
                sizes="36px"
                className="object-cover"
              />
            </span>
            <span className="max-w-[10rem] truncate text-sm sm:max-w-none sm:text-base">Sites by Roheen</span>
          </a>

          <div className="hidden items-center gap-5 lg:flex">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm font-medium text-zinc-300 transition-colors duration-300 hover:text-zinc-50"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <CTA href="#contact">Start a Website</CTA>
          </div>
          <MobileNav />
        </nav>
      </header>

      <section className="relative z-10 px-4 pb-8 pt-3 sm:px-6 sm:pt-5 lg:px-8 lg:pb-10 lg:pt-7">
        <SectionReveal className="mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-7 lg:min-h-[400px] lg:grid-cols-[0.94fr_1.06fr]">
            <div className="min-w-0 max-w-5xl">
              <div className="mb-4">
                <p className="inline-flex w-fit items-center rounded-full border border-sky-200/35 bg-sky-200/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-sky-100">
                  Limited-Time Launch Pricing
                </p>
              </div>
              <h1 className="max-w-[11ch] text-balance text-[clamp(2.18rem,10vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-zinc-50 sm:max-w-none sm:leading-[0.9] sm:tracking-[-0.07em] lg:text-[clamp(3.9rem,4.6vw,5.1rem)]">
                Your Professional Website, Without the Professional Price.
              </h1>
              <p className="mt-5 max-w-[23rem] text-base leading-7 text-zinc-300 sm:max-w-2xl sm:text-lg">
                Modern, mobile-friendly websites for students, creators, and growing businesses—starting at only $5 per month for a limited time.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <CTA href="#contact">Get My Website</CTA>
                <CTA href="#pricing" variant="secondary">
                  View Plans
                </CTA>
              </div>
            </div>

            <div className="min-w-0">
              <HeroMockup />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-3">
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-sky-200/70 to-transparent"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { name: "Ozza Bejjaji", review: "🔥🔥🔥", image: "/images/roheen-portrait.png", alt: "Ozza Bejjaji" },
                { name: "BasedAndFit", review: "This looks really nice!", image: "/images/based-and-fit-review.jpeg", alt: "Based & Fit logo" },
              ].map((item) => (
                <div key={item.name} className="rounded-[20px] bg-[#0d1420]/76 px-4 py-3">
                    <p className="text-sm tracking-[0.18em] text-amber-200" aria-label="5 out of 5 stars">★★★★★</p>
                    <p className="mt-2 text-sm font-medium text-zinc-100">“{item.review}”</p>
                    <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-sky-200">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        width={24}
                        height={24}
                        sizes="24px"
                        className="h-6 w-6 rounded-full border border-sky-200/30 object-cover"
                      />
                      <span>{item.name}</span>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>

      <SectionShell id="work" className="pt-4 lg:pt-6">
        <SectionIntro
          eyebrow="Examples"
          title="Examples for portfolios and businesses."
          copy="Explore live websites and portfolio examples that show the kind of clean, mobile-friendly site I can make for you."
        />

        <div className="grid grid-flow-dense gap-5 lg:grid-cols-12">
          {caseStudies.map((card) => (
            <div key={card.title} className={cx("min-w-0", card.span)}>
              <div className="h-full">
                <a
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group block h-full rounded-[30px] border border-white/10 bg-white/[0.045] p-2 outline-none transition-[transform,opacity,border-color] duration-300 hover:border-sky-200/30 lg:hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-sky-200"
                >
                  <div className="relative h-full overflow-hidden rounded-[24px] bg-[#0d1420]">
                    <CasePreview id={card.id} />
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-200">{card.type}</p>
                          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-zinc-50">{card.title}</h3>
                          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300">{card.description}</p>
                        </div>
                        <span className="inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.055] px-4 text-sm font-semibold text-zinc-50 opacity-80 transition duration-300 group-hover:border-sky-200/40 group-hover:bg-sky-300 group-hover:text-[#061018] group-hover:opacity-100 sm:w-auto">
                          {card.cta}
                        </span>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {card.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1 text-xs font-medium text-zinc-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="services">
        <SectionIntro
          eyebrow="Services"
          title="Simple websites for real needs."
          copy="Student portfolios, service pages, business sites, menus, landing pages, updates, domains, and deployment help."
        />

        <div className="grid grid-flow-dense gap-4 md:grid-cols-12">
          {benefits.map((benefit) => (
            <div key={benefit.title} className={benefit.span}>
              <div className="h-full">
                <article className="h-full rounded-[24px] border border-white/10 bg-white/[0.045] p-5 transition-[transform,opacity,border-color] duration-300 hover:border-sky-200/30 lg:hover:-translate-y-1 sm:rounded-[28px] sm:p-6">
                  <CodedMark tone={benefit.tone} />
                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-zinc-50 sm:mt-8">{benefit.title}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-zinc-300">{benefit.copy}</p>
                </article>
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="pricing" className="lg:py-20">
        <SectionIntro
          eyebrow="Pricing"
          title="Flexible pricing without agency-level costs."
          copy="Student sites start as low as $5/month. Business website pricing is affordable and negotiable."
          center
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {plans.map((plan) => (
            <div key={plan.name}>
              <div className="h-full">
                <article
                  className={cx(
                    "relative h-full rounded-[28px] border p-1.5 transition-[transform,opacity] duration-300 lg:hover:-translate-y-1 sm:rounded-[34px] sm:p-2",
                    plan.featured
                      ? "border-sky-200/35 bg-sky-300/[0.08] shadow-[0_32px_130px_rgba(56,189,248,0.16)]"
                      : "border-white/10 bg-white/[0.04]"
                  )}
                >
                  {plan.featured ? (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 rounded-[28px] border border-sky-200/20 sm:rounded-[34px]"
                    />
                  ) : null}
                  <div className="relative flex h-full flex-col rounded-[22px] bg-[#0c121d]/94 p-5 sm:rounded-[26px] sm:p-8">
                    <div className="sm:min-h-36">
                      {plan.badge ? (
                        <span className="mb-5 inline-flex rounded-full bg-sky-300 px-3 py-1 text-xs font-bold text-[#061018]">
                          {plan.badge}
                        </span>
                      ) : null}
                      <h3 className="text-2xl font-semibold text-zinc-50">{plan.name}</h3>
                      <p className="mt-3 text-sm leading-6 text-zinc-300">{plan.summary}</p>
                      <p className="mt-6 text-4xl font-semibold tracking-[-0.045em] text-zinc-50 sm:text-5xl">{plan.price}</p>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {plan.includes.map((item) => (
                        <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.045] p-3 text-sm leading-5 text-zinc-200">
                          {item}
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-8">
                      <CTA href="#contact" variant={plan.featured ? "primary" : "secondary"}>
                        {plan.cta}
                      </CTA>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-6 text-zinc-400">
          Every project is different. Pricing is flexible and based on what you need, how many
          sections you want, and whether you need ongoing updates.
        </p>
      </SectionShell>

      <SectionShell id="process">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <SectionIntro
            eyebrow="Process"
            title="Simple process. No confusion."
            copy="The whole flow is built around getting your first version live without turning it into a huge project."
          />
          <div className="relative">
            <div className="absolute bottom-8 left-5 top-8 hidden w-px bg-sky-200/20 sm:block" />
            <div className="grid gap-4">
              {processSteps.map((step, index) => (
                <div key={step.title}>
                  <div>
                    <article className="relative rounded-[26px] border border-white/10 bg-white/[0.045] p-5 transition-[transform,opacity,border-color] duration-300 lg:hover:translate-x-1 sm:ml-12">
                      <span className="absolute -left-[3.55rem] top-5 hidden h-10 w-10 place-items-center rounded-full border border-sky-200/28 bg-[#0b1019] text-sm font-semibold text-sky-100 sm:grid">
                        {index + 1}
                      </span>
                      <p className="font-mono text-sm text-sky-200 sm:hidden">{String(index + 1).padStart(2, "0")}</p>
                      <h3 className="text-xl font-semibold text-zinc-50">{step.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-zinc-300">{step.copy}</p>
                    </article>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="payments">
        <SectionIntro
          eyebrow="Payments"
          title="Pay the way that fits the plan."
          copy="Use the student Stripe link for monthly portfolio sites, or the business Stripe link after we agree on project scope."
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {payments.map((payment) => (
            <div key={payment.title}>
              <div className="h-full">
                <article className="h-full rounded-[24px] border border-white/10 bg-white/[0.045] p-5 transition-[transform,opacity,border-color] duration-300 lg:hover:-translate-y-1 sm:rounded-[28px] sm:p-6">
                  <PaymentSymbol brand={payment.brand} />
                  <h3 className="mt-7 text-xl font-semibold text-zinc-50">{payment.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">{payment.copy}</p>
                  {"href" in payment ? (
                    <a
                      href={payment.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 flex min-h-12 items-center justify-center rounded-2xl border border-sky-200/20 bg-sky-300 px-4 text-center text-sm font-bold text-[#061018] transition hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200"
                    >
                      {payment.value}
                    </a>
                  ) : (
                    <code className="mt-6 block break-all rounded-2xl border border-white/10 bg-[#070a11] p-4 text-sm text-sky-100">
                      {payment.value}
                    </code>
                  )}
                </article>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm leading-6 text-zinc-400">
          For Venmo/Zelle, include your name and project name in the payment note. Questions before
          paying? Email{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="font-medium text-zinc-200 underline decoration-sky-200/30 underline-offset-4 transition hover:text-sky-100"
          >
            {contactEmail}
          </a>
          .
        </p>
      </SectionShell>

      <SectionShell id="about">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <div>
              <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-1.5 sm:rounded-[34px] sm:p-2">
                <div className="relative overflow-hidden rounded-[22px] bg-[radial-gradient(circle_at_100%_0%,rgba(125,211,252,0.12),transparent_38%),#0d1420] p-5 sm:rounded-[26px] sm:p-8">
                  <div className="relative flex items-center gap-5">
                    <div className="grid h-20 w-20 shrink-0 place-items-center rounded-[24px] border border-sky-200/20 bg-sky-300/12 text-2xl font-semibold text-sky-100 sm:h-24 sm:w-24 sm:rounded-[28px] sm:text-3xl">
                      RS
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-sky-200">Roheen Sharifi</p>
                      <p className="mt-2 text-lg font-semibold text-zinc-50">
                        Biomedical Engineering student at Virginia Tech
                      </p>
                    </div>
                  </div>
                  <div className="relative mt-8 grid gap-3">
                    {trustBullets.map((item) => (
                      <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-sm font-medium text-zinc-200">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SectionReveal>
            <h2 className="text-balance text-3xl font-semibold leading-[1.02] tracking-[-0.035em] text-zinc-50 sm:text-6xl sm:tracking-[-0.04em]">
              Personal website help without the agency process.
            </h2>
            <div className="mt-6 grid gap-4 text-base leading-7 text-zinc-300">
              <p>
                I&apos;m Roheen Sharifi, a biomedical engineering student at Virginia Tech who builds
                clean, modern websites for students, local businesses, creators, and brands.
              </p>
              <p>
                I started with student portfolios, then expanded Sites by Roheen for people and local
                businesses who need a professional web presence without overpaying.
              </p>
              <p>
                I recently made the website for DMVOFFGRID, a live outdoor community with a custom
                domain, mobile design, founder page, event sections, clothing drop area, and AI
                assistant. Now I use that same direct process for student portfolios, business sites,
                service pages, menus, and landing pages.
              </p>
            </div>
          </SectionReveal>
        </div>
      </SectionShell>

      <SectionShell id="faq">
        <SectionIntro eyebrow="FAQ" title="Questions people usually ask." center />
        <div className="mx-auto grid max-w-4xl gap-3">
          {faqs.map((faq, index) => (
            <FAQItem key={faq.question} item={faq} index={index} />
          ))}
        </div>
      </SectionShell>

      <SectionShell id="contact" className="pb-10 lg:pb-16">
        <SectionReveal>
          <div>
            <div className="relative overflow-hidden rounded-[28px] border border-sky-200/24 bg-[radial-gradient(circle_at_100%_0%,rgba(125,211,252,0.16),transparent_42%),rgba(125,211,252,0.09)] p-5 sm:rounded-[36px] sm:p-10 lg:p-14">
              <div className="relative max-w-3xl">
                <h2 className="text-balance text-3xl font-semibold leading-[1.02] tracking-[-0.035em] text-zinc-50 sm:text-6xl sm:tracking-[-0.04em]">
                  Ready to look more professional online?
                </h2>
                <p className="mt-5 text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">
                  Send your resume, projects, business details, menu, services, or links. I&apos;ll
                  turn them into a clean website you can share anywhere.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <CTA href={`mailto:${contactEmail}?subject=${startSiteSubject}`}>
                    Start a Website
                  </CTA>
                  <CTA href={`mailto:${contactEmail}?subject=${questionSubject}`} variant="secondary">
                    Ask a Question
                  </CTA>
                </div>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <a
                    href={`mailto:${contactEmail}`}
                    className="group rounded-[22px] border border-white/10 bg-white/[0.055] p-4 transition-[transform,opacity,background-color,border-color] duration-300 active:scale-[0.985] hover:border-sky-200/30 hover:bg-white/[0.075]"
                  >
                    <p className="text-sm font-semibold text-sky-200">Email</p>
                    <p className="mt-2 break-all text-base font-semibold text-zinc-50 sm:text-lg">
                      {contactEmail}
                    </p>
                  </a>
                  <a
                    href={contactPhoneHref}
                    className="group rounded-[22px] border border-white/10 bg-white/[0.055] p-4 transition-[transform,opacity,background-color,border-color] duration-300 active:scale-[0.985] hover:border-sky-200/30 hover:bg-white/[0.075]"
                  >
                    <p className="text-sm font-semibold text-sky-200">Phone</p>
                    <p className="mt-2 text-base font-semibold text-zinc-50 sm:text-lg">{contactPhone}</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </SectionShell>

      <footer className="relative z-10 border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-zinc-200">Sites by Roheen</p>
          <div className="flex flex-wrap gap-4">
            <a href="#pricing" className="transition hover:text-zinc-100">
              Pricing
            </a>
            <a href="#faq" className="transition hover:text-zinc-100">
              FAQ
            </a>
            <a href={`mailto:${contactEmail}`} className="transition hover:text-zinc-100">
              Contact
            </a>
            <a href="/privacy" className="transition hover:text-zinc-100">
              Privacy
            </a>
            <a href="/terms" className="transition hover:text-zinc-100">
              Terms
            </a>
          </div>
        </div>
      </footer>
      </main>
    </MotionConfig>
  );
}
