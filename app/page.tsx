"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, ReactNode, useState } from "react";
import Image from "next/image";

// ─── Animation helpers ──────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45 } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-64px 0px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FI({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Eyebrow label ──────────────────────────────────────────────────────────

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[0.7rem] tracking-[0.16em] uppercase font-semibold text-navy">
      {children}
    </p>
  );
}

// ─── Deliverable data ───────────────────────────────────────────────────────

const deliverables = [
  {
    number: "01",
    title: "Website",
    label: "Lead Generation & Qualification",
    price: "$2,500",
    bullets: [
      "Qualified leads, not cold calls — a service-focused layout tells the right homeowners exactly what Higa HVAC does, so they arrive pre-sold before the first conversation.",
      "A smart contact form that captures job type, urgency, and location — turning every submission into a pre-screened, actionable lead.",
      "Mobile-first design with a prominent click-to-call button — so a homeowner browsing on their phone can reach Higa HVAC in one tap, from anywhere on the island.",
    ],
  },
  {
    number: "02",
    title: "Blog & Content",
    label: "SEO & AI-Powered Discovery",
    price: "$750",
    bullets: [
      "Four foundational blog articles published at launch — giving your SEO a running start and establishing Higa HVAC as the knowledgeable, local choice on Oahu.",
      "Optimized for both Google search and AI-generated answers (AIO) — so when homeowners ask an AI assistant for HVAC help in Hawaii, Higa HVAC is what surfaces.",
      "Organic content that compounds over time, building a traffic channel that keeps working between jobs — no ad spend required.",
    ],
  },
  {
    number: "03",
    title: "CRM & Automation",
    label: "GoHighLevel Setup & Integration",
    price: "$750",
    bullets: [
      "Every web form submission flows directly into your CRM — organized, visible, and ready for immediate follow-up with zero manual effort.",
      "Automated text and email sequences engage new leads within seconds, keeping Higa HVAC top-of-mind before they call anyone else.",
      "Invoicing and job tracking in one place — less time on paperwork and admin, more time doing the work.",
      "Your GoHighLevel account includes a $0/month platform fee — enterprise-grade CRM tools with no ongoing software cost.",
    ],
  },
  {
    number: "04",
    title: "Directory Presence",
    label: "Google Business, Yelp & Thumbtack",
    price: "$250",
    bullets: [
      "Fully built-out profiles on the three platforms where Oahu homeowners are already searching for HVAC contractors — ready to receive inquiries from day one.",
      "Consistent business information across every platform signals credibility to Google and improves your chances of appearing in the local map pack.",
      "Professional, complete profiles with photos, service descriptions, and clear contact details — making it easy for customers to choose Higa HVAC.",
    ],
  },
];

// ─── Timeline data ──────────────────────────────────────────────────────────

const weeks = [
  {
    week: "Week 1",
    title: "Foundation",
    items: ["Website design & build", "GHL account configured", "Directory profiles researched"],
  },
  {
    week: "Week 2",
    title: "Integration",
    items: ["Form-to-CRM pipeline live", "Directory profiles published", "Initial blog content drafted"],
  },
  {
    week: "Week 3",
    title: "Launch",
    items: ["QA, testing & revisions", "Full go-live", "Handoff & walkthrough"],
  },
];

// ─── Rule ────────────────────────────────────────────────────────────────────

function Rule() {
  return (
    <motion.hr
      variants={fadeIn}
      className="border-0 border-t border-rule"
    />
  );
}

// ─── CTA section with contact modal ─────────────────────────────────────────

const PHONE = "+18087244925";

function CTASection() {
  const [open, setOpen] = useState(false);

  return (
    <Reveal className="pb-20">
      <FI>
        <Rule />
      </FI>
      <div className="pt-10 space-y-6">
        <FI>
          <h2 className="text-4xl font-semibold text-ink">
            Ready to move forward?
          </h2>
        </FI>
        <FI>
          <p className="text-[0.9375rem] leading-relaxed text-ink-muted max-w-prose">
            Text or call with any questions — happy to walk through anything
            before we get started. Work begins as soon as the agreement is
            signed and the deposit is received.
          </p>
        </FI>
        <FI>
          <button
            onClick={() => setOpen(true)}
            className="flex w-full items-center justify-center gap-3 bg-navy text-white font-medium text-sm tracking-wide px-7 py-4 hover:bg-navy-light transition-colors duration-200"
          >
            Get in touch
            <span aria-hidden>→</span>
          </button>
        </FI>
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-rule flex items-center justify-between gap-4 flex-wrap">
        <FI>
          <Image
            src="/pivott-light.png"
            alt="Pivot Studio"
            height={20}
            width={120}
            className="object-contain object-left opacity-40"
          />
        </FI>
        <FI>
          <p className="text-xs text-ink-muted">
            Prepared for Higa HVAC · April 2026
          </p>
        </FI>
      </div>

      {/* Contact modal */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 w-full sm:max-w-sm bg-parchment border-t sm:border border-rule p-8 space-y-6"
          >
            <div className="space-y-1">
              <p className="text-[0.7rem] tracking-[0.16em] uppercase font-semibold text-navy">
                Get in touch
              </p>
              <h3 className="text-xl font-semibold text-ink">
                How would you like to reach out?
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={`sms:${PHONE}`}
                className="flex items-center justify-between bg-navy text-white font-medium text-sm px-6 py-4 hover:bg-navy-light transition-colors duration-200"
              >
                Send a text
                <span aria-hidden>💬</span>
              </a>
              <a
                href={`tel:${PHONE}`}
                className="flex items-center justify-between border border-rule text-ink font-medium text-sm px-6 py-4 hover:bg-rule/50 transition-colors duration-200"
              >
                Call
                <span aria-hidden>📞</span>
              </a>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-xs text-ink-muted hover:text-ink transition-colors w-full text-center"
            >
              Dismiss
            </button>
          </motion.div>
        </motion.div>
      )}
    </Reveal>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function ProposalPage() {
  return (
    <div className="min-h-screen bg-parchment text-ink">

      {/* ── Header ── */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-parchment/90 backdrop-blur-sm border-b border-rule"
      >
        <div className="max-w-2xl mx-auto px-6 py-3 flex items-center justify-between">
          <Image
            src="/pivott-light.png"
            alt="Pivot Studio"
            height={28}
            width={168}
            className="object-contain object-left"
            priority
          />
          <span className="text-xs tracking-[0.08em] uppercase text-ink-muted">
            April 2026
          </span>
        </div>
      </motion.header>

      <main className="max-w-2xl mx-auto px-6">

        {/* ── Hero ── */}
        <section className="pt-16 pb-14">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-8"
          >
            <motion.div variants={fadeIn}>
              <Eyebrow>Proposal&nbsp;&nbsp;·&nbsp;&nbsp;Higa HVAC&nbsp;&nbsp;·&nbsp;&nbsp;Oahu, Hawaii</Eyebrow>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-[2.6rem] leading-[1.1] font-bold text-ink sm:text-6xl"
            >
              Higa HVAC Digital Setup.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed text-ink-muted max-w-prose"
            >
              This proposal outlines a complete digital setup for Higa HVAC — a
              lead-generating website, a CRM that captures every lead, keeps your
              contacts organized over time, and handles invoicing so you get paid
              faster, and a presence on every platform where Oahu homeowners
              search for help. Everything delivered in three weeks, with daily
              progress updates.
            </motion.p>

            <motion.div variants={fadeIn}>
              <hr className="border-0 border-t border-rule" />
            </motion.div>
          </motion.div>
        </section>

        {/* ── Deliverables header ── */}
        <Reveal className="pb-8">
          <FI>
            <p className="text-sm tracking-[0.1em] uppercase font-semibold text-ink-muted">
              What&rsquo;s included:
            </p>
          </FI>
        </Reveal>

        {/* ── Deliverable sections ── */}
        <div className="space-y-0">
          {deliverables.map((d) => (
            <Reveal key={d.number}>
              <FI>
                <Rule />
              </FI>
              <div className="py-10 space-y-5">
                <FI className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <Eyebrow>{d.label}</Eyebrow>
                    <h2 className="text-4xl font-semibold text-ink">
                      {d.title}
                    </h2>
                    <p className="text-lg font-semibold text-navy pt-1">
                      {d.price}
                    </p>
                  </div>
                  <span
                    className="text-4xl font-black text-navy/30 leading-none shrink-0 mt-1 sm:text-5xl"
                    aria-hidden
                  >
                    {d.number}
                  </span>
                </FI>

                <ul className="space-y-4 pt-1">
                  {d.bullets.map((bullet, j) => (
                    <FI key={j}>
                      <li className="flex gap-4">
                        <span className="text-navy shrink-0 mt-[2px] select-none leading-snug">
                          —
                        </span>
                        <span className="text-[0.9375rem] leading-relaxed text-ink-muted">
                          {bullet}
                        </span>
                      </li>
                    </FI>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Timeline ── */}
        <Reveal className="pt-4 pb-14">
          <FI>
            <Rule />
          </FI>
          <div className="py-10 space-y-5">
            <FI>
              <div className="space-y-1">
                <Eyebrow>Timeline</Eyebrow>
                <h2 className="text-4xl font-semibold text-ink">
                  Three weeks, start to finish.
                </h2>
              </div>
            </FI>
            <FI>
              <p className="text-[0.9375rem] leading-relaxed text-ink-muted">
                Daily progress updates via text — so you always know where things
                stand, without having to ask.
              </p>
            </FI>

            <div className="grid grid-cols-1 gap-px bg-rule sm:grid-cols-3">
              {weeks.map((w, i) => (
                <FI key={i}>
                  <div className="bg-parchment p-6 space-y-3">
                    <div className="space-y-0.5">
                      <p className="text-[0.7rem] tracking-[0.14em] uppercase text-navy font-semibold">
                        {w.week}
                      </p>
                      <p className="text-lg font-medium text-ink">
                        {w.title}
                      </p>
                    </div>
                    <ul className="space-y-1.5">
                      {w.items.map((item, j) => (
                        <li
                          key={j}
                          className="text-[0.8125rem] leading-snug text-ink-muted flex gap-2"
                        >
                          <span className="text-navy/50 shrink-0">·</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FI>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── Investment ── */}
        <Reveal className="pb-14">
          <FI>
            <Rule />
          </FI>
          <div className="py-10 space-y-5">
            <FI>
              <div className="space-y-1">
                <Eyebrow>Investment</Eyebrow>
                <h2 className="text-4xl font-semibold text-ink">
                  One-time setup fee.
                </h2>
              </div>
            </FI>
            <FI>
              <p className="text-[0.9375rem] leading-relaxed text-ink-muted max-w-prose">
                Everything in this proposal — website, CRM, directories, and
                initial blog content — delivered and handed off in three weeks.
              </p>
            </FI>

            <FI>
              <div className="border border-rule p-8 space-y-2">
                <p className="text-[0.7rem] tracking-[0.14em] uppercase text-ink-muted font-semibold">
                  Total
                </p>
                <p className="text-5xl font-semibold text-navy sm:text-6xl">
                  $4,250
                </p>
                <p className="text-sm text-ink-muted pt-1">
                  Invoiced via GoHighLevel. 50% due at kickoff, 50% at launch.
                </p>
              </div>
            </FI>

            <ul className="space-y-3">
              {[
                "A professional website that generates leads, qualifies customers, and makes it easy to get in touch — around the clock",
                "GoHighLevel account configured and integrated — an industry-leading CRM that automates follow-up, manages every contact, and handles invoicing in one place",
                "Google Business, Yelp, and Thumbtack profiles live",
                "Initial blog content written and published",
                "3 weeks to delivery, daily text updates throughout",
              ].map((item, i) => (
                <FI key={i}>
                  <li className="flex gap-4 text-[0.9375rem] text-ink-muted">
                    <span className="text-navy shrink-0">—</span>
                    {item}
                  </li>
                </FI>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* ── Retainer upsell ── */}
        <Reveal className="pb-14">
          <FI>
            <Rule />
          </FI>
          <div className="py-10 space-y-5">
            <FI>
              <div className="space-y-1">
                <Eyebrow>Optional — Monthly Retainer</Eyebrow>
                <h2 className="text-4xl font-semibold text-ink">
                  Keep the momentum going.
                </h2>
              </div>
            </FI>
            <FI>
              <p className="text-[0.9375rem] leading-relaxed text-ink-muted max-w-prose">
                After launch, Pivot Studio can continue growing your presence —
                publishing new content, managing your reputation, and refining the
                system as your business scales.
              </p>
            </FI>

            <ul className="space-y-5">
              {[
                {
                  item: "Ongoing blog content",
                  detail:
                    "Two SEO- and AIO-optimized posts per month, compounding your organic reach.",
                },
                {
                  item: "Reputation monitoring",
                  detail:
                    "Review tracking across Google, Yelp, and Thumbtack — with prompted responses to build your rating.",
                },
                {
                  item: "CRM refinements",
                  detail:
                    "Automation updates, new pipeline stages, and system improvements as your business evolves.",
                },
              ].map(({ item, detail }, i) => (
                <FI key={i}>
                  <li className="flex gap-4">
                    <span className="text-navy shrink-0 mt-[2px]">
                      —
                    </span>
                    <div className="space-y-0.5">
                      <p className="text-[0.9375rem] font-medium text-ink">{item}</p>
                      <p className="text-[0.875rem] leading-relaxed text-ink-muted">
                        {detail}
                      </p>
                    </div>
                  </li>
                </FI>
              ))}
            </ul>

            <FI>
              <div className="border border-navy/20 bg-navy/[0.03] p-6 flex items-center justify-between gap-4">
                <p className="text-[0.9375rem] text-ink-muted leading-snug max-w-xs">
                  A small monthly investment to protect and grow what we build
                  together.
                </p>
                <div className="text-right shrink-0">
                  <p className="text-2xl font-semibold text-navy">
                    $499
                    <span className="text-base font-light">/mo</span>
                  </p>
                  <p className="text-xs text-ink-muted mt-0.5">Starting price</p>
                </div>
              </div>
            </FI>
          </div>
        </Reveal>

        {/* ── CTA / Footer ── */}
        <CTASection />

      </main>
    </div>
  );
}
