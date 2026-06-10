"use client";

import { useState, createContext, useContext } from "react";
import {
  Video,
  FolderOpen,
  Settings,
  Sparkles,
  Image,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "generator", icon: Video, label: "Video Generator" },
  { id: "projects", icon: FolderOpen, label: "My Projects" },
  { id: "prompts", icon: Sparkles, label: "Prompt Templates" },
  { id: "assets", icon: Image, label: "Assets" },
  { id: "trash", icon: Trash2, label: "Trash" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <aside
        className={`fixed left-0 top-14 bottom-0 z-40 glass border-r border-white/5 transition-all duration-300 flex flex-col ${
          collapsed ? "w-[60px]" : "w-[220px]"
        }`}
      >
        <nav className="flex-1 py-3 px-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`sidebar-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                activeTab === item.id ? "active" : "text-gray-400"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={18} className="flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center h-10 border-t border-white/5 text-gray-500 hover:text-gray-300 transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>

      <div
        className={`fixed top-14 bottom-0 left-0 z-30 transition-all duration-300 ${
          collapsed ? "w-[60px]" : "w-[220px]"
        }`}
      />
    </>
  );
}
