'use client'
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/* ─────────────────────────────────────────────
   Feature 01 — FULL-BLEED CINEMATIC IMAGE, text floats over
───────────────────────────────────────────── */
function Feature01() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "start 10%"] });
    const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.6, 1]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity }}
            className="relative w-full overflow-hidden"
        >
            <div style={{ height: "520px", backgroundColor: "#0a0a0a" }} className="relative overflow-hidden">
                <motion.img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=85"
                    alt="Luxury minimal living room"
                    style={{ scale, transformOrigin: "center center", willChange: "transform" }}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16 max-w-lg">
                    <p className="text-[9px] tracking-[6px] text-white/30 uppercase mb-4">01 — Spatial Design</p>
                    <h3
                        className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-4"
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    >
                        Where light <span className="italic text-white/55">defines</span> space.
                    </h3>
                    <p className="text-sm font-light leading-loose text-white/45 tracking-wide">
                        We sculpt rooms with intention — balancing proportion, light, and material to create interiors that breathe and endure.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   Feature 02 — TEXT LEFT + TALL PORTRAIT IMAGE RIGHT
───────────────────────────────────────────── */
function Feature02() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "start 20%"] });
    const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.5, 1]);

    return (
        <div ref={ref} className="flex flex-col md:flex-row gap-6 md:gap-10 items-stretch">
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 220, damping: 70 }}
                className="flex flex-col justify-center md:w-[42%] py-6 md:py-10 pr-0 md:pr-6"
            >
                <p className="text-[9px] tracking-[6px] text-white/25 uppercase mb-6">02 — Material Craft</p>
                <h3
                    className="text-3xl md:text-4xl font-light text-white leading-tight mb-6"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                    Surfaces <span className="italic text-white/50">chosen</span> for the senses.
                </h3>
                <div className="h-px bg-gradient-to-r from-white/20 to-transparent mb-6 w-24" />
                <p className="text-sm font-light leading-loose text-white/35 tracking-wide">
                    Every surface is chosen for its sensory quality. We source rare stones, aged metals, and bespoke textiles that age with grace — materials that tell a story over decades.
                </p>
                <div className="mt-10 border-l border-white/10 pl-5">
                    <p className="text-2xl font-light text-white mb-1" style={{ fontFamily: "Georgia, serif" }}>60+</p>
                    <p className="text-[9px] tracking-[3px] text-white/25 uppercase">Material Suppliers</p>
                </div>
            </motion.div>

            {/* ✅ Static overflow-hidden wrapper clips the motion div */}
            <div className="md:w-[58%] overflow-hidden">
                <motion.div
                    style={{ opacity, backgroundColor: "#0a0a0a" }}
                    className="w-full h-full group"
                >
                    <img
                        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=85"
                        alt="Material textures and finishes"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                        style={{ minHeight: "420px" }}
                    />
                </motion.div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Feature 03 — TWO IMAGES FLANKING CENTRED TEXT (asymmetric heights)
───────────────────────────────────────────── */
function Feature03() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "end 60%"] });
    const y1 = useTransform(scrollYProgress, [0, 1], ["0px", "-28px"]);
    const y2 = useTransform(scrollYProgress, [0, 1], ["0px", "28px"]);

    return (
        <div ref={ref} className="flex flex-col md:flex-row gap-4 md:gap-5 items-start">
            {/* Left tall image */}
            <div className="w-full md:w-[28%] overflow-hidden">
                <motion.div
                    style={{ y: y1, backgroundColor: "#0a0a0a" }}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 70 }}
                    className="group"
                >
                    <img
                        src="https://images.unsplash.com/photo-1616137466211-f939a420be84?w=600&q=85"
                        alt="Elegant bedroom"
                        className="w-full object-cover group-hover:scale-105 transition duration-700"
                        style={{ height: "380px" }}
                    />
                </motion.div>
            </div>

            {/* Centre text */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 220, damping: 70 }}
                className="flex flex-col justify-center md:w-[44%] py-4 md:py-0 md:px-8 lg:px-14"
            >
                <p className="text-[9px] tracking-[6px] text-white/25 uppercase mb-5">03 — Bespoke Furniture</p>
                <h3
                    className="text-3xl md:text-4xl font-light text-white leading-tight mb-5"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                    Objects made to <span className="italic text-white/50">belong.</span>
                </h3>
                <p className="text-sm font-light leading-loose text-white/35 tracking-wide">
                    Pieces designed and crafted for the space — never off-the-shelf. Each object is a composition that belongs exactly where it stands.
                </p>
            </motion.div>

            {/* Right shorter image — pushed down */}
            <div className="w-full md:w-[28%] overflow-hidden md:mt-20">
                <motion.div
                    style={{ y: y2, backgroundColor: "#0a0a0a" }}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 70 }}
                    className="group"
                >
                    <img
                        src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=85"
                        alt="Bespoke furniture detail"
                        className="w-full object-cover group-hover:scale-105 transition duration-700"
                        style={{ height: "260px" }}
                    />
                </motion.div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Feature 04 — WIDE IMAGE LEFT + TEXT + SMALL ACCENT IMAGE stacked right
───────────────────────────────────────────── */
function Feature04() {
    return (
        <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-stretch">
            {/* Large landscape image */}
            <div className="w-full md:w-[55%] overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 70 }}
                    style={{ backgroundColor: "#0a0a0a" }}
                    className="w-full h-full group"
                >
                    <img
                        src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1000&q=85"
                        alt="Contemporary kitchen"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                        style={{ minHeight: "380px" }}
                    />
                </motion.div>
            </div>

            {/* Right column: text + small accent image */}
            <div className="flex flex-col gap-5 md:w-[45%]">
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 220, damping: 70 }}
                    className="flex flex-col justify-center flex-1 py-2"
                >
                    <p className="text-[9px] tracking-[6px] text-white/25 uppercase mb-5">04 — Lighting Narrative</p>
                    <h3
                        className="text-3xl md:text-4xl font-light text-white leading-tight mb-5"
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    >
                        Light as{" "}
                        <span className="italic text-white/50">invisible architecture.</span>
                    </h3>
                    <p className="text-sm font-light leading-loose text-white/35 tracking-wide">
                        We layer natural and artificial sources to sculpt mood across every hour of the day — from the first morning wash to the amber warmth of dusk.
                    </p>
                </motion.div>

                {/* Small accent image */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 220, damping: 70 }}
                    className="overflow-hidden group"
                    style={{ height: "170px", backgroundColor: "#0a0a0a" }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80"
                        alt="Warm interior lighting detail"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />
                </motion.div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Root Section
───────────────────────────────────────────── */
export default function FeaturesSection() {
    return (
        <section
            id="features"
            className="relative px-4 md:px-16 lg:px-24 xl:px-32 py-24 md:py-32 bg-[#0a0a0a] overflow-hidden"
        >
            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <motion.div
                    className="mb-16 md:mb-20"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 260, damping: 70 }}
                >
                    <p
                        className="text-[10px] tracking-[6px] text-white/30 uppercase mb-5"
                        style={{ transform: "translateY(-8px)" }}
                    >
                        What We Do
                    </p>
                    <div className="flex flex-col md:flex-row md:items-end gap-4">
                        <h2
                            className="flex-1 text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight"
                            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                        >
                            Designed with{" "}
                            <span className="italic text-white/50">purpose.</span>
                        </h2>
                        <div className="hidden md:block w-52 pb-2">
                            <div className="h-px bg-gradient-to-l from-white/20 to-transparent" />
                        </div>
                    </div>
                </motion.div>

                {/* Feature blocks */}
                <div className="flex flex-col gap-5 md:gap-7">
                    <Feature01 />

                    <div className="border-t border-white/[0.06] pt-6 md:pt-10">
                        <Feature02 />
                    </div>

                    <div className="border-t border-white/[0.06] pt-6 md:pt-10">
                        <Feature03 />
                    </div>

                    <div className="border-t border-white/[0.06] pt-6 md:pt-10">
                        <Feature04 />
                    </div>

                    <div className="border-t border-white/[0.06]" />
                </div>
            </div>
        </section>
    );
}