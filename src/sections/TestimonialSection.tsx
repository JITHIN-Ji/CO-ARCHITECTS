'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import TestimonialCard from "../components/TestimonialCard";
import { testimonialsData } from "../data/testimonial";
import type { ITestimonial } from "../types";

const INITIAL_COUNT = 3;
const LOAD_MORE_COUNT = 3;

export default function TestimonialSection() {
    const [visible, setVisible] = useState(INITIAL_COUNT);
    const hasMore = visible < testimonialsData.length;

    const shown = testimonialsData.slice(0, visible);

    return (
        <section
            id="testimonials"
            className="relative px-4 md:px-16 lg:px-24 xl:px-32 py-24 md:py-32 bg-[#0a0a0a] overflow-hidden"
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

            {/* Subtle ambient glow — warm neutral, no pink */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[600px] h-[300px] bg-white/[0.02] blur-[140px] rounded-full" />

            <div className="max-w-6xl mx-auto">

                {/* ── Header ── */}
                <motion.div
                    className="flex flex-col md:flex-row md:items-end gap-6 md:gap-0 mb-16 md:mb-20"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 260, damping: 70 }}
                >
                    <div className="flex-1">
                        <p className="text-[10px] tracking-[6px] text-white/30 uppercase mb-5">
                            Testimonials
                        </p>
                        <h2
                            className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight"
                            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                        >
                            Words from our{" "}
                            <span className="italic text-white/45">clients.</span>
                        </h2>
                    </div>
                    <p className="md:w-72 text-sm font-light leading-loose text-white/30 tracking-wide md:pb-2">
                        Every space tells a story. Here's what our clients say about living and working in spaces designed by CO Architects.
                    </p>
                </motion.div>

                {/* ── Masonry-style grid ── */}
                {/* 
                    Layout strategy:
                    - Mobile: single column
                    - Tablet: 2 columns
                    - Desktop: 3 columns
                    Cards alternate between 3 styles (Tall / Minimal / Side) via TestimonialCard router
                    Columns use different row spans to create visual rhythm
                */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-5">
                    <AnimatePresence>
                        {shown.map((testimonial: ITestimonial, index: number) => (
                            <motion.div
                                key={index}
                                layout
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{
                                    delay: index < INITIAL_COUNT ? index * 0.1 : 0.05,
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 70,
                                }}
                                className="break-inside-avoid mb-4 md:mb-5"
                            >
                                <TestimonialCard testimonial={testimonial} index={index} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* ── Load more / count line ── */}
                <motion.div
                    className="flex items-center gap-6 mt-12 md:mt-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    {/* Count indicator */}
                    <span className="text-[10px] tracking-[4px] text-white/20 uppercase">
                        {visible} / {testimonialsData.length}
                    </span>

                    {/* Progress bar */}
                    <div className="flex-1 h-px bg-white/[0.06] relative max-w-xs">
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-white/20"
                            animate={{ width: `${(visible / testimonialsData.length) * 100}%` }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                        />
                    </div>

                    {/* Load more button */}
                    {hasMore && (
                        <button
                            onClick={() => setVisible((v) => Math.min(v + LOAD_MORE_COUNT, testimonialsData.length))}
                            className="group flex items-center gap-2 text-white/40 hover:text-white transition duration-300 text-sm tracking-wider uppercase"
                        >
                            Load more
                            <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-300" />
                        </button>
                    )}

                    {!hasMore && (
                        <span className="text-[10px] tracking-[4px] text-white/20 uppercase">
                            All shown
                        </span>
                    )}
                </motion.div>

            </div>
        </section>
    );
}