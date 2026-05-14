'use client'
import { ArrowUpRight, ArrowLeft, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase, getPublicUrl } from "../supabaseClient";

interface ProjectImage {
  id: string;
  path: string;
  position: number;
}

interface ProjectType {
  id: string;
  title: string;
  slug: string;
  tag: string;
  location: string;
  category: string;
  year: string;
  size: string;
  description: string;
  client?: string;
  area?: string;
  duration?: string;
  project_images?: ProjectImage[];
}

const filters = ["All", "Residential", "Commercial", "Architecture"];

function ViewDetailsOverlay() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      <motion.div
        className="relative flex items-center gap-2.5 border border-white/30 bg-white/8 backdrop-blur-md px-5 py-2.5 rounded-full"
        initial={{ scale: 0.88, y: 6 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.88, y: 6 }}
        transition={{ type: "spring", stiffness: 400, damping: 60 }}
      >
        <span className="text-[10px] tracking-[4px] text-white uppercase font-light">View Details</span>
        <ArrowUpRight className="size-3 text-white/70" />
      </motion.div>
    </motion.div>
  );
}

function CardLarge({ project, index }: { project: ProjectType; index: number }) {
  const [hovered, setHovered] = useState(false);
  const thumb = project.project_images?.[0]?.path;
  const imageUrl = thumb ? getPublicUrl(thumb) : '';

  return (
    <motion.div
      className="md:col-span-2 group cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, type: "spring", stiffness: 240, damping: 70 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/work/${project.slug}`}>
        <div className="relative overflow-hidden aspect-[16/9] bg-white/5">
          {imageUrl
            ? <img src={imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700 ease-out" />
            : <div className="w-full h-full bg-white/[0.03]" />
          }
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between">
            <div>
              <p className="text-[9px] tracking-[5px] text-white/40 uppercase mb-2">
                {project.tag} · {project.location}
              </p>
              <h3 className="text-2xl md:text-3xl font-light text-white leading-snug" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                {project.title}
              </h3>
            </div>
            <span className="text-[9px] tracking-[3px] text-white/30 uppercase border border-white/10 px-3 py-1.5 rounded-full hidden md:block flex-shrink-0 ml-6">
              {project.year}
            </span>
          </div>
          <AnimatePresence>{hovered && <ViewDetailsOverlay />}</AnimatePresence>
        </div>
      </Link>
      <div className="mt-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <p className="text-sm font-light leading-relaxed text-white/35 tracking-wide max-w-md">{project.description}</p>
        <p className="text-[9px] tracking-[3px] text-white/20 uppercase flex-shrink-0">{project.category}</p>
      </div>
    </motion.div>
  );
}

function CardSmall({ project, index }: { project: ProjectType; index: number }) {
  const [hovered, setHovered] = useState(false);
  const thumb = project.project_images?.[0]?.path;
  const imageUrl = thumb ? getPublicUrl(thumb) : '';

  return (
    <motion.div
      className="md:col-span-1 group cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, type: "spring", stiffness: 240, damping: 70 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/work/${project.slug}`}>
        <div className="relative overflow-hidden aspect-[4/3] bg-white/5">
          {imageUrl
            ? <img src={imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition duration-700 ease-out" />
            : <div className="w-full h-full bg-white/[0.03]" />
          }
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 right-4">
            <span className="text-[9px] tracking-[3px] text-white/40 uppercase border border-white/10 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
              {project.year}
            </span>
          </div>
          <div className="absolute bottom-4 left-4">
            <p className="text-[9px] tracking-[4px] text-white/40 uppercase">{project.tag}</p>
          </div>
          <AnimatePresence>{hovered && <ViewDetailsOverlay />}</AnimatePresence>
        </div>
      </Link>
      <div className="mt-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-lg font-light text-white leading-snug" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            {project.title}
          </h3>
          <p className="text-[9px] tracking-[2px] text-white/20 uppercase mt-1 flex-shrink-0">{project.location?.split(",")[0]}</p>
        </div>
        <p className="text-xs font-light leading-relaxed text-white/30 tracking-wide">{project.description}</p>
      </div>
    </motion.div>
  );
}

export default function WorkPage() {
  const [active, setActive] = useState<string>("All");
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_images (id, path, position)
        `)
        .order('created_at', { ascending: false });

      if (!error && data) {
        // Sort images by position within each project
        const withSortedImages = data.map(p => ({
          ...p,
          project_images: [...(p.project_images ?? [])].sort((a, b) => a.position - b.position)
        }));
        setProjects(withSortedImages);
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  const filtered = active === "All"
    ? projects
    : projects.filter(p => p.category === active || p.tag === active);

  return (
    <div className="min-h-screen px-4 md:px-16 lg:px-24 xl:px-32 pb-32 bg-[#0a0a0a] overflow-hidden">
      {/* Home button */}
      <motion.div className="fixed top-5 right-6 md:right-10 z-50" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Link to="/" className="flex items-center gap-2 bg-white text-[#0a0a0a] px-4 py-2 rounded-full text-[10px] tracking-[3px] uppercase font-medium hover:bg-white/90 transition duration-200 shadow-lg">
          <ArrowLeft className="size-3" /> Home
        </Link>
      </motion.div>

      <div className="fixed inset-0 -z-10 opacity-20 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

      <div className="max-w-6xl mx-auto pt-32 pb-0">
        <motion.p className="text-[10px] tracking-[6px] text-white/30 uppercase mb-5" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 70 }}>
          Our Work
        </motion.p>
        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-0">
          <motion.h1 className="flex-1 text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 70, delay: 0.05 }}>
            Spaces that{" "}<span className="italic text-white/45">speak</span><br />for themselves.
          </motion.h1>
          <motion.div className="md:w-72 md:pb-3 flex flex-col gap-4" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 240, damping: 70, delay: 0.1 }}>
            <div className="hidden md:block h-px bg-gradient-to-l from-white/20 to-transparent mb-2" />
            <p className="text-sm font-light leading-loose text-white/30 tracking-wide">A curated collection of residential and commercial projects — each one a testament to thoughtful design and uncompromising craft.</p>
          </motion.div>
        </div>
        <motion.div className="flex flex-wrap gap-8 mt-12 border-t border-white/[0.06] pt-8" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 240, damping: 70, delay: 0.15 }}>
          {[["340+", "Projects Delivered"], ["12+", "Years"], ["40+", "Design Awards"], ["98%", "Client Satisfaction"]].map(([num, label]) => (
            <div key={label} className="border-l border-white/10 pl-5">
              <p className="text-2xl font-light text-white" style={{ fontFamily: "Georgia, serif" }}>{num}</p>
              <p className="text-[9px] tracking-[3px] text-white/25 uppercase mt-1">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div className="max-w-6xl mx-auto mt-16 flex items-center gap-2 flex-wrap" initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 300, damping: 70 }}>
        {filters.map(f => (
          <button key={f} onClick={() => setActive(f)} className={`px-5 py-2 rounded-full text-[10px] tracking-[3px] uppercase transition duration-300 border ${active === f ? "border-white/40 text-white" : "border-white/8 text-white/30 hover:border-white/20 hover:text-white/50"}`}>
            {f}
          </button>
        ))}
        <span className="ml-auto text-[9px] tracking-[3px] text-white/15 uppercase">
          {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        </span>
      </motion.div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto mt-8">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="size-6 text-white/20 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex items-center justify-center py-32">
            <p className="text-white/20 text-sm tracking-widest uppercase">No projects found</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={active} className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              {filtered.map((project, index) =>
                project.size === "large"
                  ? <CardLarge key={project.id} project={project} index={index} />
                  : <CardSmall key={project.id} project={project} index={index} />
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* CTA */}
      <motion.div className="max-w-6xl mx-auto mt-28 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-t border-white/[0.06] pt-14" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 260, damping: 70 }}>
        <div>
          <p className="text-[9px] tracking-[5px] text-white/25 uppercase mb-4">Next Step</p>
          <h2 className="text-3xl md:text-4xl font-light text-white leading-snug" style={{ fontFamily: "Georgia, serif" }}>
            Have a project in{" "}<span className="italic text-white/45">mind?</span>
          </h2>
          <p className="text-sm font-light text-white/30 mt-3 tracking-wide">Let's create something extraordinary together.</p>
        </div>
        <a href="https://wa.me/971563802474" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 border border-white/15 hover:border-white/40 text-white/45 hover:text-white px-8 py-3.5 rounded-full text-sm tracking-widest uppercase transition duration-300 flex-shrink-0">
          Start a Project
          <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-300" />
        </a>
      </motion.div>
    </div>
  );
}