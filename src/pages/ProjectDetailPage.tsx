'use client'
import { ArrowLeft, ArrowUpRight, MapPin, Calendar, User, Layers, Play, Pause, Loader2 } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase, getPublicUrl } from "../supabaseClient";

interface ProjectImage {
  id: string;
  path: string;
  position: number;
}

interface ProjectChallenge {
  id: string;
  body: string;
  position: number;
}

interface ProjectTestimonial {
  id: string;
  quote: string;
  author: string;
}

interface ProjectType {
  id: string;
  title: string;
  slug: string;
  tag: string;
  location: string;
  client: string;
  area: string;
  duration: string;
  description: string;
  key_challenge: string;
  category: string;
  year: string;
  size: string;
  status?: string;
  video_path?: string;
  project_images?: ProjectImage[];
  project_challenges?: ProjectChallenge[];
  project_testimonials?: ProjectTestimonial[] | ProjectTestimonial;
}

function HeroParallax({ imageUrl, title, children }: { imageUrl: string; title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <div ref={ref} className="relative h-[90vh] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        {imageUrl
          ? <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          : <div className="w-full h-full bg-white/[0.03]" />
        }
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-[#0a0a0a]" />
      </motion.div>
      {children}
    </div>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams();

  const [project, setProject] = useState<ProjectType | null>(null);
  const [otherProjects, setOtherProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);

  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    async function fetchProject() {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_images (id, path, position),
          project_challenges (id, body, position),
          project_testimonials (id, quote, author)
        `)
        .eq('slug', slug)
        .single();

      if (!error && data) {
        data.project_images = [...(data.project_images ?? [])].sort((a, b) => a.position - b.position);
        data.project_challenges = [...(data.project_challenges ?? [])].sort((a, b) => a.position - b.position);
        setProject(data);
      }
      setLoading(false);
    }

    async function fetchOthers() {
      const { data } = await supabase
        .from('projects')
        .select(`*, project_images (id, path, position)`)
        .neq('slug', slug)
        .order('created_at', { ascending: false })
        .limit(3);

      if (data) {
        setOtherProjects(data.map((p: any) => ({
          ...p,
          project_images: [...(p.project_images ?? [])].sort((a, b) => a.position - b.position)
        })));
      }
    }

    fetchProject();
    fetchOthers();
  }, [slug]);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoPlaying) { videoRef.current.pause(); setVideoPlaying(false); }
    else { videoRef.current.play(); setVideoPlaying(true); }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="size-6 text-white/20 animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/30 text-sm tracking-widest uppercase mb-4">Project not found</p>
          <Link to="/work" className="text-white underline underline-offset-4 text-sm">← Back to Work</Link>
        </div>
      </div>
    );
  }

  const images = project.project_images ?? [];
  const heroImage = images[0] ? getPublicUrl(images[0].path) : '';
  const secondImage = images[1] ? getPublicUrl(images[1].path) : heroImage;
  const galleryImages = images.slice(2).map(i => getPublicUrl(i.path));
  const videoUrl = project.video_path ? getPublicUrl(project.video_path) : '';
  const testimonial = Array.isArray(project.project_testimonials)
    ? project.project_testimonials[0]
    : project.project_testimonials ?? null;
  const challenges = project.project_challenges ?? [];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">

      {/* Home button */}
      <motion.div
        className="fixed top-5 right-6 md:right-10 z-50"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link to="/" className="flex items-center gap-2 bg-white text-[#0a0a0a] px-4 py-2 rounded-full text-[10px] tracking-[3px] uppercase font-medium hover:bg-white/90 transition duration-200 shadow-lg">
          <ArrowLeft className="size-3" /> Home
        </Link>
      </motion.div>

      {/* ── Hero ── */}
      <HeroParallax imageUrl={heroImage} title={project.title}>
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 lg:px-24 pb-16 md:pb-20">
          <motion.p
            className="text-[10px] tracking-[6px] text-white/40 uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {project.tag} · {project.location}
          </motion.p>
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none text-white"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 60 }}
          >
            {project.title}
          </motion.h1>
        </div>
      </HeroParallax>

      {/* ── Meta strip ── */}
      <motion.div
        className="max-w-6xl mx-auto px-6 md:px-16 lg:px-0 mt-16 grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/[0.06] rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 260, damping: 70 }}
      >
        {[
          { icon: <User className="size-3.5 text-white/25" />, label: "Client", value: project.client },
          { icon: <MapPin className="size-3.5 text-white/25" />, label: "Location", value: project.location },
          { icon: <Layers className="size-3.5 text-white/25" />, label: "Area", value: project.area },
          { icon: <Calendar className="size-3.5 text-white/25" />, label: "Duration", value: project.duration },
        ].map((item, i) => (
          <div key={i} className={`p-6 md:p-8 flex flex-col gap-2 ${i < 3 ? "border-r border-white/[0.06]" : ""}`}>
            <div className="flex items-center gap-2">
              {item.icon}
              <p className="text-[8px] tracking-[4px] text-white/25 uppercase">{item.label}</p>
            </div>
            <p className="text-sm font-light text-white/70 leading-snug">{item.value}</p>
          </div>
        ))}
      </motion.div>

      {/* ── Overview + Key Challenge ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-0 mt-20 grid md:grid-cols-2 gap-12 md:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 260, damping: 70 }}
        >
          <p className="text-[9px] tracking-[5px] text-white/25 uppercase mb-5">Overview</p>
          <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            {project.description}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 260, damping: 70, delay: 0.08 }}
        >
          <p className="text-[9px] tracking-[5px] text-white/25 uppercase mb-5">Key Challenge</p>
          <p className="text-base font-light text-white/50 leading-relaxed tracking-wide">{project.key_challenge}</p>
        </motion.div>
      </div>

      {/* ── Image Gallery ── */}
      {images.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-0 mt-20">
          <motion.p
            className="text-[9px] tracking-[5px] text-white/25 uppercase mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Photography
          </motion.p>
          <motion.div
            className="overflow-hidden mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 60 }}
          >
            <img src={secondImage} alt={`${project.title} — 1`} className="w-full aspect-[16/9] object-cover hover:scale-[1.02] transition duration-700 ease-out" />
          </motion.div>
          {galleryImages.length > 0 && (
            <div className={`grid gap-4 ${galleryImages.length >= 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2"}`}>
              {galleryImages.map((url, i) => (
                <motion.div
                  key={i}
                  className="overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 200, damping: 60 }}
                >
                  <img src={url} alt={`${project.title} — ${i + 2}`} className="w-full aspect-[4/3] object-cover hover:scale-[1.03] transition duration-700 ease-out" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Video ── */}
      {videoUrl && (
        <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-0 mt-20">
          <motion.p
            className="text-[9px] tracking-[5px] text-white/25 uppercase mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Film
          </motion.p>
          <motion.div
            className="relative overflow-hidden bg-black aspect-video cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 60 }}
            onClick={toggleVideo}
          >
            <video ref={videoRef} src={videoUrl} className="w-full h-full object-cover" loop playsInline />
            <div className={`absolute inset-0 flex items-center justify-center transition duration-300 ${videoPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}>
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative flex items-center justify-center size-16 rounded-full border border-white/30 bg-white/8 backdrop-blur-md">
                {videoPlaying ? <Pause className="size-5 text-white fill-white" /> : <Play className="size-5 text-white fill-white ml-0.5" />}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ── Challenges ── */}
      {challenges.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-0 mt-20">
          <motion.p
            className="text-[9px] tracking-[5px] text-white/25 uppercase mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Challenges Faced
          </motion.p>
          <div className="grid md:grid-cols-3 gap-4">
            {challenges.map((ch, i) => (
              <motion.div
                key={ch.id}
                className="border border-white/[0.07] rounded-xl p-6 hover:border-white/15 transition duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, type: "spring", stiffness: 240, damping: 70 }}
              >
                <p className="text-[9px] tracking-[4px] text-white/20 uppercase mb-4">0{i + 1}</p>
                <p className="text-sm font-light text-white/55 leading-relaxed tracking-wide">{ch.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ── Testimonial ── */}
      {testimonial && (
        <motion.div
          className="max-w-6xl mx-auto px-6 md:px-16 lg:px-0 mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 240, damping: 70 }}
        >
          <div className="border border-white/[0.07] rounded-2xl p-10 md:p-16 relative overflow-hidden">
            <p className="absolute top-6 right-8 text-[120px] leading-none text-white/[0.04] select-none" style={{ fontFamily: "Georgia, serif" }}>"</p>
            <p className="text-[9px] tracking-[5px] text-white/20 uppercase mb-8">Client Voice</p>
            <blockquote className="text-2xl md:text-3xl font-light text-white/75 leading-relaxed max-w-3xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              "{testimonial.quote}"
            </blockquote>
            <p className="mt-8 text-[10px] tracking-[4px] text-white/30 uppercase">{testimonial.author}</p>
          </div>
        </motion.div>
      )}

      {/* ── More Projects ── */}
      {otherProjects.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-0 mt-28 border-t border-white/[0.06] pt-16">
          <div className="flex items-end justify-between mb-10">
            <p className="text-[9px] tracking-[5px] text-white/25 uppercase">More Projects</p>
            <Link to="/work" className="group flex items-center gap-2 text-white/30 hover:text-white/60 transition duration-300">
              <span className="text-[9px] tracking-[3px] uppercase">View All</span>
              <ArrowUpRight className="size-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {otherProjects.map((p, i) => {
              const thumb = p.project_images?.[0]?.path;
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, type: "spring", stiffness: 240, damping: 70 }}
                >
                  <Link to={`/work/${p.slug}`} className="group block">
                    <div className="overflow-hidden aspect-[4/3] mb-4 bg-white/5">
                      {thumb && <img src={getPublicUrl(thumb)} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition duration-700 ease-out" />}
                    </div>
                    <p className="text-[9px] tracking-[4px] text-white/25 uppercase mb-1.5">{p.tag} · {p.year}</p>
                    <h4 className="text-base font-light text-white/70 group-hover:text-white transition duration-300" style={{ fontFamily: "Georgia, serif" }}>
                      {p.title}
                    </h4>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Back to Work CTA ── */}
      <motion.div
        className="flex justify-center mt-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 240, damping: 70 }}
      >
        <Link
          to="/work"
          className="group flex items-center gap-3 border border-white/15 hover:border-white/40 text-white/40 hover:text-white px-10 py-4 rounded-full text-[10px] tracking-[4px] uppercase transition duration-300"
        >
          <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition duration-300" />
          Back to All Projects
        </Link>
      </motion.div>

      <div className="h-24" />
    </div>
  );
}