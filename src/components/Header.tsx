"use client";

import { useState } from "react";
import { Settings, Zap, ChevronDown } from "lucide-react";

interface HeaderProps {
  onSettingsClick: () => void;
}

export function Header({ onSettingsClick }: HeaderProps) {
  const [credits] = useState(120);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 glass border-b border-white/5">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">AI</span>
          </div>
          <span className="text-white font-semibold text-sm hidden sm:block">
            AI Video Studio
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-sm">
            <Zap size={14} className="text-yellow-400" />
            <span className="text-white font-medium">{credits}</span>
            <span className="text-gray-500">credits</span>
          </div>

          <button className="px-3 py-1.5 rounded-lg btn-primary text-white text-sm font-medium">
            Upgrade
          </button>

          <button
            onClick={onSettingsClick}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <Settings size={16} className="text-gray-400" />
          </button>

          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center cursor-pointer">
            <span className="text-white text-xs font-medium">U</span>
          </div>
        </div>
      </div>
    </header>
  );
}
