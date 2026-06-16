import { Scissors, Trash2, Zap, Settings, Copy, MoreHorizontal } from "lucide-react";
import { useState } from "react";

export function EditingTools({
  videoUrl,
  currentTime,
  duration,
  onSeek
}: {
  videoUrl?: string | null;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void
}) {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const handleSplit = () => {
    if (!videoUrl || duration === 0) return;
    // In a real implementation, this would split the clip at currentTime
    alert(`Split video at ${Math.round(currentTime)} seconds`);
    setSelectedTool("split");
    setTimeout(() => setSelectedTool(null), 1500);
  };

  const handleDelete = () => {
    if (!videoUrl || duration === 0) return;
    // In a real implementation, this would delete the selected clip/segment
    alert("Delete selected segment");
    setSelectedTool("delete");
    setTimeout(() => setSelectedTool(null), 1500);
  };

  const handleHighlights = () => {
    if (!videoUrl || duration === 0) return;
    // In a real implementation, this would auto-detect highlights
    alert("Generating highlights...");
    setSelectedTool("highlights");
    setTimeout(() => setSelectedTool(null), 2000);
  };

  const handleDuplicate = () => {
    if (!videoUrl || duration === 0) return;
    // In a real implementation, this would duplicate the selected clip
    alert("Duplicate selected clip");
    setSelectedTool("duplicate");
    setTimeout(() => setSelectedTool(null), 1500);
  };

  const handleProperties = () => {
    if (!videoUrl || duration === 0) return;
    // In a real implementation, this would show clip properties
    alert(`Clip properties:\n- Start: 0s\n- End: ${Math.round(duration)}s\n- Duration: ${Math.round(duration)}s`);
    setSelectedTool("properties");
    setTimeout(() => setSelectedTool(null), 1500);
  };

  const handleMoreOptions = () => {
    setSelectedTool("more");
    setTimeout(() => setSelectedTool(null), 1500);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
          Editing Tools
        </h3>
        <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          Advanced
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Primary Editing Controls */}
        <div className="space-y-2">
          <button
            className={`w-full flex items-center justify-start px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-left text-sm font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 ${selectedTool === "split" ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
            onClick={handleSplit}
            disabled={!videoUrl || duration === 0}
          >
            <Scissors className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            Split at Playhead
          </button>
          <button
            className={`w-full flex items-center justify-start px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-left text-sm font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 ${selectedTool === "delete" ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
            onClick={handleDelete}
            disabled={!videoUrl || duration === 0}
          >
            <Trash2 className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            Delete Selection
          </button>
          <button
            className={`w-full flex items-center justify-start px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-left text-sm font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 ${selectedTool === "highlights" ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
            onClick={handleHighlights}
            disabled={!videoUrl || duration === 0}
          >
            <Zap className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            Auto Highlights
          </button>
        </div>

        {/* Secondary Controls */}
        <div className="space-y-2">
          <button
            className={`w-full flex items-center justify-start px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-left text-sm font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 ${selectedTool === "duplicate" ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
            onClick={handleDuplicate}
            disabled={!videoUrl || duration === 0}
          >
            <Copy className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            Duplicate Clip
          </button>
          <button
            className={`w-full flex items-center justify-start px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-left text-sm font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 ${selectedTool === "properties" ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
            onClick={handleProperties}
            disabled={!videoUrl || duration === 0}
          >
            <Settings className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            Clip Properties
          </button>
          <button
            className={`w-full flex items-center justify-start px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-left text-sm font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 ${selectedTool === "more" ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
            onClick={handleMoreOptions}
            disabled={!videoUrl || duration === 0}
          >
            <MoreHorizontal className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            More Options
          </button>
        </div>
      </div>

      {/* Duration Display */}
      {videoUrl && duration > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Total Duration:</span>
            <span className="font-medium text-gray-800 dark:text-gray-100">{Math.round(currentTime * 100) / 100}s</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
            <span>Target Length:</span>
            <span className="font-medium text-gray-800 dark:text-gray-100">60s - 120s</span>
          </div>
          {currentTime > 0 && duration > 0 && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress:</span>
                <span className="font-medium text-gray-800 dark:text-gray-100">${Math.round((currentTime / duration) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 dark:bg-blue-400" style={{ width: `${Math.min((currentTime / duration) * 100, 100)}%` }}></div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}