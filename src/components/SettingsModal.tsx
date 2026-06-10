"use client";

import { useState } from "react";
import { X, User, Key, Monitor, Palette, Moon, Sun } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [apiKey, setApiKey] = useState("");
  const [defaultRes, setDefaultRes] = useState("1080p");
  const [theme, setTheme] = useState("dark");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="glass rounded-2xl w-full max-w-lg mx-4 neon-border animate-slide-right">
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <h2 className="text-white font-semibold">Settings</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X size={16} className="text-gray-400" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <User size={14} /> Account
            </label>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">U</span>
              </div>
              <div>
                <p className="text-white text-sm font-medium">User</p>
                <p className="text-gray-500 text-xs">user@example.com</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <Key size={14} /> API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <Monitor size={14} /> Default Resolution
            </label>
            <select
              value={defaultRes}
              onChange={(e) => setDefaultRes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm appearance-none cursor-pointer"
            >
              <option value="720p" className="bg-gray-900">720p</option>
              <option value="1080p" className="bg-gray-900">1080p</option>
              <option value="4k" className="bg-gray-900">4K</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <Palette size={14} /> Theme
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setTheme("dark")}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${
                  theme === "dark"
                    ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                    : "bg-white/5 text-gray-400 border border-white/5"
                }`}
              >
                <Moon size={14} /> Dark
              </button>
              <button
                onClick={() => setTheme("light")}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${
                  theme === "light"
                    ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                    : "bg-white/5 text-gray-400 border border-white/5"
                }`}
              >
                <Sun size={14} /> Light
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-5 border-t border-white/5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 text-sm hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl btn-primary text-white text-sm font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
