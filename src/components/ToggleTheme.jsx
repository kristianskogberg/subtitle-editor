import React, { useState, useEffect } from "react";
7;

import {
  MdLightMode as LightModeIcon,
  MdOutlineDarkMode as DarkModeIcon,
} from "react-icons/md";

export default function ToggleTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    // when the page is rendered, check if a theme has been saved to local storage
    if (localStorage) {
      setTheme(localStorage.getItem("theme"));
    }
  }, []);

  function toggleLightMode() {
    localStorage.setItem("theme", "light");
    setTheme("light");
  }

  function toggleDarkMode() {
    localStorage.setItem("theme", "dark");
    setTheme("dark");
  }

  return (
    <div className="flex h-full items-center justify-center gap-4">
      <button
        onClick={toggleLightMode}
        alt="light mode"
        className="bg-gray-200 dark:bg-transparent h-full "
      >
        <LightModeIcon size={"100%"} className="p-1" />
      </button>
      <button
        onClick={toggleDarkMode}
        alt="dark mode"
        className=" h-full dark:bg-gray-700 "
      >
        <DarkModeIcon size={"100%"} className="p-1" />
      </button>
    </div>
  );
}
