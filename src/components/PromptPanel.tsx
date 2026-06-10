"use client";

import { useState, useRef } from "react";
import { Upload, X, Sparkles, ChevronDown } from "lucide-react";

interface PromptPanelProps {
  onGenerate: (config: GenerationConfig) => void;
  isGenerating: boolean;
}

export interface GenerationConfig {
  prompt: string;
  imageFile?: File;
  aspectRatio: string;
  duration: string;
  style: string;
  model: string;
}

const aspectRatios = ["9:16", "16:9", "1:1"];
const durations = ["5s", "10s", "15s"];
const styles = [
  { value: "cinematic", label: "Cinematic" },
  { value: "product", label: "Product" },
  { value: "anime", label: "Anime" },
  { value: "realistic", label: "Realistic" },
];
const models = [
  { value: "veo", label: "Veo 3" },
  { value: "runway", label: "Runway Gen-3" },
  { value: "custom", label: "Custom Model" },
];

export function PromptPanel({ onGenerate, isGenerating }: PromptPanelProps) {
  const [prompt, setPrompt] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [duration, setDuration] = useState("5s");
  const [style, setStyle] = useState("cinematic");
  const [model, setModel] = useState("veo");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    if (!prompt.trim() && !selectedFile) return;
    onGenerate({ prompt, imageFile: selectedFile || undefined, aspectRatio, duration, style, model });
  };

  const creditCost = duration === "5s" ? 30 : duration === "10s" ? 60 : 90;

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="glass rounded-2xl p-6 neon-border">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={18} className="text-violet-400" />
          <h2 className="text-white font-semibold">Create Video</h2>
        </div>

        <div className="space-y-4">
          <div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your video..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 resize-none transition-all text-sm"
            />
          </div>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
              preview
                ? "border-violet-500/50 bg-violet-500/5"
                : "border-white/10 hover:border-white/20 hover:bg-white/5"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {preview ? (
              <div className="flex items-center gap-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex-1 text-left">
                  <p className="text-white text-sm font-medium truncate max-w-xs">
                    {selectedFile?.name}
                  </p>
                  <p className="text-gray-500 text-xs">Click to change</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreview(null);
                    setSelectedFile(null);
                  }}
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20"
                >
                  <X size={14} className="text-gray-400" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <Upload size={18} />
                <span className="text-sm">Drop reference image or click</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Aspect</label>
              <div className="flex gap-1">
                {aspectRatios.map((ar) => (
                  <button
                    key={ar}
                    onClick={() => setAspectRatio(ar)}
                    className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      aspectRatio === ar
                        ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                        : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10"
                    }`}
                  >
                    {ar}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Duration</label>
              <div className="flex gap-1">
                {durations.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      duration === d
                        ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                        : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Style</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs appearance-none cursor-pointer"
              >
                {styles.map((s) => (
                  <option key={s.value} value={s.value} className="bg-gray-900">
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Model</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs appearance-none cursor-pointer"
              >
                {models.map((m) => (
                  <option key={m.value} value={m.value} className="bg-gray-900">
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || (!prompt.trim() && !selectedFile)}
            className="w-full py-3 rounded-xl btn-primary text-white font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isGenerating ? "Generating..." : "Generate Video"}
          </button>

          <p className="text-center text-xs text-gray-500">
            Estimated cost: <span className="text-violet-400">~{creditCost} credits</span>
          </p>
        </div>
      </div>
    </div>
  );
}
