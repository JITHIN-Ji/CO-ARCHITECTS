'use client'
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
    const taglineWords = ["Concept", "Construct", "Complete"];
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return (
        <div
            className="relative flex flex-col justify-end bg-[#0a0a0a] overflow-hidden"
            style={{ minHeight: "100svh" }}
        >
            {/* Background locked via CSS — prevents iOS Safari scroll jump */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: isMobile
                        ? "url('/assets/heromobile.png')"
                        : "url('/assets/heroimage.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "scroll",
                    transform: "translateZ(0)",
                    willChange: "transform",
                }}
            />

            {/* Mobile overlay — gradient for legibility */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a0a0a] via-black/60 to-black/20 md:hidden" />

            {/* Desktop bottom blend */}
            <div className="absolute bottom-0 left-0 right-0 h-48 z-10 bg-gradient-to-t from-[#0a0a0a] to-transparent hidden md:block" />

            {/* Mobile bottom blend */}
            <div className="absolute bottom-0 left-0 right-0 h-40 z-10 bg-gradient-to-t from-[#0a0a0a] to-transparent md:hidden" />

            {/* Corner accents */}
            <div className="absolute top-10 right-10 w-14 h-14 border-t border-r border-white/20 pointer-events-none z-20 hidden md:block" />
            <div className="absolute bottom-10 left-10 w-10 h-10 border-b border-l border-white/20 pointer-events-none z-20 hidden md:block" />

            {/* MAIN CONTENT — bottom */}
            <div className="relative z-20 px-6 md:px-16 lg:px-24 xl:px-32 pb-14 md:pb-20 pt-32 md:pt-0 flex flex-col md:flex-row md:items-end md:justify-between gap-10">

                <div className="w-full">
                    <div className="overflow-hidden">
                        {/* CO — logo image + hyphen */}
                        <motion.div
                            className="flex items-center gap-3 mb-1"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 280, damping: 70 }}
                        >
                            <img
                                src="/assets/co.png"
                                alt="CO"
                                className="h-14 sm:h-16 md:h-28 w-auto object-contain object-left"
                            />
                            
                        </motion.div>

                        {/* CONCEPT CONSTRUCT COMPLETE — each word animates in then pulses */}
                        <div className="flex flex-col gap-4">
                            {["CONCEPT", "CONSTRUCT", "COMPLETE"].map((word, i) => (
                                <div key={word} className="overflow-hidden">
                                    <motion.h1
                                        className="block font-light leading-none tracking-widest text-3xl sm:text-4xl md:text-5xl"
                                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            color: [
                                                "rgba(255,255,255,0.25)",
                                                "rgba(255,255,255,1)",
                                                "rgba(255,255,255,0.25)",
                                            ],
                                        }}
                                        transition={{
                                            opacity: { delay: 0.35 + i * 0.1, duration: 0.01 },
                                            y: {
                                                delay: 0.35 + i * 0.1,
                                                type: "spring",
                                                stiffness: 280,
                                                damping: 70,
                                            },
                                            color: {
                                                delay: 0.9 + i * 0.8,
                                                duration: 2.5,
                                                repeat: Infinity,
                                                repeatDelay: 2.5 * 2,
                                                ease: "easeInOut",
                                            },
                                        }}
                                    >
                                        {word}
                                    </motion.h1>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.75, type: "spring", stiffness: 360, damping: 70 }}
                    >
                        <a
                            href="https://wa.me/971563802474"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-black hover:bg-white/90 transition rounded-full px-8 h-11 text-sm tracking-widest uppercase font-medium w-full sm:w-auto flex items-center justify-center"
                        >
                            Start Your Project
                        </a>
                        <Link
                            to="/work"
                            className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 transition rounded-full px-7 h-11 text-sm tracking-widest uppercase text-white/70 w-full sm:w-auto"
                        >
                            View Portfolio
                        </Link>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}