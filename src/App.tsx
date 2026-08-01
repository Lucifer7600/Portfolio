import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const projects = [
  {
    label: "COMPLIANCE / MICROSERVICES",
    title: "Enterprise Compliance Platform",
    description:
      "Scalable Spring Boot services for compliance records, secure reports, workflows, and audit data across a high-traffic enterprise platform.",
    metrics: [
      "20K+ concurrent requests",
      "30% DB throughput gain",
      "20% faster API response",
    ],
    stack: ["Java", "Spring Boot", "PostgreSQL", "AWS S3", "Docker", "Jenkins"],
  },
  {
    label: "EVENTS / TRANSACTIONS",
    title: "Inventory & Reporting System",
    description:
      "Transaction-heavy backend modules, asynchronous event processing, and reporting infrastructure designed for reliable business operations.",
    metrics: [
      "15K+ daily transactions",
      "95% test coverage",
      "35% faster reporting",
    ],
    stack: ["Java", "Kafka", "Hibernate", "Oracle", "JUnit", "Tableau"],
  },
  {
    label: "DELIVERY / PLATFORM",
    title: "Cloud-Native Delivery Pipeline",
    description:
      "Containerized delivery workflows and automated quality gates that made enterprise releases faster, safer, and more repeatable.",
    metrics: [
      "40% less manual effort",
      "25% coverage improvement",
      "30% faster onboarding",
    ],
    stack: [
      "Docker",
      "Jenkins",
      "GitHub Actions",
      "Postman",
      "OpenAPI",
      "SonarQube",
    ],
  },
];

const toolbox = [
  {
    category: "Languages",
    level: "PRIMARY",
    skills: ["Java", "TypeScript", "JavaScript", "SQL", "C# / .NET", "Bash"],
  },
  {
    category: "Data & Caching",
    level: "ADVANCED",
    skills: ["PostgreSQL", "Oracle", "MySQL", "SQL Server", "MongoDB", "Redis"],
  },
  {
    category: "Infrastructure",
    level: "PRODUCTION",
    skills: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "GitHub Actions",
      "Terraform",
    ],
  },
  {
    category: "Architecture",
    level: "CORE",
    skills: [
      "Microservices",
      "REST APIs",
      "Kafka",
      "RabbitMQ",
      "GraphQL",
      "gRPC",
    ],
  },
];

function AmbientNetwork() {
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(-300);
  const pointerY = useMotionValue(-300);
  const glowX = useSpring(pointerX, { stiffness: 90, damping: 24 });
  const glowY = useSpring(pointerY, { stiffness: 90, damping: 24 });
  useEffect(() => {
    if (reduced) return;
    const follow = (event: PointerEvent) => {
      pointerX.set(event.clientX - 220);
      pointerY.set(event.clientY - 220);
    };
    window.addEventListener("pointermove", follow, { passive: true });
    return () => window.removeEventListener("pointermove", follow);
  }, [pointerX, pointerY, reduced]);
  return (
    <div
      aria-hidden
      className="ambient-network pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {!reduced && (
        <motion.div
          style={{ x: glowX, y: glowY }}
          className="absolute left-0 top-0 h-[440px] w-[440px] rounded-full bg-cyan-400/[.035] blur-3xl"
        />
      )}
      <svg
        className="absolute inset-0 h-full w-full opacity-[.16]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="network-line" x1="0" x2="1">
            <stop stopColor="#22d3ee" stopOpacity="0" />
            <stop offset=".5" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#34d399" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[
          "M-80 190 C260 80 380 330 710 215 S1120 70 1520 230",
          "M-100 690 C220 520 470 780 760 610 S1160 470 1530 680",
          "M260 -80 C180 230 420 390 300 980",
          "M1180 -80 C1260 240 1010 430 1190 980",
        ].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="url(#network-line)"
            strokeWidth="1"
            strokeDasharray="8 20"
            initial={{ strokeDashoffset: 0 }}
            animate={reduced ? {} : { strokeDashoffset: i % 2 ? 112 : -112 }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        {[
          [220, 155],
          [520, 260],
          [820, 175],
          [1110, 125],
          [340, 665],
          [720, 625],
          [1050, 560],
          [1210, 720],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="3"
            fill={i % 2 ? "#34d399" : "#22d3ee"}
            animate={reduced ? {} : { opacity: [0.25, 1, 0.25], r: [2, 4, 2] }}
            transition={{
              duration: 2.2 + i * 0.17,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const output = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true });
  useEffect(() => {
    if (!visible) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => {
        if (output.current)
          output.current.textContent = Math.round(n).toLocaleString();
      },
    });
    return () => controls.stop();
  }, [visible, value]);
  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl border border-white/[.09] bg-white/[.035] p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[.055] sm:p-7"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent opacity-0 transition group-hover:opacity-100" />
      <strong className="block text-4xl font-semibold tracking-[-.05em] text-white sm:text-5xl">
        <span ref={output}>0</span>
        {suffix}
      </strong>
      <span className="mt-3 block font-mono text-[10px] uppercase tracking-[.16em] text-slate-500">
        {label}
      </span>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const x = useSpring(useMotionValue(0), { stiffness: 230, damping: 25 });
  const y = useSpring(useMotionValue(0), { stiffness: 230, damping: 25 });
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.65 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientY - r.top) / r.height - 0.5) * -4);
        y.set(((e.clientX - r.left) / r.width - 0.5) * 5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX: x, rotateY: y, transformPerspective: 1100 }}
      className="group relative flex min-h-[460px] flex-col overflow-hidden rounded-2xl border border-white/[.09] bg-[#0f1520] p-7 shadow-2xl shadow-black/20 will-change-transform sm:p-8"
    >
      <div className="absolute right-[-90px] top-[-90px] h-56 w-56 rounded-full bg-cyan-400/[.06] blur-2xl transition duration-500 group-hover:bg-cyan-400/[.12]" />
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[.18em] text-slate-500">
        <span>{project.label}</span>
        <span>0{index + 1}</span>
      </div>
      <h3 className="mt-16 text-3xl font-semibold tracking-[-.045em] text-white">
        {project.title}
      </h3>
      <p className="mt-5 text-lg leading-8 text-slate-300">
        {project.description}
      </p>
      <div className="mt-8 grid gap-2 border-l border-cyan-400/30 pl-4 font-mono text-[11px] uppercase leading-6 tracking-wider text-slate-300">
        {project.metrics.map((m) => (
          <span key={m}>↳ {m}</span>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap gap-2 pt-9">
        {project.stack.map((s, i) => (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            key={s}
            className="rounded-full border border-white/[.09] bg-white/[.03] px-3 py-1.5 font-mono text-[10px] text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-300"
          >
            {s}
          </motion.span>
        ))}
      </div>
    </motion.article>
  );
}

function ContactForm() {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      `Portfolio enquiry from ${d.get("name")}`,
    );
    const body = encodeURIComponent(
      `${d.get("message")}\n\nReply to: ${d.get("email")}`,
    );
    location.href = `mailto:Abhyluna2000@gmail.com?subject=${subject}&body=${body}`;
  };
  return (
    <form
      onSubmit={submit}
      className="grid gap-3 rounded-2xl border border-white/[.09] bg-white/[.035] p-5 sm:p-7"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="name"
          required
          placeholder="Your name"
          className="rounded-xl border border-white/[.09] bg-black/20 px-4 py-3 text-base text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/50"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email address"
          className="rounded-xl border border-white/[.09] bg-black/20 px-4 py-3 text-base text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/50"
        />
      </div>
      <textarea
        name="message"
        required
        rows={5}
        placeholder="Tell me about the role, team, or system..."
        className="resize-none rounded-xl border border-white/[.09] bg-black/20 px-4 py-3 text-base text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/50"
      />
      <button className="rounded-xl bg-cyan-400 px-5 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-300">
        Send message →
      </button>
      <p className="font-mono text-[10px] text-slate-500">
        Opens your email client with the message pre-filled.
      </p>
    </form>
  );
}

type DeskPanel = "architecture" | "terminal" | "books" | null;

function BugHunter() {
  const [bugs, setBugs] = useState([0, 1, 2]);
  const [score, setScore] = useState(0);
  const reduced = useReducedMotion();
  const squash = (bug: number) => {
    setBugs((v) => v.filter((x) => x !== bug));
    setScore((s) => s + 1);
    setTimeout(() => setBugs((v) => (v.includes(bug) ? v : [...v, bug])), 2200);
  };
  return (
    <div
      className="relative mx-auto h-64 w-80 select-none"
      aria-label="Animated Abhishek debugging software bugs"
    >
      <div className="absolute inset-x-10 bottom-4 h-8 rounded-[50%] bg-zinc-900/10 blur-md" />
      <motion.div
        animate={reduced ? {} : { y: [0, -5, 0] }}
        transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-7 left-1/2 h-48 w-32 -translate-x-1/2"
      >
        <div className="absolute left-1/2 top-0 h-16 w-14 -translate-x-1/2 rounded-[45%_45%_48%_48%] bg-[#c98f67] shadow-inner">
          <div className="absolute -top-1 left-1 h-7 w-12 rounded-t-[55%] bg-zinc-900" />
          <i className="absolute left-3 top-8 h-1 w-1 rounded-full bg-zinc-900" />
          <i className="absolute right-3 top-8 h-1 w-1 rounded-full bg-zinc-900" />
          <span className="absolute left-[18px] top-[43px] h-1 w-5 rounded-full border-b-2 border-zinc-700" />
        </div>
        <div className="absolute left-1/2 top-[58px] h-24 w-24 -translate-x-1/2 rounded-t-3xl bg-gradient-to-b from-blue-800 to-indigo-950 shadow-[inset_0_1px_rgba(255,255,255,.25),0_14px_30px_rgba(30,58,138,.25)]">
          <span className="absolute left-1/2 top-7 -translate-x-1/2 font-mono text-[11px] font-bold text-cyan-300">{`</>`}</span>
        </div>
        <div className="absolute bottom-0 left-7 h-12 w-5 rounded-b-lg bg-zinc-800" />
        <div className="absolute bottom-0 right-7 h-12 w-5 rounded-b-lg bg-zinc-800" />
        <motion.div
          animate={reduced ? {} : { rotate: [-18, 38, -18] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-4 top-20 h-5 w-20 origin-left rounded-full bg-[#c98f67]"
        >
          <span className="absolute -right-3 -top-8 rotate-[-25deg] rounded-lg border-2 border-amber-600 bg-gradient-to-br from-amber-200 to-amber-500 px-3 py-2 text-xl shadow-lg">
            ⌁
          </span>
        </motion.div>
      </motion.div>
      {bugs.map((bug, i) => (
        <motion.button
          aria-label="Eliminate software bug"
          key={bug}
          onClick={() => squash(bug)}
          initial={{ scale: 0 }}
          animate={
            reduced
              ? { scale: 1 }
              : {
                  scale: 1,
                  x: [0, i % 2 ? 12 : -14, 0],
                  y: [0, -10, 4, 0],
                  rotate: [0, 8, -8, 0],
                }
          }
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            scale: { duration: 0.25 },
            x: { duration: 2 + i * 0.4, repeat: Infinity },
            y: { duration: 1.8 + i * 0.3, repeat: Infinity },
            rotate: { duration: 1.5, repeat: Infinity },
          }}
          className={`absolute z-20 grid h-10 w-10 place-items-center rounded-xl border border-red-300 bg-red-100 text-xl shadow-lg ${i === 0 ? "left-2 top-20" : i === 1 ? "right-2 top-12" : "right-5 bottom-5"}`}
        >
          🐞
        </motion.button>
      ))}
      <div className="absolute bottom-0 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-amber-300/70 bg-white/90 px-3 py-1.5 font-mono text-[8px] tracking-wider shadow-lg backdrop-blur">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
        BUGS ELIMINATED: {score}
      </div>
    </div>
  );
}

function SystemGuide() {
  const dragged = useRef(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const avatarX = useMotionValue(0);
  const avatarY = useMotionValue(0);
  const [dragBounds, setDragBounds] = useState({
    left: -240,
    right: 0,
    top: -400,
    bottom: 0,
  });
  const [topic, setTopic] = useState<{ name: string; text: string } | null>(
    null,
  );
  const topicTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [messages, setMessages] = useState<
    { role: "agent" | "visitor"; text: string }[]
  >([
    {
      role: "agent",
      text: "Hi, I’m Abhishek’s portfolio agent. Ask me about his backend experience, projects, technical stack, or availability.",
    },
  ]);
  const answer = (question: string) => {
    const q = question.toLowerCase();
    if (/skill|stack|technology|java|spring/.test(q))
      return "His core stack is Java, Spring Boot, REST APIs, PostgreSQL, Kafka, AWS, Docker, Kubernetes, Jenkins, JUnit, and Mockito.";
    if (/experience|work|ciklum|cred/.test(q))
      return "He has 4+ years of software development experience, currently building compliance microservices at Ciklum after working on inventory and reporting systems at CRED.";
    if (/project|built|portfolio/.test(q))
      return "Featured work includes an enterprise compliance platform, an inventory and reporting system, and cloud-native delivery automation—all backed by measurable production outcomes.";
    if (/metric|impact|performance|latency|scale/.test(q))
      return "Verified impact includes API latency reduced from 500ms to 400ms, PostgreSQL throughput improved by 30%, support for 20,000+ peak concurrent requests, and 95% test coverage.";
    if (/available|hire|location|ottawa|relocat/.test(q))
      return "He is based in Ottawa, Ontario and is open to backend and software engineering opportunities, including relocation.";
    if (/contact|email|reach|resume|résumé/.test(q))
      return "You can email him at Abhyluna2000@gmail.com or use the résumé button in the navigation. His GitHub and LinkedIn are available in the contact section.";
    return "I can help with his skills, experience, projects, performance metrics, availability, résumé, or contact details. What would you like to explore?";
  };
  const ask = (question: string) => {
    if (!question.trim()) return;
    setMessages((v) => [
      ...v,
      { role: "visitor", text: question },
      { role: "agent", text: answer(question) },
    ]);
    setInput("");
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };
  useEffect(() => {
    const measureDragArea = () =>
      setDragBounds({
        left: -Math.max(0, window.innerWidth - 112),
        right: 0,
        top: -Math.max(0, window.innerHeight - 128),
        bottom: 0,
      });
    measureDragArea();
    window.addEventListener("resize", measureDragArea);
    return () => window.removeEventListener("resize", measureDragArea);
  }, []);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, []);
  useEffect(() => {
    const topics: Record<string, { name: string; text: string }> = {
      home: {
        name: "Interactive workspace",
        text: "Explore the desk, open the terminal, inspect architecture, and eliminate a few bugs.",
      },
      projects: {
        name: "Selected case studies",
        text: "These systems show verified improvements in latency, throughput, testing, and delivery.",
      },
      toolbox: {
        name: "Engineering toolbox",
        text: "A production stack centered on Java, Spring Boot, data systems, cloud infrastructure, and messaging.",
      },
      "architecture-lab": {
        name: "System design laboratory",
        text: "Inject failures, examine safeguards, compare architecture decisions, and review production-readiness practices.",
      },
      journey: {
        name: "Professional journey",
        text: "A timeline of backend ownership at Ciklum and CRED, from requirements through production support.",
      },
      contact: {
        name: "Contact",
        text: "Ready to discuss a backend role, scalable system, or engineering challenge with Abhishek.",
      },
    };
    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!active) return;
        const next = topics[active.target.id];
        if (!next) return;
        setTopic(next);
        if (topicTimer.current) clearTimeout(topicTimer.current);
        topicTimer.current = setTimeout(() => setTopic(null), 3200);
      },
      { threshold: [0.25, 0.45, 0.65], rootMargin: "-12% 0px -25%" },
    );
    Object.keys(topics).forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => {
      observer.disconnect();
      if (topicTimer.current) clearTimeout(topicTimer.current);
    };
  }, []);
  return (
    <>
      <div className="system-guide pointer-events-none fixed inset-0 z-[55]">
        <motion.button
          style={{ x: avatarX, y: avatarY }}
          drag
          dragConstraints={dragBounds}
          dragMomentum={false}
          dragElastic={0}
          dragSnapToOrigin={false}
          onKeyDown={(e) => {
            const step = 20;
            if (e.key === "ArrowLeft") avatarX.set(avatarX.get() - step);
            if (e.key === "ArrowRight") avatarX.set(avatarX.get() + step);
            if (e.key === "ArrowUp") avatarY.set(avatarY.get() - step);
            if (e.key === "ArrowDown") avatarY.set(avatarY.get() + step);
          }}
          onDragStart={() => {
            dragged.current = true;
          }}
          onDragEnd={() =>
            setTimeout(() => {
              dragged.current = false;
            }, 80)
          }
          onTap={() => {
            if (!dragged.current) setOpen((v) => !v);
          }}
          whileDrag={{ scale: 1.08, cursor: "grabbing" }}
          whileHover={{ scale: 1.05 }}
          className="pointer-events-auto fixed bottom-6 right-6 cursor-grab select-none touch-none focus-visible:outline focus-visible:outline-4 focus-visible:outline-blue-400"
          aria-label="Drag Abhishek's avatar, use arrow keys to move it, or click to open the portfolio agent"
        >
          <div
            className={`relative h-20 w-20 rounded-full border-2 bg-white p-0.5 shadow-[0_15px_45px_rgba(0,0,0,.32)] transition ${open ? "border-blue-400 ring-4 ring-blue-400/20" : "border-amber-300 ring-4 ring-amber-300/15"}`}
          >
            <img
              src={`${import.meta.env.BASE_URL}avatar-3d.png`}
              alt="Abhishek portfolio agent"
              draggable={false}
              className="pointer-events-none h-full w-full select-none rounded-full object-cover"
            />
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [0.65, 0, 0.65] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className={`absolute -inset-2 -z-10 rounded-full border ${open ? "border-blue-400" : "border-cyan-300"}`}
            />
            <span
              className={`absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-1 font-mono text-[7px] tracking-wider text-white ${open ? "bg-blue-600" : "bg-zinc-950"}`}
            >
              {open ? "AI AGENT" : "DRAG / ASK"}
            </span>
          </div>
        </motion.button>
      </div>
      <AnimatePresence>
        {topic && !open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            className="topic-announcement pointer-events-none fixed bottom-5 left-1/2 z-[54] flex w-[min(440px,calc(100vw-32px))] -translate-x-1/2 items-center gap-3 rounded-2xl border border-amber-300/50 bg-[#fffdf7]/95 p-3 text-zinc-900 shadow-[0_18px_60px_rgba(0,0,0,.28)] backdrop-blur"
          >
            <img
              src={`${import.meta.env.BASE_URL}avatar-3d.png`}
              alt=""
              className="h-12 w-12 shrink-0 rounded-full border border-amber-300 object-cover"
            />
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[.14em] text-blue-700">
                {topic.name}
              </p>
              <p className="mt-1 text-sm leading-5 text-zinc-600">
                {topic.text}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            className="fixed bottom-28 right-4 z-[60] flex h-[min(520px,70vh)] w-[min(380px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-blue-300/30 bg-[#0b0f17]/95 text-white shadow-[0_28px_90px_rgba(0,0,0,.45)] backdrop-blur-xl"
          >
            <header className="flex items-center gap-3 border-b border-white/10 p-4">
              <img
                src={`${import.meta.env.BASE_URL}avatar-3d.png`}
                alt=""
                className="h-10 w-10 rounded-full border border-blue-300 object-cover"
              />
              <div>
                <p className="text-sm font-semibold">Ask Abhishek AI</p>
                <p className="font-mono text-[8px] tracking-wider text-emerald-300">
                  ● PORTFOLIO KNOWLEDGE ONLINE
                </p>
              </div>
              <button
                onClick={() => {
                  avatarX.set(0);
                  avatarY.set(0);
                }}
                className="ml-auto text-[9px] text-slate-500 hover:text-white"
              >
                RESET
              </button>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-500 hover:text-white"
                aria-label="Close assistant"
              >
                ×
              </button>
            </header>
            <div className="flex-1 space-y-3 overflow-auto p-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[88%] rounded-xl px-3 py-2.5 text-xs leading-5 ${m.role === "agent" ? "bg-white/[.07] text-slate-300" : "ml-auto bg-blue-600 text-white"}`}
                >
                  {m.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2 overflow-x-auto border-t border-white/10 px-3 pt-3">
              {["Core skills", "Impact metrics", "Availability"].map((q) => (
                <button
                  onClick={() => ask(q)}
                  key={q}
                  className="whitespace-nowrap rounded-full border border-white/10 px-3 py-1.5 font-mono text-[8px] text-slate-400 hover:border-blue-400 hover:text-white"
                >
                  {q}
                </button>
              ))}
            </div>
            <form onSubmit={submit} className="flex gap-2 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Abhishek…"
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-xs outline-none placeholder:text-slate-600 focus:border-blue-400"
              />
              <button className="rounded-xl bg-blue-600 px-3 text-xs font-semibold">
                Send
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}

function RecruiterMode() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-5 z-50 rounded-full border border-blue-300/30 bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xl hover:bg-blue-500"
      >
        Recruiter Mode
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] overflow-auto bg-[#080c12]/95 p-4 backdrop-blur-xl"
          >
            <div className="mx-auto my-10 max-w-4xl rounded-3xl border border-white/10 bg-[#0f1520] p-6 text-white shadow-2xl sm:p-10">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] tracking-[.2em] text-cyan-300">
                  30-SECOND PROFILE
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="text-2xl text-slate-500 hover:text-white"
                >
                  ×
                </button>
              </div>
              <h2 className="mt-8 text-4xl font-semibold tracking-[-.05em] sm:text-6xl">
                Abhishek Lunagariya
              </h2>
              <p className="mt-3 text-xl text-slate-400">
                Backend Software Developer · Ottawa, Ontario
              </p>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
                4+ years building Java and Spring Boot services, REST APIs,
                distributed messaging, PostgreSQL systems, AWS integrations,
                automated testing, and production delivery.
              </p>
              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  ["20K+", "peak concurrent requests"],
                  ["30%", "database throughput gain"],
                  ["95%", "test coverage"],
                ].map((x) => (
                  <div
                    className="rounded-2xl border border-white/10 bg-white/[.04] p-5"
                    key={x[0]}
                  >
                    <strong className="text-3xl">{x[0]}</strong>
                    <span className="mt-2 block text-sm text-slate-500">
                      {x[1]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="Abhishek_Lunagariya_Resume.pdf"
                  className="rounded-xl bg-white px-5 py-3 font-semibold text-zinc-950 no-underline"
                >
                  Résumé ↓
                </a>
                <a
                  href="https://github.com/Lucifer7600"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/10 px-5 py-3 no-underline"
                >
                  GitHub ↗
                </a>
                <a
                  href="mailto:Abhyluna2000@gmail.com"
                  className="rounded-xl border border-cyan-400/30 px-5 py-3 text-cyan-300 no-underline"
                >
                  Email ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CaseStudy() {
  return (
    <section
      id="case-study"
      className="border-y border-white/[.07] bg-[#080c12]"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-36">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[.2em] text-emerald-300">
            Deep dive · verified production impact
          </p>
          <h2 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-.055em] text-white sm:text-7xl">
            Making a compliance API faster without trading away reliability.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-4 lg:grid-cols-2">
          {[
            [
              "01 / Problem",
              "A high-use compliance endpoint took roughly 500ms against large datasets, affecting responsiveness during peak activity.",
            ],
            [
              "02 / Investigation",
              "Measured application stages, reviewed logs and execution plans, and isolated repeated database calls plus a missing composite index.",
            ],
            [
              "03 / Engineering",
              "Consolidated calls, introduced pagination, optimized the JPA query, and coordinated an indexing change with database specialists.",
            ],
            [
              "04 / Validation",
              "Compared execution plans, ran unit and integration tests, tested large datasets, and monitored application and database metrics after release.",
            ],
          ].map((x) => (
            <article
              className="rounded-2xl border border-white/[.09] bg-white/[.025] p-6 sm:p-8"
              key={x[0]}
            >
              <p className="font-mono text-[10px] tracking-[.16em] text-cyan-300">
                {x[0]}
              </p>
              <p className="mt-6 text-lg leading-8 text-slate-300">{x[1]}</p>
            </article>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ["500 → 400ms", "response time"],
            ["+30%", "PostgreSQL throughput"],
            ["20K+", "peak concurrent requests"],
          ].map((x) => (
            <div
              className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[.04] p-6"
              key={x[0]}
            >
              <strong className="text-3xl text-white">{x[0]}</strong>
              <span className="mt-2 block text-sm text-slate-500">{x[1]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EngineeringEvidence() {
  const snippets = [
    {
      title: "API contract",
      code: `GET /api/v1/compliance-records?page=0&size=25\n200 OK · paginated response · validated filters`,
    },
    {
      title: "Persistence strategy",
      code: `EXPLAIN ANALYZE → identify scan cost\ncomposite index → optimized JPA query → verify plan`,
    },
    {
      title: "Release confidence",
      code: `JUnit + Mockito → integration test → Postman\nDocker image → Jenkins gate → monitored rollout`,
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-36">
      <Reveal>
        <p className="font-mono text-[10px] uppercase tracking-[.2em] text-cyan-300">
          Engineering evidence
        </p>
        <h2 className="mt-5 text-5xl font-semibold tracking-[-.055em] text-white sm:text-7xl">
          How the work is structured.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          Representative, sanitized examples of the contracts, database
          reasoning, and delivery discipline behind the outcomes.
        </p>
      </Reveal>
      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {snippets.map((s, i) => (
          <article
            className="overflow-hidden rounded-2xl border border-white/[.09] bg-[#070a0f]"
            key={s.title}
          >
            <div className="flex justify-between border-b border-white/[.07] px-5 py-3 font-mono text-[9px] text-slate-500">
              <span>
                0{i + 1} / {s.title}
              </span>
              <span className="text-emerald-300">VERIFIED METHOD</span>
            </div>
            <pre className="whitespace-pre-wrap p-5 font-mono text-xs leading-7 text-slate-300">
              {s.code}
            </pre>
          </article>
        ))}
      </div>
    </section>
  );
}

const failureScenarios = [
  {
    name: "Traffic spike",
    signal: "20K concurrent requests",
    path: [0, 1, 2],
    response:
      "Rate limits protect the edge; stateless services scale horizontally; hot reads move to cache.",
  },
  {
    name: "Database slowdown",
    signal: "P95 crosses 400ms",
    path: [1, 2, 4],
    response:
      "Tracing isolates the query, timeouts stop request pileups, and a replica absorbs safe read traffic.",
  },
  {
    name: "Duplicate event",
    signal: "Kafka redelivery detected",
    path: [1, 3, 4],
    response:
      "An idempotency key prevents duplicate state changes before the offset is committed.",
  },
  {
    name: "Cache outage",
    signal: "Redis health check fails",
    path: [1, 2, 4],
    response:
      "The circuit opens, bounded database fallback activates, and jittered retries prevent a thundering herd.",
  },
];

function EngineeringLab() {
  const [scenario, setScenario] = useState(0);
  const [decision, setDecision] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);
  const active = failureScenarios[scenario];
  const nodes = [
    "API gateway",
    "Spring services",
    "PostgreSQL",
    "Kafka",
    "Observability",
  ];
  const decisions = [
    [
      "Kafka or RabbitMQ?",
      "Kafka fits replayable, ordered event streams and throughput-heavy pipelines. RabbitMQ is often simpler for task queues with flexible routing. The choice follows delivery semantics—not popularity.",
    ],
    [
      "REST or gRPC?",
      "REST keeps public contracts accessible and debuggable. gRPC is compelling for typed, low-latency internal calls where both clients and servers are controlled.",
    ],
    [
      "Monolith or microservices?",
      "Start with clear module boundaries. Split a service only when independent scaling, ownership, deployment, or failure isolation pays for the operational cost.",
    ],
    [
      "PostgreSQL or MongoDB?",
      "PostgreSQL is the default for relational integrity and complex queries. MongoDB earns its place when document-shaped access patterns and flexible schemas are genuine requirements.",
    ],
  ];
  const readiness = [
    "Authentication & authorization",
    "Validation & error contracts",
    "Rate limiting",
    "Idempotency",
    "Caching strategy",
    "Schema migrations",
    "Logs, metrics & traces",
    "Alerts & runbooks",
    "Backups & recovery",
    "Rollback strategy",
  ];
  useEffect(() => {
    const layers = Array.from(
      document.querySelectorAll<HTMLElement>("#architecture-lab .layer-scene"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const centered = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (centered)
          setActiveLayer(layers.indexOf(centered.target as HTMLElement));
      },
      { rootMargin: "-28% 0px -28% 0px", threshold: [0, 0.2, 0.45, 0.7] },
    );
    layers.forEach((layer) => observer.observe(layer));
    return () => observer.disconnect();
  }, []);
  return (
    <section
      id="architecture-lab"
      className="border-y border-white/[.07] bg-[#060a10]"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-36">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[.2em] text-emerald-300">
            Interactive system-design playground
          </p>
          <h2 className="mt-5 max-w-5xl text-5xl font-semibold tracking-[-.055em] text-white sm:text-7xl">
            Break the system. Watch the safeguards respond.
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            Choose a failure mode to explore the defensive patterns used to keep
            backend services predictable under pressure.
          </p>
        </Reveal>
        <div
          data-layer="LAYER 01 / RESILIENCE"
          className={`layer-scene mt-14 grid gap-4 lg:grid-cols-[.7fr_1.3fr] ${activeLayer === 0 ? "layer-active" : ""}`}
        >
          <div className="space-y-2">
            {failureScenarios.map((item, i) => (
              <button
                key={item.name}
                onClick={() => setScenario(i)}
                className={`w-full rounded-2xl border p-5 text-left transition ${scenario === i ? "border-cyan-400/50 bg-cyan-400/[.08]" : "border-white/[.08] bg-white/[.02] hover:border-white/20"}`}
              >
                <span className="font-mono text-[10px] text-slate-500">
                  SIMULATION 0{i + 1}
                </span>
                <strong className="mt-2 block text-lg text-white">
                  {item.name}
                </strong>
                <span className="mt-1 block text-sm text-slate-400">
                  {item.signal}
                </span>
              </button>
            ))}
          </div>
          <motion.div
            key={scenario}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-2xl border border-white/[.09] bg-[#0b0f17] p-5 sm:p-8"
          >
            <div className="relative -mx-8 -mt-8 mb-7 h-px overflow-hidden bg-white/[.06]">
              <motion.span
                key={`packet-${scenario}`}
                initial={{ x: "-15%" }}
                animate={{ x: "720%" }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                className="absolute -top-px h-[3px] w-24 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_14px_#22d3ee]"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-red-300">
                ● INCIDENT INJECTED
              </span>
              <span className="font-mono text-[10px] text-emerald-300">
                SYSTEM CONTAINED
              </span>
            </div>
            <div className="relative mt-10 grid grid-cols-2 gap-4 sm:grid-cols-5">
              {nodes.map((node, i) => (
                <motion.div
                  key={node}
                  animate={
                    active.path.includes(i)
                      ? {
                          borderColor: "rgba(34,211,238,.75)",
                          boxShadow: "0 0 28px rgba(34,211,238,.16)",
                        }
                      : {
                          borderColor: "rgba(255,255,255,.08)",
                          boxShadow: "none",
                        }
                  }
                  className="relative rounded-xl border bg-black/30 p-4 text-center font-mono text-[10px] text-slate-300"
                >
                  <motion.i
                    animate={
                      active.path.includes(i) ? { scale: [1, 1.5, 1] } : {}
                    }
                    transition={{ repeat: Infinity, duration: 1.4 }}
                    className={`mx-auto mb-3 block h-2 w-2 rounded-full ${active.path.includes(i) ? "bg-cyan-300" : "bg-slate-700"}`}
                  />
                  {node}
                </motion.div>
              ))}
            </div>
            <div className="mt-8 rounded-xl border border-emerald-400/20 bg-emerald-400/[.05] p-5">
              <p className="font-mono text-[10px] text-emerald-300">
                RESPONSE STRATEGY
              </p>
              <p className="mt-3 text-base leading-7 text-slate-300">
                {active.response}
              </p>
            </div>
          </motion.div>
        </div>

        <div
          data-layer="LAYER 02 / PERFORMANCE"
          className={`layer-scene mt-24 grid gap-5 lg:grid-cols-2 ${activeLayer === 1 ? "layer-active" : ""}`}
        >
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-cyan-300">
              Performance laboratory
            </p>
            <h3 className="mt-4 text-4xl font-semibold tracking-[-.04em] text-white">
              Evidence beyond vanity counters.
            </h3>
            <p className="mt-5 text-base leading-7 text-slate-400">
              Reported production outcomes are separated from illustrative
              observability fields. Exact percentile and resource data should
              only be published when the underlying benchmark is available.
            </p>
          </Reveal>
          <div className="rounded-2xl border border-white/[.09] bg-white/[.025] p-6">
            {[
              ["API response", 500, 400, "ms"],
              ["Transaction processing", 250, 180, "ms"],
              ["Database throughput", 100, 130, "index"],
            ].map(([label, before, after, unit], i) => (
              <div className="mb-7 last:mb-0" key={label as string}>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{label}</span>
                  <span className="font-mono text-[10px] text-emerald-300">
                    {before} → {after} {unit}
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${i === 2 ? 86 : Math.round((Number(after) / Number(before)) * 100)}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          data-layer="LAYER 03 / DECISIONS"
          className={`layer-scene mt-24 ${activeLayer === 2 ? "layer-active" : ""}`}
        >
          <p className="font-mono text-[10px] uppercase tracking-[.2em] text-emerald-300">
            Architecture decision records
          </p>
          <h3 className="mt-4 text-4xl font-semibold tracking-[-.04em] text-white">
            Technology choices with context.
          </h3>
          <div className="mt-10 grid gap-3 lg:grid-cols-[.7fr_1.3fr]">
            <div className="space-y-2">
              {decisions.map((d, i) => (
                <button
                  key={d[0]}
                  onClick={() => setDecision(i)}
                  className={`w-full rounded-xl border px-5 py-4 text-left text-sm ${decision === i ? "border-emerald-400/35 bg-emerald-400/[.06] text-white" : "border-white/[.08] text-slate-400"}`}
                >
                  {d[0]}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.article
                key={decision}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="rounded-2xl border border-white/[.09] bg-white/[.025] p-7"
              >
                <span className="font-mono text-[10px] text-cyan-300">
                  ADR-00{decision + 1} · CONTEXT / TRADEOFF
                </span>
                <h4 className="mt-5 text-2xl font-semibold text-white">
                  {decisions[decision][0]}
                </h4>
                <p className="mt-5 text-lg leading-8 text-slate-400">
                  {decisions[decision][1]}
                </p>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        <div
          data-layer="LAYER 04 / OPERATIONS"
          className={`layer-scene mt-24 grid gap-5 lg:grid-cols-2 ${activeLayer === 3 ? "layer-active" : ""}`}
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-red-300">
              Anonymized incident story
            </p>
            <h3 className="mt-4 text-4xl font-semibold tracking-[-.04em] text-white">
              From slow endpoint to durable prevention.
            </h3>
            <div className="mt-9 space-y-3">
              {[
                [
                  "Signal",
                  "Response time approached 500ms under larger datasets.",
                ],
                [
                  "Investigation",
                  "Logs, timings, and execution plans exposed repeated calls and an inefficient scan.",
                ],
                [
                  "Mitigation",
                  "Pagination and a consolidated query reduced immediate load.",
                ],
                [
                  "Permanent fix",
                  "A composite index and optimized JPA access path brought response time to about 400ms.",
                ],
                [
                  "Prevention",
                  "Regression coverage and post-release monitoring guarded the improved path.",
                ],
              ].map((x, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  key={x[0]}
                  className="flex gap-4 rounded-xl border border-white/[.08] p-4"
                >
                  <span className="font-mono text-[10px] text-cyan-300">
                    0{i + 1}
                  </span>
                  <p className="text-sm leading-6 text-slate-400">
                    <strong className="mr-2 text-white">{x[0]}:</strong>
                    {x[1]}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-cyan-300">
              Production readiness
            </p>
            <h3 className="mt-4 text-4xl font-semibold tracking-[-.04em] text-white">
              The work after “it runs.”
            </h3>
            <div className="mt-9 grid gap-2 sm:grid-cols-2">
              {readiness.map((item, i) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-white/[.08] bg-white/[.02] p-4 text-sm text-slate-300"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-400/10 text-emerald-300">
                    ✓
                  </span>
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div
          data-layer="LAYER 05 / CONNECT"
          className={`layer-scene layer-scene-cta mt-24 rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/[.08] to-emerald-400/[.03] p-7 sm:p-10 ${activeLayer === 4 ? "layer-active" : ""}`}
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <span className="font-mono text-[10px] text-emerald-300">
                OTTAWA, ONTARIO · OPEN TO BACKEND ROLES
              </span>
              <h3 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
                Need someone who can own the system after deployment?
              </h3>
            </div>
            <motion.a
              href="tel:+15149982933"
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="group relative overflow-hidden rounded-2xl border border-emerald-300/30 bg-emerald-300/[.08] px-7 py-6 text-left text-white no-underline shadow-[0_20px_60px_rgba(52,211,153,.12)]"
            >
              <motion.span
                animate={{ x: ["-140%", "240%"] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  repeatDelay: 1.2,
                  ease: "easeInOut",
                }}
                className="absolute inset-y-0 w-20 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              />
              <span className="relative block font-mono text-[10px] tracking-[.18em] text-emerald-300">
                CALL ABHISHEK
              </span>
              <strong className="relative mt-3 block text-2xl sm:text-3xl">
                +1 (514) 998-2933
              </strong>
              <span className="relative mt-2 block text-sm text-slate-400 transition group-hover:text-slate-200">
                Tap to call →
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}

function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hideAgent, setHideAgent] = useState(false);
  const [hideTopics, setHideTopics] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("motion-paused", paused);
    document.documentElement.classList.toggle("avatar-hidden", hideAgent);
    document.documentElement.classList.toggle("topics-hidden", hideTopics);
  }, [paused, hideAgent, hideTopics]);
  return (
    <div className="fixed bottom-5 left-40 z-50">
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-full border border-white/10 bg-zinc-950/90 px-3 py-2.5 font-mono text-[9px] text-white shadow-xl"
      >
        Accessibility
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute bottom-12 left-0 w-60 rounded-2xl border border-white/10 bg-zinc-950 p-3 text-white shadow-2xl"
          >
            <p className="px-2 py-2 text-sm font-semibold">
              Experience controls
            </p>
            {[
              ["Pause animations", paused, setPaused],
              ["Hide AI avatar", hideAgent, setHideAgent],
              ["Hide topic briefings", hideTopics, setHideTopics],
            ].map(([label, value, setter]) => (
              <button
                onClick={() => {
                  (setter as React.Dispatch<React.SetStateAction<boolean>>)(
                    !(value as boolean),
                  );
                }}
                key={label as string}
                className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-xs text-slate-400 hover:bg-white/5"
              >
                <span>{label as string}</span>
                <span
                  className={`h-5 w-9 rounded-full p-0.5 ${value ? "bg-blue-500" : "bg-slate-700"}`}
                >
                  <i
                    className={`block h-4 w-4 rounded-full bg-white transition ${value ? "translate-x-4" : ""}`}
                  />
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DeskHero() {
  const [mode, setMode] = useState<"clean" | "chaos">("clean");
  const [panel, setPanel] = useState<DeskPanel>(null);
  const [coffee, setCoffee] = useState(92);
  const [playing, setPlaying] = useState(false);
  const [terminal, setTerminal] = useState([
    "system ready",
    "type: help, skills, metrics",
  ]);
  const [command, setCommand] = useState("");
  const runTerminal = (e: FormEvent) => {
    e.preventDefault();
    const cmd = command.trim().toLowerCase();
    if (!cmd) return;
    const answers: Record<string, string[]> = {
      help: ["help · skills · metrics · clear"],
      skills: ["Java / Spring Boot / PostgreSQL / Kafka / AWS"],
      metrics: ["API 500ms → 400ms · DB throughput +30% · 20K+ peak requests"],
    };
    setTerminal((v) =>
      cmd === "clear"
        ? []
        : [...v, `> ${cmd}`, ...(answers[cmd] || ["unknown command"])],
    );
    setCommand("");
  };
  const sound = () => {
    const audio = new Audio("/typewriter.mp3");
    audio.volume = 0.3;
    audio.currentTime = 0;
    void audio.play();
  };
  const objects = [
    {
      key: "server",
      label: "ARCHITECTURE",
      icon: "▥",
      pos: "left-[5%] top-[12%]",
      action: () => setPanel("architecture"),
      tone: "bg-cyan-100 border-cyan-300",
    },
    {
      key: "coffee",
      label: `COFFEE ${coffee}%`,
      icon: "☕",
      pos: "right-[7%] top-[16%]",
      action: () => setCoffee((v) => Math.min(100, v + 2)),
      tone: "bg-amber-100 border-amber-300",
    },
    {
      key: "terminal",
      label: "TERMINAL",
      icon: ">_",
      pos: "left-[7%] bottom-[15%]",
      action: () => setPanel("terminal"),
      tone: "bg-zinc-900 border-zinc-700 text-emerald-300",
    },
    {
      key: "keyboard",
      label: "CLICKY KEYS",
      icon: "⌨",
      pos: "right-[27%] bottom-[10%]",
      action: sound,
      tone: "bg-white border-zinc-300",
    },
    {
      key: "books",
      label: "READING LIST",
      icon: "▤",
      pos: "right-[6%] bottom-[22%]",
      action: () => setPanel("books"),
      tone: "bg-violet-100 border-violet-300",
    },
    {
      key: "music",
      label: playing ? "PLAYING: DEEP FOCUS" : "HEADPHONES",
      icon: "◉",
      pos: "left-[29%] top-[8%]",
      action: () => setPlaying(!playing),
      tone: "bg-blue-100 border-blue-300",
    },
  ];
  return (
    <section
      id="home"
      className={`relative min-h-[980px] overflow-hidden bg-[#f7f6f2] text-zinc-900 transition ${mode === "chaos" ? "desk-chaos" : ""}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_26%,rgba(255,255,255,.98),transparent_34%),radial-gradient(circle_at_80%_5%,rgba(214,181,104,.18),transparent_26%),radial-gradient(circle_at_10%_70%,rgba(29,78,216,.08),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(24,24,27,.075)_1px,transparent_1px),linear-gradient(90deg,rgba(24,24,27,.075)_1px,transparent_1px)] bg-[size:32px_32px]" />
      {mode === "chaos" && (
        <>
          <div className="pointer-events-none absolute inset-0 border-[12px] border-emerald-400/20" />
          <pre className="absolute left-5 top-24 z-10 hidden rounded-lg bg-zinc-950/90 p-4 font-mono text-[9px] leading-5 text-emerald-300 lg:block">{`{\n  "env": "production",\n  "api.p95": "400ms",\n  "db.throughput": "+30%",\n  "status": "healthy"\n}`}</pre>
        </>
      )}
      <div className="relative z-20 mx-auto flex max-w-7xl flex-col px-5 pb-24 pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[10px] uppercase tracking-[.2em] text-zinc-500"
          >
            Abhishek Lunagariya · backend systems · Ottawa, Ontario
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.7 }}
            className="mt-7 text-[clamp(3.3rem,7.2vw,7rem)] font-bold uppercase leading-[.88] tracking-[-.07em] drop-shadow-[0_2px_0_rgba(255,255,255,.9)]"
          >
            The world is full of{" "}
            <span className="bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              slow APIs
            </span>{" "}
            & unhandled exceptions.
          </motion.h1>
          <p className="mx-auto mt-8 max-w-3xl text-lg font-medium leading-8 text-zinc-600">
            I design the architecture{" "}
            <strong className="text-zinc-950">
              that makes systems fault-tolerant and fast.
            </strong>
          </p>
          <p className="mx-auto mt-4 max-w-2xl font-mono text-[11px] leading-6 text-zinc-500">
            4+ years of asking “Why is this endpoint taking 500ms?” until it
            takes 400ms—and the database handles 30% more throughput.
          </p>
        </div>
        <div className="relative mt-10 hidden h-[430px] lg:block">
          <div className="absolute left-1/2 top-[28%] z-20 -translate-x-1/2">
            <BugHunter />
          </div>
          {objects.map((o, i) => (
            <motion.button
              drag
              dragMomentum={false}
              whileDrag={{ scale: 1.08, zIndex: 40 }}
              whileHover={{ y: -5, rotate: i % 2 ? 1 : -1 }}
              onClick={o.action}
              key={o.key}
              className={`absolute ${o.pos} ${o.tone} z-20 grid min-h-28 min-w-32 cursor-grab place-items-center rounded-2xl border p-4 shadow-[0_18px_45px_rgba(24,24,27,.14),inset_0_1px_rgba(255,255,255,.75)] active:cursor-grabbing`}
            >
              <span className="text-4xl font-bold">{o.icon}</span>
              <span className="font-mono text-[9px] tracking-[.14em]">
                {o.label}
              </span>
            </motion.button>
          ))}
          <motion.div
            drag
            dragMomentum={false}
            className="absolute left-[22%] bottom-[13%] z-20 w-52 rotate-[-4deg] cursor-grab bg-[#fff19e] p-5 shadow-[0_18px_42px_rgba(24,24,27,.13)]"
          >
            <p className="font-mono text-[9px] font-bold">TO DO</p>
            <p className="mt-3 text-sm font-semibold">
              Optimize DB queries
              <br />
              Refactor auth service
            </p>
          </motion.div>
          <motion.div
            drag
            dragMomentum={false}
            className="absolute right-[22%] top-[11%] z-20 w-48 rotate-[3deg] cursor-grab bg-[#baf7d0] p-5 shadow-[0_18px_42px_rgba(24,24,27,.13)]"
          >
            <p className="font-mono text-[9px] font-bold">ON-CALL DUTY</p>
            <p className="mt-3 text-sm font-semibold">0 incidents today 🎉</p>
          </motion.div>
          <motion.div
            drag
            dragMomentum={false}
            className="absolute left-[46%] top-[3%] z-10 rotate-[-2deg] rounded-md border border-amber-500/60 bg-white px-5 py-4 shadow-[0_18px_40px_rgba(24,24,27,.12)]"
          >
            <p className="font-mono text-[9px] text-zinc-400">POSTCARD / 001</p>
            <p className="mt-2 text-lg font-bold">Based in Ottawa, Ontario</p>
          </motion.div>
        </div>
        <div className="mt-10 lg:hidden">
          <BugHunter />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 lg:hidden">
          {objects.map((o) => (
            <button
              onClick={o.action}
              key={o.key}
              className={`${o.tone} flex min-h-28 flex-col items-center justify-center gap-2 rounded-2xl border p-3 shadow-[0_14px_35px_rgba(24,24,27,.12)]`}
            >
              <span className="text-3xl font-bold">{o.icon}</span>
              <span className="font-mono text-[8px]">{o.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 rounded-full border border-zinc-300 bg-white/90 p-1 shadow-xl backdrop-blur">
        <button
          onClick={() => setMode("clean")}
          className={`rounded-full px-4 py-2 font-mono text-[9px] ${mode === "clean" ? "bg-zinc-900 text-white" : "text-zinc-500"}`}
        >
          CLEAN MODE
        </button>
        <button
          onClick={() => setMode("chaos")}
          className={`rounded-full px-4 py-2 font-mono text-[9px] ${mode === "chaos" ? "bg-emerald-500 text-zinc-950" : "text-zinc-500"}`}
        >
          CHAOS / DEV
        </button>
      </div>
      <AnimatePresence>
        {panel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] grid place-items-center bg-zinc-950/70 p-4 backdrop-blur-sm"
            onClick={() => setPanel(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-700 bg-[#0b0f17] text-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 font-mono text-[10px]">
                <span>{panel.toUpperCase()}.MODAL</span>
                <button
                  onClick={() => setPanel(null)}
                  className="text-slate-400 hover:text-white"
                >
                  ESC / CLOSE
                </button>
              </div>
              <div className="p-6 sm:p-8">
                {panel === "architecture" && (
                  <>
                    <h2 className="text-3xl font-semibold">
                      System architecture
                    </h2>
                    <div className="mt-8 grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
                      {[
                        "API Gateway",
                        "Spring Services",
                        "PostgreSQL + S3",
                      ].map((x, i) => (
                        <div className="contents" key={x}>
                          <div className="rounded-xl border border-cyan-400/25 bg-cyan-400/5 p-4 text-center font-mono text-xs text-cyan-200">
                            {x}
                          </div>
                          {i < 2 && (
                            <span className="hidden text-slate-600 sm:block">
                              →
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="mt-6 text-sm leading-7 text-slate-400">
                      Validated requests move through explicit service
                      boundaries into optimized persistence and secure report
                      storage, supported by automated delivery and production
                      monitoring.
                    </p>
                  </>
                )}
                {panel === "books" && (
                  <>
                    <h2 className="text-3xl font-semibold">
                      Engineering reading list
                    </h2>
                    <div className="mt-7 space-y-3">
                      {[
                        "Designing Data-Intensive Applications — Martin Kleppmann",
                        "Clean Architecture — Robert C. Martin",
                        "Building Microservices — Sam Newman",
                        "Database Internals — Alex Petrov",
                      ].map((b, i) => (
                        <div
                          className="flex gap-4 rounded-xl border border-white/10 p-4"
                          key={b}
                        >
                          <span className="font-mono text-cyan-300">
                            0{i + 1}
                          </span>
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {panel === "terminal" && (
                  <>
                    <div className="h-72 overflow-auto rounded-xl bg-black p-5 font-mono text-xs leading-6 text-emerald-300">
                      {terminal.map((l, i) => (
                        <div key={`${l}-${i}`}>{l}</div>
                      ))}
                      <form onSubmit={runTerminal} className="flex">
                        <span className="mr-2">portfolio:~$</span>
                        <input
                          autoFocus
                          value={command}
                          onChange={(e) => setCommand(e.target.value)}
                          className="min-w-0 flex-1 bg-transparent text-white outline-none"
                        />
                      </form>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function PortfolioIntro({ onComplete }: { onComplete: () => void }) {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const stages = [
      setTimeout(() => setStage(1), 650),
      setTimeout(() => setStage(2), 1550),
      setTimeout(() => setStage(3), 2600),
    ];
    const finish = setTimeout(onComplete, reduced ? 1200 : 5200);
    return () => {
      stages.forEach(clearTimeout);
      clearTimeout(finish);
      document.body.style.overflow = "";
    };
  }, [onComplete, reduced]);
  return (
    <motion.section
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(16px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-[#05080d] px-5 text-white"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,.04)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]"
      />
      <motion.div
        aria-hidden
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.82, 1.08, 0.96], opacity: [0, 0.55, 0.22] }}
        transition={{ duration: 4, ease: "easeOut" }}
        className="absolute h-[min(80vw,680px)] w-[min(80vw,680px)] rounded-full border border-cyan-300/20 shadow-[0_0_140px_rgba(34,211,238,.12),inset_0_0_120px_rgba(52,211,153,.05)]"
      />
      <div className="relative mx-auto w-full max-w-5xl text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.7, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto h-28 w-28 sm:h-36 sm:w-36"
        >
          <motion.div
            animate={reduced ? {} : { rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-3 rounded-full border border-dashed border-cyan-300/35"
          />
          <img
            src={`${import.meta.env.BASE_URL}avatar-3d.png`}
            alt="Abhishek Lunagariya"
            className="h-full w-full rounded-full border-2 border-amber-200/70 bg-white object-cover shadow-[0_22px_80px_rgba(34,211,238,.22)]"
          />
          <motion.span
            animate={
              reduced ? {} : { scale: [1, 1.7, 1], opacity: [1, 0.2, 1] }
            }
            transition={{ duration: 1.7, repeat: Infinity }}
            className="absolute bottom-2 right-1 h-4 w-4 rounded-full border-2 border-[#05080d] bg-emerald-400"
          />
        </motion.div>
        <AnimatePresence>
          {stage >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-9"
            >
              <p className="font-mono text-[10px] uppercase tracking-[.35em] text-cyan-300">
                Initializing professional profile
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-[-.055em] sm:text-7xl">
                ABHISHEK LUNAGARIYA
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {stage >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 font-mono text-[10px] tracking-[.16em] text-slate-400"
            >
              <span>BACKEND ENGINEER</span>
              <span className="text-cyan-300">·</span>
              <span>DISTRIBUTED SYSTEMS</span>
              <span className="text-cyan-300">·</span>
              <span>OTTAWA, ONTARIO</span>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {stage >= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mx-auto mt-9 max-w-xl"
            >
              <div className="grid grid-cols-3 gap-2">
                {[
                  ["4+", "YEARS"],
                  ["20K+", "CONCURRENCY"],
                  ["30%", "DB GAIN"],
                ].map((item, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12 }}
                    key={item[1]}
                    className="rounded-xl border border-white/[.08] bg-white/[.025] px-2 py-4"
                  >
                    <strong className="block text-xl text-white sm:text-2xl">
                      {item[0]}
                    </strong>
                    <span className="mt-1 block font-mono text-[7px] tracking-[.16em] text-slate-500">
                      {item[1]}
                    </span>
                  </motion.div>
                ))}
              </div>
              <button
                onClick={onComplete}
                className="group mt-8 rounded-full border border-cyan-300/30 bg-cyan-300/[.07] px-7 py-3.5 font-mono text-[10px] tracking-[.18em] text-cyan-200 transition hover:scale-105 hover:bg-cyan-300/15"
              >
                ENTER PORTFOLIO{" "}
                <span className="inline-block transition group-hover:translate-x-1">
                  →
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/[.05]">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: reduced ? 1 : 5.2, ease: "linear" }}
          className="h-full origin-left bg-gradient-to-r from-cyan-400 via-white to-emerald-400"
        />
      </div>
    </motion.section>
  );
}

function SignatureFinale() {
  const words = ["BUILD", "HARDEN", "SCALE", "EVOLVE"];
  const [word, setWord] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(
      () => setWord((value) => (value + 1) % words.length),
      1800,
    );
    return () => clearInterval(timer);
  }, [reduced]);
  useEffect(() => {
    const restart = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === "r" &&
        !["INPUT", "TEXTAREA"].includes((event.target as HTMLElement).tagName)
      )
        document
          .getElementById("home")
          ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    };
    window.addEventListener("keydown", restart);
    return () => window.removeEventListener("keydown", restart);
  }, [reduced]);
  return (
    <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden border-t border-white/[.07] bg-[#030508] px-5 py-24 text-center">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,.09),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(52,211,153,.07),transparent_32%)]"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 aspect-square w-[min(82vw,760px)] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={reduced ? {} : { rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-cyan-300/15"
        />
        <motion.div
          animate={reduced ? {} : { rotate: -360 }}
          transition={{ duration: 21, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[12%] rounded-full border border-emerald-300/10"
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-y-1/2 rounded-full bg-emerald-300 shadow-[0_0_24px_#34d399]" />
        </motion.div>
        <motion.div
          animate={
            reduced
              ? {}
              : { scale: [0.94, 1.04, 0.94], opacity: [0.35, 0.7, 0.35] }
          }
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-[28%] rounded-full border border-cyan-300/20 shadow-[0_0_80px_rgba(34,211,238,.08)]"
        />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mx-auto mb-9 flex w-fit items-center gap-3 rounded-full border border-emerald-300/20 bg-emerald-300/[.06] px-4 py-2 font-mono text-[10px] tracking-[.18em] text-emerald-300">
            <motion.i
              animate={
                reduced ? {} : { scale: [1, 1.8, 1], opacity: [1, 0.25, 1] }
              }
              transition={{ duration: 1.8, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-emerald-300"
            />
            SYSTEM READY FOR WHAT'S NEXT
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[.28em] text-slate-500">
            Abhishek Lunagariya · Backend Engineer
          </p>
          <h2 className="mt-8 text-[clamp(3.6rem,12vw,10rem)] font-semibold leading-[.78] tracking-[-.08em] text-white">
            LET'S
            <br />
            <span className="inline-block min-w-[5ch] bg-gradient-to-r from-cyan-300 via-white to-emerald-300 bg-clip-text text-transparent">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[word]}
                  initial={
                    reduced
                      ? false
                      : {
                          opacity: 0,
                          y: 55,
                          rotateX: -70,
                          filter: "blur(12px)",
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    filter: "blur(0px)",
                  }}
                  exit={
                    reduced
                      ? {}
                      : {
                          opacity: 0,
                          y: -45,
                          rotateX: 70,
                          filter: "blur(10px)",
                        }
                  }
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {words[word]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>
          <p className="mx-auto mt-10 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
            Reliable systems are never finished. They are observed, challenged,
            improved, and trusted.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:Abhyluna2000@gmail.com"
              className="rounded-full bg-white px-7 py-4 font-semibold text-zinc-950 no-underline transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(255,255,255,.12)]"
            >
              Start a conversation →
            </a>
            <button
              onClick={() =>
                document
                  .getElementById("home")
                  ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" })
              }
              className="rounded-full border border-white/15 px-7 py-4 text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/[.05]"
            >
              Replay the journey
            </button>
          </div>
          <p className="mt-14 font-mono text-[9px] tracking-[.2em] text-slate-700">
            PRESS R TO RESTART · END OF TRANSMISSION
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [headerCompact, setHeaderCompact] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 30 });
  useMotionValueEvent(scrollY, "change", (latest) =>
    setHeaderCompact(latest > 90),
  );
  useEffect(() => {
    const ids = [
      "home",
      "projects",
      "architecture-lab",
      "toolbox",
      "journey",
      "contact",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveNav(visible.target.id);
      },
      { rootMargin: "-32% 0px -52%", threshold: [0, 0.2, 0.5] },
    );
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-200 selection:bg-cyan-400 selection:text-slate-950">
      <AnimatePresence>
        {showIntro && <PortfolioIntro onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>
      <motion.div
        style={{ scaleX: progress, transformOrigin: "left" }}
        className="fixed left-0 right-0 top-0 z-[70] h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(0,229,255,.07),transparent_26%),radial-gradient(circle_at_80%_20%,rgba(0,255,102,.045),transparent_25%)]"
      />
      <AmbientNetwork />
      <SystemGuide />
      <RecruiterMode />
      <AccessibilityPanel />
      <motion.header
        initial={{ opacity: 0, y: -40, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: headerCompact ? 0.965 : 1 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-3 z-50 mx-auto w-[calc(100%-24px)] max-w-6xl overflow-visible rounded-full border text-zinc-900 backdrop-blur-xl transition-colors duration-500 ${headerCompact ? "border-cyan-300/30 bg-white/80 shadow-[0_14px_45px_rgba(0,0,0,.2),0_0_35px_rgba(34,211,238,.06)]" : "border-amber-300/70 bg-white/90 shadow-[0_20px_60px_rgba(24,24,27,.14),inset_0_1px_rgba(255,255,255,1)]"}`}
      >
        <motion.div
          animate={{ height: headerCompact ? 48 : 56 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between px-3 sm:px-4"
        >
          <a
            href="#home"
            className="flex items-center gap-2 pr-2 text-xs font-bold no-underline"
          >
            <motion.img
              src={`${import.meta.env.BASE_URL}avatar-3d.png`}
              alt="Abhishek Lunagariya"
              animate={{
                height: headerCompact ? 34 : 40,
                width: headerCompact ? 34 : 40,
                rotate: headerCompact ? 360 : 0,
              }}
              whileHover={{ scale: 1.12, rotate: -8 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-full border border-amber-300 object-cover shadow-md"
            />
            <span className="hidden sm:inline">ABHISHEK L.</span>
          </a>
          <nav
            className={`${menu ? "flex" : "hidden"} absolute left-3 right-3 top-16 flex-col rounded-2xl border border-zinc-200 bg-white p-2 shadow-2xl md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
          >
            {[
              ["Projects", "projects"],
              ["Architecture", "architecture-lab"],
              ["Tech Stack", "toolbox"],
              ["Playground", "home"],
            ].map((n) => (
              <a
                onClick={() => setMenu(false)}
                className={`relative rounded-full px-3 py-2 font-mono text-[9px] no-underline transition hover:text-zinc-950 ${activeNav === n[1] || (n[1] === "architecture-lab" && activeNav === "journey") ? "text-zinc-950" : "text-zinc-600"}`}
                href={`#${n[1]}`}
                key={n[1]}
              >
                <span className="relative z-10">{n[0]}</span>
                {(activeNav === n[1] ||
                  (n[1] === "architecture-lab" && activeNav === "journey")) && (
                  <motion.span
                    layoutId="active-navigation"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-full border border-cyan-300/30 bg-gradient-to-r from-cyan-100 to-emerald-50 shadow-[0_5px_16px_rgba(34,211,238,.12)]"
                  />
                )}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 font-mono text-[9px] text-zinc-600 lg:flex">
              <motion.i
                animate={{
                  scale: [1, 1.8, 1],
                  boxShadow: [
                    "0 0 0 rgba(16,185,129,0)",
                    "0 0 16px rgba(16,185,129,.7)",
                    "0 0 0 rgba(16,185,129,0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-emerald-500"
              />
              Open to backend roles
            </span>
            <a
              href="Abhishek_Lunagariya_Resume.pdf"
              className="hidden rounded-full border border-amber-300/80 bg-amber-50/70 px-3 py-2 font-mono text-[9px] no-underline transition hover:bg-amber-100 sm:block"
            >
              Résumé PDF ↗
            </a>
            <button
              onClick={() => setMenu(!menu)}
              className="rounded-full border border-zinc-300 px-3 py-2 font-mono text-[9px] md:hidden"
            >
              MENU
            </button>
          </div>
        </motion.div>
        <motion.div
          animate={{
            opacity: headerCompact ? 1 : 0,
            scaleX: headerCompact ? 1 : 0,
          }}
          className="absolute bottom-0 left-[8%] right-[8%] h-px origin-center bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
        />
      </motion.header>
      <main className="relative">
        <DeskHero />
        <section
          id="projects"
          className="border-y border-white/[.07] bg-white/[.015]"
        >
          <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-36">
            <Reveal className="mb-14 max-w-3xl">
              <p className="font-mono text-[10px] uppercase tracking-[.2em] text-cyan-300">
                Selected case studies
              </p>
              <h2 className="mt-5 text-5xl font-semibold tracking-[-.055em] text-white sm:text-7xl">
                Backend work, measured by impact.
              </h2>
            </Reveal>
            <div className="grid gap-4 lg:grid-cols-3">
              {projects.map((p, i) => (
                <ProjectCard key={p.title} project={p} index={i} />
              ))}
            </div>
          </div>
        </section>
        <CaseStudy />
        <section
          id="toolbox"
          className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-36"
        >
          <Reveal className="mb-14 grid gap-5 lg:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.2em] text-emerald-300">
                Engineering toolbox
              </p>
              <h2 className="mt-5 text-5xl font-semibold tracking-[-.055em] text-white sm:text-7xl">
                A production-ready stack.
              </h2>
            </div>
            <p className="max-w-lg self-end text-lg leading-8 text-slate-400">
              Tools selected for reliability, maintainability, observability,
              and the needs of the system—not résumé keyword density.
            </p>
          </Reveal>
          <div className="grid gap-3 md:grid-cols-2">
            {toolbox.map((group, i) => (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/[.09] bg-white/[.025] p-6 transition hover:border-cyan-400/25"
                key={group.category}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">
                    {group.category}
                  </h3>
                  <span className="font-mono text-[9px] text-cyan-300">
                    {group.level}
                  </span>
                </div>
                <div className="mt-7 flex flex-wrap gap-2">
                  {group.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg border border-white/[.08] bg-black/20 px-3 py-2 font-mono text-[10px] text-slate-400 transition hover:border-emerald-400/35 hover:text-emerald-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>
        <EngineeringEvidence />
        <EngineeringLab />
        <section
          id="journey"
          className="border-y border-white/[.07] bg-[#080c12]"
        >
          <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-36">
            <Reveal>
              <p className="font-mono text-[10px] uppercase tracking-[.2em] text-cyan-300">
                Professional journey
              </p>
              <h2 className="mt-5 text-5xl font-semibold tracking-[-.055em] text-white sm:text-7xl">
                From requirements to reliable production.
              </h2>
            </Reveal>
            <div className="relative mt-20 space-y-5 before:absolute before:bottom-0 before:left-[7px] before:top-0 before:w-px before:bg-white/10">
              {[
                {
                  period: "JUN 2025 — PRESENT",
                  company: "CIKLUM · CANADA",
                  role: "Software Developer",
                  bullets: [
                    "Reduced API response time from 500ms to 400ms through service and query optimization.",
                    "Improved PostgreSQL read/write throughput by 30% for peak traffic.",
                    "Automated delivery workflows, reducing manual deployment effort by 40%.",
                  ],
                },
                {
                  period: "JAN 2021 — MAR 2023",
                  company: "CRED · INDIA",
                  role: "Software Developer",
                  bullets: [
                    "Reduced Java transaction processing time from 250ms to 180ms.",
                    "Built Kafka messaging pipelines that improved system throughput by 20%.",
                    "Achieved 95% test coverage and reduced production defects by 18%.",
                  ],
                },
              ].map((job, i) => (
                <motion.article
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative ml-10 grid gap-6 rounded-2xl border border-white/[.09] bg-white/[.025] p-6 sm:p-8 lg:grid-cols-[.55fr_1.45fr]"
                  key={job.company}
                >
                  <span className="absolute -left-[39px] top-8 h-3.5 w-3.5 rounded-full border-2 border-cyan-300 bg-[#0b0f17] shadow-[0_0_18px_rgba(0,229,255,.65)]" />
                  <div>
                    <p className="font-mono text-[9px] tracking-[.15em] text-slate-500">
                      {job.period}
                    </p>
                    <p className="mt-7 font-mono text-[9px] tracking-[.15em] text-cyan-300">
                      {job.company}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">
                      {job.role}
                    </h3>
                  </div>
                  <ul className="space-y-4 text-sm leading-6 text-slate-400">
                    {job.bullets.map((b) => (
                      <li className="flex gap-3" key={b}>
                        <span className="text-emerald-300">↳</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[.85fr_1.15fr] lg:px-8 lg:py-36"
        >
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-emerald-300">
              Contact
            </p>
            <h2 className="mt-5 text-5xl font-semibold tracking-[-.055em] text-white sm:text-7xl">
              Let’s build scalable systems together.
            </h2>
            <a
              href="mailto:Abhyluna2000@gmail.com"
              className="mt-9 block text-xl text-cyan-300 no-underline"
            >
              Abhyluna2000@gmail.com
            </a>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-400">
              <a
                href="https://github.com/Lucifer7600"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                GitHub ↗
              </a>
              <a
                href="https://www.linkedin.com/in/abhishek-lunagariya-a78507194"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                LinkedIn ↗
              </a>
            </div>
          </Reveal>
          <Reveal>
            <ContactForm />
          </Reveal>
        </section>
        <SignatureFinale />
      </main>
      <footer className="border-t border-amber-300/10 bg-[radial-gradient(circle_at_80%_100%,rgba(214,181,104,.08),transparent_35%)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 font-mono text-[9px] uppercase tracking-[.14em] text-slate-600 sm:flex-row sm:justify-between lg:px-8">
          <span>© 2026 Abhishek Lunagariya</span>
          <span className="text-amber-200/60">
            Ottawa, Ontario · Java · Spring Boot · Distributed systems
          </span>
        </div>
      </footer>
    </div>
  );
}
