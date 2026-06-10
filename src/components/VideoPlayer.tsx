"use client";

import { Download } from "lucide-react";
import { Card } from "./ui/Card";

interface VideoPlayerProps {
  videoUrl: string;
  prompt: string;
}

export function VideoPlayer({ videoUrl, prompt }: VideoPlayerProps) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = `ai-video-${Date.now()}.mp4`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full max-w-2xl animate-fade-in">
      <div className="space-y-4">
        <video
          src={videoUrl}
          controls
          autoPlay
          loop
          className="w-full rounded-xl bg-black"
        />
        {prompt && (
          <p className="text-sm text-gray-400">
            <span className="font-medium text-gray-300">Prompt:</span> {prompt}
          </p>
        )}
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          <Download size={16} />
          Download Video
        </button>
      </div>
    </Card>
  );
}
