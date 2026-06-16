import { PlayCircle, Trash2, MoreVertical } from "lucide-react";
import { useState, useEffect } from "react";

export function StoryTimeline({
  videoUrl,
  currentTime,
  duration,
  onSeek,
  clips,
  onClipChange
}: {
  videoUrl?: string | null;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  clips: Array<{ id: number; start: number; end: number; label: string }>;
  onClipChange: (clips: Array<{ id: number; start: number; end: number; label: string }>) => void;
}) {
  const [draggingClipId, setDraggingClipId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Update playing state based on currentTime changes (simplified)
  useEffect(() => {
    if (duration > 0) {
      // Simple heuristic: if we're moving forward rapidly, assume playing
      // In a real app, this would come from the video element
    }
  }, [currentTime, duration]);

  const handleClipClick = (clipId: number) => {
    setDraggingClipId(clipId);
  };

  const handleClipDrag = (e: React.DragEvent, clipId: number, deltaTime: number) => {
    // In a full implementation, this would update clip timing
    // For MVP, we'll just allow seeking via click
  };

  const handleSeekFromTimeline = (time: number) => {
    onSeek(time);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
          Story Timeline
        </h3>
        <button className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Sort by Scene
        </button>
      </div>

      {videoUrl && duration > 0 ? (
        <>
          <div className="space-y-3 h-40 overflow-y-auto">
            {/* Timeline Container */}
            <div className="relative h-full">
              {/* Timeline Ruler */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="flex items-end h-full">
                  {/* Time markers */}
                  {[0, 5, 10, 15, 20, 25, 30, 45, 60].map((time) => {
                    if (time > duration) return null;
                    const percentage = (time / duration) * 100;
                    return (
                      <div key={time} className="absolute left-0 -translate-x-1/2 w-[1px] bg-gray-400 dark:bg-gray-500" style={{ left: `${percentage}%` }}>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {formatTime(time)}
                        </div>
                      </div>
                    );
                  }).filter(Boolean)}
                </div>
              </div>

              {/* AI-Suggested Highlights Overlay (semi-transparent background) */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="flex items-end h-full">
                  {/* AI Highlight markers - shown as subtle background */}
                  {clips.map((clip, index) => {
                    const startPercentage = (clip.start / duration) * 100;
                    const widthPercentage = ((clip.end - clip.start) / duration) * 100;
                    return (
                      <div key={clip.id} className={`absolute left-0 -translate-x-1/2 h-[4px] bg-blue-500/20`} style={{ left: `${startPercentage}%`, width: `${widthPercentage}%` }}></div>
                    );
                  })}
                </div>
              </div>

              {/* Clips */}
              <div className="relative h-full">
                {clips.map((clip) => (
                  <div
                    key={clip.id}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-4 cursor-grab ${draggingClipId === clip.id ? 'cursor-grabbing' : ''}
                    transition-transform duration-100`}
                    style={{
                      left: `${(clip.start / duration) * 100}%`,
                      width: `${((clip.end - clip.start) / duration) * 100}%`,
                      backgroundColor: draggingClipId === clip.id ? '#3b82f6' : '#60a5fa',
                    }}
                    onClick={() => handleClipClick(clip.id)}
                    onDragStart={(e) => e.preventDefault()}
                  >
                    <div className="flex flex-col items-center px-2 pt-1">
                      <div className="w-2 h-2 bg-white rounded-full" />
                      <span className="text-xs text-white font-medium">{clip.label}</span>
                      <span className="text-xs text-white/80">{formatTime(clip.end - clip.start)}</span>
                    </div>
                  </div>
                ))}

                {/* Playhead */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white dark:bg-gray-200" style={{ left: `${(currentTime / duration) * 100}%` }}></div>
              </div>
            </div>

            {/* Timeline Controls */}
            <div className="flex items-center justify-center py-4 border-t border-dashed border-gray-200 dark:border-gray-700">
              <button className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Add Clip
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Empty state when no video */}
          <div className="flex items-center justify-center py-10">
            <div class="text-center text-gray-500 dark:text-gray-400">
              <p class="mb-2">No video loaded</p>
              <p class="text-sm">Upload footage to begin building your story</p>
              </div>
            </div>
          </>
        )}
      </div>
    }
  );
}