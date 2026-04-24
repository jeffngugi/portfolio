// src/components/ThemeToggle.tsx
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = document.documentElement.getAttribute("data-theme");
    setIsDark(theme === "dark");
  }, []);

  function toggle() {
    const newTheme = !isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
  }

  return (
    <label className='toggle text-base-content toggle-sm'>
      <input
        type='checkbox'
        checked={isDark}
        onChange={toggle}
        className='theme-controller'
      />
      <svg
        aria-label='sun'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
      >
        <g
          strokeLinejoin='round'
          strokeLinecap='round'
          strokeWidth='2'
          fill='none'
          stroke='currentColor'
        >
          <circle cx='12' cy='12' r='4' />
          <path d='M12 2v2' />
          <path d='M12 20v2' />
          <path d='m4.93 4.93 1.41 1.41' />
          <path d='m17.66 17.66 1.41 1.41' />
          <path d='M2 12h2' />
          <path d='M20 12h2' />
          <path d='m6.34 17.66-1.41 1.41' />
          <path d='m19.07 4.93-1.41 1.41' />
        </g>
      </svg>
      <svg
        aria-label='moon'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
      >
        <g
          strokeLinejoin='round'
          strokeLinecap='round'
          strokeWidth='2'
          fill='none'
          stroke='currentColor'
        >
          <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' />
        </g>
      </svg>
    </label>
  );
}
