import { Upload, FileText, Play, Settings2, CircleAlert } from "lucide-react";
import { useState } from "react";

export function ExportControls({
  videoUrl
}: {
  videoUrl?: string | null;
}) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState<string>("4K Ultra HD");
  const [exportStatus, setExportStatus] = useState<string>("Ready to export");

  const presets = [
    {
      label: "4K Ultra HD",
      resolution: "3840x2160",
      codec: "H.265",
      fps: "30fps",
      estimatedTime: "2-3 minutes"
    },
    {
      label: "1080p Full HD",
      resolution: "1920x1080",
      codec: "H.264",
      fps: "30fps",
      estimatedTime: "1-2 minutes"
    },
    {
      label: "720p HD",
      resolution: "1280x720",
      codec: "H.264",
      fps: "30fps",
      estimatedTime: "30-60 seconds"
    },
    {
      label: "Social Media",
      resolution: "1080x1080",
      codec: "H.264",
      fps: "30fps",
      estimatedTime: "45-90 seconds"
    }
  ];

  const handleExport = () => {
    if (!videoUrl) return;

    setIsExporting(true);
    setExportProgress(0);
    setExportStatus("Exporting...");

    // Simulate export process
    const interval = setInterval(() => {
      setExportProgress(prev => {
        const newProgress = Math.min(prev + 5, 100);
        if (newProgress >= 100) {
          clearInterval(interval);
          setExportStatus("Export Complete!");
          setIsExporting(false);
          // Reset after 2 seconds
          setTimeout(() => {
            setExportStatus("Ready to export");
            setExportProgress(0);
          }, 2000);
        }
        return newProgress;
      });
    }, 300);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
          Export & Render
        </h3>
        <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <Settings2 className="h-3 w-3 mr-1" /> Advanced
        </button>
      </div>

      {!videoUrl ? (
        <>
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">Upload a video to enable export</p>
          </div>
        </>
      ) : (
        <>
          {/* Preset Selection */}
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Upload className="h-4 w-4 mt-1 text-indigo-500 dark:text-indigo-400" />
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-100">Export Presets</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Choose quality and format
                </p>
              </div>
            </div>
            <div className="space-y-1">
              {presets.map((preset, index) => (
                <div
                  key={index}
                  className={`flex items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 ${selectedPreset === preset.label ? "border-indigo-500 dark:border-indigo-400" : ""}`}
                >
                  <input
                    type="radio"
                    name="preset"
                    className="h-3 w-3 text-indigo-500 dark:text-indigo-400"
                    checked={selectedPreset === preset.label}
                    onChange={() => setSelectedPreset(preset.label)}
                  />
                  <div className="ml-2 space-y-0.5">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                      {preset.label}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {preset.resolution} • {preset.codec} • {preset.fps}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Button */}
          <div className="space-y-2">
            <button
              className={`w-full flex items-center justify-center px-4 py-3 bg-indigo-600 text-white font-medium rounded-lg text-sm hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all ${isExporting ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={handleExport}
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <svg className="h-4 w-4 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Exporting...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Render Video
                </>
              )}
            </button>
            {!isExporting && (
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Estimated time: {presets.find(p => p.label === selectedPreset)?.estimatedTime || "2-3 minutes"}
              </p>
            )}
          </div>

          {/* Progress Bar */}
          {isExporting && (
            <>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Rendering:</span>
                  <span>{exportProgress}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 dark:bg-indigo-400" style={{ width: `${exportProgress}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>00:${Math.floor(exportProgress / 100 * 60).toString().padStart(2, '0')}</span>
                  <span>00:${Math.max(0, 60 - Math.floor(exportProgress / 100 * 60)).toString().padStart(2, '0')} remaining</span>
                </div>
              </div>
            </>
          )}

          {/* Status Indicator */}
          <div className="flex items-center space-x-2 text-sm">
            <div className="h-2.5 w-2.5 bg-green-500 dark:bg-green-400 rounded-full" />
            <span className="text-gray-500 dark:text-gray-400">{exportStatus}</span>
          </div>
        </>
      )}

      {/* Warning Banner */}
      <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <div className="flex items-start space-x-2 text-sm">
          <CircleAlert className="h-4 w-4 mt-1 text-yellow-500 dark:text-yellow-400" />
          <div>
            <p className="font-medium text-yellow-800 dark:text-yellow-100">
              Note: 4K rendering requires significant processing time
            </p>
            <p className="text-xs text-yellow-600 dark:text-yellow-300">
              Consider lower resolutions for faster previews
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}