'use client'
import { motion } from "motion/react";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
    return (
        <section
            id="contact"
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

            <div className="max-w-6xl mx-auto">

                {/* ── Header ── */}
                <motion.div
                    className="mb-16 md:mb-20"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 260, damping: 70 }}
                >
                    <p className="text-[10px] tracking-[6px] text-white/30 uppercase mb-5">
                        Contact
                    </p>
                    <div className="flex flex-col md:flex-row md:items-end gap-4">
                        <h2
                            className="flex-1 text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight"
                            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                        >
                            Let's build something{" "}
                            <span className="italic text-white/45">exceptional.</span>
                        </h2>
                        <div className="hidden md:block w-52 pb-2">
                            <div className="h-px bg-gradient-to-l from-white/20 to-transparent" />
                        </div>
                    </div>
                </motion.div>

                {/* ── Two-column layout ── */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

                    {/* Left — info */}
                    <motion.div
                        className="w-full lg:w-[38%] lg:sticky lg:top-28 flex flex-col gap-10"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 220, damping: 70 }}
                    >
                        <p className="text-sm font-light leading-loose text-white/35 tracking-wide">
                            Ready to transform your space? Reach out and we'll schedule a consultation to understand your vision and begin crafting a design that endures.
                        </p>

                        {/* Contact details */}
                        <div className="flex flex-col gap-6">
                            {[
                                { icon: Mail, label: "Email", value: "Coarchitectuaegroup@gmail.com" },
                                { icon: Phone, label: "Phone", value: "+971 56 380 2474" },
                                { icon: MapPin, label: "Studio", value: "Dubai, United Arab Emirates" },
                            ].map(({ icon: Icon, label, value }) => (
                                <div key={label} className="flex items-start gap-4 border-l border-white/10 pl-5">
                                    <Icon className="size-4 text-white/25 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-[9px] tracking-[3px] text-white/25 uppercase mb-1">{label}</p>
                                        <p className="text-sm text-white/60 font-light">{value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Decorative quote */}
                        <div className="border-t border-white/[0.06] pt-8 mt-2">
                            <p
                                className="text-lg font-light italic text-white/20 leading-relaxed"
                                style={{ fontFamily: "Georgia, serif" }}
                            >
                                "Great design begins with a single conversation."
                            </p>
                        </div>
                    </motion.div>

                    {/* Right — form */}
                    <motion.div
                        className="w-full lg:w-[62%]"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 220, damping: 70, delay: 0.1 }}
                    >
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="flex flex-col gap-0"
                        >
                            {/* Name + Email — row */}
                            <div className="flex flex-col sm:flex-row gap-0">
                                <motion.div
                                    className="flex-1 group border-t border-white/[0.07] sm:border-r border-r-white/[0.07] py-6 sm:pr-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 70 }}
                                >
                                    <label className="block text-[9px] tracking-[4px] text-white/30 uppercase mb-3">
                                        Your Name
                                    </label>
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="Full name"
                                        className="w-full bg-transparent text-white/70 text-sm font-light placeholder-white/15 outline-none border-b border-white/10 focus:border-white/30 pb-2 transition duration-300"
                                    />
                                </motion.div>

                                <motion.div
                                    className="flex-1 group border-t border-white/[0.07] py-6 sm:pl-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 70 }}
                                >
                                    <label className="block text-[9px] tracking-[4px] text-white/30 uppercase mb-3">
                                        Email Address
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        className="w-full bg-transparent text-white/70 text-sm font-light placeholder-white/15 outline-none border-b border-white/10 focus:border-white/30 pb-2 transition duration-300"
                                    />
                                </motion.div>
                            </div>

                            {/* Project type */}
                            <motion.div
                                className="border-t border-white/[0.07] py-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.25, type: "spring", stiffness: 300, damping: 70 }}
                            >
                                <label className="block text-[9px] tracking-[4px] text-white/30 uppercase mb-4">
                                    Project Type
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {["Residential", "Commercial", "Hospitality", "Renovation", "Other"].map((type) => (
                                        <label
                                            key={type}
                                            className="group cursor-pointer"
                                        >
                                            <input type="radio" name="project_type" value={type} className="peer hidden" />
                                            <span className="block px-4 py-1.5 rounded-full border border-white/10 text-[10px] tracking-[2px] text-white/30 uppercase peer-checked:border-white/40 peer-checked:text-white/70 hover:border-white/20 hover:text-white/50 transition duration-300 cursor-pointer">
                                                {type}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Message */}
                            <motion.div
                                className="border-t border-white/[0.07] py-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 70 }}
                            >
                                <label className="block text-[9px] tracking-[4px] text-white/30 uppercase mb-3">
                                    Tell Us About Your Project
                                </label>
                                <textarea
                                    name="message"
                                    rows={5}
                                    placeholder="Describe your vision, space, timeline…"
                                    className="w-full bg-transparent text-white/70 text-sm font-light placeholder-white/15 outline-none resize-none border-b border-white/10 focus:border-white/30 pb-2 transition duration-300 leading-loose"
                                />
                            </motion.div>

                            {/* Submit */}
                            <motion.div
                                className="border-t border-white/[0.07] pt-8 flex items-center justify-between gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.35, type: "spring", stiffness: 300, damping: 70 }}
                            >
                                <p className="text-[9px] tracking-[2px] text-white/15 uppercase max-w-[200px] leading-relaxed">
                                    We respond within 24 hours
                                </p>

                                <button
                                    type="submit"
                                    className="group flex items-center gap-3 border border-white/15 hover:border-white/40 text-white/50 hover:text-white px-7 py-3 rounded-full text-sm tracking-wider uppercase transition duration-300"
                                >
                                    Send Message
                                    <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-300" />
                                </button>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}