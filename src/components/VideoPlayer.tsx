"use client";

import { Download, Share2 } from "lucide-react";

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
    <div className="space-y-3">
      <video
        src={videoUrl}
        controls
        autoPlay
        loop
        className="w-full rounded-xl bg-black aspect-video"
      />
      
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs text-gray-400 flex-1 line-clamp-2">
          {prompt}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          <Download size={14} />
          Download
        </button>
        <button className="flex items-center justify-center px-3 py-2 text-xs font-medium text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
          <Share2 size={14} />
        </button>
      </div>
    </div>
  );
}
