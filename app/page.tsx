"use client";
import { useTheme } from 'next-themes';

import Image from 'next/image'

export default function Home() {
  
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  
  return (
    <>
      <button 
        className="dark:bg-gray-900 dark:text-gray-300 bg-gray-100 text-gray-900 px-4 py-2 rounded-lg shadow-md"
        onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      >
        Toggle Dark Mode
      </button>
    </>
  )
}
