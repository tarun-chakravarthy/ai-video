"use client";
import { useState, useEffect } from "react";
import { VideoDashboard } from "@/components/video-dashboard";
import { Menu, X } from "lucide-react";

export default function Home() {
  // Initialize with default values to avoid hydration mismatch
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync sidebar state on mount
  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    setIsSidebarOpen(isDesktop);
  }, []);

  // Sync dark mode on mount
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  // Listen for window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Listen for dark mode preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply dark class to document element based on isDarkMode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar button - only visible on mobile */}
      <div className="lg:hidden fixed left-4 top-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Toggle sidebar"
        >
          {!isSidebarOpen ? (
            <Menu className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          w-64
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed left-0 top-0 h-screen
          lg:static lg:translate-x-0
          transition-transform duration-300
          bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        `}
      >
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            AI Video Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Automate your video workflow
          </p>
          <nav className="mt-6">
            <button
              onClick={(e) => e.preventDefault()}
              className="flex w-items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <span className="mr-3">📁</span>
              Upload
            </button>
            <button
              onClick={(e) => e.preventDefault()}
              className="flex w-items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <span className="mr-3">🎬</span>
              Edit
            </button>
            <button
              onClick={(e) => e.preventDefault()}
              className="flex w-items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <span className="mr-3">🤖</span>
              AI Tools
            </button>
          </nav>
        </div>
      </aside>

      {/* Backdrop for mobile sidebar - only visible when sidebar is open on mobile */}
      {isSidebarOpen && window.innerWidth < 1024 && (
        <div className="fixed inset-0 bg-black/50 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <main className="flex-1 overflow-auto lg:pl-0">
        <div className="p-6">
          <VideoDashboard />
        </div>
      </main>
    </div>
  );
}