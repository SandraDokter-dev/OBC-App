import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center transition-colors hover:bg-muted"
      aria-label="Theme wechseln"
    >
      {dark ? (
        <Sun className="w-4 h-4 text-gold" />
      ) : (
        <Moon className="w-4 h-4 text-primary" />
      )}
    </button>
  );
};

export default ThemeToggle;
