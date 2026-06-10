"use client";

import { useEffect, useState } from "react";
import { LoadingSpinner } from "./ui/LoadingSpinner";

interface GenerationOverlayProps {
  isVisible: boolean;
  progress: number;
  currentStep: string;
}

const steps = [
  "Understanding prompt",
  "Rendering frames",
  "Final video assembly",
];

export function GenerationOverlay({
  isVisible,
  progress,
  currentStep,
}: GenerationOverlayProps) {
  if (!isVisible) return null;

  const currentStepIndex = steps.indexOf(currentStep);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="glass rounded-2xl p-8 max-w-sm w-full mx-4 text-center neon-border">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-violet-500/20 flex items-center justify-center animate-pulse-glow">
            <LoadingSpinner size="lg" />
          </div>
        </div>

        <h3 className="text-white font-semibold text-lg mb-2">
          Generating your video...
        </h3>
        <p className="text-gray-400 text-sm mb-6">This may take a moment</p>

        <div className="space-y-3 mb-6">
          {steps.map((step, i) => (
            <div
              key={step}
              className={`generation-step flex items-center gap-3 text-sm ${
                i < currentStepIndex
                  ? "completed"
                  : i === currentStepIndex
                    ? "active"
                    : "text-gray-600"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  i < currentStepIndex
                    ? "bg-emerald-500/20 text-emerald-400"
                    : i === currentStepIndex
                      ? "bg-violet-500/20 text-violet-400"
                      : "bg-white/5 text-gray-600"
                }`}
              >
                {i < currentStepIndex ? "✓" : i + 1}
              </div>
              <span>{step}</span>
            </div>
          ))}
        </div>

        <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-gray-500 text-xs mt-2">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}
