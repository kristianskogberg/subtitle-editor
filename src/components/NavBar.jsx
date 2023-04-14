import React from "react";

import ToggleTheme from "./ToggleTheme";

export default function NavBar() {
  return (
    <nav className="h-[40px]  px-10 flex justify-between items-center border-b border-gray-300 dark:border-gray-700  bg-white dark:bg-gray-900 dark:text-white">
      <h2 href="/" className="text-xl font-bold">
        Subtitle Editor
      </h2>
      <div className="h-full  flex items-center">
        <ToggleTheme />
        {/*  <Link to="/test" className="text-lg font-semibold hover:text-gray-500">
          Link
        </Link>
        <Link to="/edit">
          <Button text="Get Started" />
  </Link> */}
      </div>
    </nav>
  );
}
