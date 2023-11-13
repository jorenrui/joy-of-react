'use client';
import React from 'react';
import { Sun, Moon } from 'react-feather';
import Cookie from 'js-cookie';

import VisuallyHidden from '@/components/VisuallyHidden';
import { DARK_TOKENS, LIGHT_TOKENS } from '@/constants';

function DarkModeToggle({ initialTheme = 'light', ...props }) {
  const [theme, setTheme] = React.useState(initialTheme);

  const handleClick = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(nextTheme);

    Cookie.set('color-theme', nextTheme, {
      expires: 1000,
    });

    const COLORS = nextTheme === 'light'
      ? LIGHT_TOKENS
      : DARK_TOKENS;

    const root = document.documentElement;

    root.setAttribute('data-color-theme', nextTheme);

    Object.entries(COLORS).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  return (
    <button
      {...props}
      type="button"
      onClick={handleClick}
    >
      {theme === 'light'
        ? <Sun size="1.5rem" />
        : <Moon size="1.5rem" />}
      <VisuallyHidden>
        Toggle dark / light mode
      </VisuallyHidden>
    </button>
  );
}

export default DarkModeToggle;
