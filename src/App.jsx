import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles, MoveUpRight, Mail, Layers, MousePointer2, CircleDot } from "lucide-react";

// Evan Portfolio — 单文件 React 版本
// 使用方式：
// 1. 放进 Vite / Next.js / React 项目中作为 App.jsx 或页面组件。
// 2. 将你的个人照片放到 public/images/evan-portrait.jpg。
// 3. 将作品图放到 public/images/works/ 下，并替换 projects 里的 image / gallery。
// 4. TailwindCSS 环境下可直接预览。

const profile = {
  name: "Evan Portfolio",
  identity: "AI时代的情绪化产品设计师",
  manifesto: "永远将情绪瞬间\n作为设计核心",
  english: "EMOTION FIRST / DESIGN ALWAYS",
  system: "FUTURE DESIGN PROPOSAL SYSTEM",
  portrait: "/images/evan-portrait.jpg",
  email: "728784164@qq.com",
  phone: "+86 18756636480",
};

const timeline = [
  {
    year: "2019",
    title: "景德镇陶瓷大学 · 陶瓷艺术设计",
    text: "系统学习陶瓷产品、器型语言、工艺材料与东方审美表达。",
  },
  {
    year: "2020",
    title: "入围第八届紫金奖文化创意设计综合赛",
    text: "开始将地域文化、产品体验与视觉叙事结合。",
  },
  {
    year: "2021",
    title: "中国陶瓷产品设计大赛银奖 / 英国生态设计奖铜奖",
    text: "从单一造型设计转向产品系统、礼品体系与可落地生产。",
  },
  {
    year: "2022",
    title: "创办个人设计工作室",
    text: "围绕陶瓷、包装、品牌视觉与文创产品展开商业设计实践。",
  },
  {
    year: "2023—2025",
    title: "商业项目与AI设计工作流并行",
    text: "用AI辅助概念生成、视觉推导、包装提案和产品叙事表达。",
  },
];

const projects = [
  {
    id: 1,
    category: "产品设计",
    title: "灵璧御茗 · 博物院文创茶礼",
    tag: "Museum Tea Set",
    image: "/images/works/product-01.jpg",
    mood: "器物、东方、礼赠、文化再造",
    intro: "以博物馆文化符号为起点，将东方器物的仪式感转化为当代茶礼产品。设计强调器型、纹样与礼赠场景之间的完整体验。",
    source: "从馆藏纹样、传统茶事与商务礼赠场景中提取视觉线索，让产品既具有文化识别度，也能进入现代生活。",
    process: ["文化元素提取", "器型比例推敲", "纹样系统建立", "材质与工艺落地", "礼盒场景呈现"],
    gallery: ["/images/works/product-01-a.jpg", "/images/works/product-01-b.jpg"],
  },
  {
    id: 2,
    category: "产品设计",
    title: "敦煌花马 · 甜春集陶瓷茶礼",
    tag: "Ceramic Gift Set",
    image: "/images/works/product-02.jpg",
    mood: "敦煌、花马、甜感、春日礼物",
    intro: "围绕敦煌花马图形与春日情绪展开，将传统纹样转化为更年轻、轻盈、适合礼赠传播的陶瓷产品。",
    source: "灵感来自敦煌壁画中的流动线条与花马意象，通过柔和色彩降低传统元素的厚重感。",
    process: ["壁画元素分析", "图案重组", "色彩降噪", "套组视觉统一", "产品场景渲染"],
    gallery: ["/images/works/product-02-a.jpg", "/images/works/product-02-b.jpg"],
  },
  {
    id: 3,
    category: "产品设计",
    title: "蓝色幽花 · 餐具设计",
    tag: "Tableware System",
    image: "/images/works/product-03.jpg",
    mood: "蓝白、花卉、餐桌秩序、日用美学",
    intro: "以蓝色花卉为主要视觉语言，构建适合海外市场的餐具系列，让图案在不同器型之间形成连续的餐桌体验。",
    source: "从经典蓝白陶瓷与现代家居餐桌趋势中提取方向，强调高识别度与批量化生产适配。",
    process: ["市场风格分析", "主纹样绘制", "多器型适配", "边饰系统延展", "系列化展示"],
    gallery: ["/images/works/product-03-a.jpg", "/images/works/product-03-b.jpg"],
  },
  {
    id: 4,
    category: "包装设计",
    title: "阿里云2025中秋礼盒",
    tag: "Festival Packaging",
    image: "/images/works/package-01.jpg",
    mood: "科技、节日、月相、企业礼赠",
    intro: "为企业中秋礼盒建立节日识别与科技品牌气质并存的包装系统，让礼盒兼具仪式感和品牌记忆点。",
    source: "从中秋月相、云端科技与商务赠礼场景出发，以克制视觉强化品牌高级感。",
    process: ["节日符号整理", "品牌色彩转译", "盒型结构规划", "内盒分区设计", "场景化提案"],
    gallery: ["/images/works/package-01-a.jpg", "/images/works/package-01-b.jpg"],
  },
  {
    id: 5,
    category: "包装设计",
    title: "海南华铁2026新春礼盒",
    tag: "New Year Gift Box",
    image: "/images/works/package-02.jpg",
    mood: "新春、红金、IP、公仔礼赠",
    intro: "以新春情绪与企业IP为核心，构建从礼盒、周边到陈列场景的完整包装视觉。",
    source: "用热烈红色建立节日氛围，通过IP形象增强亲和力与传播性。",
    process: ["IP视觉延展", "礼盒结构推导", "周边系统设计", "节日氛围渲染", "落地物料整合"],
    gallery: ["/images/works/package-02-a.jpg", "/images/works/package-02-b.jpg"],
  },
  {
    id: 6,
    category: "包装设计",
    title: "阿里云福禄金桂香氛礼盒",
    tag: "Fragrance Gift Box",
    image: "/images/works/package-03.jpg",
    mood: "金桂、香气、东方克制、礼盒结构",
    intro: "以桂花香氛为主题，将东方植物意象、礼赠层级和精致包装结构统一到一个克制的礼盒系统中。",
    source: "从桂花的气味记忆与节庆礼赠情绪中出发，强调视觉轻奢与产品开盒体验。",
    process: ["主题命名", "图形提炼", "色彩与材质定义", "盒型结构设计", "开盒体验设计"],
    gallery: ["/images/works/package-03-a.jpg", "/images/works/package-03-b.jpg"],
  },
  {
    id: 7,
    category: "平面设计",
    title: "品牌视觉与活动物料系统",
    tag: "Graphic System",
    image: "/images/works/graphic-01.jpg",
    mood: "版式、传播、品牌秩序、视觉识别",
    intro: "围绕品牌传播场景搭建视觉系统，通过字体、图形、色彩与版式节奏提升项目识别度。",
    source: "从商业传播效率出发，将复杂信息压缩成更清晰、有秩序的视觉表达。",
    process: ["信息层级整理", "版式结构搭建", "图形语言统一", "视觉延展", "传播物料输出"],
    gallery: ["/images/works/graphic-01-a.jpg", "/images/works/graphic-01-b.jpg"],
  },
  {
    id: 8,
    category: "手绘设计",
    title: "纹样与概念手绘档案",
    tag: "Hand-drawn Archive",
    image: "/images/works/drawing-01.jpg",
    mood: "草图、线条、纹样、设计推导",
    intro: "手绘部分作为设计推导的前置语言，用于记录造型、纹样、结构和情绪方向。",
    source: "在AI与数字工具之外，手绘仍然是捕捉情绪瞬间和判断设计气质的核心入口。",
    process: ["快速草图", "造型判断", "纹样推演", "细节修正", "数字化转译"],
    gallery: ["/images/works/drawing-01-a.jpg", "/images/works/drawing-01-b.jpg"],
  },
];

const categories = ["全部", "产品设计", "包装设计", "平面设计", "手绘设计"];

function validateData() {
  const requiredProfileFields = ["name", "identity", "manifesto", "english", "system"];
  const missingProfileFields = requiredProfileFields.filter((field) => !profile[field]);

  console.assert(missingProfileFields.length === 0, `profile 缺少字段：${missingProfileFields.join(", ")}`);
  console.assert(profile.manifesto.includes("\n"), "profile.manifesto 应包含换行符 \\n，用于首页中文宣言分行。 ");
  console.assert(Array.isArray(projects) && projects.length > 0, "projects 至少需要一个项目。 ");
  console.assert(projects.every((project) => project.id && project.category && project.title), "每个 project 都需要 id、category、title。 ");
}

function useMouse() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 26, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 240, damping: 26, mass: 0.4 });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return { sx, sy };
}

function Cursor() {
  const { sx, sy } = useMouse();
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const enter = () => setHover(true);
    const leave = () => setHover(false);
    const nodes = document.querySelectorAll("a, button, [data-cursor]");
    nodes.forEach((node) => {
      node.addEventListener("mouseenter", enter);
      node.addEventListener("mouseleave", leave);
    });
    return () => {
      nodes.forEach((node) => {
        node.removeEventListener("mouseenter", enter);
        node.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50 mix-blend-difference md:block"
        style={{ x: sx, y: sy }}
        animate={{ scale: hover ? 2.4 : 1, opacity: hover ? 0.85 : 0.55 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[101] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white md:block"
        style={{ x: sx, y: sy }}
      />
    </>
  );
}

function Noise() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.045]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:7px_7px]" />
    </div>
  );
}

function LoadingScreen({ done }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-[#090909] text-white"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 1.05, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.div
            className="absolute h-[34rem] w-[34rem] rounded-full border border-white/10"
            animate={{ scale: [0.85, 1.12, 0.92], rotate: [0, 90, 180], opacity: [0.15, 0.45, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="relative z-10 flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center">
              <p className="mb-3 text-xs tracking-[0.6em] text-white/40">DESIGN ARCHIVE</p>
              <h1 className="text-5xl font-black tracking-[-0.08em] md:text-8xl">EVAN</h1>
              <p className="mt-2 text-xs tracking-[0.8em] text-white/60">PORTFOLIO</p>
            </div>
            <div className="h-px w-72 overflow-hidden bg-white/10">
              <motion.div
                className="h-full w-1/2 bg-white"
                animate={{ x: ["-100%", "220%"] }}
                transition={{ duration: 1.25, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <p className="text-xs tracking-[0.35em] text-white/40">设计档案加载中</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Nav() {
  return (
    <motion.nav
      className="fixed left-0 right-0 top-0 z-50 border-b border-black/10 bg-[#F7F7F5]/80 px-6 py-6 text-black backdrop-blur-2xl md:px-10"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.8 }}
    >
      <div className="mx-auto flex max-w-[1760px] items-center justify-between">
        <a href="#top" className="text-[2.1rem] font-black leading-none tracking-[-0.18em]" data-cursor>
          EV<span className="text-[#2D68FF]">.</span>
        </a>

        <div className="hidden items-center gap-28 text-sm font-semibold uppercase tracking-[0.04em] md:flex">
          <a href="#about" data-cursor className="group leading-tight">
            <span className="block">ABOUT</span>
            <span className="mt-1 block text-xs text-black/45">01</span>
          </a>
          <a href="#works" data-cursor className="group leading-tight">
            <span className="block">WORKS</span>
            <span className="mt-1 block text-xs text-black/45">02</span>
          </a>
          <a href="#contact" data-cursor className="group leading-tight">
            <span className="block">CONTACT</span>
            <span className="mt-1 block text-xs text-black/45">03</span>
          </a>
        </div>

        <div className="flex items-center gap-12">
          <span className="relative grid h-10 w-10 place-items-center rounded-full bg-black shadow-sm">
            <span className="absolute h-5 w-5 rounded-full bg-[#2D68FF]/20 blur-md" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-[#2D68FF] shadow-[0_0_18px_rgba(45,104,255,0.95)]" />
          </span>
          <div className="hidden items-center gap-4 md:flex">
            <span className="text-sm font-semibold tracking-[0.1em]">MENU</span>
            <span className="h-px w-4 bg-black" />
            <span className="h-px w-2 bg-black" />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const portraitX = useTransform(mx, [-500, 500], [18, -18]);
  const portraitY = useTransform(my, [-500, 500], [10, -10]);
  const titleX = useTransform(mx, [-500, 500], [-10, 10]);
  const titleY = useTransform(my, [-500, 500], [-6, 6]);

  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden bg-[#F7F7F5] px-6 pt-28 text-black md:px-10"
      onMouseMove={(e) => {
        mx.set(e.clientX - window.innerWidth / 2);
        my.set(e.clientY - window.innerHeight / 2);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_42%,rgba(65,90,140,0.12),transparent_32%),radial-gradient(circle_at_55%_88%,rgba(255,255,255,0.98),transparent_35%)]" />
      <div className="absolute inset-0 opacity-[0.13] bg-[linear-gradient(90deg,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.055)_1px,transparent_1px)] [background-size:96px_96px]" />

      <motion.div
        className="pointer-events-none absolute right-[-2%] top-[13%] z-0 aspect-[3/4] w-[52vw] max-w-[860px]"
        style={{ x: portraitX, y: portraitY }}
        initial={{ opacity: 0, x: 90, filter: "blur(22px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ delay: 2.42, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={profile.portrait}
          alt="Evan portrait"
          className="h-full w-full object-cover object-center grayscale contrast-125 mix-blend-multiply [mask-image:linear-gradient(to_bottom,black_62%,transparent_100%)]"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_36%,transparent_36%,rgba(247,247,245,0.96)_76%)]" />
      </motion.div>

      <div className="pointer-events-none absolute right-[5.5%] top-[18%] z-10 h-[650px] w-[650px] rounded-full border border-[#8EA0C8]/24" />
      <div className="pointer-events-none absolute right-[13%] top-[25%] z-10 h-[430px] w-[430px] rounded-full border border-[#8EA0C8]/16" />
      <div className="pointer-events-none absolute right-[20%] top-[33%] z-10 h-48 w-px bg-gradient-to-b from-transparent via-black/24 to-transparent" />
      <div className="pointer-events-none absolute right-[12%] top-[31%] z-10 h-px w-[34vw] bg-gradient-to-r from-transparent via-[#6B83BD]/55 to-transparent" />
      <motion.div
        className="pointer-events-none absolute right-[15%] top-[52%] z-10 h-px w-[31vw] bg-gradient-to-r from-transparent via-[#6B83BD]/36 to-transparent"
        animate={{ opacity: [0.18, 0.65, 0.18], x: [-16, 16, -16] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-[23%] top-[72%] z-10 h-3 w-3 rounded-full bg-[#2D68FF] shadow-[0_0_24px_rgba(45,104,255,0.95)]"
        animate={{ scale: [1, 1.35, 1], opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="pointer-events-none absolute right-[4.8%] top-[29%] z-10 hidden text-[11px] uppercase leading-8 tracking-[0.16em] text-black/58 md:block">
        <p className="mb-4 tracking-[0.28em]">[ 2024 ]</p>
        <p>DESIGN</p>
        <p>BRANDING</p>
        <p>AI CREATION</p>
        <p>VISUAL SYSTEM</p>
      </div>

      <div className="pointer-events-none absolute bottom-[12%] right-[6%] z-10 hidden text-[11px] uppercase leading-8 tracking-[0.22em] text-white/80 md:block">
        <p>EMOTION</p>
        <p className="text-white/35">×</p>
        <p>DESIGN</p>
        <p className="text-white/35">×</p>
        <p>PURPOSE</p>
      </div>

      <div className="relative z-20 mx-auto flex min-h-[calc(100vh-7rem)] max-w-[1760px] flex-col justify-center pb-16">
        <motion.div
          className="max-w-[1040px]"
          style={{ x: titleX, y: titleY }}
          initial={{ opacity: 0, y: 78, filter: "blur(18px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 2.4, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="select-none font-black uppercase leading-[0.77] tracking-[-0.105em] text-black">
            <span className="block text-[18vw] md:text-[10vw] [clip-path:polygon(0_0,100%_0,96%_100%,0_100%)]">
              EVAN
            </span>
            <span className="block text-[14vw] md:text-[7.9vw] bg-gradient-to-r from-black via-black/76 to-black/18 bg-clip-text text-transparent">
              PORTFOLIO
            </span>
          </h1>
        </motion.div>

        <motion.div
          className="mt-7 flex items-center gap-10 text-xl leading-8 text-black/78 md:text-2xl"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.72, duration: 0.72 }}
        >
          <p>Design with Emotion.<br />Create with Purpose.</p>
          <span className="text-3xl font-light text-black/45">＋</span>
          <span className="h-px w-24 bg-black/20" />
        </motion.div>

        <motion.div
          className="mt-20 max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.9, duration: 0.8 }}
        >
          <div className="mb-4 text-6xl leading-none text-black/75">“</div>
          <p className="whitespace-pre-line text-4xl font-medium leading-[1.28] tracking-[0.16em] text-black md:text-5xl">
            {profile.manifesto}
          </p>
          <div className="mt-8 h-1 w-24 rounded-full bg-[#2D68FF]" />
        </motion.div>

        <motion.div
          className="absolute bottom-7 left-0 hidden items-center gap-5 text-[11px] uppercase tracking-[0.35em] text-black/38 md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.1 }}
        >
          <span className="grid h-8 w-5 place-items-center rounded-full border border-black/30">
            <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
          </span>
          Scroll to explore
        </motion.div>

        <motion.p
          className="absolute bottom-7 left-0 translate-y-12 text-[11px] tracking-[0.08em] text-black/38 md:left-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2 }}
        >
          © 2025 Evan Portfolio. All Rights Reserved.
        </motion.p>
      </div>
    </section>
  );
}

function SectionLabel({ eyebrow, title, desc, index = "00" }) {
  return (
    <div className="mb-16 grid gap-8 border-b border-black/10 pb-10 md:grid-cols-[0.35fr_1fr_0.75fr] md:items-end">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-black/35">{index}</p>
        <p className="mt-3 text-xs uppercase tracking-[0.35em] text-[#2D68FF]">{eyebrow}</p>
      </div>
      <h2 className="text-6xl font-black uppercase leading-[0.86] tracking-[-0.12em] text-black md:text-8xl">{title}</h2>
      <p className="text-sm leading-8 tracking-[0.08em] text-black/52">{desc}</p>
    </div>
  );
}

function SectionShell({ id, children }) {
  return (
    <section id={id} className="relative overflow-hidden bg-[#F7F7F5] px-6 py-28 text-black md:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(45,104,255,0.08),transparent_28%),radial-gradient(circle_at_20%_90%,rgba(255,255,255,0.98),transparent_38%)]" />
      <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(90deg,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.055)_1px,transparent_1px)] [background-size:96px_96px]" />
      <div className="pointer-events-none absolute right-[6%] top-[18%] h-[520px] w-[520px] rounded-full border border-[#8EA0C8]/20" />
      <div className="pointer-events-none absolute right-[13%] top-[26%] h-[320px] w-[320px] rounded-full border border-[#8EA0C8]/12" />
      <div className="relative z-10 mx-auto max-w-[1760px]">{children}</div>
    </section>
  );
}

function About() {
  return (
    <SectionShell id="about">
      <SectionLabel
        index="01"
        eyebrow="ABOUT"
        title="个人简介"
        desc="不是传统简历，而是一套设计师成长档案：从陶瓷材料、文化符号到商业礼赠，再到AI时代的情绪化产品设计。"
      />

      <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          className="relative min-h-[34rem] overflow-hidden rounded-[2.5rem] border border-black/10 bg-white/65 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.06)] backdrop-blur-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute right-8 top-8 grid h-12 w-12 place-items-center rounded-full bg-black">
            <span className="h-2.5 w-2.5 rounded-full bg-[#2D68FF] shadow-[0_0_18px_rgba(45,104,255,0.95)]" />
          </div>
          <p className="text-xs uppercase tracking-[0.35em] text-black/35">DESIGNER PROFILE</p>
          <h3 className="mt-12 text-6xl font-black leading-[0.9] tracking-[-0.12em] md:text-8xl">
            YE FEI<br />EVAN
          </h3>
          <p className="mt-10 max-w-xl text-base leading-9 tracking-[0.08em] text-black/56">
            AI时代的情绪化产品设计师。关注陶瓷产品、包装系统、品牌视觉与文创落地，用设计把情绪瞬间转化为可被使用、传播与记住的产品体验。
          </p>
          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between border-t border-black/10 pt-6 text-xs uppercase tracking-[0.22em] text-black/42">
            <span>BASED IN CHINA</span>
            <span>PRODUCT / PACKAGE / VISUAL</span>
          </div>
        </motion.div>

        <div className="relative rounded-[2.5rem] border border-black/10 bg-white/45 p-4 backdrop-blur-2xl">
          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              className="group grid gap-5 border-b border-black/10 p-6 last:border-b-0 md:grid-cols-[0.25fr_1fr]"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.05 }}
            >
              <div className="flex items-start gap-4">
                <span className="mt-2 h-2 w-2 rounded-full bg-[#2D68FF] shadow-[0_0_12px_rgba(45,104,255,0.8)]" />
                <p className="text-3xl font-black tracking-[-0.08em] text-black/25 transition group-hover:text-black">{item.year}</p>
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-[-0.06em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-8 tracking-[0.08em] text-black/52">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function CardStack({ project, index, onOpen }) {
  const y = index * -16;
  const rotate = (index - 3) * 2.4;
  return (
    <motion.button
      data-cursor
      onClick={() => onOpen(project)}
      className="group absolute left-1/2 top-1/2 h-[31rem] w-[22rem] origin-center -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2rem] border border-black/10 bg-white/80 p-3 text-left shadow-[0_30px_100px_rgba(0,0,0,0.14)] backdrop-blur-2xl"
      initial={{ opacity: 0, y: 100, rotate }}
      whileInView={{ opacity: 1, y, rotate }}
      whileHover={{ y: y - 48, rotate: rotate * 0.35, scale: 1.045, zIndex: 50 }}
      whileTap={{ scale: 0.98 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 150, damping: 20, delay: index * 0.04 }}
    >
      <div className="relative h-full overflow-hidden rounded-[1.45rem] bg-[#F7F7F5]">
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between border-b border-black/10 bg-white/55 px-5 py-4 backdrop-blur-xl">
          <span className="text-[10px] tracking-[0.35em] text-[#2D68FF]">PROJECT_{String(project.id).padStart(2, "0")}</span>
          <span className="text-[10px] tracking-[0.28em] text-black/42">{project.category}</span>
        </div>
        <div className="absolute left-5 right-5 top-[4.6rem] z-20 flex flex-wrap gap-2 opacity-0 transition duration-500 group-hover:opacity-100">
          {project.process.slice(0, 3).map((item) => (
            <span key={item} className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[10px] tracking-[0.18em] text-black/55 backdrop-blur-xl">
              {item}
            </span>
          ))}
        </div>
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover opacity-75 grayscale-[8%] transition duration-700 group-hover:scale-105 group-hover:opacity-95"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/32 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5">
          <p className="mb-3 text-xs tracking-[0.35em] text-black/42">{project.tag}</p>
          <h3 className="text-3xl font-black leading-tight tracking-[-0.08em] text-black">{project.title}</h3>
          <div className="mt-4 grid grid-cols-[0.35fr_1fr] gap-3 border-t border-black/10 pt-4">
            <p className="text-[10px] tracking-[0.28em] text-[#2D68FF]">BRIEF</p>
            <p className="line-clamp-3 text-xs leading-6 tracking-[0.06em] text-black/55">{project.intro}</p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-[10px] tracking-[0.3em] text-black/32">DRAW TO OPEN</p>
            <ArrowUpRight className="text-black/50 transition group-hover:rotate-45 group-hover:text-[#2D68FF]" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function Works() {
  const [active, setActive] = useState("全部");
  const [selected, setSelected] = useState(null);
  const filtered = useMemo(() => (active === "全部" ? projects : projects.filter((project) => project.category === active)), [active]);

  return (
    <SectionShell id="works">
      <SectionLabel
        index="02"
        eyebrow="WORKS"
        title="作品案例"
        desc="作品以设计提案卡的方式被抽出。每张卡都不是缩略图，而是一个可展开的项目档案：brief、灵感、流程、草图、材质与落地效果。"
      />

      <div className="mb-14 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            data-cursor
            onClick={() => setActive(cat)}
            className={`rounded-full border px-5 py-3 text-sm tracking-[0.12em] transition ${
              active === cat ? "border-black bg-black text-white" : "border-black/10 bg-white/55 text-black/55 backdrop-blur-xl hover:border-black/40 hover:text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="relative mx-auto h-[42rem] max-w-6xl rounded-[3rem] border border-black/10 bg-[linear-gradient(90deg,rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.035)_1px,transparent_1px),radial-gradient(circle_at_center,rgba(45,104,255,0.10),transparent_45%)] [background-size:60px_60px,60px_60px,auto] shadow-[0_40px_120px_rgba(0,0,0,0.08)]">
        <div className="absolute left-6 top-6 flex items-center gap-2 text-xs tracking-[0.35em] text-black/35">
          <MousePointer2 size={15} /> CLICK / DRAW CARD
        </div>
        <div className="absolute right-8 top-8 grid h-10 w-10 place-items-center rounded-full bg-black">
          <span className="h-2.5 w-2.5 rounded-full bg-[#2D68FF] shadow-[0_0_18px_rgba(45,104,255,0.95)]" />
        </div>
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <CardStack key={project.id} project={project} index={index} onOpen={setSelected} />
          ))}
        </AnimatePresence>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </SectionShell>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[80] overflow-y-auto bg-[#f3f0e8] text-black"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-black/10 bg-[#f3f0e8]/80 px-5 py-5 backdrop-blur-xl md:px-10">
            <p className="text-sm font-bold tracking-[-0.04em]">PROJECT DETAIL / 数字杂志叙事</p>
            <button onClick={onClose} data-cursor className="rounded-full border border-black/15 px-5 py-2 text-sm hover:bg-black hover:text-white">
              关闭
            </button>
          </div>

          <article className="px-5 pb-24 pt-14 md:px-10">
            <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-end">
              <div>
                <p className="mb-5 text-xs tracking-[0.4em] text-black/40">{project.category} / {project.tag}</p>
                <h2 className="text-6xl font-black leading-[0.92] tracking-[-0.12em] md:text-8xl">{project.title}</h2>
                <p className="mt-8 max-w-xl text-base leading-9 tracking-[0.08em] text-black/55">{project.intro}</p>
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-[2.4rem] bg-black/10">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>

            <div className="my-20 h-px bg-black/10" />

            <div className="grid gap-12 md:grid-cols-3">
              <div>
                <p className="mb-5 text-xs tracking-[0.35em] text-black/35">01 CONCEPT</p>
                <h3 className="text-3xl font-black tracking-[-0.08em]">设计概念</h3>
              </div>
              <p className="text-base leading-9 tracking-[0.08em] text-black/60 md:col-span-2">{project.source}</p>
            </div>

            <div className="my-20 grid gap-5 md:grid-cols-5">
              {project.process.map((step, i) => (
                <motion.div
                  key={step}
                  className="rounded-[1.5rem] border border-black/10 bg-black/[0.03] p-5"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <p className="mb-8 text-xs text-black/35">0{i + 1}</p>
                  <p className="text-lg font-bold tracking-[-0.05em]">{step}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {project.gallery.map((img, i) => (
                <div key={img} className={`overflow-hidden rounded-[2.2rem] bg-black/10 ${i === 0 ? "md:translate-y-12" : ""}`}>
                  <img
                    src={img}
                    alt="project gallery"
                    className="h-[28rem] w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="mt-24 rounded-[2.5rem] bg-black p-8 text-white md:p-12">
              <p className="mb-6 text-xs tracking-[0.4em] text-white/35">MOOD KEYWORDS</p>
              <p className="text-4xl font-black leading-tight tracking-[-0.08em] md:text-6xl">{project.mood}</p>
            </div>
          </article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Contact() {
  return (
    <SectionShell id="contact">
      <SectionLabel
        index="03"
        eyebrow="CONTACT"
        title="联系方式"
        desc="开放合作方向：陶瓷产品设计、礼盒包装设计、品牌视觉、文创产品、AI辅助设计提案与商业项目视觉系统。"
      />

      <div className="rounded-[3rem] border border-black/10 bg-white/62 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.08)] backdrop-blur-2xl md:p-14">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <p className="mb-5 text-xs tracking-[0.45em] text-[#2D68FF]">LET EMOTION ENTER PRODUCT</p>
            <h2 className="whitespace-pre-line text-6xl font-black leading-[0.9] tracking-[-0.12em] text-black md:text-8xl">让情绪
进入产品</h2>
          </div>
          <div>
            <p className="mb-8 text-sm leading-8 tracking-[0.08em] text-black/52">
              如果你的项目需要兼具审美、情绪价值与商业落地，我可以参与从概念、视觉、产品、包装到提案呈现的完整流程。
            </p>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${profile.email}`} data-cursor className="group flex items-center justify-between rounded-2xl border border-black/10 bg-white/70 px-5 py-4 text-sm text-black/70 transition hover:bg-black hover:text-white">
                <span className="flex items-center gap-3"><Mail size={18} /> {profile.email}</span>
                <MoveUpRight className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-white/45 px-5 py-4 text-sm text-black/52">
                <span className="flex items-center gap-3"><Layers size={18} /> {profile.phone}</span>
                <span>WeChat / Phone</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

export default function EvanPortfolio() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    validateData();
    const timer = setTimeout(() => setLoaded(true), 2100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#090909] selection:bg-white selection:text-black">
      <Noise />
      <Cursor />
      <LoadingScreen done={loaded} />
      <Nav />
      <Hero />
      <About />
      <Works />
      <Contact />
    </main>
  );
}
