"use client";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import type { MouseEvent } from "react";

type Metric = { value: number; suffix: string; label: string };
type Milestone = {
  period: string;
  company: string;
  location: string;
  role: string;
  summary: string;
  achievements: string[];
  metrics: Metric[];
  technologies: string[];
};

const milestones: Milestone[] = [
  {
    period: "JUN 2025 — PRESENT",
    company: "CIKLUM",
    location: "Canada",
    role: "Software Developer",
    summary: "Engineering a compliance management platform for enterprise customers, with a focus on scalable services, secure reporting, and dependable production delivery.",
    achievements: [
      "Designed Spring Boot microservices and more than 20 REST APIs supporting 10,000+ active users.",
      "Reduced API response time from 500ms to 400ms through query, indexing, pagination, and service-layer improvements.",
      "Automated Docker, Jenkins, and GitHub Actions workflows, reducing manual deployment effort by 40%.",
    ],
    metrics: [
      { value: 30, suffix: "%", label: "database throughput gain" },
      { value: 20000, suffix: "+", label: "concurrent requests" },
      { value: 20, suffix: "+", label: "REST APIs delivered" },
    ],
    technologies: ["Java", "Spring Boot", "PostgreSQL", "AWS S3", "Docker", "Jenkins"],
  },
  {
    period: "JAN 2021 — MAR 2023",
    company: "CRED",
    location: "India",
    role: "Software Developer",
    summary: "Built inventory, compliance, and reporting systems that handled high transaction volumes while maintaining reliable processing and strong test coverage.",
    achievements: [
      "Refactored legacy Java applications with Hibernate and JPA, reducing processing time from 250ms to 180ms.",
      "Built Kafka-based asynchronous pipelines that increased overall system throughput by 20%.",
      "Optimized PostgreSQL and Oracle queries, reducing report generation time by 35%.",
    ],
    metrics: [
      { value: 15000, suffix: "+", label: "daily transactions" },
      { value: 95, suffix: "%", label: "test coverage" },
      { value: 18, suffix: "%", label: "fewer production defects" },
    ],
    technologies: ["Java", "Kafka", "Hibernate", "JUnit", "Mockito", "Oracle"],
  },
];

function CountUp({ metric, active }: { metric: Metric; active: boolean }) {
  const node = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!active || !node.current) return;
    if (prefersReducedMotion) {
      node.current.textContent = `${metric.value.toLocaleString()}${metric.suffix}`;
      return;
    }
    const controls = animate(0, metric.value, {
      duration: 1.45,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (node.current) node.current.textContent = `${Math.round(latest).toLocaleString()}${metric.suffix}`;
      },
    });
    return () => controls.stop();
  }, [active, metric, prefersReducedMotion]);

  return <span ref={node}>0{metric.suffix}</span>;
}

function MilestoneCard({ item, index }: { item: Milestone; index: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const active = useInView(cardRef, { amount: 0.34, margin: "-10% 0px -22% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 24 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 24 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBackground = useTransform([glowX, glowY], ([x, y]) => `radial-gradient(420px circle at ${x}% ${y}%, rgba(52,211,153,.10), transparent 60%)`);

  const onMove = (event: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - y) * 7);
    rotateY.set((x - 0.5) * 8);
    glowX.set(x * 100);
    glowY.set(y * 100);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <div className="relative grid gap-6 md:grid-cols-[9rem_1fr] md:gap-10">
      <div className="relative hidden md:block">
        <motion.div
          className="absolute left-[calc(100%+1.65rem)] top-9 z-20 grid h-5 w-5 place-items-center rounded-full border border-zinc-700 bg-zinc-950"
          animate={{ borderColor: active ? "#a7f3d0" : "#3f3f46", boxShadow: active ? "0 0 0 6px rgba(16,185,129,.10), 0 0 32px rgba(52,211,153,.6)" : "0 0 0 0 rgba(0,0,0,0)" }}
          transition={{ duration: 0.45 }}
        >
          <motion.span className="h-1.5 w-1.5 rounded-full bg-emerald-300" animate={{ scale: active ? 1 : 0.4, opacity: active ? 1 : 0.35 }} />
        </motion.div>
        <p className="pt-8 text-right font-mono text-[10px] font-medium tracking-[0.18em] text-zinc-500">{item.period}</p>
      </div>

      <motion.article
        ref={cardRef}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 40, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={onMove}
        onMouseLeave={resetTilt}
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        className="group relative overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-950/75 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl will-change-transform sm:p-8 lg:p-10"
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-24 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glowBackground }}
        />
        <div className="relative">
          <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-emerald-300 md:hidden">{item.period}</p>
          <div className="mb-8 flex flex-col gap-3 border-b border-zinc-800 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-emerald-300">{item.company} · {item.location}</p>
              <h3 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">{item.role}</h3>
            </div>
            <span className="text-xs text-zinc-500">0{index + 1} / 0{milestones.length}</span>
          </div>

          <p className="max-w-3xl text-base leading-7 text-zinc-300 sm:text-lg">{item.summary}</p>

          <ul className="my-8 grid gap-3 text-sm leading-6 text-zinc-400">
            {item.achievements.map((achievement) => <li key={achievement} className="flex gap-3"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-300" />{achievement}</li>)}
          </ul>

          <div className="grid gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 sm:grid-cols-3">
            {item.metrics.map((metric) => (
              <motion.div key={metric.label} className="bg-zinc-950 p-5" animate={active ? { backgroundColor: ["#09090b", "#0d1713", "#09090b"] } : {}} transition={{ duration: 1.4 }}>
                <strong className="block text-2xl font-semibold tracking-tight text-white"><CountUp metric={metric} active={active} /></strong>
                <span className="mt-1 block text-[11px] uppercase tracking-[0.11em] text-zinc-500">{metric.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {item.technologies.map((technology, tagIndex) => (
              <motion.span
                key={technology}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: tagIndex * 0.06, duration: 0.4 }}
                className="rounded-full border border-zinc-800 bg-zinc-900/70 px-3 py-1.5 text-[11px] font-medium text-zinc-400 transition duration-300 hover:border-emerald-400/60 hover:text-emerald-200 hover:shadow-[0_0_22px_rgba(52,211,153,.18)]"
              >{technology}</motion.span>
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function CareerTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 70%", "end 70%"] });
  const beamScale = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 });
  const haloY = useTransform(scrollYProgress, [0, 1], ["0%", "78%"]);

  return (
    <section ref={sectionRef} id="experience" className="relative isolate overflow-hidden bg-[#09090b] px-5 py-24 text-white sm:px-8 lg:py-36">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(16,185,129,.09),transparent_26%),radial-gradient(circle_at_85%_72%,rgba(59,130,246,.06),transparent_30%)]" />
      <motion.div aria-hidden="true" style={{ y: haloY }} className="absolute left-1/2 top-0 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-400/5 blur-[110px]" />

      <div className="mx-auto max-w-6xl">
        <motion.header initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-20 max-w-3xl lg:mb-28">
          <p className="mb-5 font-mono text-[11px] tracking-[0.25em] text-emerald-300">CAREER / IMPACT</p>
          <h2 className="text-4xl font-semibold tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">Production work.<br /><span className="text-zinc-500">Measured outcomes.</span></h2>
          <p className="mt-7 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">A record of designing, shipping, and improving backend systems where performance, reliability, and business impact matter.</p>
        </motion.header>

        <div className="relative space-y-16 lg:space-y-24">
          <div aria-hidden="true" className="absolute bottom-0 left-[calc(9rem+1.9rem)] top-0 hidden w-px overflow-visible bg-zinc-800 md:block">
            <motion.div style={{ scaleY: beamScale, transformOrigin: "top" }} className="h-full w-px bg-gradient-to-b from-emerald-200 via-emerald-400 to-cyan-400 shadow-[0_0_18px_rgba(52,211,153,.75)]" />
          </div>
          {milestones.map((item, index) => <MilestoneCard key={`${item.company}-${item.period}`} item={item} index={index} />)}
        </div>
      </div>
    </section>
  );
}
