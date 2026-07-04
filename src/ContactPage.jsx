function ContactPage({ onBack }) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-[#030303] px-5 py-24 text-white md:px-10 md:py-28">
  
        {/* 背景层 */}
        <div className="absolute inset-0 bg-black/80" />
  
        <div className="relative z-10 mx-auto max-w-[1200px]">
  
          {/* 返回 */}
          <button
            onClick={onBack}
            className="text-xs tracking-[0.25em] text-white/45 transition hover:text-white"
          >
            ← 返回作品案例
          </button>
  
          {/* 标题区 */}
          <div className="mt-20 text-center space-y-6">
  
            <p className="text-xs tracking-[0.55em] text-white/30">
              CONTACT
            </p>
  
            <h1 className="text-5xl md:text-7xl font-bold tracking-[0.15em]">
              合作联系
            </h1>
  
            <div className="mx-auto mt-10 h-10 w-px bg-gradient-to-b from-white/40 to-transparent" />
          </div>
  
          {/* 信息区 */}
          <div className="mt-24 space-y-16 text-center">
  
            {/* 微信 */}
            <div className="space-y-2">
              <p className="text-xs tracking-[0.5em] text-white/40">
                WECHAT
              </p>
              <p className="text-2xl md:text-3xl font-light tracking-[0.1em]">
                F-y0053
              </p>
            </div>
  
            {/* 邮箱 */}
            <div className="space-y-2">
              <p className="text-xs tracking-[0.5em] text-white/40">
                EMAIL
              </p>
              <p className="text-xl md:text-2xl font-light tracking-[0.1em]">
                728784164@qqcom
              </p>
            </div>
  
          </div>
  
          {/* 底部装饰线 */}
          <div className="mt-32 flex justify-center">
            <div className="h-[1px] w-[140px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>
  
        </div>
      </section>
    );
  }
  
  export default ContactPage;