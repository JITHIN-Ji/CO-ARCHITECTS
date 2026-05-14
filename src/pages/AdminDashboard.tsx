'use client'
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus, Trash2, Upload, X, Save, Edit2,
  Image as ImageIcon, Video, Loader2,
  CheckCircle2, AlertCircle, ArrowLeft
} from "lucide-react";
import { supabase, BUCKET, getPublicUrl } from "../supabaseClient";
import { Link } from "react-router-dom";

interface Preview {
  url: string;
  onRemove?: () => void;
}

interface UploadZoneProps {
  label: string;
  accept: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  uploading: boolean;
  previews?: Preview[];
}

interface ToastItem {
  id: string;
  msg: string;
  type: 'success' | 'error';
}

interface ProjectFormProps {
  initial?: any;
  onSave: () => void;
  onCancel: () => void;
  toast: { success: (m: string) => void; error: (m: string) => void; toasts: ToastItem[] };
}

// ─── tiny helper ──────────────────────────────────────────────────────────────
function uid() { return Math.random().toString(36).slice(2, 9); }

function slug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ toasts }: { toasts: ToastItem[] }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div key={t.id}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-light tracking-wide shadow-2xl pointer-events-auto
              ${t.type === 'error' ? 'bg-red-950 border border-red-800/50 text-red-200' : 'bg-[#1a1a1a] border border-white/10 text-white/80'}`}
          >
            {t.type === 'error' ? <AlertCircle className="size-4 text-red-400 shrink-0" /> : <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />}
            {t.msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const push = (msg: string, type: 'success' | 'error' = 'success') => {
    const id = uid();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000);
  };
  return { toasts, success: (m: string) => push(m, 'success'), error: (m: string) => push(m, 'error') };
}

// ─── File Upload Zone ─────────────────────────────────────────────────────────
function UploadZone({ label, accept, multiple = false, onFiles, uploading, previews = [] }: UploadZoneProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  return (
    <div>
      <p className="text-[9px] tracking-[4px] text-white/30 uppercase mb-3">{label}</p>
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); onFiles([...e.dataTransfer.files]); }}
        onClick={() => ref.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition duration-300 min-h-[120px]
          ${dragging ? 'border-white/40 bg-white/5' : 'border-white/10 hover:border-white/25 hover:bg-white/[0.02]'}`}
      >
        <input ref={ref} type="file" accept={accept} multiple={multiple} className="hidden"
          onChange={e => onFiles([...(e.target.files ?? [])])} />
        {uploading ? (
          <Loader2 className="size-5 text-white/40 animate-spin" />
        ) : (
          <>
            <Upload className="size-5 text-white/25" />
            <p className="text-xs text-white/30 tracking-wide text-center">
              Drop files here or click to browse
            </p>
          </>
        )}
      </div>
      {previews.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {previews.map((p, i) => (
            <div key={i} className="relative group">
              <img src={p.url} alt="" className="w-20 h-16 object-cover rounded-lg border border-white/10" />
              {p.onRemove && (
                <button onClick={p.onRemove}
                  className="absolute -top-1.5 -right-1.5 size-5 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <X className="size-3 text-white" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Project Form (create / edit) ─────────────────────────────────────────────
function ProjectForm({ initial, onSave, onCancel, toast }: ProjectFormProps) {
  const isEdit = !!initial?.id;

  const emptyForm = {
    title: '', category: 'Residential', location: '', year: new Date().getFullYear().toString(),
    tag: 'Interior', description: '', size: 'small', client: '', area: '', duration: '',
    status: 'Completed', key_challenge: '',
  };

  const [form, setForm] = useState(initial ? {
    title: initial.title, category: initial.category, location: initial.location,
    year: initial.year, tag: initial.tag, description: initial.description,
    size: initial.size, client: initial.client, area: initial.area,
    duration: initial.duration, status: initial.status, key_challenge: initial.key_challenge,
  } : emptyForm);

  const [challenges, setChallenges] = useState<string[]>(
    initial?.project_challenges?.map((c: any) => c.body) ?? ['', '', '']
  );
  const [testimonial, setTestimonial] = useState<{ quote: string; author: string }>(
    initial?.project_testimonials?.[0] ?? { quote: '', author: '' }
  );

  // Existing images from DB
  const [existingImages, setExistingImages] = useState<any[]>(
    initial?.project_images ?? []
  );

  // New images picked by user (not yet uploaded)
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<Preview[]>([]);

  // Video
  const [existingVideo, setExistingVideo] = useState(initial?.video_path ?? '');
  const [newVideoFile, setNewVideoFile] = useState<File | null>(null);
  const [newVideoName, setNewVideoName] = useState<string>('');

  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [uploadingVid, setUploadingVid] = useState(false);

  const set = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }));

  // Image file picker handler
  const handleImageFiles = (files: File[]) => {
    const valid = files.filter(f => f.type.startsWith('image/'));
    setNewImageFiles(p => [...p, ...valid]);
    valid.forEach(f => {
      const url = URL.createObjectURL(f);
      setNewImagePreviews(p => [...p, { url, file: f }]);
    });
  };

  const removeNewImage = (idx: number) => {
    setNewImageFiles(p => p.filter((_, i) => i !== idx));
    setNewImagePreviews(p => p.filter((_, i) => i !== idx));
  };

  const removeExistingImage = async (img: any) => {
    await supabase.from('project_images').delete().eq('id', img.id);
    await supabase.storage.from(BUCKET).remove([img.path]);
    setExistingImages(p => p.filter(i => i.id !== img.id));
    toast.success('Image removed');
  };

  const handleVideoFile = (files: File[]) => {
    const f = files[0];
    if (!f) return;
    setNewVideoFile(f);
    setNewVideoName(f.name);
  };

  const removeVideo = async () => {
    if (existingVideo) {
      await supabase.storage.from(BUCKET).remove([existingVideo]);
      if (isEdit) await supabase.from('projects').update({ video_path: '' }).eq('id', initial.id);
    }
    setExistingVideo('');
    setNewVideoFile(null);
    setNewVideoName('');
  };

  // ── Upload helpers ──────────────────────────────────────────────────────────
  async function uploadImages(projectId: string | number) {
    if (!newImageFiles.length) return [];
    setUploadingImg(true);
    const paths: Array<{ path: string; position: number }> = [];
    const startPos = existingImages.length;
    for (let i = 0; i < newImageFiles.length; i++) {
      const f = newImageFiles[i];
      const ext = f.name.split('.').pop();
      const path = `projects/${projectId}/images/${uid()}.${ext}`;
      const { error } = await supabase.storage.from(BUCKET).upload(path, f, { upsert: true });
      if (!error) paths.push({ path, position: startPos + i });
    }
    setUploadingImg(false);
    return paths;
  }

  async function uploadVideo(projectId: string | number) {
    if (!newVideoFile) return existingVideo;
    setUploadingVid(true);
    const ext = newVideoFile.name.split('.').pop();
    const path = `projects/${projectId}/video/video.${ext}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, newVideoFile, { upsert: true });
    setUploadingVid(false);
    if (error) { toast.error('Video upload failed'); return existingVideo; }
    return path;
  }

  // ── Save ────────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    setSaving(true);
    try {
      const projectSlug = slug(form.title);
      const payload = { ...form, slug: projectSlug };

      let projectId = initial?.id;

      if (isEdit) {
        const { error } = await supabase.from('projects').update(payload).eq('id', projectId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from('projects').insert(payload).select().single();
        if (error) throw error;
        projectId = data.id;
      }

      // Upload new images
      const newPaths = await uploadImages(projectId);
      if (newPaths.length) {
        await supabase.from('project_images').insert(
          newPaths.map(p => ({ project_id: projectId, path: p.path, position: p.position }))
        );
      }

      // Upload video
      const videoPath = await uploadVideo(projectId);
      await supabase.from('projects').update({ video_path: videoPath }).eq('id', projectId);

      // Challenges — delete old, insert new
      await supabase.from('project_challenges').delete().eq('project_id', projectId);
      const validChallenges = challenges.filter(c => c.trim());
      if (validChallenges.length) {
        await supabase.from('project_challenges').insert(
          validChallenges.map((body, position) => ({ project_id: projectId, body, position }))
        );
      }

      // Testimonial — upsert
      if (testimonial.quote.trim()) {
        await supabase.from('project_testimonials').upsert(
          { project_id: projectId, quote: testimonial.quote, author: testimonial.author },
          { onConflict: 'project_id' }
        );
      }

      toast.success(isEdit ? 'Project updated!' : 'Project created!');
      onSave();
    } catch (err: any) {
      toast.error(err.message ?? 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const fieldClass = "w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-white/30 transition tracking-wide font-light";
  const labelClass = "text-[9px] tracking-[4px] text-white/30 uppercase mb-2 block";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="bg-[#0e0e0e] border border-white/[0.07] rounded-2xl p-8 space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-light text-white" style={{ fontFamily: "Georgia, serif" }}>
          {isEdit ? `Editing — ${initial.title}` : 'New Project'}
        </h2>
        <button onClick={onCancel} className="size-8 flex items-center justify-center rounded-full border border-white/10 hover:border-white/30 transition">
          <X className="size-4 text-white/40" />
        </button>
      </div>

      {/* ── Basic info ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Project Title *</label>
          <input className={fieldClass} placeholder="e.g. The Vela Residence"
            value={form.title} onChange={e => set('title', e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Location</label>
          <input className={fieldClass} placeholder="e.g. Mumbai, India"
            value={form.location} onChange={e => set('location', e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <select className={fieldClass} value={form.category} onChange={e => set('category', e.target.value)}>
            {['Residential', 'Commercial', 'Architecture'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Tag</label>
          <select className={fieldClass} value={form.tag} onChange={e => set('tag', e.target.value)}>
            {['Interior', 'Commercial', 'Architecture'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Year</label>
          <input className={fieldClass} placeholder="2024"
            value={form.year} onChange={e => set('year', e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Card Size</label>
          <select className={fieldClass} value={form.size} onChange={e => set('size', e.target.value)}>
            <option value="large">Large (full-width)</option>
            <option value="small">Small (1/3 width)</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Client</label>
          <input className={fieldClass} placeholder="Client name"
            value={form.client} onChange={e => set('client', e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Area</label>
          <input className={fieldClass} placeholder="e.g. 4,200 sq ft"
            value={form.area} onChange={e => set('area', e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Duration</label>
          <input className={fieldClass} placeholder="e.g. 14 months"
            value={form.duration} onChange={e => set('duration', e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select className={fieldClass} value={form.status} onChange={e => set('status', e.target.value)}>
            {['Completed', 'In Progress', 'On Hold'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Short Description</label>
        <textarea className={`${fieldClass} resize-none`} rows={2}
          placeholder="A sentence or two shown on the project card..."
          value={form.description} onChange={e => set('description', e.target.value)} />
      </div>

      <div>
        <label className={labelClass}>Key Challenge</label>
        <textarea className={`${fieldClass} resize-none`} rows={2}
          placeholder="The central design challenge..."
          value={form.key_challenge} onChange={e => set('key_challenge', e.target.value)} />
      </div>

      {/* ── Images ── */}
      <div>
        <UploadZone
          label="Project Images (multiple)"
          accept="image/*"
          multiple
          onFiles={handleImageFiles}
          uploading={uploadingImg}
          previews={[
            ...existingImages.map(img => ({
              url: getPublicUrl(img.path),
              onRemove: () => removeExistingImage(img)
            })),
            ...newImagePreviews.map((p, i) => ({
              url: p.url,
              onRemove: () => removeNewImage(i)
            })),
          ]}
        />
        <p className="text-[9px] text-white/20 mt-2 tracking-wide">
          First image = hero / card thumbnail. Add as many as needed.
        </p>
      </div>

      {/* ── Video ── */}
      <div>
        <p className="text-[9px] tracking-[4px] text-white/30 uppercase mb-3">Project Video (optional)</p>
        {(existingVideo || newVideoName) ? (
          <div className="flex items-center gap-3 border border-white/10 rounded-xl px-4 py-3">
            <Video className="size-4 text-white/30 shrink-0" />
            <span className="text-sm text-white/50 flex-1 truncate tracking-wide">
              {newVideoName || existingVideo.split('/').pop()}
            </span>
            <button onClick={removeVideo} className="text-red-400/60 hover:text-red-400 transition">
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <UploadZone
            label=""
            accept="video/*"
            onFiles={handleVideoFile}
            uploading={uploadingVid}
            previews={[]}
          />
        )}
      </div>

      {/* ── Challenges ── */}
      <div>
        <p className="text-[9px] tracking-[4px] text-white/30 uppercase mb-4">Challenges (up to 3)</p>
        <div className="space-y-3">
          {challenges.map((ch, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="text-[9px] text-white/20 mt-3.5 tracking-widest w-5 shrink-0">0{i + 1}</span>
              <input
                className={fieldClass}
                placeholder={`Challenge ${i + 1}...`}
                value={ch}
                onChange={e => {
                  const next = [...challenges]; next[i] = e.target.value; setChallenges(next);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Testimonial ── */}
      <div>
        <p className="text-[9px] tracking-[4px] text-white/30 uppercase mb-4">Client Testimonial</p>
        <div className="space-y-3">
          <textarea className={`${fieldClass} resize-none`} rows={2}
            placeholder="Quote..."
            value={testimonial.quote}
            onChange={e => setTestimonial(p => ({ ...p, quote: e.target.value }))} />
          <input className={fieldClass} placeholder="Author name & role"
            value={testimonial.author}
            onChange={e => setTestimonial(p => ({ ...p, author: e.target.value }))} />
        </div>
      </div>

      {/* ── Actions ── */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2.5 bg-white text-[#0a0a0a] px-7 py-3 rounded-full text-[10px] tracking-[3px] uppercase font-medium hover:bg-white/90 transition disabled:opacity-50"
        >
          {saving ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
          {saving ? 'Saving…' : (isEdit ? 'Update Project' : 'Create Project')}
        </button>
        <button onClick={onCancel}
          className="px-7 py-3 rounded-full text-[10px] tracking-[3px] uppercase border border-white/10 text-white/30 hover:border-white/30 hover:text-white/60 transition">
          Cancel
        </button>
      </div>
    </motion.div>
  );
}

// ─── Project Row ───────────────────────────────────────────────────────────────
function ProjectRow({ project, onEdit, onDelete }: { project: any; onEdit: (p: any) => void; onDelete: (p: any) => void; }) {
  const thumb = project.project_images?.[0]?.path;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="flex items-center gap-3 border border-white/[0.07] rounded-xl px-4 py-4 hover:border-white/15 transition"
    >
      <div className="w-14 h-10 rounded-lg overflow-hidden bg-white/5 shrink-0">
        {thumb
          ? <img src={getPublicUrl(thumb)} alt="" className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center"><ImageIcon className="size-4 text-white/15" /></div>
        }
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-light text-white/80 truncate" style={{ fontFamily: "Georgia, serif" }}>{project.title}</p>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <p className="text-[9px] tracking-[3px] text-white/25 uppercase">{project.tag} · {project.location} · {project.year}</p>
          <span className={`text-[8px] tracking-[3px] uppercase px-2.5 py-0.5 rounded-full border
            ${project.status === 'Completed' ? 'border-emerald-800/40 text-emerald-600' : 'border-amber-800/40 text-amber-600'}`}>
            {project.status}
          </span>
        </div>
      </div>

      {/* Always visible on mobile */}
      <div className="flex gap-2 shrink-0">
        <button onClick={() => onEdit(project)}
          className="size-8 flex items-center justify-center rounded-full border border-white/10 hover:border-white/30 transition">
          <Edit2 className="size-3.5 text-white/40" />
        </button>
        <button onClick={() => onDelete(project)}
          className="size-8 flex items-center justify-center rounded-full border border-red-900/30 hover:border-red-600/50 transition">
          <Trash2 className="size-3.5 text-red-500/50" />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
function DeleteModal({ project, onConfirm, onCancel }: { project: any; onConfirm: () => void; onCancel: () => void; }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-[#111] border border-white/10 rounded-2xl p-8 max-w-sm w-full"
      >
        <h3 className="text-lg font-light text-white mb-2" style={{ fontFamily: "Georgia, serif" }}>Delete Project</h3>
        <p className="text-sm text-white/40 font-light mb-8 leading-relaxed">
          This will permanently delete <span className="text-white/70">"{project.title}"</span> and all its images and files.
        </p>
        <div className="flex gap-3">
          <button onClick={onConfirm}
            className="flex-1 bg-red-700 hover:bg-red-600 text-white px-5 py-2.5 rounded-full text-[10px] tracking-[3px] uppercase font-medium transition">
            Delete
          </button>
          <button onClick={onCancel}
            className="flex-1 border border-white/10 text-white/40 hover:text-white/70 px-5 py-2.5 rounded-full text-[10px] tracking-[3px] uppercase transition">
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list'); // 'list' | 'new' | 'edit'
  const [editing, setEditing] = useState<any>(null);
  const [deleting, setDeleting] = useState<any>(null);
  const [search, setSearch] = useState('');
  const toast = useToast();

  // ── Fetch all projects with related data ─────────────────────────────────
  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        project_images (id, path, position),
        project_challenges (id, body, position),
        project_testimonials (id, quote, author)
      `)
      .order('created_at', { ascending: false });

    if (error) { toast.error('Failed to load projects'); }
    else setProjects(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  // ── Delete ────────────────────────────────────────────────────────────────
  const confirmDelete = async () => {
    const p = deleting;
    if (!p) return;
    setDeleting(null);
    try {
      // Remove all stored files
      const paths = [
        ...(p.project_images?.map((i: any) => i.path) ?? []),
        ...(p.video_path ? [p.video_path] : []),
      ];
      if (paths.length) await supabase.storage.from(BUCKET).remove(paths);
      await supabase.from('projects').delete().eq('id', p.id);
      toast.success('Project deleted');
      fetchProjects();
    } catch (err: any) {
      toast.error('Delete failed');
    }
  };

  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.location.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  // ── Stats ─────────────────────────────────────────────────────────────────
  const stats = [
    { label: 'Total Projects', value: projects.length },
    { label: 'Residential', value: projects.filter(p => p.category === 'Residential').length },
    { label: 'Commercial', value: projects.filter(p => p.category === 'Commercial').length },
    { label: 'Architecture', value: projects.filter(p => p.category === 'Architecture').length },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Fixed grid bg */}
      <div className="fixed inset-0 -z-10 opacity-[0.12] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* ── Header ── */}
      <div className="border-b border-white/[0.06] px-6 md:px-12 py-5 flex items-center justify-between sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-xl z-40">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-white/30 hover:text-white/60 transition text-[10px] tracking-[3px] uppercase">
            <ArrowLeft className="size-3" /> Site
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <p className="text-[10px] tracking-[5px] text-white/40 uppercase">CO — Admin</p>
        </div>
        <button
          onClick={() => { setEditing(null); setView('new'); }}
          className="flex items-center gap-2 bg-white text-[#0a0a0a] px-5 py-2.5 rounded-full text-[10px] tracking-[3px] uppercase font-medium hover:bg-white/90 transition"
        >
          <Plus className="size-3.5" /> New Project
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 space-y-10">

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(s => (
            <div key={s.label} className="border border-white/[0.07] rounded-xl p-5">
              <p className="text-3xl font-light text-white" style={{ fontFamily: "Georgia, serif" }}>{s.value}</p>
              <p className="text-[9px] tracking-[3px] text-white/25 uppercase mt-1.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Form (new / edit) ── */}
        <AnimatePresence mode="wait">
          {(view === 'new' || view === 'edit') && (
            <ProjectForm
              key={editing?.id ?? 'new'}
              initial={editing}
              toast={toast}
              onCancel={() => { setView('list'); setEditing(null); }}
              onSave={() => { setView('list'); setEditing(null); fetchProjects(); }}
            />
          )}
        </AnimatePresence>

        {/* ── Project list ── */}
        {view === 'list' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-light text-white/70" style={{ fontFamily: "Georgia, serif" }}>
                All Projects
              </h2>
              <input
                className="bg-[#111] border border-white/10 rounded-full px-4 py-2 text-sm text-white/60 placeholder-white/20 focus:outline-none focus:border-white/25 transition w-52 font-light tracking-wide"
                placeholder="Search…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="size-6 text-white/20 animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-white/[0.07] rounded-2xl">
                <p className="text-white/20 text-sm tracking-wide">
                  {projects.length === 0 ? 'No projects yet — create your first one.' : 'No results found.'}
                </p>
              </div>
            ) : (
              <motion.div layout className="space-y-3">
                <AnimatePresence>
                  {filtered.map(p => (
                    <ProjectRow
                      key={p.id}
                      project={p}
                      onEdit={proj => { setEditing(proj); setView('edit'); }}
                      onDelete={setDeleting}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* ── Delete modal ── */}
      <AnimatePresence>
        {deleting && <DeleteModal project={deleting} onConfirm={confirmDelete} onCancel={() => setDeleting(null)} />}
      </AnimatePresence>

      <Toast toasts={toast.toasts} />
    </div>
  );
}