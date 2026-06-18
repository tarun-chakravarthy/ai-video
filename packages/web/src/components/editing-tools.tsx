import { Scissors, Trash2, Zap, Settings, Copy, MoreHorizontal, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export function EditingTools({
  videoUrl,
  currentTime,
  duration,
  onSeek,
  clips,
  onClipChange,
  selectedClipId,
  onSelectedClipChange
}: {
  videoUrl?: string | null;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  clips: Array<{ id: number; start: number; end: number; label: string }>;
  onClipChange: (clips: Array<{ id: number; start: number; end: number; label: string }>) => void;
  selectedClipId: number | null;
  onSelectedClipChange: (id: number | null) => void;
}) {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [goToTime, setGoToTime] = useState<number>(0);
  const [inPoint, setInPoint] = useState<number>(0);
  const [outPoint, setOutPoint] = useState<number>(0);
  const [isRippleEdit, setIsRippleEdit] = useState<boolean>(false);

  // Sync inPoint/outPoint with selected clip
  useEffect(() => {
    if (selectedClipId !== null && clips.length > 0) {
      const clip = clips.find(clip => clip.id === selectedClipId);
      if (clip) {
        setInPoint(clip.start);
        setOutPoint(clip.end);
        return;
      }
    }
    // Reset when no clip selected
    setInPoint(0);
    setOutPoint(duration);
  }, [selectedClipId, clips]);

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

  const updateClipInPoint = (time: number) => {
    if (selectedClipId === null) return;

    const clipIndex = clips.findIndex(clip => clip.id === selectedClipId);
    if (clipIndex === -1) return;

    const clip = clips[clipIndex];

    // Don't allow in point to be >= out point
    if (time >= clip.end) return;

    const updatedClip = { ...clip, start: time };

    const updatedClips = [...clips];
    updatedClips[clipIndex] = updatedClip;

    // If ripple edit is enabled, shift subsequent clips
    if (isRippleEdit) {
      const timeDiff = time - clip.start; // positive if moved right, negative if moved left
      if (timeDiff !== 0) {
        for (let i = clipIndex + 1; i < updatedClips.length; i++) {
          updatedClips[i] = {
            ...updatedClips[i],
            start: updatedClips[i].start + timeDiff,
            end: updatedClips[i].end + timeDiff
          };
        }
      }
    }

    onClipChange(updatedClips);
  };

  const updateClipOutPoint = (time: number) => {
    if (selectedClipId === null) return;

    const clipIndex = clips.findIndex(clip => clip.id === selectedClipId);
    if (clipIndex === -1) return;

    const clip = clips[clipIndex];

    // Don't allow out point to be <= in point
    if (time <= clip.start) return;

    const updatedClip = { ...clip, end: time };

    const updatedClips = [...clips];
    updatedClips[clipIndex] = updatedClip;

    // If ripple edit is enabled, shift subsequent clips
    if (isRippleEdit) {
      const timeDiff = time - clip.end; // positive if moved right, negative if moved left
      if (timeDiff !== 0) {
        for (let i = clipIndex + 1; i < updatedClips.length; i++) {
          updatedClips[i] = {
            ...updatedClips[i],
            start: updatedClips[i].start + timeDiff,
            end: updatedClips[i].end + timeDiff
          };
        }
      }
    }

    onClipChange(updatedClips);
  };

  const formatTimeWithFrames = (totalSeconds: number, frameRate: number = 30): string => {
    const totalFrames = Math.round(totalSeconds * frameRate);
    const hours = Math.floor(totalFrames / (frameRate * 3600));
    const minutes = Math.floor((totalFrames % (frameRate * 3600)) / (frameRate * 60));
    const seconds = Math.floor((totalFrames % (frameRate * 60)) / frameRate);
    const frames = totalFrames % frameRate;
    return (
      `${hours.toString().padStart(2, '0')}:` +
      `${minutes.toString().padStart(2, '0')}:` +
      `${seconds.toString().padStart(2, '0')}:` +
      `${frames.toString().padStart(2, '0')}`
    );
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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

        {/* Precision Controls */}
        <div className="lg:col-span-3">
          {videoUrl && duration > 0 && (
            <div className="space-y-4">
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <div className="flex flex-wrap items-center gap-4">
                  {/* Go-to Time Input */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Go to:</span>
                    <input
                      type="number"
                      min="0"
                      max={duration}
                      step="0.1"
                      value={Math.round(goToTime * 10) / 10}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        if (!isNaN(val) && val >= 0 && val <= duration) {
                          setGoToTime(val);
                          onSeek(val);
                          // Also update video preview if we had a ref
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const val = parseFloat((e.target as HTMLInputElement).value);
                          if (!isNaN(val) && val >= 0 && val <= duration) {
                            setGoToTime(val);
                            onSeek(val);
                            // Also update video preview if we had a ref
                          }
                        }
                      }}
                      className="w-24 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      placeholder="sec"
                    >
                    </input>
                    <button
                      onClick={() => {
                        const val = parseFloat(((document.activeElement as HTMLInputElement)?.value) || '0');
                        if (!isNaN(val) && val >= 0 && val <= duration) {
                          setGoToTime(val);
                          onSeek(val);
                        }
                      }}
                      className="px-3 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isNaN(goToTime) || goToTime < 0 || goToTime > duration}
                    >
                      Go
                    </button>
                  </div>

                  {/* In Point Input (when clip selected) */}
                  {selectedClipId !== null && (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">In:</span>
                        <input
                          type="number"
                          min="0"
                          max={duration}
                          step="0.1"
                          value={Math.round(inPoint * 10) / 10}
                          onChange={(e) => {
                            const val = parseFloat((e.target as HTMLInputElement).value);
                            if (!isNaN(val) && val >= 0 && val <= duration) {
                              setInPoint(val);
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const val = parseFloat((e.target as HTMLInputElement).value);
                              if (!isNaN(val) && val >= 0 && val <= duration) {
                                setInPoint(val);
                                // Update clip in point
                                updateClipInPoint(val);
                              }
                            }
                          }}
                          className="w-24 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          placeholder="sec"
                        >
                        </input>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Out:</span>
                        <input
                          type="number"
                          min="0"
                          max={duration}
                          step="0.1"
                          value={Math.round(outPoint * 10) / 10}
                          onChange={(e) => {
                            const val = parseFloat((e.target as HTMLInputElement).value);
                            if (!isNaN(val) && val >= 0 && val <= duration) {
                              setOutPoint(val);
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const val = parseFloat((e.target as HTMLInputElement).value);
                              if (!isNaN(val) && val >= 0 && val <= duration) {
                                setOutPoint(val);
                                // Update clip out point
                                updateClipOutPoint(val);
                              }
                            }
                          }}
                          className="w-24 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          placeholder="sec"
                        >
                        </input>
                      </div>
                    </>
                  )}

                  {/* Out Point Input */}
                  {/* Note: Out point input is already included above when clip is selected */}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Duration Display - spans all columns on lg and above */}
        <div className="lg:col-span-3">
          {videoUrl && duration > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Current Time:</span>
                <span className="font-medium text-gray-800 dark:text-gray-100">{formatTimeWithFrames(currentTime)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span>Total Duration:</span>
                <span className="font-medium text-gray-800 dark:text-gray-100">{formatTimeWithFrames(duration)}</span>
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
      </div>
    </div>
  );
}