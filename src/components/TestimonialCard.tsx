import type { ITestimonial } from "../types";

interface Props {
    testimonial: ITestimonial;
    index: number;
}

const interiorImages = [
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80",
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80",
    "https://images.unsplash.com/photo-1583845112203-29329902332e?w=600&q=80",
];

function getInitials(name: string) {
    return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

/* ── STYLE A — Tall image card (indices 0, 3) ── */
function CardTall({ testimonial, index }: Props) {
    const img = interiorImages[index % interiorImages.length];
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111] flex flex-col h-full">
            <div className="relative h-52 overflow-hidden flex-shrink-0">
                <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/20 to-transparent" />
            </div>
            <div className="flex flex-col flex-1 px-6 pt-2 pb-6 gap-3">
                <p className="text-white/15 font-serif text-4xl leading-none select-none -mb-1">"</p>
                <p className="text-sm font-light leading-relaxed text-white/50 flex-1">
                    {testimonial.quote}
                </p>
                <div className="h-px bg-white/[0.06] mt-2" />
                <div className="flex items-center gap-3 pt-1">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] tracking-wider text-white/40 flex-shrink-0">
                        {getInitials(testimonial.name)}
                    </div>
                    <div>
                        <p className="text-xs font-medium text-white/80">{testimonial.name}</p>
                        <p className="text-[9px] tracking-[2px] text-white/25 uppercase">{testimonial.handle}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ── STYLE B — Minimal quote-only card (indices 1, 4) ── */
function CardMinimal({ testimonial, index }: Props) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d0d0d] flex flex-col justify-between h-full px-7 py-7 gap-6">
            {/* Large decorative number */}
            <span
                className="absolute top-4 right-6 text-[80px] font-light text-white/[0.03] leading-none select-none pointer-events-none"
                style={{ fontFamily: "Georgia, serif" }}
                aria-hidden="true"
            >
                {String(index + 1).padStart(2, "0")}
            </span>

            <p
                className="text-xl md:text-2xl font-light leading-snug text-white/70 relative z-10"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
                "{testimonial.quote}"
            </p>

            <div className="flex items-end justify-between relative z-10">
                <div>
                    <p className="text-xs font-medium text-white/60">{testimonial.name}</p>
                    <p className="text-[9px] tracking-[2px] text-white/25 uppercase mt-0.5">{testimonial.handle}</p>
                </div>
                <p className="text-[9px] tracking-[2px] text-white/15 uppercase">{testimonial.date}</p>
            </div>
        </div>
    );
}

/* ── STYLE C — Side image card (indices 2, 5) ── */
function CardSide({ testimonial, index }: Props) {
    const img = interiorImages[(index + 2) % interiorImages.length];
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111] flex flex-row h-full">
            {/* Left image strip */}
            <div className="w-28 flex-shrink-0 overflow-hidden">
                <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
            </div>
            {/* Right content */}
            <div className="flex flex-col justify-between px-5 py-5 flex-1 gap-4">
                <div>
                    <p className="text-white/12 font-serif text-3xl leading-none select-none -mb-1 text-white/10">"</p>
                    <p className="text-xs font-light leading-relaxed text-white/45 mt-2">
                        {testimonial.quote}
                    </p>
                </div>
                <div>
                    <div className="h-px bg-white/[0.06] mb-3" />
                    <p className="text-xs font-medium text-white/70">{testimonial.name}</p>
                    <p className="text-[9px] tracking-[2px] text-white/25 uppercase">{testimonial.handle}</p>
                </div>
            </div>
        </div>
    );
}

/* ── Router ── */
export default function TestimonialCard({ testimonial, index }: Props) {
    const style = index % 3;
    if (style === 0) return <CardTall testimonial={testimonial} index={index} />;
    if (style === 1) return <CardMinimal testimonial={testimonial} index={index} />;
    return <CardSide testimonial={testimonial} index={index} />;
}