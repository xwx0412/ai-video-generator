"use client";

import { X, Download, Share2, Trash2 } from "lucide-react";
import { VideoRecord } from "@/types";

interface VideoPreviewModalProps {
  record: VideoRecord | null;
  onClose: () => void;
}

export function VideoPreviewModal({ record, onClose }: VideoPreviewModalProps) {
  if (!record) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = record.videoUrl;
    link.download = `ai-video-${record.id}.mp4`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="glass rounded-2xl w-full max-w-3xl mx-4 neon-border overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <h3 className="text-white font-medium text-sm truncate max-w-md">
            {record.prompt || "Image-based generation"}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X size={16} className="text-gray-400" />
          </button>
        </div>

        <div className="p-4">
          <video
            src={record.videoUrl}
            controls
            autoPlay
            className="w-full rounded-xl bg-black aspect-video"
          />
        </div>

        <div className="flex items-center justify-between p-4 border-t border-white/5">
          <div className="text-xs text-gray-500">
            Created {new Date(record.createdAt).toLocaleString()}
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <Share2 size={14} className="text-gray-400" />
            </button>
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <Trash2 size={14} className="text-gray-400" />
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-2 rounded-lg btn-primary text-white text-sm"
            >
              <Download size={14} />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
