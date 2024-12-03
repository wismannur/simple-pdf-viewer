"use client";

import { useIsMounted } from "@/hooks/useIsMounted";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const isMounted = useIsMounted();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={clsx(
        "rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300",
        "border border-gray-300 dark:border-gray-700 hover:border-sky-500 dark:hover:border-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/30 transition-all duration-300",
        "hover:text-sky-700 dark:hover:text-sky-300"
      )}
    >
      {isMounted() ? (
        <>
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </>
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </Button>
  );
}
