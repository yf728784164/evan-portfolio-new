import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform, useSpring } from "framer-motion";

const categories = ["全部", "产品设计", "包装设计", "平面设计", "手绘设计"];

const projects = [
  {
    id: 1,
    category: "产品设计",
    title: "灵璧御茗 · 博物院文创茶礼",
    tag: "Museum Tea Set",
    intro: "以博物馆文化符号为起点，将东方器物的仪式感转化为当代茶礼产品。",
    image: "/images/works/product-01.jpg",
  },
  {
    id: 2,
    category: "产品设计",
    title: "敦煌花马 · 甜春集陶瓷茶礼",
    tag: "Ceramic Gift Set",
    intro: "围绕敦煌花马图形与春日情绪展开，让传统纹样进入年轻礼赠场景。",
    image: "/images/works/product-02.jpg",
  },
  {
    id: 3,
    category: "包装设计",
    title: "阿里云2025中秋礼盒",
    tag: "Festival Packaging",
    intro: "以中秋月相、云端科技与商务礼赠场景为核心，构建高级礼盒视觉系统。",
    image: "/images/works/package-01.jpg",
  },
  {
    id: 4,
    category: "包装设计",
    title: "海南华铁2026新春礼盒",
    tag: "New Year Gift Box",
    intro: "将企业IP、新春情绪与礼盒结构整合为具有传播感的产品系统。",
    image: "/images/works/package-02.jpg",
  },
  {
    id: 5,
    category: "平面设计",
    title: "品牌视觉与活动物料系统",
    tag: "Graphic System",
    intro: "通过字体、图形、色彩与版式节奏，提升品牌传播识别度。",
    image: "/images/works/graphic-01.jpg",
  },
  {
    id: 6,
    category: "手绘设计",
    title: "纹样与概念手绘档案",
    tag: "Hand-drawn Archive",
    intro: "用手绘记录造型、纹样、结构和情绪方向，再转化为数字设计语言。",
    image: "/images/works/drawing-01.jpg",
  },
];

function ParticleField() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let particles = [];
    let lines = [];

    const createScene = () => {
      const isMobile = window.innerWidth < 768;
      particles = Array.from({ length: isMobile ? 70 : 150 }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * (isMobile ? 1.35 : 1.8) + 0.35,
        a: Math.random() * 0.55 + 0.12,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        depth: Math.random() * 0.9 + 0.15,
      }));

      lines = Array.from({ length: isMobile ? 6 : 14 }, () => ({
        x: Math.random(),
        y: Math.random(),
        len: Math.random() * (isMobile ? 130 : 210) + 80,
        speed: Math.random() * 0.38 + 0.15,
        a: Math.random() * 0.22 + 0.05,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createScene();
    };

    const onMove = (event) => {
      mouse.current.tx = event.clientX;
      mouse.current.ty = event.clientY;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.075;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.075;

      const glow = ctx.createRadialGradient(mouse.current.x, mouse.current.y, 0, mouse.current.x, mouse.current.y, width < 768 ? 220 : 360);
      glow.addColorStop(0, "rgba(255,255,255,0.16)");
      glow.addColorStop(0.45, "rgba(255,255,255,0.045)");
      glow.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      lines.forEach((line) => {
        const x = line.x * width;
        line.y += line.speed / height;
        if (line.y > 1.18) line.y = -0.18;
        const y = line.y * height;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${line.a})`;
        ctx.lineWidth = 1;
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + line.len);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${line.a + 0.34})`;
        ctx.arc(x, y + line.len, width < 768 ? 2.4 : 3.4, 0, Math.PI * 2);
        ctx.fill();
      });

      particles.forEach((p) => {
        p.x += p.vx / width;
        p.y += p.vy / height;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;

        const parallax = width < 768 ? 0.01 : 0.022;
        const px = p.x * width + (mouse.current.x - width / 2) * parallax * p.depth;
        const py = p.y * height + (mouse.current.y - height / 2) * parallax * p.depth;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", (event) => {
      const touch = event.touches[0];
      if (touch) onMove(touch);
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0" />;
}

function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const letters = ["Y", "E", "F", "E", "I"];
  <motion.h1
  className="text-5xl font-black tracking-[0.22em] md:text-7xl"
  initial={{
    backgroundPosition: "0% 50%",
  }}
  animate={{
    backgroundPosition: "100% 50%",
  }}
  transition={{
    duration: 2.8,
    ease: [0.22, 1, 0.36, 1],
  }}
  style={{
    backgroundImage:
      "linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.15) 35%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.15) 65%, rgba(255,255,255,0.15) 100%)",
    backgroundSize: "200% 100%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
>
  YEFEI
</motion.h1>

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#030303]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex justify-center gap-2 text-5xl font-black tracking-[0.22em] md:text-7xl">
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ color: "rgba(255,255,255,0.16)" }}
                  animate={{ color: "rgba(255,255,255,1)" }}
                  transition={{
                    duration: 1.15,
                    delay: 0.25 + index * 0.32,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.p
              className="mt-6 text-xs tracking-[0.35em] text-white/38"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.9 }}
            >
              Collection of Works 2026
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
function CustomCursor() {
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const ringX = useMotionValue(0);
  const ringY = useMotionValue(0);

  const smoothX = useSpring(ringX, {
    stiffness: 260,
    damping: 24,
    mass: 0.5,
  });

  const smoothY = useSpring(ringY, {
    stiffness: 260,
    damping: 24,
    mass: 0.5,
  });

  const [hover, setHover] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const move = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const enter = () => setHover(true);
    const leave = () => setHover(false);

    const targets = document.querySelectorAll("a, button, [data-cursor]");

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    targets.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);

      targets.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, [dotX, dotY, ringX, ringY]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
        style={{ x: dotX, y: dotY }}
      />

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] block h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 mix-blend-difference"
        style={{ x: smoothX, y: smoothY }}
        animate={{
          scale: clicking ? 0.72 : hover ? 2.1 : 1,
          opacity: hover ? 0.9 : 0.55,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 24,
          mass: 0.5,
        }}
      />

      {clicking && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-[9997] block h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30"
          style={{ x: dotX, y: dotY }}
          initial={{ scale: 0.4, opacity: 0.8 }}
          animate={{ scale: 2.8, opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      )}
    </>
  );
}
function Nav() {
  const [activeNav, setActiveNav] = useState("个人简介");
  const navItems = [
    { label: "个人简介", href: "#about" },
    { label: "作品案例", href: "#works" },
    { label: "合作联系", href: "#contact" },
  ];

  return (
    <motion.nav
      className="fixed left-0 right-0 top-0 z-50 px-4 py-4 text-white md:px-10 md:py-6"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.75 }}
    >
      <div className="mx-auto flex max-w-[1720px] items-center justify-between gap-3">
        <a href="#top" className="text-3xl font-black tracking-[-0.14em] text-white/90 drop-shadow-[0_0_20px_rgba(255,255,255,0.28)] md:text-4xl">
          E<span className="text-white/45">.</span>
        </a>

        <div className="flex max-w-[74vw] items-center gap-1 overflow-x-auto rounded-full border border-white/12 bg-white/[0.045] px-2 py-2 shadow-[0_0_70px_rgba(255,255,255,0.06)] backdrop-blur-2xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:absolute md:left-1/2 md:top-6 md:max-w-none md:-translate-x-1/2 md:gap-2 md:px-4">
          {navItems.map((item, index) => (
           <a
           key={item.label}
           href={item.href}
           onClick={() => setActiveNav(item.label)}
           className="group relative shrink-0 rounded-full px-4 py-2 text-xs font-medium tracking-[0.08em] text-white/76 transition hover:bg-white hover:text-black md:px-10 md:text-sm"
         >
           {item.label}
         
           {activeNav === item.label && (
             <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-2 rounded-full bg-white" />
           )}
         </a>
          ))}
        </div>

        <a href="#works" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.045] text-base backdrop-blur-xl transition hover:bg-white hover:text-black md:h-11 md:w-11 md:text-xl">
          ✦
        </a>
      </div>
    </motion.nav>
  );
}
function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const titleX = useTransform(mx, [-650, 650], [-18, 18]);
  const titleY = useTransform(my, [-650, 650], [-12, 12]);

  return (
    <motion.section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030303] px-5 py-28 text-white md:px-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.6,
        delay: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={(event) => {
        mx.set(event.clientX - window.innerWidth / 2);
        my.set(event.clientY - window.innerHeight / 2);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <ParticleField />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.105),transparent_19%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.05),transparent_35%)]" />
      <div className="absolute inset-0 z-[2] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.08),rgba(0,0,0,0.78))]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[115vw] max-h-[980px] w-[115vw] max-w-[980px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.045] md:h-[64vw] md:w-[64vw]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[82vw] max-h-[680px] w-[82vw] max-w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.055] md:h-[44vw] md:w-[44vw]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[55vw] max-h-[430px] w-[55vw] max-w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035] md:h-[28vw] md:w-[28vw]" />

      <motion.div className="absolute left-[8%] top-[22%] z-10 text-xs tracking-[0.45em] text-white/34 md:left-[11%] md:top-[24%] md:text-sm md:tracking-[0.5em]" animate={{ y: [0, -18, 0], opacity: [0.24, 0.62, 0.24] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        2026
      </motion.div>
      <motion.div className="absolute bottom-[18%] left-[8%] z-10 text-lg tracking-[0.55em] text-white/14 md:left-[10%] md:text-2xl md:tracking-[0.9em]" animate={{ y: [0, 16, 0], opacity: [0.12, 0.38, 0.12] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
        2026
      </motion.div>
      <motion.div className="absolute right-[6%] top-[30%] z-10 hidden text-base tracking-[0.68em] text-white/38 sm:block md:right-[13%] md:top-[28%]" animate={{ y: [0, -14, 0], opacity: [0.2, 0.58, 0.2] }} transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}>
        2026
      </motion.div>
      <motion.div className="absolute bottom-[15%] right-[5%] z-10 text-xl tracking-[0.32em] text-white/22 md:right-[12%] md:text-3xl md:tracking-[0.42em]" animate={{ y: [0, 12, 0], opacity: [0.16, 0.44, 0.16] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
        2026
      </motion.div>

      <motion.div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-px w-[72vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent md:w-[42vw]" animate={{ opacity: [0.2, 0.85, 0.2], scaleX: [0.65, 1.05, 0.65] }} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }} />

      <motion.div
        className="relative z-20 mx-auto flex w-full max-w-[1320px] flex-col items-center text-center"
        style={{ x: titleX, y: titleY }}
        initial={{ opacity: 0, scale: 0.96, filter: "blur(22px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ delay: 1.05, duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="select-none uppercase leading-[0.95] text-white md:leading-[0.9]">
          <span className="block text-[18vw] font-black tracking-[0.12em] drop-shadow-[0_0_38px_rgba(255,255,255,0.34)] md:text-[8vw] md:tracking-[0.22em]">
            EVAN
          </span>
          <span className="mt-4 block text-[12vw] font-black tracking-[0.16em] text-white/90 drop-shadow-[0_0_48px_rgba(255,255,255,0.32)] md:text-[6.4vw] md:tracking-[0.34em]">
            PORTFOLIO
          </span>
        </h1>
        <p className="mt-8 text-sm tracking-[0.28em] text-white/55 md:mt-10 md:text-lg md:tracking-[0.55em]">设计｜开发｜创意</p>
      </motion.div>
      <motion.div
  className="absolute bottom-[7%] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-4 text-xs tracking-[0.2em] text-white/54 md:bottom-[8%] md:gap-5 md:text-sm md:tracking-[0.24em]"
  initial={{ opacity: 0, y: 22 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 2.1, duration: 0.8 }}
>
  <span>向下滚动</span>
  <span className="h-10 w-px bg-gradient-to-b from-white/70 to-transparent md:h-12" />
  <span className="grid h-9 w-5 place-items-center rounded-full border border-white/25 md:h-10 md:w-6">
    <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
  </span>
</motion.div>
    </motion.section>
  );
}

function SectionTitle({ num, label, title, desc }) {
  return (
    <div className="mb-12 grid gap-6 border-b border-white/10 pb-8 md:mb-16 md:grid-cols-[0.28fr_1fr_0.8fr] md:items-end md:gap-8 md:pb-10">
      <div>
        <p className="text-xs tracking-[0.35em] text-white/28">{num}</p>
        <p className="mt-3 text-xs uppercase tracking-[0.35em] text-white/50">{label}</p>
      </div>
      <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-white md:text-8xl md:leading-[0.86]">{title}</h2>
      <p className="text-sm leading-8 tracking-[0.08em] text-white/48">{desc}</p>
    </div>
  );
}

function About() {
  const items = [
    {
      year: "2019",
      title: `景德镇陶瓷大学
  陶瓷艺术设计`,
      text: "从材料、器型与工艺开始，建立对东方器物语言的基础判断。",
    },
  
    {
      year: "2020-2022",
      title: `中国陶瓷产品设计大赛
  香港当代设计奖
  紫金奖文化创意综合赛
  山西设计奖
  何朝宗杯陶瓷工业设计大赛
  主持省级国家级大学生创新训练项目等`,
      text: "开始将文化符号、产品体验与视觉叙事放进同一个设计系统。",
    },
  
    {
      year: "2023-至今",
      title: `中国陶瓷工业协会会员
  亚洲青年设计联盟终身会员
  创办个人设计工作室`,
      text: "围绕陶瓷、包装、品牌视觉与数字文创产品展开商业设计实践。",
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#030303] px-5 py-20 text-white md:px-10 md:py-28"
    >
      <ParticleField />

      <div className="absolute inset-0 bg-black/80" />

      <div className="relative z-10 mx-auto max-w-[1500px]">
      <div className="mb-12 flex flex-col gap-4 border-b border-white/10 pb-8 md:mb-16 md:flex-row md:items-end md:justify-between">
  <h2 className="text-xl font-bold tracking-[0.08em] text-white md:text-3xl">
    个人简介
  </h2>

  <p className="max-w-xl text-left text-sm leading-7 tracking-[0.08em] text-white/48 md:text-right md:leading-8 md:tracking-[0.12em]">
    永远将情绪瞬间作为设计核心
  </p>
</div>

        <div className="grid gap-14 md:grid-cols-[0.92fr_1.08fr] md:gap-20">

        <motion.div
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.8 }}
  className="relative min-h-[620px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] md:min-h-[760px]"
>
  <img
    src="/images/evan-portrait.jpg"
    alt="Evan"
    className="absolute inset-0 h-full w-full object-cover object-center grayscale opacity-75 brightness-[0.92] contrast-[1.05]"
  />

  <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/40 to-black/80" />
  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

  <div className="absolute left-8 top-8 z-20">
    <p className="text-xs uppercase tracking-[0.45em] text-white/45">
      DESIGN ARCHIVE
    </p>

    <p className="mt-4 text-sm tracking-[0.2em] text-white/35">
      EMOTION INDEX
    </p>
  </div>

  <div className="absolute bottom-8 left-8 z-20">
  

    <div className="mt-2 text-xs tracking-[0.35em] text-white/20">
      EVAN PORTFOLIO
    </div>
  </div>
          </motion.div>

          <div className="relative pl-8">

            <div className="absolute left-2 top-0 h-full w-px bg-white/15" />

            {items.map((item, index) => (
              <motion.div
                key={index}
                className="relative pb-12"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="absolute -left-[25px] top-2 h-4 w-4 rounded-full border border-white/20 bg-white/70" />

                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
                  <p className="text-3xl font-black text-white/25">
                    {item.year}
                  </p>

                  <h4 className="mt-4 text-xl font-bold">
                  {item.title.split("\n").map((line, i) => (
  <span key={i} className="block">
    {line}
  </span>
))}
                  </h4>

                  <p className="mt-4 text-sm leading-7 text-white/50">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Works({ onOpenProduct }) {
  const workCategories = [
{
  title: "产品设计",
  en: "PRODUCT DESIGN",
  image: "/images/works/product-cover.jpg",
  mobileImage: "/images/works/product-cover-mobile.jpg",
},
{
  title: "包装设计",
  en: "PACKAGING DESIGN",
  image: "/images/works/package-cover.jpg",
  mobileImage: "/images/works/package-cover-mobile.jpg",
},
{
  title: "平面设计",
  en: "GRAPHIC DESIGN",
  image: "/images/works/graphic-cover.jpg",
  mobileImage: "/images/works/graphic-cover-mobile.jpg",
},
{
  title: "插画手绘",
  en: "ILLUSTRATION",
  image: "/images/works/illustration-cover.jpg",
  mobileImage: "/images/works/illustration-cover-mobile.jpg",
},
]

  return (
    <section
      id="works"
      className="relative overflow-hidden bg-[#030303] px-5 pb-20 pt-8 text-white md:px-10 md:pb-28 md:pt-12"
    >
      <ParticleField />

      <div className="absolute inset-0 bg-black/80" />

      <div className="relative z-10 mx-auto max-w-[1500px]">
        <div className="mb-12 flex flex-col gap-4 border-b border-white/10 pb-8 md:mb-16 md:flex-row md:items-end md:justify-between">
          <h2 className="text-xl font-bold tracking-[0.08em] text-white md:text-3xl">
            作品案例
          </h2>

          <p className="max-w-xl text-left text-sm leading-7 tracking-[0.08em] text-white/48 md:text-right md:leading-8 md:tracking-[0.12em]">
            产品、包装、平面与插画创作的设计实践
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {workCategories.map((item, index) => (
            <motion.a
              key={item.title}
              href="#works"
onClick={(e) => {
  if (item.title === "产品设计") {
    e.preventDefault();
    onOpenProduct();
  }
}}
              className="group relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] md:min-h-[520px]"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: index * 0.08 }}
            >
             {item.title === "插画手绘" && (
  <div className="absolute inset-0 bg-[#f7f7f5]" />
)}
<picture>
  <source media="(max-width: 767px)" srcSet={item.mobileImage} />
  <img
    src={item.image}
    alt={item.title}
    className="absolute inset-0 h-full w-full object-cover object-center opacity-100 transition duration-[1200ms] group-hover:scale-[1.03]"
  />
</picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/20" />

              <div className="absolute left-6 top-6 md:left-8 md:top-8">
                <p className="text-xs tracking-[0.45em] text-white/32">
                  {item.en}
                </p>
              </div>

              <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
              

                <div className="flex items-end justify-between">
  <div>
    <h3 className="text-2xl font-bold tracking-[0.08em] text-white md:text-4xl">
      {item.title}
    </h3>

    <p className="mt-3 text-xs tracking-[0.35em] text-white/35">
      {item.en}
    </p>
  </div>

  <span className="text-sm tracking-[0.18em] text-white/45 transition duration-500 group-hover:translate-x-2 group-hover:text-white">
    查看项目 →
  </span>
</div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
function ProductDesignPage({ onBack }) {
  const projects = [
    {
      num: "01",
      museum: "敦煌研究院文创",
      title: "敦煌花马·甜春集新春茶礼",
      en: "DUNHUANG FLORAL STEED SPRING TEA SET",
      type: "新春茶礼 / 陶瓷设计",
      cover: "/images/projects/dunhuang/cover.jpg",
      process: [
        "/images/projects/dunhuang/process-01.jpg",
        "/images/projects/dunhuang/process-02.jpg",
      ],
      intro:
        "以敦煌壁画中的花马意象为灵感来源，将传统吉祥文化与新春茶礼结合，通过柔和的色彩、花卉纹样与陶瓷器型设计，重构年轻化的新春礼赠体验。",
      background:
        "敦煌文化拥有丰富的图像资源与精神内涵，而传统新春礼品往往停留在符号堆叠与节庆装饰层面。本项目尝试从敦煌花马形象出发，以“甜春集”为主题，将新春祝福、茶文化与当代审美进行融合。",
    },
    {
      num: "02",
      museum: "河南博物馆文创",
      title: "灵餮御茗文创茶礼",
      en: "MUSEUM CULTURAL TEA GIFT",
      type: "文创茶礼 / 陶瓷设计",
      intro: "项目介绍预留。",
    },
    {
      num: "03",
      museum: "西安博物院文创",
      title: "奉进遗珍文创茶礼",
      en: "CULTURAL HERITAGE TEA GIFT",
      type: "文创茶礼 / 陶瓷设计",
      intro: "项目介绍预留。",
    },
    {
      num: "04",
      museum: "Christmas Party",
      title: "Ceramic Dinner Plate",
      en: "CHRISTMAS PARTY CERAMIC DINNER PLATE",
      type: "餐具设计 / 陶瓷设计",
      intro: "项目介绍预留。",
    },
  ];

  const currentProject = projects[0];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#030303] px-5 py-20 text-white md:px-10 md:py-24">
      <ParticleField />
      <div className="absolute inset-0 bg-black/82" />

      <div className="relative z-10 mx-auto grid max-w-[1680px] gap-8 lg:grid-cols-[0.9fr_1.45fr]">
        <aside className="space-y-6">
          <button
            onClick={onBack}
            className="text-xs tracking-[0.25em] text-white/45 transition hover:text-white"
          >
            ← 返回作品案例
          </button>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025]">
            <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
              {currentProject.cover ? (
                <img
                  src={currentProject.cover}
                  alt={currentProject.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs tracking-[0.3em] text-white/25">
                  PRODUCT DESIGN
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs tracking-[0.35em] text-white/45">
                  PRODUCT DESIGN
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-[0.06em] md:text-4xl">
                  产品设计
                </h1>
              </div>
            </div>

            
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {projects.map((project, index) => (
                  <div
                    key={project.num}
                    className={`group overflow-hidden rounded-[1rem] border bg-white/[0.025] ${
                      index === 0 ? "border-white/50" : "border-white/10"
                    }`}
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-white/[0.03]">
                      {project.cover ? (
                        <img
                          src={project.cover}
                          alt={project.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[10px] tracking-[0.25em] text-white/20">
                          IMAGE
                        </div>
                      )}
                    </div>

                    <div className="p-3">
                      <p className="text-sm font-semibold leading-snug text-white/80">
                        {project.title}
                      </p>
                      <p className="mt-2 text-[11px] tracking-[0.12em] text-white/35">
                        {project.type}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="space-y-8">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025]">
            <div className="relative aspect-[16/9] overflow-hidden">
              {currentProject.cover ? (
                <img
                  src={currentProject.cover}
                  alt={currentProject.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs tracking-[0.3em] text-white/25">
                  PROJECT COVER
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </div>

            <div className="grid gap-8 p-6 md:grid-cols-[0.9fr_1fr] md:p-8">
              <div>
                <p className="text-xs tracking-[0.35em] text-white/45">
                  {currentProject.museum}
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-[0.04em] md:text-4xl">
                  {currentProject.title}
                </h2>
                <p className="mt-3 text-xs tracking-[0.16em] text-white/45">
                  {currentProject.en}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["产品设计", "陶瓷设计", "文化创意", "礼赠设计"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/12 px-3 py-1 text-xs text-white/55"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold tracking-[0.16em] text-white/70">
                  项目介绍
                </h3>
                <p className="mt-4 text-sm leading-8 text-white/55">
                  {currentProject.intro}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-[0.7fr_1fr]">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6">
              <h3 className="text-sm font-semibold tracking-[0.16em] text-white/70">
                设计背景
              </h3>
              <p className="mt-4 text-sm leading-8 text-white/50">
                {currentProject.background || "设计背景预留。"}
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6">
              <h3 className="text-sm font-semibold tracking-[0.16em] text-white/70">
                设计过程
              </h3>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {[
                  "文化元素提取",
                  "图案设计",
                  "器型与产品设计",
                  "包装与礼赠体验",
                ].map((step, index) => (
                  <div
                    key={step}
                    className="rounded-[1rem] border border-white/10 bg-white/[0.035] p-4"
                  >
                    <p className="text-3xl font-black text-white/22">
                      0{index + 1}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white/75">
                      {step}
                    </p>
                    <p className="mt-3 text-xs leading-6 text-white/42">
                      内容与图片预留。
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6">
            <h3 className="text-sm font-semibold tracking-[0.16em] text-white/70">
              作品展示
            </h3>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[currentProject.cover, ...(currentProject.process || [])].map(
                (img, index) => (
                  <div
                    key={index}
                    className="aspect-[4/3] overflow-hidden rounded-[1rem] border border-white/10 bg-white/[0.035]"
                  >
                    {img ? (
                      <img
                        src={img}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs tracking-[0.25em] text-white/25">
                        IMAGE
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
export default function App() {
  const [page, setPage] = useState("home");
  const [homeScrollY, setHomeScrollY] = useState(0);

  const openProductPage = () => {
    setHomeScrollY(window.scrollY);
    setPage("product");

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    });
  };

  const backToWorks = () => {
    setPage("home");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: homeScrollY,
          behavior: "auto",
        });
      });
    });
  };

  return (
    <main className="bg-[#030303] selection:bg-white selection:text-black">
      <LoadingScreen />
      <CustomCursor />

      <AnimatePresence mode="wait">
        {page === "home" ? (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 32, scale: 0.985 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
exit={{ opacity: 0, y: -32, scale: 0.985 }}
transition={{
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1],
}}
          >
            <Nav />
            <Hero />
            <About />
            <Works onOpenProduct={openProductPage} />
          </motion.div>
        ) : (
          <motion.div
            key="product"
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            <ProductDesignPage onBack={backToWorks} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}