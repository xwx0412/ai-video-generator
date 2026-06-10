"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { RightPreviewPanel } from "@/components/RightPreviewPanel";
import { SettingsModal } from "@/components/SettingsModal";
import { VideoPreviewModal } from "@/components/VideoPreviewModal";
import { getHistory, clearHistory } from "@/lib/storage";
import { VideoRecord } from "@/types";

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("projects");
  const [showSettings, setShowSettings] = useState(false);
  const [history, setHistory] = useState<VideoRecord[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoRecord | null>(null);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#0a0a0f]">
      <Header onSettingsClick={() => setShowSettings(true)} />

      <div className="flex flex-1 pt-14">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="flex-1 ml-56 flex overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto">
            <h1 className="text-xl font-bold text-white mb-4">My Projects</h1>
            {history.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                No projects yet. Start generating!
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
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

          <RightPreviewPanel history={history} onSelect={setSelectedVideo} />
        </main>
      </div>

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <VideoPreviewModal record={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </div>
  );
}
