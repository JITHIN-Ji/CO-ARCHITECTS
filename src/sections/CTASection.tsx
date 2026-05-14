'use client'
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const galleryImages = [
    {
        src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=85",
        alt: "Luxury living room",
        h: "h-48",
    },
    {
        src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=85",
        alt: "Modern exterior architecture",
        h: "h-64",
    },
    {
        src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=85",
        alt: "Contemporary kitchen",
        h: "h-44",
    },
    {
        src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=85",
        alt: "Architectural blueprint plan",
        h: "h-56",
    },
    {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=85",
        alt: "Indoor spaces",
        h: "h-48",
    },
    {
        src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=85",
        alt: "Modern house exterior",
        h: "h-60",
    },
    {
        src: "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=600&q=85",
        alt: "Elegant bedroom",
        h: "h-44",
    },
    {
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=85",
        alt: "Outdoor terrace",
        h: "h-56",
    },
];

function GalleryColumn({
    images,
    direction,
    speed = 30,
}: {
    images: typeof galleryImages;
    direction: "up" | "down";
    speed?: number;
}) {
    return (
        <div className="flex flex-col gap-3 overflow-hidden" style={{ maxHeight: "520px" }}>
            <motion.div
                className="flex flex-col gap-3"
                animate={{ y: direction === "up" ? [0, -50 * images.length] : [-50 * images.length, 0] }}
                transition={{ duration: speed, repeat: Infinity, ease: "linear", repeatType: "loop" }}
            >
                {[...images, ...images].map((img, i) => (
                    <div key={i} className={`w-full ${img.h} overflow-hidden rounded-xl flex-shrink-0`}>
                        <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover hover:scale-105 transition duration-700"
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default function CTASection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0px", "-40px"]);

    const col1 = galleryImages.slice(0, 4);
    const col2 = galleryImages.slice(4, 8);
    const col3 = [...galleryImages.slice(2, 6)];

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#0a0a0a] px-4 md:px-16 lg:px-24 xl:px-32 py-24 md:py-32 overflow-hidden"
        >
            {/* Grid texture */}
            <div
                className="absolute inset-0 -z-10 opacity-30"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                }}
            />

            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

                    {/* ── LEFT — CTA text ── */}
                    <motion.div
                        className="w-full lg:w-[46%] flex-shrink-0 z-10"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 220, damping: 70 }}
                    >
                        <p className="text-[10px] tracking-[6px] text-white/30 uppercase mb-6">
                            Start Your Project
                        </p>

                        <h2
                            className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-6"
                            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                        >
                            Ready to design<br />
                            your{" "}
                            <span className="italic text-white/45">dream space?</span>
                        </h2>

                        <motion.div
                            className="h-px bg-gradient-to-r from-white/25 to-transparent mb-7"
                            initial={{ width: 0 }}
                            whileInView={{ width: "120px" }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                        />

                        <p className="text-sm font-light leading-loose text-white/35 tracking-wide mb-10 max-w-sm">
                            Your perfect interior is just one conversation away. From outdoor architecture to bespoke indoor plans — we design spaces that endure.
                        </p>

                        {/* Stats row */}
                        <div className="flex gap-8 mb-12">
                            {[
                                { value: "340+", label: "Projects" },
                                { value: "12+", label: "Years" },
                                { value: "98%", label: "Satisfaction" },
                            ].map((s) => (
                                <div key={s.label} className="border-l border-white/10 pl-4">
                                    <p className="text-2xl font-light text-white" style={{ fontFamily: "Georgia, serif" }}>{s.value}</p>
                                    <p className="text-[9px] tracking-[3px] text-white/25 uppercase mt-0.5">{s.label}</p>
                                </div>
                            ))}
                        </div>

                        <motion.a
                            href="#contact"
                            className="group inline-flex items-center gap-3 border border-white/15 hover:border-white/40 text-white/50 hover:text-white px-8 py-3.5 rounded-full text-sm tracking-widest uppercase transition duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Begin the conversation
                            <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-300" />
                        </motion.a>
                    </motion.div>

                    {/* ── RIGHT — Scrolling gallery columns ── */}
                    <motion.div
                        className="w-full lg:w-[54%] relative"
                        style={{ y: bgY }}
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, damping: 70, delay: 0.15 }}
                    >
                        {/* Fade masks top + bottom */}
                        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

                        <div className="grid grid-cols-3 gap-3 overflow-hidden" style={{ height: "520px" }}>
                            <GalleryColumn images={col1} direction="up" speed={22} />
                            <GalleryColumn images={col2} direction="down" speed={28} />
                            <GalleryColumn images={col3} direction="up" speed={25} />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}