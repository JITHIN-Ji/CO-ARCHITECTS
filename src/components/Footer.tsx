import { motion } from "motion/react";
import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight, MapPin, Phone, Instagram } from "lucide-react";
import { navlinks } from "../data/navlinks";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.06] px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-10">
      <div className="max-w-6xl mx-auto">

        {/* ── Top row ── */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-14 pb-16 border-b border-white/[0.06]">

          {/* Brand */}
          <motion.div
            className="flex flex-col gap-6 max-w-xs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 70 }}
          >
            <Link to="/">
              <img src="/assets/logo.png" alt="CO Architects" className="h-14 w-auto object-contain object-left" />
            </Link>
            <p className="text-sm font-light text-white/30 leading-relaxed tracking-wide">
              Design Consultancy & Turnkey Fit-Out.<br />
              Concept · Construct · Complete.
            </p>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/co_architects.ae"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 text-white/25 hover:text-white transition duration-300 w-fit"
            >
              <Instagram className="size-4" />
              <span className="text-[10px] tracking-[3px] uppercase">co_architects.ae</span>
              <ArrowUpRight className="size-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </a>
          </motion.div>

          {/* Nav links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 70, delay: 0.05 }}
          >
            <p className="text-[9px] tracking-[5px] text-white/25 uppercase mb-6">Navigation</p>
            <ul className="flex flex-col gap-4">
              {navlinks.map(link => (
                <li key={link.name}>
                  <NavLink
                    to={link.href}
                    className="text-[10px] tracking-[3px] text-white/35 uppercase hover:text-white transition duration-300"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 70, delay: 0.1 }}
          >
            <p className="text-[9px] tracking-[5px] text-white/25 uppercase mb-6">Contact</p>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-2.5 text-white/35">
                <MapPin className="size-3.5 mt-0.5 shrink-0" />
                <span className="text-[10px] tracking-wide font-light leading-relaxed">
                  Dubai, United Arab Emirates
                </span>
              </li>
              <li className="flex items-center gap-2.5 text-white/35">
                <Phone className="size-3.5 shrink-0" />
                <a href="tel:+971563802474" className="text-[10px] tracking-wide font-light hover:text-white transition duration-300">
                  +971 56 380 2474
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Portfolio CTA */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 70, delay: 0.15 }}
          >
            <p className="text-[9px] tracking-[5px] text-white/25 uppercase mb-2">Our Work</p>
            <Link
              to="/work"
              className="group flex items-center gap-2.5 border border-white/15 hover:border-white/40 text-white/40 hover:text-white px-6 py-3 rounded-full text-[10px] tracking-[3px] uppercase transition duration-300 w-fit"
            >
              View Portfolio
              <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-300" />
            </Link>
          </motion.div>

        </div>

        {/* ── Bottom row ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-[9px] tracking-[3px] text-white/15 uppercase">
            © {new Date().getFullYear()} CO Architects. All rights reserved.
          </p>
          <p className="text-[9px] tracking-[3px] text-white/15 uppercase">
            Dubai, UAE
          </p>
        </div>

      </div>
    </footer>
  );
}