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
      type: "文创茶礼 / 陶瓷设计",
      intro: "以敦煌壁画中的神圣翼马形象为灵感来源，将传统文化符号与当代新春礼赠场景相结合，通过轻盈柔和的马卡龙色系重构敦煌艺术语言。项目围绕茶礼体验展开，从纹样设计、器型开发到包装视觉系统进行整体规划，在保留东方文化意境的同时，赋予产品更加年轻化、生活化的表达方式，打造兼具文化价值与现代审美的新春茶礼。",
      background: "随着年轻消费群体对文化创意产品关注度不断提升，传统文化礼品正在从单纯的文化展示转向兼具审美体验与生活价值的产品表达。本项目选取敦煌文化中的翼马元素作为视觉核心，通过提取其自由、祥瑞与希望的文化寓意，结合新春礼赠场景进行创新设计。希望以更加轻松温暖的视觉语言，让传统文化以当代方式融入日常生活，为用户带来兼具仪式感与情感价值的新春茶礼体验。",
      cover: "/images/projects/dunhuang/cover.jpg",
      process: [
        "/images/projects/dunhuang/process-01.jpg",
        "/images/projects/dunhuang/process-02.jpg",
        "/images/projects/dunhuang/process-03.jpg",
        "/images/projects/dunhuang/process-04.jpg",
      ],
      gallery: [
        "/images/projects/dunhuang/gallery-01.jpg",
        "/images/projects/dunhuang/gallery-02.jpg",
        "/images/projects/dunhuang/gallery-03.jpg",
      ],
    },
    {
  id: "xian-double-fish",
  title: "奉进遗珍·金蔓双鱼 错金银陶瓷茶礼",
  subtitle: "GOLDEN VINE & DOUBLE FISH CERAMIC TEA GIFT SET",

  tags: ["产品设计", "陶瓷设计", "文创设计", "包装设计"],

  cover: "/images/projects/xian/cover.jpg",

  intro:
    "以西安博物院馆藏文物“李勉奉进双鱼纹蔓草花银盘”为设计灵感，提取双鱼纹样、蔓草纹饰与唐代金银器工艺特征，通过现代陶瓷设计语言进行创新转译。项目围绕茶礼场景展开，将传统纹样重构、器型开发与礼赠包装设计融为一体，在保留历史文化内涵的同时，赋予产品更符合当代审美与生活方式的表达，打造兼具文化价值与收藏意义的文创茶礼。",

  background:
    "唐代金银器工艺代表着中国古代工艺美术发展的高峰，其中西安博物院馆藏“李勉奉进双鱼纹蔓草花银盘”以精巧的双鱼构图、繁复的蔓草纹样及华丽的装饰工艺展现出盛唐时期的艺术魅力。随着传统文化与现代生活的不断融合，如何让馆藏文物以更加亲近当代用户的方式被感知与传播，成为文创设计的重要课题。本项目以馆藏文物为文化载体，通过现代陶瓷茶器设计重塑经典纹样与工艺语言，探索传统文化在当代礼赠场景中的创新表达。",

  process: [
    "/images/projects/xian/process-01.jpg",
    "/images/projects/xian/process-02.jpg",
    "/images/projects/xian/process-03.jpg",
    "/images/projects/xian/process-04.jpg",
  ],

  gallery: [
    "/images/projects/xian/gallery-01.jpg",
    "/images/projects/xian/gallery-02.jpg",
    "/images/projects/xian/gallery-03.jpg",
  ],

  processTitles: [
    "馆藏文化研究",
    "纹样重构设计",
    "器型与工艺设计",
    "包装与礼赠体验",
  ],

  processDescriptions: [
    "提取双鱼纹银盘核心视觉元素",
    "双鱼与蔓草纹样创新演绎",
    "错金银工艺融入陶瓷茶器",
    "构建完整文创茶礼系统",
  ],
},
{
  id: "henan-fangding",

  title: "河南博物院 杜岭方鼎陶瓷茶礼",

  subtitle: "DULING FANGDING CERAMIC TEA GIFT SET",

  tags: ["产品设计", "陶瓷设计", "文创设计", "文化创意"],

  cover: "/images/projects/henan/cover.jpg",

  intro:
    "以河南博物院馆藏文物“杜岭方鼎”为设计灵感，提取商代青铜礼器的造型语言与纹饰特征，通过现代陶瓷工艺进行创新转化。项目围绕东方茶礼文化展开，将方鼎所承载的礼制精神、权力象征与审美价值融入茶器设计之中，在保留历史文化厚重感的同时，赋予产品符合当代生活方式的使用体验。通过器物视觉重构与文化元素创新表达，打造兼具文化传播价值与收藏价值的文创陶瓷茶礼。",

  background:
    "杜岭方鼎是中国早期青铜文明的重要代表之一，也是河南博物院极具代表性的馆藏文物。其庄重的造型结构、严谨的比例关系以及蕴含的礼制文化，展现了商代青铜器工艺与精神文化的高度成就。随着传统文化传播方式不断创新，如何将古代礼器文化以更加贴近现代生活的方式进行表达与传承，成为文创设计的重要方向。本项目以杜岭方鼎为文化原型，通过现代陶瓷设计语言重构传统礼器意象，探索中华礼制文化在当代茶生活场景中的创新表达。",

  process: [
    "/images/projects/henan/process-01.jpg",
    "/images/projects/henan/process-02.jpg",
    "/images/projects/henan/process-03.jpg",
    "/images/projects/henan/process-04.jpg",
  ],

  gallery: [
    "/images/projects/henan/gallery-01.jpg",
    "/images/projects/henan/gallery-02.jpg",
    "/images/projects/henan/gallery-03.jpg",
  ],

  processTitles: [
    "馆藏文物研究",
    "纹样语言转译",
    "文化视觉构建",
    "产品场景呈现",
  ],

  processDescriptions: [
    "提取杜岭方鼎核心文化元素",
    "重构青铜纹饰视觉体系",
    "融合青铜器色彩与装饰语言",
    "构建东方茶文化使用场景",
  ],
},
{
  id: "forest-fairytale",

  title: "森屿童话",

  subtitle: "FOREST FAIRYTALE AFTERNOON TEA SET",

  tags: ["产品设计", "陶瓷设计", "插画设计", "生活方式设计"],

  cover: "/images/projects/forest/cover.jpg",

  intro:
    "森屿童话是一套以自然森林与童话世界为灵感创作的下午茶具设计。项目围绕轻松、温暖与治愈的情绪体验展开，通过手绘插画语言构建出充满想象力的童话场景，将花卉、果实、小动物与自然元素融入器物设计之中。产品以清新的色彩搭配和轻盈的视觉表达呈现温暖愉悦的生活氛围，希望为用户创造兼具仪式感与陪伴感的下午茶时光。",

  background:
    "在快节奏的现代生活中，人们越来越重视情绪价值与精神陪伴。下午茶不仅是一种饮食习惯，更逐渐成为释放压力、享受生活的重要方式。本项目以“森屿童话”为主题，从自然森林与童话故事中汲取灵感，通过柔和的色彩体系与富有趣味性的插画元素，构建一个充满想象力与治愈感的器物世界。希望通过陶瓷产品传递轻松愉悦的生活态度，让日常使用过程成为感受美好与发现童趣的情绪体验。",

  process: [
    "/images/projects/forest/process-01.jpg",
    "/images/projects/forest/process-02.jpg",
    "/images/projects/forest/process-03.jpg",
    "/images/projects/forest/process-04.jpg",
  ],

  gallery: [
    "/images/projects/forest/gallery-01.jpg",
    "/images/projects/forest/gallery-02.jpg",
    "/images/projects/forest/gallery-03.jpg",
  ],

  processTitles: [
    "主题概念构建",
    "产品场景呈现",
    "治愈系包装设计",
    "定制贺卡设计",
  ],

  processDescriptions: [
    "构建森林童话主题故事与情绪表达",
    "打造温暖治愈的下午茶生活场景",
    "提炼角色与自然元素形成图案语言",
    "打造专属于你的全新赠礼体验",
  ],
},
{
  id: "christmas-tableware",

  title: "冬日颂歌·圣诞餐瓷系列",

  subtitle: "CHRISTMAS TABLEWARE COLLECTION",

  tags: ["产品设计", "陶瓷设计", "节庆设计", "海外定制"],

  cover: "/images/projects/christmas/cover.jpg",

  intro:
    "本项目为俄罗斯客户定制开发的圣诞主题餐瓷系列产品。设计围绕海外市场圣诞节消费场景展开，通过圣诞树、礼物盒、袜子、雪花与节日装饰等经典元素构建完整的节庆视觉体系。产品涵盖不同规格餐盘及马克杯，以统一的图案语言与色彩系统打造温暖欢乐的节日氛围，满足家庭聚会、节日餐桌布置与礼品消费等多元使用需求。项目兼顾市场审美趋势与产品落地需求，实现设计创意与商业价值的平衡。",

  background:
    "圣诞节是欧洲及俄罗斯市场最重要的传统节日之一，具有广泛的家庭消费与礼品消费需求。随着节庆主题餐具市场不断发展，消费者对于产品的视觉体验与节日氛围表达提出了更高要求。本项目基于俄罗斯客户市场需求，以圣诞文化符号为设计核心，通过统一的图案系统与产品规格规划，打造适用于家庭聚餐、节日装饰与礼赠场景的系列化餐瓷产品。希望通过富有温度的设计语言，让产品成为节日餐桌的重要组成部分。",

  process: [
    "/images/projects/christmas/process-01.jpg",
    "/images/projects/christmas/process-02.jpg",
    "/images/projects/christmas/process-03.jpg",
    "/images/projects/christmas/process-04.jpg",
  ],

  gallery: [
    "/images/projects/christmas/gallery-01.jpg",
    "/images/projects/christmas/gallery-02.jpg",
    "/images/projects/christmas/gallery-03.jpg",
  ],

  processTitles: [
    "市场需求分析",
    "节日元素提取",
    "产品系列规划",
    "图案视觉设计",
  ],

  processDescriptions: [
    "研究俄罗斯节庆消费市场趋势",
    "建立圣诞主题视觉符号体系",
    "完成不同规格餐瓷组合设计",
    "构建统一完整的节庆图案语言",
  ],
},
{
  id: "botanical-garden",

  title: "林语花园·自然餐瓷系列",

  subtitle: "BOTANICAL GARDEN TABLEWARE COLLECTION",

  tags: ["产品设计", "餐瓷设计", "家居生活方式", "海外市场"],

  cover: "/images/projects/botanical/cover.jpg",

  intro:
    "林语花园系列是一套以自然植物生态为设计灵感的现代餐瓷产品。项目围绕轻松自然的家庭用餐场景展开，通过植物、花卉、飞鸟与森林元素构建具有生活气息的视觉语言。设计采用简洁的线描表现手法，以柔和自然的绿色作为主色调，将自然之美融入日常餐桌之中。产品覆盖多种规格餐盘与配套器皿，满足不同用餐场景需求，在提升产品实用性的同时，为现代家庭创造更加舒适自然的用餐体验。",

  background:
    "随着自然主义生活方式与家居美学的不断发展，消费者对于餐具产品的需求已不仅停留在功能层面，而更加关注产品所传递的生活态度与情绪价值。植物、花卉与森林生态元素能够有效营造轻松、自然与舒适的用餐氛围。本项目以自然花园为设计主题，通过提取植物与飞鸟等自然元素进行视觉重构，结合现代餐瓷产品开发需求，打造兼具审美价值与市场竞争力的系列化餐瓷产品，希望让用户在日常生活中感受自然之美与慢生活的温度。",

  process: [
    "/images/projects/botanical/process-01.jpg",
    "/images/projects/botanical/process-02.jpg",
    "/images/projects/botanical/process-03.jpg",
    "/images/projects/botanical/process-04.jpg",
  ],

  gallery: [
    "/images/projects/botanical/gallery-01.jpg",
    "/images/projects/botanical/gallery-02.jpg",
    "/images/projects/botanical/gallery-03.jpg",
  ],

  processTitles: [
    "市场趋势研究",
    "自然元素提取",
    "图案视觉设计",
    "产品系列开发",
  ],

  processDescriptions: [
    "分析海外家居餐瓷消费需求",
    "构建植物与飞鸟主题视觉体系",
    "建立统一完整的产品纹样语言",
    "完成多规格餐瓷产品组合设计",
  ],
},
  ];

  const currentProject = projects[0];

  const processDescriptions = [
    "提取敦煌翼马文化元素",
    "马卡龙色系重构传统纹样",
    "圆润器型搭配点心碟组合",
    "全新礼盒配色与开箱体验",
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#030303] px-5 py-20 text-white md:px-10 md:py-24">
      <ParticleField />
      <div className="absolute inset-0 bg-black/82" />

      <div className="relative z-10 mx-auto max-w-[1680px]">
        <main className="space-y-8">
          <div className="relative flex h-[42vh] flex-col items-center justify-center text-center">
            <button
              onClick={onBack}
              className="absolute left-0 top-0 text-xs tracking-[0.25em] text-white/45 transition hover:text-white"
            >
              ← 返回作品案例
            </button>

            <p className="text-xs tracking-[0.55em] text-white/30">
              PRODUCT DESIGN
            </p>

            <h1 className="mt-5 text-5xl font-bold tracking-[0.15em] text-white md:text-7xl">
              产品设计
            </h1>

            <div className="mt-10 h-12 w-px bg-gradient-to-b from-white/40 to-transparent" />
            
          </div>

          {projects.map((project, projectIndex) => (
           <div key={project.title} className="space-y-8">
  <div className="mb-16 pt-20">
  <p className="text-[120px] font-black leading-none text-white/6">
    {String(projectIndex + 1).padStart(2, "0")}
  </p>

  
</div>
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025]">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={project.cover}
          alt={project.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="grid gap-8 p-6 md:grid-cols-[0.9fr_1fr] md:p-8">
        <div>
          <p className="text-xs tracking-[0.35em] text-white/45">
            {project.museum}
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-[0.04em] md:text-4xl">
            {project.title}
          </h2>

          <p className="mt-3 text-xs tracking-[0.16em] text-white/45">
            {project.en || project.subtitle}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-[0.16em] text-white/70">
            项目介绍
          </h3>

          <p className="mt-4 text-sm leading-8 text-white/55">
            {project.intro}
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
          {project.background}
        </p>
      </div>

      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6">
        <h3 className="text-sm font-semibold tracking-[0.16em] text-white/70">
          设计过程
        </h3>

        <div className="mt-5 grid max-w-[520px] grid-cols-2 gap-3">
          {(project.processTitles || ["文化元素提取", "图案设计", "器型与产品设计", "包装与礼赠体验"]).map((step, index) => (
            <div
              key={step}
              className="overflow-hidden rounded-[0.75rem] border border-white/10 bg-white/[0.035]"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={project.process[index]}
                  alt={step}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="p-2">
                <p className="text-base font-black text-white/22">
                  0{index + 1}
                </p>

                <p className="mt-1 text-[11px] font-semibold text-white/75">
                  {step}
                </p>

                <p className="mt-1 text-[11px] leading-5 text-white/42">
                  {(project.processDescriptions || processDescriptions)[index]}
                </p>
              </div>
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
        {project.gallery.map((img, index) => (
          <div
            key={index}
            className="aspect-[4/3] overflow-hidden rounded-[1rem] border border-white/10"
          >
            <img
              src={img}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
))}

             
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