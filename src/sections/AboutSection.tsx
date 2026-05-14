'use client'
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const stats = [
    { value: "12+", label: "Years of Excellence" },
    { value: "340+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "40+", label: "Design Awards" },
];

const mobileImages = [
    {
        src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
        alt: "Luxury minimal living room",
        h: "h-64",
        direction: -1, // slides in from left
    },
    {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
        alt: "Modern architectural interior",
        h: "h-52",
        direction: 1,  // slides in from right
    },
    {
        src: "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&q=80",
        alt: "Elegant bedroom interior",
        h: "h-52",
        direction: -1, // slides in from left
    },
];

function MobileImage({ src, alt, h, direction, index }: {
    src: string; alt: string; h: string; direction: number; index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 95%", "start 30%"],
    });
    const x = useTransform(scrollYProgress, [0, 1], [`${direction * 80}px`, "0px"]);
    const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.6, 1]);

    return (
        <motion.div
            ref={ref}
            className="overflow-hidden rounded-xl"
            style={{ x, opacity }}
        >
            <img
                src={src}
                alt={alt}
                className={`w-full ${h} object-cover`}
            />
        </motion.div>
    );
}

export default function AboutSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], ["0px", "-30px"]);
    const y2 = useTransform(scrollYProgress, [0, 1], ["0px", "30px"]);
    const y3 = useTransform(scrollYProgress, [0, 1], ["0px", "-20px"]);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative px-4 md:px-16 lg:px-24 xl:px-32 py-24 md:py-32 bg-[#0a0a0a] overflow-hidden"
        >
            {/* Subtle grid texture */}
            <div
                className="absolute inset-0 -z-10 opacity-30"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                }}
            />

            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">

                {/* ── LEFT — Text content ── */}
                <div className="flex flex-col w-full lg:w-[45%] lg:sticky lg:top-24">

                    <motion.p
                        className="text-[10px] tracking-[6px] text-white/30 uppercase mb-5"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 300, damping: 70 }}
                    >
                        About Us
                    </motion.p>

                    <motion.h2
                        className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-6"
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 70 }}
                    >
                        Where vision meets{" "}
                        <span className="italic text-white/50">craft.</span>
                    </motion.h2>

                    <motion.div
                        className="h-px bg-gradient-to-r from-white/30 to-transparent mb-8"
                        initial={{ width: 0 }}
                        whileInView={{ width: "140px" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                    />

                    <motion.p
                        className="text-sm font-light leading-loose text-white/40 tracking-wide mb-5"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.25, type: "spring", stiffness: 300, damping: 70 }}
                    >
                        CO Architects was founded on a single belief — that great design has the power to transform how people live, work, and feel. We are an interior architecture studio built on precision, passion, and an unwavering commitment to quality.
                    </motion.p>

                    <motion.p
                        className="text-sm font-light leading-loose text-white/40 tracking-wide mb-10"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.35, type: "spring", stiffness: 300, damping: 70 }}
                    >
                        From intimate residences to landmark commercial spaces, every project is a reflection of our client's story — crafted with intention, delivered with excellence, and designed to endure.
                    </motion.p>

                    {/* Stats grid */}
                    <motion.div
                        className="grid grid-cols-2 gap-x-6 gap-y-7 mb-10"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.45, type: "spring", stiffness: 300, damping: 70 }}
                    >
                        {stats.map((stat, i) => (
                            <div key={i} className="border-l border-white/10 pl-4">
                                <p className="text-3xl font-light text-white mb-1" style={{ fontFamily: "Georgia, serif" }}>
                                    {stat.value}
                                </p>
                                <p className="text-[10px] tracking-[3px] text-white/30 uppercase">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>

                    <motion.a
                        href="#"
                        className="group flex items-center gap-2 text-white/50 hover:text-white transition text-sm tracking-wider uppercase w-fit"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.55, type: "spring", stiffness: 300, damping: 70 }}
                    >
                        Discover our story
                        <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-300" />
                    </motion.a>
                </div>

                {/* ── RIGHT — Images ── */}
                <div className="w-full lg:w-[55%]">

                    {/* Mobile: scroll-animated left/right slide */}
                    <div className="flex flex-col gap-4 lg:hidden overflow-hidden">
                        {mobileImages.map((img, i) => (
                            <MobileImage key={i} {...img} index={i} />
                        ))}
                    </div>

                    {/* Desktop: editorial mosaic */}
                    <div className="hidden lg:grid grid-cols-12 grid-rows-[200px_200px_200px] gap-3 h-[620px]">

                        {/* Large tall image — left, spans all 3 rows */}
                        <motion.div
                            className="col-span-5 row-span-3 overflow-hidden rounded-xl relative group"
                            style={{ y: y1 }}
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 70 }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"
                                alt="Luxury minimal living room"
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                        </motion.div>

                        {/* Top-right — 7 cols */}
                        <motion.div
                            className="col-span-7 row-span-1 overflow-hidden rounded-xl relative group"
                            style={{ y: y2 }}
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 220, damping: 70 }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                                alt="Modern architectural interior"
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                        </motion.div>

                        {/* Middle-right — full 7 cols (replaces 4+3 card) */}
                        <motion.div
                            className="col-span-7 row-span-1 overflow-hidden rounded-xl relative group"
                            style={{ y: y3 }}
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 220, damping: 70 }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80"
                                alt="Contemporary kitchen design"
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                        </motion.div>

                        {/* Bottom-right — 7 cols */}
                        <motion.div
                            className="col-span-7 row-span-1 overflow-hidden rounded-xl relative group"
                            style={{ y: y1 }}
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, type: "spring", stiffness: 220, damping: 70 }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&q=80"
                                alt="Elegant bedroom interior"
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
}