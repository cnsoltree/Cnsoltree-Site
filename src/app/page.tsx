import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "首页",
  description:
    "Cnsoltree — 专注于提供高质量的咨询与技术解决方案，助力企业数字化转型。",
};

// ─── 数据 ────────────────────────────────────────────────────────────────────

interface Feature {
  icon: string;
  title: string;
  description: string;
  accent: string;
}

const features: Feature[] = [
  {
    icon: "🌿",
    title: "战略咨询",
    description:
      "深入洞察行业趋势，为企业提供数据驱动的战略规划，帮助组织明确方向、降低决策风险。",
    accent: "from-emerald-400 to-teal-400",
  },
  {
    icon: "⚙️",
    title: "技术架构",
    description:
      "基于 Next.js、Supabase 等现代技术栈，为你的业务设计可扩展、高可用的系统架构。",
    accent: "from-blue-400 to-cyan-400",
  },
  {
    icon: "☁️",
    title: "云端基础设施",
    description:
      "利用 Cloudflare R2 对象存储、CDN 加速，以最低成本实现全球边缘部署。",
    accent: "from-violet-400 to-purple-400",
  },
  {
    icon: "📧",
    title: "用户触达",
    description:
      "通过 Resend 构建可靠的邮件通知体系，从欢迎邮件到事务通知，全程自动化。",
    accent: "from-orange-400 to-amber-400",
  },
  {
    icon: "🔒",
    title: "安全合规",
    description:
      "Row Level Security、加密存储、GDPR 合规——安全从架构设计阶段开始融入。",
    accent: "from-red-400 to-rose-400",
  },
  {
    icon: "📊",
    title: "数据分析",
    description:
      "实时监控业务指标，可视化用户行为，为产品迭代提供可量化的数据支撑。",
    accent: "from-pink-400 to-fuchsia-400",
  },
];

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: "200+", label: "服务客户" },
  { value: "98%", label: "客户满意度" },
  { value: "5年+", label: "行业经验" },
  { value: "24/7", label: "技术支持" },
];

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Cnsoltree 帮助我们在三个月内完成了原本需要一年的系统迁移，团队的专业度和响应速度令人印象深刻。",
    name: "张伟",
    title: "某科技公司 CTO",
    avatar: "ZW",
  },
  {
    quote:
      "他们不只是技术供应商，更像是我们自己的团队成员，真正理解业务需求，给出的方案既务实又前沿。",
    name: "李明",
    title: "初创公司创始人",
    avatar: "LM",
  },
  {
    quote:
      "从策略到落地，Cnsoltree 的全程陪伴让我们的数字化转型项目顺利交付，远超预期。",
    name: "王芳",
    title: "传统企业数字化负责人",
    avatar: "WF",
  },
];

// ─── 子组件 ──────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* 背景装饰 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="bg-dots absolute inset-0 opacity-40" />
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-100 opacity-60 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-teal-100 opacity-50 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* 标签 */}
          <div className="mb-8 flex justify-center">
            <span className="badge-emerald">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              现已开放合作咨询
            </span>
          </div>

          {/* 标题 */}
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
            让每一棵{" "}
            <span className="relative inline-block">
              <span className="gradient-text">数字之树</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 200 8"
                className="absolute -bottom-1 left-0 w-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 6 Q50 0 100 4 Q150 8 200 2"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>
            </span>{" "}
            茁壮生长
          </h1>

          {/* 描述 */}
          <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-gray-600">
            Cnsoltree 是面向初创企业与成长型公司的技术咨询伙伴。
            我们将深度行业洞见与现代技术栈结合，帮助你快速从 0 到 1，
            再从 1 到 N。
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact" className="btn-primary w-full sm:w-auto">
              免费预约咨询
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <Link href="#features" className="btn-secondary w-full sm:w-auto">
              了解我们的服务
            </Link>
          </div>

          {/* 信任信号 */}
          <p className="mt-8 text-xs text-gray-400">
            已服务 200+ 企业客户 · 无需绑定 · 随时可退出
          </p>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="border-y border-gray-100 bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="text-sm font-medium text-gray-500">{stat.label}</dt>
              <dd className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* 标题 */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">我们的服务</p>
          <h2 className="section-title">覆盖数字化全链路</h2>
          <p className="section-description">
            从战略规划到技术落地，Cnsoltree 提供端到端的专业支持，
            让你的团队聚焦核心业务。
          </p>
        </div>

        {/* 卡片网格 */}
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="card group">
              {/* 图标 */}
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.accent} text-2xl shadow-sm`}
              >
                {feature.icon}
              </div>

              <h3 className="mt-4 text-base font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {feature.description}
              </p>

              {/* 悬浮箭头 */}
              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-emerald-600 opacity-0 transition-opacity group-hover:opacity-100">
                了解更多
                <svg
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">客户评价</p>
          <h2 className="section-title">他们已在路上</h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              {/* 引号装饰 */}
              <svg
                aria-hidden="true"
                className="absolute right-6 top-6 h-8 w-8 text-gray-100"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>

              <blockquote className="text-sm leading-relaxed text-gray-700">
                {t.quote}
              </blockquote>

              <figcaption className="mt-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.title}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-emerald-600 py-20">
      {/* 背景装饰 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-emerald-500 opacity-30 blur-3xl" />
        <div className="absolute -bottom-16 left-0 h-56 w-56 rounded-full bg-teal-400 opacity-30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          准备好开启你的数字化旅程了吗？
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-emerald-100">
          与 Cnsoltree 的专家团队预约一次免费的 30 分钟咨询，
          我们将为你量身评估最适合的解决方案。
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-emerald-700 shadow-sm transition-all hover:bg-emerald-50 hover:shadow-md active:scale-[0.98]"
          >
            立即免费咨询
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/50 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-emerald-500 active:scale-[0.98]"
          >
            了解团队背景
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── 页面导出 ────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
