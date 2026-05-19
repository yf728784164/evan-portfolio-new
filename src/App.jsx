import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function App() {
  const canvasRef = useRef(null);

  // 粒子背景
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    const mouse = {
      x: null,
      y: null,
      radius: 120,
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    class Particle {
      constructor(x, y, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          this.x -= dx / 30;
          this.y -= dy / 30;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.12)";
        ctx.fill();
      }
    }

    function init() {
      particles = [];
      for (let i = 0; i < 120; i++) {
        particles.push(
          new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 2,
            (Math.random() - 0.5) * 0.4,
            (Math.random() - 0.5) * 0.4
          )
        );
      }
    }

    function connect() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = dx * dx + dy * dy;

          if (distance < 12000) {
            ctx.strokeStyle = "rgba(255,255,255,0.03)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      connect();

      requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    });
  }, []);

  return (
    <main className="bg-black text-white overflow-hidden">
      {/* 粒子背景 */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0"
      />

      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center backdrop-blur-sm">
        <div className="text-sm tracking-[0.4em] uppercase text-white/80">
          EVAN
        </div>

        <nav className="hidden md:flex gap-10 text-sm text-white/50 tracking-[0.25em] uppercase">
          <a href="#about" className="hover:text-white transition">
            Personal
          </a>

          <a href="#works" className="hover:text-white transition">
            Works
          </a>

          <a href="#contact" className="hover:text-white transition">
            Contact
          </a>
        </nav>
      </header>

      {/* 首页 */}
      <section className="relative h-screen flex items-center justify-center px-6">
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4 }}
            className="text-[18vw] md:text-[10vw] leading-none font-black tracking-[0.25em]"
          >
            EVAN
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-[3vw] md:text-[1vw] uppercase tracking-[1em] text-white/45"
          >
            PORTFOLIO
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 text-white/30 text-sm tracking-[0.5em]"
          >
            2026
          </motion.div>
        </div>
      </section>

      {/* 第二屏 */}
      <section
        id="about"
        className="relative min-h-screen px-6 md:px-20 py-32 border-t border-white/10"
      >
        {/* 巨大编号 */}
        <div className="absolute left-6 md:left-12 top-20 text-[30vw] md:text-[18vw] font-black text-white/[0.03] leading-none pointer-events-none">
          01
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-20 items-center">
          {/* 左侧内容 */}
          <div>
            <div className="uppercase tracking-[0.4em] text-sm text-white/40">
              DESIGN ARCHIVE
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mt-10 text-4xl md:text-7xl leading-[1.1] font-black"
            >
              将稍纵即逝的情绪，
              <br />
              变成可触碰的设计
            </motion.h2>

            <div className="mt-10 text-white/50 leading-9 text-lg max-w-xl">
              陶瓷产品 / 品牌视觉 / 包装系统 / 文创落地
            </div>

            {/* 时间轴 */}
            <div className="mt-20 space-y-8">
              {[
                "2020 紫金奖",
                "2021 国际设计奖",
                "2022 创立工作室",
                "2026 Independent Designer",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 20 }}
                  className="group flex items-center gap-6 cursor-pointer"
                >
                  <div className="text-white/20 text-3xl font-black group-hover:text-white transition">
                    0{index + 1}
                  </div>

                  <div className="h-px w-20 bg-white/10 group-hover:w-32 transition-all duration-500" />

                  <div className="tracking-[0.2em] text-white/60 uppercase group-hover:text-white transition">
                    {item}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 右侧人物图 */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-white/10 blur-[120px]" />

            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200"
              alt=""
              className="relative z-10 w-full max-w-[520px] mx-auto grayscale opacity-70 rounded-[40px] object-cover"
            />

            <div className="absolute -bottom-10 -right-10 text-[12vw] font-black text-white/[0.04]">
              EVAN
            </div>
          </motion.div>
        </div>
      </section>

      {/* 第三屏 */}
      <section
        id="works"
        className="min-h-screen px-6 md:px-20 py-32 border-t border-white/10"
      >
        <div className="text-sm uppercase tracking-[0.4em] text-white/40">
          Selected Works
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-10">
          {[1, 2, 3, 4].map((item) => (
            <motion.div
              key={item}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-[30px] bg-white/[0.03] border border-white/10"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={`https://picsum.photos/900/1200?random=${item}`}
                  className="w-full h-full object-cover grayscale group-hover:scale-105 transition duration-700"
                />
              </div>

              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                <div className="text-white/40 uppercase tracking-[0.3em] text-xs">
                  2026
                </div>

                <div className="mt-2 text-2xl font-bold">
                  Project {item}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 联系 */}
      <section
        id="contact"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 border-t border-white/10"
      >
        <div className="text-white/30 uppercase tracking-[0.5em] text-sm">
          Contact
        </div>

        <motion.h2
          whileHover={{ scale: 1.03 }}
          className="mt-10 text-5xl md:text-8xl font-black tracking-[0.12em]"
        >
          LET'S TALK
        </motion.h2>

        <div className="mt-10 text-white/50 text-lg">
          728784164@qq.com
        </div>

        <div className="mt-4 text-white/30">
          Hangzhou / Jingdezhen / Worldwide
        </div>
      </section>
    </main>
  );
}