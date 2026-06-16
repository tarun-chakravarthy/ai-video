import { VideoDashboard } from "@/components/video-dashboard";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            AI Video Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Automate your video workflow
          </p>
          <nav className="mt-6">
            <a href="#" className="flex w-items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              <span className="mr-3">📁</span>
              Upload
            </a>
            <a href="#" className="flex w-items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              <span className="mr-3">🎬</span>
              Edit
            </a>
            <a href="#" className="flex w-items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              <span className="mr-3">🤖</span>
              AI Tools
            </a>
          </nav>
        </div>
      </aside>

      <main className="flex-1 overflow-hidden">
        <div className="p-6">
          <VideoDashboard />
        </div>
      </main>
    </div>
  );
}