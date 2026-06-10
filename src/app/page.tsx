"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { PromptPanel } from "@/components/PromptPanel";
import { GenerationConfig } from "@/components/PromptPanel";
import { RightPreviewPanel } from "@/components/RightPreviewPanel";
import { GenerationOverlay } from "@/components/GenerationOverlay";
import { SettingsModal } from "@/components/SettingsModal";
import { VideoPreviewModal } from "@/components/VideoPreviewModal";
import { VideoPlayer } from "@/components/VideoPlayer";
import { getHistory, addToHistory, clearHistory } from "@/lib/storage";
import { VideoRecord } from "@/types";
import { Image as ImageIcon, Trash2 } from "lucide-react";

export default function VideoGeneratorPage() {
  const [activeTab, setActiveTab] = useState("generator");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [history, setHistory] = useState<VideoRecord[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoRecord | null>(null);
  const [result, setResult] = useState<{ videoUrl: string; prompt: string } | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("Understanding prompt");

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  useEffect(() => {
    if (isGenerating) {
      setProgress(0);
      setCurrentStep("Understanding prompt");

      const steps = [
        { progress: 30, step: "Understanding prompt" },
        { progress: 65, step: "Rendering frames" },
        { progress: 100, step: "Final video assembly" },
      ];

      let i = 0;
      const interval = setInterval(() => {
        if (i < steps.length) {
          setProgress(steps[i].progress);
          setCurrentStep(steps[i].step);
          i++;
        }
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const handleGenerate = async (config: GenerationConfig) => {
    setIsGenerating(true);
    setResult(null);

    try {
      let imageBase64: string | undefined;
      if (config.imageFile) {
        imageBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve((reader.result as string).split(",")[1]);
          reader.readAsDataURL(config.imageFile!);
        });
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: config.prompt, image: imageBase64 }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Generation failed");
      }

      const record: VideoRecord = {
        id: data.id,
        prompt: config.prompt,
        videoUrl: data.video_url,
        createdAt: data.createdAt,
        status: "completed",
      };

      addToHistory(record);
      setHistory(getHistory());
      setResult({ videoUrl: data.video_url, prompt: config.prompt });
    } catch (error: any) {
      console.error("Error:", error);
      alert(error.message || "Failed to generate video. Check if Colab is running.");
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#0a0a0f]">
      <Header onSettingsClick={() => setShowSettings(true)} />

      <div className="flex flex-1 pt-14">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex-1 flex ml-[220px] transition-all duration-300">
          <main className="flex-1 flex flex-col overflow-hidden min-w-0">
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === "generator" && (
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                      AI <span className="gradient-text">Video Generator</span>
                    </h1>
                    <p className="text-gray-500 text-sm">
                      Transform ideas into stunning videos with AI
                    </p>
                  </div>

                  <PromptPanel onGenerate={handleGenerate} isGenerating={isGenerating} />

                  {result && (
                    <div className="mt-8 animate-fade-in">
                      <VideoPlayer videoUrl={result.videoUrl} prompt={result.prompt} />
                    </div>
                  )}
                </div>
              )}

              {activeTab === "projects" && (
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">My Projects</h2>
                    {history.length > 0 && (
                      <button
                        onClick={handleClearHistory}
                        className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  {history.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                      No projects yet. Start generating!
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      {history.map((record) => (
                        <div
                          key={record.id}
                          onClick={() => setSelectedVideo(record)}
                          className="video-card glass-light rounded-xl p-3 cursor-pointer"
                        >
                          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black/50 mb-2">
                            <video
                              src={record.videoUrl}
                              className="w-full h-full object-cover"
                              preload="metadata"
                            />
                          </div>
                          <p className="text-white text-sm font-medium truncate">
                            {record.prompt || "Image generation"}
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            {new Date(record.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "prompts" && (
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-xl font-bold text-white mb-6">Prompt Templates</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { title: "Cinematic", prompt: "Cinematic drone shot of a city at sunset, golden hour lighting", icon: "🎬" },
                      { title: "Product", prompt: "Product showcase with rotating 3D view, studio lighting", icon: "📦" },
                      { title: "Anime", prompt: "Anime character walking through rain, neon lights reflection", icon: "🎨" },
                      { title: "Nature", prompt: "Realistic nature documentary footage, 4K quality", icon: "🌿" },
                      { title: "Sci-Fi", prompt: "Futuristic spaceship flying through nebula, epic scale", icon: "🚀" },
                      { title: "Abstract", prompt: "Abstract fluid art animation, vibrant colors", icon: "✨" },
                    ].map((template, i) => (
                      <div
                        key={i}
                        className="glass-light rounded-xl p-4 cursor-pointer hover:bg-white/5 transition-all group"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{template.icon}</span>
                          <div>
                            <p className="text-white font-medium text-sm group-hover:text-violet-400 transition-colors">
                              {template.title}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                              {template.prompt}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="max-w-lg mx-auto">
                  <h2 className="text-xl font-bold text-white mb-6">Settings</h2>
                  <div className="glass rounded-xl p-5 space-y-5">
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">Default Model</label>
                      <select className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm appearance-none cursor-pointer">
                        <option className="bg-gray-900">Veo 3</option>
                        <option className="bg-gray-900">Runway Gen-3</option>
                        <option className="bg-gray-900">CogVideoX</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">Default Resolution</label>
                      <select className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm appearance-none cursor-pointer">
                        <option className="bg-gray-900">720p</option>
                        <option className="bg-gray-900">1080p</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">Default Duration</label>
                      <select className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm appearance-none cursor-pointer">
                        <option className="bg-gray-900">5 seconds</option>
                        <option className="bg-gray-900">10 seconds</option>
                        <option className="bg-gray-900">15 seconds</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "assets" && (
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-xl font-bold text-white mb-6">Assets</h2>
                  <div className="text-center py-20 text-gray-500">
                    <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No assets uploaded yet</p>
                  </div>
                </div>
              )}

              {activeTab === "trash" && (
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-xl font-bold text-white mb-6">Trash</h2>
                  <div className="text-center py-20 text-gray-500">
                    <Trash2 size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Trash is empty</p>
                  </div>
                </div>
              )}
            </div>
          </main>

          <RightPreviewPanel history={history} onSelect={setSelectedVideo} />
        </div>
      </div>

      <GenerationOverlay
        isVisible={isGenerating}
        progress={progress}
        currentStep={currentStep}
      />

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />

      <VideoPreviewModal record={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </div>
  );
}
