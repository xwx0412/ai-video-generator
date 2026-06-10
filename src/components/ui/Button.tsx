"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  onClick,
  disabled,
  className = "",
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white rounded-xl transition-all duration-300
        bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500
        shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg
        active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}
