"use client";

import { VideoRecord } from "@/types";
import { Card } from "./ui/Card";
import { Trash2, Play } from "lucide-react";

interface VideoHistoryProps {
  history: VideoRecord[];
  onSelect: (record: VideoRecord) => void;
  onClear: () => void;
}

export function VideoHistory({ history, onSelect, onClear }: VideoHistoryProps) {
  if (history.length === 0) {
    return (
      <Card className="w-full max-w-2xl text-center">
        <p className="text-gray-400 py-8">
          No videos generated yet. Create your first video!
        </p>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Generated Videos ({history.length})
        </h2>
        <button
          onClick={onClear}
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-400 transition-colors"
        >
          <Trash2 size={14} />
          Clear All
        </button>
      </div>
      <div className="grid gap-4">
        {history.map((record) => (
          <Card
            key={record.id}
            className="cursor-pointer hover:bg-white/10 transition-all"
          >
            <div className="flex gap-4" onClick={() => onSelect(record)}>
              <div className="relative w-40 h-24 rounded-lg overflow-hidden bg-black flex-shrink-0">
                <video
                  src={record.videoUrl}
                  className="w-full h-full object-cover"
                  preload="metadata"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                  <Play size={32} className="text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">
                  {record.prompt || "Image-based generation"}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(record.createdAt).toLocaleString()}
                </p>
                <span
                  className={`inline-block mt-2 px-2 py-0.5 text-xs rounded-full ${
                    record.status === "completed"
                      ? "bg-green-500/20 text-green-400"
                      : record.status === "generating"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {record.status}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
