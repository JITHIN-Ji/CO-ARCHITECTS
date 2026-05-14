import { MenuIcon, XIcon, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { navlinks } from "../data/navlinks";
import type { INavLink } from "../types";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <motion.nav
                className={`fixed top-0 z-50 w-full px-6 md:px-16 lg:px-24 xl:px-32 py-4 flex items-center justify-between transition-all duration-500 ${
                    scrolled
                        ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/[0.04] shadow-[0_1px_0_0_rgba(255,255,255,0.03)]"
                        : "bg-transparent border-b border-transparent"
                }`}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 250, damping: 70 }}
            >
                {/* Logo */}
                <NavLink to="/" className="flex-shrink-0">
                    <img
                        src="/assets/logo.png"
                        alt="CO Architects"
                        className="h-14 w-auto"
                        width={160}
                        height={56}
                    />
                </NavLink>

                {/* Desktop nav links — centre */}
                <div className="hidden md:flex items-center gap-7">
                    {navlinks.map((link: INavLink) => (
                        <NavLink
                            key={link.name}
                            to={link.href}
                            className="text-[10px] tracking-[3px] text-white/40 uppercase hover:text-white transition duration-300"
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                {/* Portfolio CTA — right */}
                <div className="hidden md:flex items-center gap-4">
                    <NavLink
                        to="/work"
                        className="group flex items-center gap-2 border border-white/15 hover:border-white/40 bg-white text-black hover:bg-white/90 px-5 py-2 rounded-full text-[10px] tracking-[3px] uppercase transition duration-300"
                    >
                        Our Work
                        <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-300" />
                    </NavLink>
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="md:hidden text-white/50 hover:text-white transition"
                    aria-label="Open menu"
                >
                    <MenuIcon size={22} />
                </button>
            </motion.nav>

            {/* ── Mobile menu ── */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Drawer — slides in from right */}
                        <motion.div
                            className="fixed top-0 right-0 bottom-0 z-50 w-[75vw] max-w-xs bg-[#0d0d0d] border-l border-white/[0.06] flex flex-col px-8 py-10"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 280, damping: 70 }}
                        >
                            {/* Close */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="self-end text-white/30 hover:text-white transition mb-12"
                                aria-label="Close menu"
                            >
                                <XIcon size={20} />
                            </button>

                            {/* Links */}
                            <div className="flex flex-col gap-6 flex-1">
                                {navlinks.map((link: INavLink, i: number) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.06, type: "spring", stiffness: 300, damping: 70 }}
                                    >
                                        <NavLink
                                            to={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block text-[10px] tracking-[4px] text-white/35 uppercase hover:text-white transition duration-300 border-b border-white/[0.05] pb-5"
                                        >
                                            {link.name}
                                        </NavLink>
                                    </motion.div>
                                ))}

                                {/* Portfolio link */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: navlinks.length * 0.06, type: "spring", stiffness: 300, damping: 70 }}
                                >
                                    <NavLink
                                        to="/work"
                                        onClick={() => setIsOpen(false)}
                                        className="block text-[10px] tracking-[4px] text-white/35 uppercase hover:text-white transition duration-300 border-b border-white/[0.05] pb-5"
                                    >
                                        Our Work
                                    </NavLink>
                                </motion.div>
                            </div>

                            {/* Footer of drawer */}
                            <div className="border-t border-white/[0.06] pt-6">
                                <p
                                    className="text-lg font-light italic text-white/15 leading-snug"
                                    style={{ fontFamily: "Georgia, serif" }}
                                >
                                    "Design begins with a conversation."
                                </p>
                                <p className="text-[9px] tracking-[3px] text-white/15 uppercase mt-3">CO Architects</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}