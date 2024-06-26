"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import SunIcon from "../UI/SunIcon";
import MoonIcon from "../UI/MoonIcon";

const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className={`flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-500 ${
        resolvedTheme === "dark" ? "bg-zinc-500" : "bg-gray-900"
      }`}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <SunIcon className="h-5 w-5 text-yellow-500" />
      ) : (
        <MoonIcon className="h-5 w-5 text-white" />
      )}
    </button>
  );
};

export default ThemeButton;
