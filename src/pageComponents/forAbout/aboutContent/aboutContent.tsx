import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import storyImg1 from "@/assets/ripped.avif";
import storyImg2 from "@/assets/pexels-binyaminmellish-17840.jpg";
import SectionHeading from "@/pageComponents/forHome/sectionHeading/sectionHeading";
import {
  whoWeAreText,
  standardsPillars,
  metricsData,
  trustText,
  guaranteePoints,
  ctaText,
} from "./aboutContent.data";
import { containerClass, gridFour, ctaButton } from "./aboutContent.styles";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.5, delay },
  viewport: { once: true } as const,
});

const AboutContent = () => {
  return (
    <>
      {/* Who We Are */}
      <section className="relative py-16 sm:py-20 lg:py-28 bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
        <div className={containerClass() + " relative z-10"}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Text */}
            <motion.div {...fade()}>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand mb-4 block">
                Who We Are
              </span>
              <div className="relative mb-6">
                <span
                  aria-hidden="true"
                  className="absolute text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-[0.95] text-brand opacity-30"
                  style={{
                    WebkitTextStroke: "1px rgba(0,0,0,0.15)",
                    transform: "translate(4px, 4px)",
                  }}
                >
                  Built By
                  <br />
                  Lifters.
                </span>
                <h2 className="relative text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-[0.95] text-neutral-900 dark:text-white">
                  Built By
                  <br />
                  Lifters.
                </h2>
              </div>
              <div className="w-12 h-[2px] bg-brand mb-6" />
              <p className="text-base sm:text-lg leading-relaxed text-neutral-600 dark:text-neutral-300 font-light">
                {whoWeAreText}
              </p>
            </motion.div>

            {/* Right — Images */}
            <motion.div
              {...fade(0.2)}
              className="relative grid grid-cols-2 gap-4 h-[400px] lg:h-[480px]"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={storyImg1}
                  alt="Gym training"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden translate-y-8">
                <img
                  src={storyImg2}
                  alt="Athlete lifting"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Standards */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className={containerClass() + " relative z-10"}>
          <SectionHeading text="Our Standards" className="mb-8" />
          <div
            className={
              gridFour() +
              " rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700/50"
            }
          >
            {standardsPillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                {...fade(0.1 + i * 0.1)}
                className={`relative p-6 sm:p-8 bg-white dark:bg-neutral-900/80 ${
                  i > 0
                    ? "border-t sm:border-t-0 sm:border-l border-neutral-200 dark:border-neutral-700/50 lg:border-t-0 lg:border-l"
                    : ""
                } ${i === 2 ? "sm:border-t sm:border-l-0 lg:border-t-0 lg:border-l" : ""}`}
              >
                {/* Number */}
                <span className="absolute top-4 left-6 text-5xl font-black text-brand/10 dark:text-brand/20 leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative pt-10">
                  <h3 className="text-sm font-black uppercase tracking-wider text-neutral-900 dark:text-white mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof / Metrics */}
      <section
        className="relative py-16 sm:py-20 overflow-hidden"
        style={{ background: "rgb(var(--color-brand))" }}
      >
        {/* Decorative circle */}
        <div
          className="absolute -right-20 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none opacity-10"
          style={{
            background: "radial-gradient(circle, white 0%, transparent 70%)",
          }}
        />
        <div className={containerClass() + " relative z-10"}>
          {/* Section label */}
          <motion.div {...fade()} className="flex items-center gap-4 mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/80">
              By The Numbers
            </span>
            <div className="flex-1 h-[1px] bg-white/20" />
          </motion.div>

          {/* Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {metricsData.map((stat, i) => (
              <motion.div
                key={stat.label}
                {...fade(0.1 + i * 0.15)}
                className={`flex flex-col gap-2 py-6 sm:py-0 ${
                  i > 0
                    ? "border-t sm:border-t-0 sm:border-l border-white/20 sm:pl-10"
                    : ""
                }`}
              >
                <span className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none">
                  {stat.value}
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee + CTA */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className={containerClass()}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left — Guarantee */}
            <motion.div {...fade()}>
              <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed mb-10 max-w-md">
                {trustText}
              </p>

              <div className="space-y-5">
                {guaranteePoints.map((point, i) => (
                  <motion.div
                    key={point.title}
                    {...fade(0.1 + i * 0.1)}
                    className="flex items-start gap-4"
                  >
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-wider text-neutral-900 dark:text-white">
                        {point.title}
                      </h4>
                      <p className="text-sm text-neutral-500">{point.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — CTA card */}
            <motion.div
              {...fade(0.2)}
              className="self-center bg-neutral-100 dark:bg-neutral-900 border-l-4 border-brand p-8 sm:p-10 flex flex-col gap-6"
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase leading-tight text-neutral-900 dark:text-white">
                Ready to Lift
                <br />
                Without Limits?
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                50+ products engineered for athletes who don't compromise. Find
                your edge.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/dashboard/products" className={ctaButton()}>
                  {ctaText}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutContent;
