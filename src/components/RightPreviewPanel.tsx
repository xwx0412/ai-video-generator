"use client";

import { Play, Download, Clock, CheckCircle, XCircle } from "lucide-react";
import { VideoRecord } from "@/types";

interface RightPreviewPanelProps {
  history: VideoRecord[];
  onSelect: (record: VideoRecord) => void;
}

export function RightPreviewPanel({ history, onSelect }: RightPreviewPanelProps) {
  return (
    <aside className="w-72 glass border-l border-white/5 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-white/5">
        <h3 className="text-white font-semibold text-sm">Recent</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {history.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-sm">
            No videos yet
          </div>
        ) : (
          history.map((record) => (
            <div
              key={record.id}
              onClick={() => onSelect(record)}
              className="video-card glass-light rounded-xl p-3 cursor-pointer"
            >
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black/50 mb-2">
                <video
                  src={record.videoUrl}
                  className="w-full h-full object-cover"
                  preload="metadata"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                  <Play size={24} className="text-white" />
                </div>
              </div>

              <p className="text-white text-xs font-medium truncate">
                {record.prompt || "Image generation"}
              </p>

              <div className="flex items-center justify-between mt-1.5">
                <span className="text-gray-500 text-[10px] flex items-center gap-1">
                  <Clock size={10} />
                  {new Date(record.createdAt).toLocaleDateString()}
                </span>
                <span
                  className={`flex items-center gap-1 text-[10px] ${
                    record.status === "completed"
                      ? "text-emerald-400"
                      : record.status === "generating"
                        ? "text-yellow-400"
                        : "text-red-400"
                  }`}
                >
                  {record.status === "completed" ? (
                    <CheckCircle size={10} />
                  ) : record.status === "generating" ? (
                    <Clock size={10} />
                  ) : (
                    <XCircle size={10} />
                  )}
                  {record.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
