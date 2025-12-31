import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 999 }}>
      <button
        onClick={() =>
          setTheme(theme === 'light' ? 'dark' : 'light')
        }
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </div>
  );
};

export default ThemeToggle;
