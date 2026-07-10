import { motion } from "framer-motion";

export default function ContactPage({ onBack }) {
  return (
    <section
      id="contact"
      className="relative min-h-screen overflow-hidden bg-[#030303] px-5 py-20 text-white md:px-10 md:py-24"
    >
      <div className="absolute inset-0 bg-black/82" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-10rem)] max-w-[1400px] flex-col">
        <button
          onClick={onBack}
          className="text-left text-xs tracking-[0.25em] text-white/45 transition hover:text-white"
        >
          ← 返回作品案例
        </button>

        <div className="flex flex-1 flex-col justify-center">
          <div className="border-b border-white/10 pb-8">
            <p className="text-xs tracking-[0.55em] text-white/30">
              CONTACT
            </p>

            <h1 className="mt-5 text-5xl font-bold tracking-[0.12em] md:text-7xl">
              合作联系
            </h1>
          </div>

          <motion.div
            className="mt-16 grid gap-6 md:grid-cols-2"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-8 md:p-10">
              <p className="text-xs tracking-[0.45em] text-white/35">
                WECHAT
              </p>

              <p className="mt-8 break-all text-3xl font-light tracking-[0.08em] md:text-4xl">
                F-y0053
              </p>
            </div>

            <a
              href="mailto:728784164@qq.com"
              className="group rounded-[2rem] border border-white/10 bg-white/[0.025] p-8 transition hover:border-white/25 hover:bg-white/[0.05] md:p-10"
            >
              <p className="text-xs tracking-[0.45em] text-white/35">
                EMAIL
              </p>

              <p className="mt-8 break-all text-2xl font-light tracking-[0.04em] text-white transition group-hover:text-white/75 md:text-3xl">
                728784164@qq.com
              </p>
            </a>
          </motion.div>

          <p className="mt-20 text-xs tracking-[0.35em] text-white/20">
            EVAN PORTFOLIO · 2026
          </p>
        </div>
      </div>
    </section>
  );
}