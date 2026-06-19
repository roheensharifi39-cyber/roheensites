"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
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

const proofStrip = [
  "Student websites starting as low as $5/month",
  "Business pricing is flexible",
  "Clean websites without agency-level pricing",
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

function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return mounted;
}

function useMotionReady() {
  const mounted = useMounted();
  const reduce = useReducedMotion();

  return mounted && !reduce;
}

function useMobileViewport() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = globalThis.matchMedia("(max-width: 640px)");
    const sync = () => setIsMobile(media.matches);

    sync();
    media.addEventListener("change", sync);

    return () => media.removeEventListener("change", sync);
  }, []);

  return isMobile;
}

function useMobileMotionReady() {
  const motionReady = useMotionReady();
  const isMobile = useMobileViewport();

  return motionReady && isMobile;
}

function useCursorWave<T extends HTMLElement>(intensity = 14) {
  const motionReady = useMotionReady();
  const [canHover, setCanHover] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 155, damping: 16, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 155, damping: 16, mass: 0.45 });
  const rotateX = useTransform(springY, (latest) => latest * -0.32);
  const rotateY = useTransform(springX, (latest) => latest * 0.32);
  const rotateZ = useTransform(springX, (latest) => latest * 0.045);
  const canInteract = motionReady && canHover;

  useEffect(() => {
    const media = globalThis.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(media.matches);

    sync();
    media.addEventListener("change", sync);

    return () => media.removeEventListener("change", sync);
  }, []);

  function onPointerMove(event: React.PointerEvent<T>) {
    if (!canInteract) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    const wave = Math.sin((event.clientX + event.clientY) / 42) * 2.5;

    x.set((offsetX / rect.width) * intensity * 2 + wave);
    y.set((offsetY / rect.height) * intensity * 2 - wave);
  }

  function onPointerLeave() {
    x.set(0);
    y.set(0);
  }

  return {
    reduce: !canInteract,
    style: !canInteract
      ? undefined
      : {
          x: springX,
          y: springY,
          rotateX,
          rotateY,
          rotateZ,
          transformPerspective: 900,
        },
    onPointerMove,
    onPointerLeave,
  };
}

function MagneticSurface({
  children,
  className,
  intensity = 12,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const magnetic = useCursorWave<HTMLDivElement>(intensity);
  const mobileMotionReady = useMobileMotionReady();

  return (
    <motion.div
      style={magnetic.style}
      onPointerMove={magnetic.onPointerMove}
      onPointerLeave={magnetic.onPointerLeave}
      whileHover={magnetic.reduce ? undefined : { scale: 1.018 }}
      whileTap={mobileMotionReady ? { scale: 0.985, y: -1 } : undefined}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      className={cx("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({
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
  const magnetic = useCursorWave<HTMLButtonElement>(9);
  const mobileMotionReady = useMobileMotionReady();

  return (
    <motion.button
      type={type}
      onClick={onClick}
      style={magnetic.style}
      onPointerMove={magnetic.onPointerMove}
      onPointerLeave={magnetic.onPointerLeave}
      whileHover={magnetic.reduce ? undefined : { scale: 1.04 }}
      whileTap={magnetic.reduce ? (mobileMotionReady ? { scale: 0.97 } : undefined) : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      className={className}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
    >
      {children}
    </motion.button>
  );
}

function Reveal({
  children,
  className,
  delay = 0,
  instant = false,
  mobileOnly = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  instant?: boolean;
  mobileOnly?: boolean;
}) {
  const motionReady = useMotionReady();
  const isMobile = useMobileViewport();
  const shouldAnimate = motionReady && (isMobile ? true : !instant && !mobileOnly);
  const revealStart = isMobile ? { opacity: 0, y: 22 } : { opacity: 0.84, y: 28 };
  const revealTransition = isMobile
    ? { duration: 0.55, delay, ease: "easeOut" as const }
    : {
        duration: 0.72,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
      };
  const viewport = isMobile
    ? { once: true, amount: 0.05, margin: "0px 0px -40px 0px" }
    : { once: true, amount: 0.05, margin: "0px 0px -8% 0px" };

  return (
    <motion.div
      className={className}
      initial={shouldAnimate ? revealStart : false}
      whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
      viewport={viewport}
      transition={shouldAnimate ? revealTransition : undefined}
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
  instant = false,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  center?: boolean;
  instant?: boolean;
}) {
  return (
    <Reveal instant={instant} className={cx("mb-7 max-w-3xl lg:mb-9", center && "mx-auto text-center")}>
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
    </Reveal>
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
  const magnetic = useCursorWave<HTMLAnchorElement>(12);
  const mobileMotionReady = useMobileMotionReady();
  const mobileTap =
    mobileMotionReady
      ? {
          scale: 0.975,
          boxShadow:
            variant === "primary"
              ? "0 18px 62px rgba(125, 211, 252, 0.28)"
              : "0 16px 48px rgba(125, 211, 252, 0.14)",
        }
      : undefined;

  return (
    <motion.a
      href={href}
      onClick={onClick}
      style={magnetic.style}
      onPointerMove={magnetic.onPointerMove}
      onPointerLeave={magnetic.onPointerLeave}
      whileHover={magnetic.reduce ? undefined : { scale: 1.055 }}
      whileTap={magnetic.reduce ? mobileTap : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className={cx(
        "group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full px-5 text-sm font-semibold outline-none transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-sky-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070a11] sm:w-auto sm:px-6",
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
    </motion.a>
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
  const motionReady = useMotionReady();

  return (
    <div className="relative h-full min-h-[260px] overflow-hidden rounded-[22px] border border-white/10 bg-[#080d14] p-3 sm:min-h-[300px] sm:rounded-[24px] sm:p-4">
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-10 top-10 h-52 rounded-full bg-orange-400/18 blur-3xl"
        animate={motionReady ? { opacity: [0.35, 0.78, 0.35], scale: [0.92, 1.08, 0.92] } : undefined}
        transition={motionReady ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : undefined}
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
            {["Events", "Trails", "Gear"].map((item, index) => (
              <motion.div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.055] p-3"
                animate={motionReady ? { y: [0, -4, 0] } : undefined}
                transition={motionReady ? { duration: 4 + index, repeat: Infinity, ease: "easeInOut" } : undefined}
              >
                <p className="text-xs font-semibold text-zinc-200">{item}</p>
                <div className="mt-6 h-1 rounded-full bg-orange-200/60" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentPreview({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState("Projects");
  const motionReady = useMotionReady();
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
              <MagneticButton
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
              </MagneticButton>
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
            <motion.div
              key={active}
              initial={motionReady ? { opacity: 0.45, y: 10 } : false}
              animate={motionReady ? { opacity: 1, y: 0 } : undefined}
              transition={motionReady ? { duration: 0.32, ease: [0.22, 1, 0.36, 1] } : undefined}
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
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BiomedicalPreview() {
  const motionReady = useMotionReady();
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
              <motion.span
                key={`${height}-${index}`}
                className="w-full rounded-full bg-emerald-300/70"
                style={{ height }}
                animate={motionReady ? { scaleY: [0.82, 1.14, 0.82] } : undefined}
                transition={
                  motionReady
                    ? {
                        duration: 2.2,
                        delay: index * 0.045,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : undefined
                }
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

function CasePreview({ id }: { id: CaseId }) {
  if (id === "dmv") return <DMVOFFGRIDPreview />;
  if (id === "student") return <StudentPreview />;
  return <BiomedicalPreview />;
}

function HeroMockup() {
  const motionReady = useMotionReady();
  const isMobile = useMobileViewport();
  const floatAnimation = isMobile ? { y: [0, -6, 0], rotate: [0.2, 0, 0.2] } : { y: [0, -10, 0], rotate: [0.4, 0, 0.4] };
  const labelFloatAnimation = isMobile ? { y: [0, 4, 0] } : { y: [0, 8, 0] };

  return (
    <motion.div
      initial={false}
      animate={motionReady ? floatAnimation : undefined}
      transition={
        motionReady
          ? {
              y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }
          : undefined
      }
      whileHover={motionReady ? { y: -14, scale: 1.012 } : undefined}
      className="relative mx-auto w-full max-w-[23rem] min-w-0 sm:max-w-none"
    >
      <motion.div
        aria-hidden="true"
        className="absolute -inset-4 rounded-[36px] bg-sky-300/12 blur-3xl sm:-inset-8 sm:rounded-[44px]"
        animate={motionReady ? { opacity: [0.38, 0.72, 0.38] } : undefined}
        transition={motionReady ? { duration: 5, repeat: Infinity, ease: "easeInOut" } : undefined}
      />
      <MagneticSurface intensity={14}>
        <div className="relative rounded-[28px] border border-white/14 bg-white/[0.055] p-1.5 shadow-[0_36px_130px_rgba(8,16,28,0.72)] sm:rounded-[34px] sm:p-2">
          <StudentPreview compact />
        </div>
      </MagneticSurface>
      <motion.div
        className="absolute -bottom-3 left-3 max-w-[calc(100%-1.5rem)] rounded-2xl border border-white/12 bg-[#0b111b] px-3 py-2.5 shadow-[0_20px_70px_rgba(0,0,0,0.34)] sm:-bottom-4 sm:left-5 sm:px-4 sm:py-3"
        animate={motionReady ? labelFloatAnimation : undefined}
        transition={motionReady ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : undefined}
      >
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-200">Live website preview</p>
        <p className="mt-1 text-sm font-semibold text-zinc-50">Portfolios, businesses, brands</p>
      </motion.div>
    </motion.div>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  const motionReady = useMotionReady();
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

      <AnimatePresence initial={false}>
        {open ? (
          <>
            <motion.div
              key="mobile-nav-backdrop"
              aria-hidden="true"
              initial={motionReady ? { opacity: 0 } : false}
              animate={motionReady ? { opacity: 1 } : undefined}
              exit={motionReady ? { opacity: 0 } : undefined}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-40 bg-[#030712]/18 lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="mobile-nav-panel"
              id={menuId}
              initial={motionReady ? { opacity: 0, y: -8, scale: 0.98 } : false}
              animate={motionReady ? { opacity: 1, y: 0, scale: 1 } : undefined}
              exit={motionReady ? { opacity: 0, y: -6, scale: 0.98 } : undefined}
              transition={motionReady ? { duration: 0.22, ease: [0.22, 1, 0.36, 1] } : undefined}
              className="absolute right-0 top-[calc(100%+0.75rem)] z-[55] w-[min(calc(100vw-1.5rem),22rem)] overflow-hidden rounded-[28px] border border-white/14 bg-[#0b1019]/96 p-2 shadow-[0_28px_90px_rgba(0,0,0,0.46)] backdrop-blur-2xl lg:hidden"
            >
              <motion.div
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: {},
                  show: {
                    transition: { staggerChildren: 0.035, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="grid gap-1"
              >
                {navItems.map(([label, href]) => (
                  <motion.a
                    key={label}
                    href={href}
                    variants={{
                      hidden: motionReady ? { opacity: 0, y: 8 } : {},
                      show: motionReady ? { opacity: 1, y: 0 } : {},
                    }}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center rounded-[20px] px-4 text-base font-semibold text-zinc-50 transition active:scale-[0.99] active:bg-white/[0.08] hover:bg-white/[0.07]"
                  >
                    {label}
                  </motion.a>
                ))}
                <div className="mt-2 border-t border-white/10 px-1 pt-3">
                  <CTA href="#contact" onClick={() => setOpen(false)}>
                    Start a Website
                  </CTA>
                </div>
              </motion.div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function FAQItem({ item, index }: { item: (typeof faqs)[number]; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const motionReady = useMotionReady();

  return (
    <motion.div
      layout={motionReady}
      className="rounded-[24px] border border-white/10 bg-white/[0.04] p-1 transition-colors hover:border-sky-200/24"
    >
      <MagneticButton
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 rounded-[20px] px-5 py-4 text-left text-base font-semibold text-zinc-50 outline-none focus-visible:ring-2 focus-visible:ring-sky-200"
      >
        <span>{item.question}</span>
        <motion.span
          aria-hidden="true"
          animate={motionReady ? { rotate: open ? 45 : 0 } : undefined}
          transition={motionReady ? { duration: 0.25, ease: [0.22, 1, 0.36, 1] } : undefined}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky-300/10 text-sky-200"
        >
          +
        </motion.span>
      </MagneticButton>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={motionReady ? { height: 0, opacity: 0 } : false}
            animate={motionReady ? { height: "auto", opacity: 1 } : undefined}
            exit={motionReady ? { height: 0, opacity: 0 } : undefined}
            transition={motionReady ? { duration: 0.34, ease: [0.22, 1, 0.36, 1] } : undefined}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-6 text-zinc-300">{item.answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Home() {
  const motionReady = useMotionReady();
  const mobileMotionReady = useMobileMotionReady();

  function handleGalaxyPointer(event: React.PointerEvent<HTMLElement>) {
    if (!motionReady) return;
    const shiftX = ((event.clientX / globalThis.innerWidth) - 0.5) * 100;
    const shiftY = ((event.clientY / globalThis.innerHeight) - 0.5) * 100;
    event.currentTarget.style.setProperty("--galaxy-x", `${event.clientX}px`);
    event.currentTarget.style.setProperty("--galaxy-y", `${event.clientY}px`);
    event.currentTarget.style.setProperty("--galaxy-shift-x", `${shiftX.toFixed(2)}px`);
    event.currentTarget.style.setProperty("--galaxy-shift-y", `${shiftY.toFixed(2)}px`);
    event.currentTarget.style.setProperty("--galaxy-art-x", `${(-shiftX * 0.12).toFixed(2)}px`);
    event.currentTarget.style.setProperty("--galaxy-art-y", `${(-shiftY * 0.1).toFixed(2)}px`);
  }

  return (
    <main
      className="galaxy-mode relative min-h-[100dvh] w-full max-w-full overflow-x-hidden bg-[#030712] text-zinc-100"
      onPointerMove={handleGalaxyPointer}
    >
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
                preload
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
        <div className="mx-auto grid w-full max-w-7xl items-center gap-7 lg:min-h-[400px] lg:grid-cols-[0.94fr_1.06fr]">
          <div className="min-w-0 max-w-5xl">
            <Reveal instant>
              <p className="mb-4 max-w-[22rem] text-sm font-semibold leading-6 text-sky-200 sm:max-w-xl">
                Built for students, local businesses, creators, and brands.
              </p>
              <h1 className="max-w-[11ch] text-balance text-[clamp(2.18rem,10vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-zinc-50 sm:max-w-none sm:leading-[0.9] sm:tracking-[-0.07em] lg:text-[clamp(3.9rem,4.6vw,5.1rem)]">
                Affordable websites for students and local businesses.
              </h1>
              <p className="mt-5 max-w-[23rem] text-base leading-7 text-zinc-300 sm:max-w-2xl sm:text-lg">
                I build clean, mobile-friendly websites for student portfolios, local businesses,
                personal brands, and service pages with flexible pricing that fits what you actually need.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <CTA href="#contact">Start a Website</CTA>
                <CTA href="#work" variant="secondary">
                  View Examples
                </CTA>
              </div>
            </Reveal>
          </div>

          <Reveal mobileOnly delay={0.08} className="min-w-0">
            <HeroMockup />
          </Reveal>
        </div>

        <Reveal instant delay={0.12} className="mx-auto mt-5 w-full max-w-7xl">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-3">
            <motion.div
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-px w-full origin-left bg-sky-200/70"
              animate={motionReady ? { scaleX: [0.06, 1, 0.06], opacity: [0.35, 0.9, 0.35] } : undefined}
              transition={motionReady ? { duration: 5, repeat: Infinity, ease: "easeInOut" } : undefined}
            />
            <div className="grid gap-3 sm:grid-cols-3">
              {proofStrip.map((item, index) => (
                <Reveal key={item} mobileOnly delay={index * 0.05}>
                  <motion.div
                    whileTap={mobileMotionReady ? { scale: 0.985, y: -1 } : undefined}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    className="rounded-[20px] bg-[#0d1420]/76 px-4 py-3 text-sm font-semibold text-zinc-100"
                  >
                    {item}
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <SectionShell id="work" className="pt-4 lg:pt-6">
        <SectionIntro
          instant
          eyebrow="Examples"
          title="Examples for portfolios and businesses."
          copy="Explore live websites and portfolio examples that show the kind of clean, mobile-friendly site I can make for you."
        />

        <div className="grid grid-flow-dense gap-5 lg:grid-cols-12">
          {caseStudies.map((card, index) => (
            <Reveal key={card.title} instant={index < 2} delay={index * 0.06} className={cx("min-w-0", card.span)}>
              <MagneticSurface className="h-full" intensity={16}>
                <motion.a
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                  whileHover={motionReady ? { y: -8 } : undefined}
                  whileTap={mobileMotionReady ? { scale: 0.985, y: -2 } : undefined}
                  transition={motionReady ? { type: "spring", stiffness: 240, damping: 24 } : undefined}
                  className="group block h-full rounded-[30px] border border-white/10 bg-white/[0.045] p-2 shadow-[0_26px_90px_rgba(0,0,0,0.24)] outline-none transition-colors duration-500 hover:border-sky-200/30 focus-visible:ring-2 focus-visible:ring-sky-200"
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
                          {card.id === "dmv" ? "View dmvoffgrid.com" : "View example"}
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
                </motion.a>
              </MagneticSurface>
            </Reveal>
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
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 0.045} className={benefit.span}>
              <MagneticSurface className="h-full" intensity={14}>
                <motion.article
                  whileHover={motionReady ? { y: -6 } : undefined}
                  whileTap={mobileMotionReady ? { scale: 0.985, y: -2 } : undefined}
                  transition={motionReady ? { type: "spring", stiffness: 260, damping: 24 } : undefined}
                  className="h-full rounded-[24px] border border-white/10 bg-white/[0.045] p-5 transition-colors duration-500 hover:border-sky-200/30 sm:rounded-[28px] sm:p-6"
                >
                  <CodedMark tone={benefit.tone} />
                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-zinc-50 sm:mt-8">{benefit.title}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-zinc-300">{benefit.copy}</p>
                </motion.article>
              </MagneticSurface>
            </Reveal>
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
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.08}>
              <MagneticSurface className="h-full" intensity={13}>
                <motion.article
                  whileHover={motionReady ? { y: -8 } : undefined}
                  whileTap={mobileMotionReady ? { scale: 0.985, y: -2 } : undefined}
                  transition={motionReady ? { type: "spring", stiffness: 230, damping: 24 } : undefined}
                  className={cx(
                    "relative h-full rounded-[28px] border p-1.5 sm:rounded-[34px] sm:p-2",
                    plan.featured
                      ? "border-sky-200/35 bg-sky-300/[0.08] shadow-[0_32px_130px_rgba(56,189,248,0.16)]"
                      : "border-white/10 bg-white/[0.04]"
                  )}
                >
                  {plan.featured ? (
                    <motion.div
                      aria-hidden="true"
                      className="absolute inset-0 rounded-[28px] border border-sky-200/20 sm:rounded-[34px]"
                      animate={motionReady ? { opacity: [0.25, 0.78, 0.25], scale: [0.992, 1.01, 0.992] } : undefined}
                      transition={motionReady ? { duration: 4.5, repeat: Infinity, ease: "easeInOut" } : undefined}
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
                </motion.article>
              </MagneticSurface>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-6 text-zinc-400">
            Every project is different. Pricing is flexible and based on what you need, how many
            sections you want, and whether you need ongoing updates.
          </p>
        </Reveal>
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
                <Reveal key={step.title} delay={index * 0.05}>
                  <MagneticSurface intensity={10}>
                    <motion.article
                      whileHover={motionReady ? { x: 6 } : undefined}
                      whileTap={mobileMotionReady ? { scale: 0.985, x: 2 } : undefined}
                      transition={motionReady ? { type: "spring", stiffness: 260, damping: 24 } : undefined}
                      className="relative rounded-[26px] border border-white/10 bg-white/[0.045] p-5 sm:ml-12"
                    >
                      <span className="absolute -left-[3.55rem] top-5 hidden h-10 w-10 place-items-center rounded-full border border-sky-200/28 bg-[#0b1019] text-sm font-semibold text-sky-100 sm:grid">
                        {index + 1}
                      </span>
                      <p className="font-mono text-sm text-sky-200 sm:hidden">{String(index + 1).padStart(2, "0")}</p>
                      <h3 className="text-xl font-semibold text-zinc-50">{step.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-zinc-300">{step.copy}</p>
                    </motion.article>
                  </MagneticSurface>
                </Reveal>
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
          {payments.map((payment, index) => (
            <Reveal key={payment.title} delay={index * 0.06}>
              <MagneticSurface className="h-full" intensity={12}>
                <motion.article
                  whileHover={motionReady ? { y: -6 } : undefined}
                  whileTap={mobileMotionReady ? { scale: 0.985, y: -2 } : undefined}
                  transition={motionReady ? { type: "spring", stiffness: 260, damping: 24 } : undefined}
                  className="h-full rounded-[24px] border border-white/10 bg-white/[0.045] p-5 sm:rounded-[28px] sm:p-6"
                >
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
                </motion.article>
              </MagneticSurface>
            </Reveal>
          ))}
        </div>
        <Reveal>
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
        </Reveal>
      </SectionShell>

      <SectionShell id="about">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <Reveal>
            <MagneticSurface intensity={12}>
              <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-1.5 sm:rounded-[34px] sm:p-2">
                <div className="relative overflow-hidden rounded-[22px] bg-[#0d1420] p-5 sm:rounded-[26px] sm:p-8">
                  <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sky-300/12 blur-3xl" />
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
            </MagneticSurface>
          </Reveal>
          <Reveal delay={0.1}>
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
          </Reveal>
        </div>
      </SectionShell>

      <SectionShell id="faq">
        <SectionIntro eyebrow="FAQ" title="Questions people usually ask." center />
        <Reveal className="mx-auto grid max-w-4xl gap-3">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} mobileOnly delay={index * 0.035}>
              <FAQItem item={faq} index={index} />
            </Reveal>
          ))}
        </Reveal>
      </SectionShell>

      <SectionShell id="contact" className="pb-10 lg:pb-16">
        <Reveal>
          <MagneticSurface intensity={10}>
            <div className="relative overflow-hidden rounded-[28px] border border-sky-200/24 bg-sky-300/[0.09] p-5 shadow-[0_40px_150px_rgba(56,189,248,0.15)] sm:rounded-[36px] sm:p-10 lg:p-14">
              <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-sky-300/16 blur-3xl" />
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
                  <motion.a
                    href={`mailto:${contactEmail}`}
                    whileTap={mobileMotionReady ? { scale: 0.985 } : undefined}
                    className="group rounded-[22px] border border-white/10 bg-white/[0.055] p-4 transition hover:border-sky-200/30 hover:bg-white/[0.075]"
                  >
                    <p className="text-sm font-semibold text-sky-200">Email</p>
                    <p className="mt-2 break-all text-base font-semibold text-zinc-50 sm:text-lg">
                      {contactEmail}
                    </p>
                  </motion.a>
                  <motion.a
                    href={contactPhoneHref}
                    whileTap={mobileMotionReady ? { scale: 0.985 } : undefined}
                    className="group rounded-[22px] border border-white/10 bg-white/[0.055] p-4 transition hover:border-sky-200/30 hover:bg-white/[0.075]"
                  >
                    <p className="text-sm font-semibold text-sky-200">Phone</p>
                    <p className="mt-2 text-base font-semibold text-zinc-50 sm:text-lg">{contactPhone}</p>
                  </motion.a>
                </div>
              </div>
            </div>
          </MagneticSurface>
        </Reveal>
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
  );
}
