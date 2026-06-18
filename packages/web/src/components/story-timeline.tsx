import { PlayCircle, Trash2, MoreVertical } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function StoryTimeline({
  videoUrl,
  currentTime,
  duration,
  onSeek,
  clips,
  onClipChange,
  videoRef,
  selectedClipId,
  onSelectedClipChange
}: {
  videoUrl?: string | null;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  clips: Array<{ id: number; start: number; end: number; label: string }>;
  onClipChange: (clips: Array<{ id: number; start: number; end: number; label: string }>) => void;
  videoRef: React.RefObject<{
    play: () => Promise<void>;
    pause: () => void;
    togglePlay: () => Promise<void>;
    seek: (time: number) => void;
  }> | null;
  selectedClipId: number | null;
  onSelectedClipChange: (id: number | null) => void;
}) {
  const [draggingClipId, setDraggingClipId] = useState<number | null>(null);
  const [draggingEdge, setDraggingEdge] = useState<'start' | 'end' | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Update playing state based on currentTime changes (simplified)
  useEffect(() => {
    if (duration > 0) {
      // Simple heuristic: if we're moving forward rapidly, assume playing
      // In a real app, this would come from the video element
    }
  }, [currentTime, duration]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!videoUrl || duration === 0) return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          // Toggle play/pause using the videoRef
          if (videoRef?.current) {
            videoRef.current.togglePlay().then(() => {
              setIsPlaying(prev => !prev);
            }).catch(console.error);
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          // Seek backward by 0.1 seconds (or 1 frame if we knew fps)
          const newTime = Math.max(0, currentTime - 0.1);
          onSeek(newTime);
          // Also update the video preview if we have a ref
          if (videoRef?.current) {
            videoRef.current.seek(newTime);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          // Seek forward by 0.1 seconds
          const newTime2 = Math.min(duration, currentTime + 0.1);
          onSeek(newTime2);
          // Also update the video preview if we have a ref
          if (videoRef?.current) {
            videoRef.current.seek(newTime2);
          }
          break;
        case 'Delete':
        case 'Backspace':
          e.preventDefault();
          if (selectedClipId !== null) {
            // Delete selected clip
            onClipChange(clips.filter(clip => clip.id !== selectedClipId));
            onSelectedClipChange(null);
          }
          break;
        case 's':
        case 'S':
          e.preventDefault();
          if (selectedClipId !== null) {
            // Split selected clip at currentTime
            const clipToSplit = clips.find(clip => clip.id === selectedClipId);
            if (clipToSplit && currentTime > clipToSplit.start && currentTime < clipToSplit.end) {
              // Create two new clips: [start, currentTime] and [currentTime, end]
              const leftClip = {
                id: Date.now(),
                start: clipToSplit.start,
                end: currentTime,
                label: `${clipToSplit.label} (part 1)`
              };
              const rightClip = {
                id: Date.now() + 1,
                start: currentTime,
                end: clipToSplit.end,
                label: `${clipToSplit.label} (part 2)`
              };
              // Replace the original clip with the two new ones
              const newClips = clips
                .filter(clip => clip.id !== selectedClipId)
                .concat(leftClip, rightClip)
                .sort((a, b) => a.start - b.start);
              onClipChange(newClips);
              onSelectedClipChange(null);
            }
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [videoUrl, duration, currentTime, onSeek, onClipChange, clips, selectedClipId, isPlaying, videoRef]);

  const handleClipClick = (clipId: number) => {
    onSelectedClipChange(clipId);
    setDraggingClipId(null);
    setDraggingEdge(null);
  };

  const handleClipDragStart = (e: React.MouseEvent, clipId: number, edge: 'start' | 'end') => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingClipId(clipId);
    setDraggingEdge(edge);
  };

  const handleClipDrag = (e: React.MouseEvent) => {
    if (draggingClipId === null || draggingEdge === null || !timelineRef.current) return;

    const container = timelineRef.current;
    const rect = container.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = rect.width;
    const time = Math.max(0, Math.min(duration, (offsetX / width) * duration));

    // Snap to grid (0.5 seconds)
    const snappedTime = Math.round(time * 2) / 2;

    const clipIndex = clips.findIndex(clip => clip.id === draggingClipId);
    if (clipIndex === -1) return;

    const clip = clips[clipIndex];
    let newClip: { id: number; start: number; end: number; label: string };

    if (draggingEdge === 'start') {
      // Ensure start doesn't go beyond end - minimum duration of 0.5 seconds
      const newStart = Math.min(snappedTime, clip.end - 0.5);
      newClip = { ...clip, start: newStart };
    } else {
      // Ensure end doesn't go below start - minimum duration of 0.5 seconds
      const newEnd = Math.max(snappedTime, clip.start + 0.5);
      newClip = { ...clip, end: newEnd };
    }

    // Update the clip
    const newClips = [...clips];
    newClips[clipIndex] = newClip;
    onClipChange(newClips);
  };

  const handleClipDragEnd = () => {
    setDraggingClipId(null);
    setDraggingEdge(null);
  };

  const handleTimelineClick = (e: React.MouseEvent) => {
    // Only seek if we're not dragging a clip edge
    if (draggingClipId !== null) return;

    const container = e.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = rect.width;
    const time = (offsetX / width) * duration;
    onSeek(time);
    // Also update the video preview if we have a ref
    if (videoRef?.current) {
      videoRef.current.seek(time);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      ref={timelineRef}
      onMouseUp={handleClipDragEnd}
      onMouseLeave={handleClipDragEnd}
    >
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
          <div className="space-y-3 h-32 sm:h-36 lg:h-40 overflow-y-auto">
            {/* Timeline Container */}
            <div className="relative h-full" onClick={handleTimelineClick}>
              {/* Timeline Ruler */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="flex items-end h-full">
                  {/* Time markers */}
                  {[0, 5, 10, 15, 20, 25, 30, 45, 60].map((time) => {
                    if (time > duration) return null;
                    const percentage = (time / duration) * 100;
                    return (
                      <div key={time} className={`absolute left-0 -translate-x-1/2 w-[1px] bg-gray-400 dark:bg-gray-500`} style={{ left: `${percentage}%` }}>
                        <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap`}>
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
                {clips.map((clip) => {
                  const isSelected = selectedClipId === clip.id;
                  const isDragging = draggingClipId === clip.id;
                  const startPercentage = (clip.start / duration) * 100;
                  const widthPercentage = ((clip.end - clip.start) / duration) * 100;

                  return (
                    <div
                      key={clip.id}
                      className={`absolute left-0 top-1/2 -translate-y-1/2 h-4 cursor-grab ${isDragging ? 'cursor-grabbing' : ''} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
                      style={{
                        left: `${startPercentage}%`,
                        width: `${widthPercentage}%`,
                        backgroundColor: isDragging ? '#3b82f6' : isSelected ? '#60a5fa' : '#60a5fa',
                      }}
                      onMouseDown={(e) => {
                        // Check if clicking on the edges (start or end)
                        const handleWidth = 6; // pixels
                        const rect = (e.target as HTMLElement).getBoundingClientRect();
                        const offsetX = e.clientX - rect.left;
                        const width = rect.width;

                        if (offsetX < handleWidth) {
                          handleClipDragStart(e, clip.id, 'start');
                        } else if (offsetX > width - handleWidth) {
                          handleClipDragStart(e, clip.id, 'end');
                        } else {
                          handleClipClick(clip.id);
                        }
                      }}
                      onMouseMove={handleClipDrag}
                    >
                      <div className="flex flex-col items-center px-2 pt-1">
                        <div className="w-2 h-2 bg-white rounded-full" />
                        <span className="text-xs text-white font-medium">{clip.label}</span>
                        <span className="text-xs text-white/80">{formatTime(clip.end - clip.start)}</span>
                      </div>
                    </div>
                  );
                })}

                {/* Playhead */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white dark:bg-gray-200" style={{ left: `${(currentTime / duration) * 100}%` }}></div>

                {/* Visual indicator for split position when selecting a clip */}
                {selectedClipId !== null && (
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-yellow-400 dark:bg-yellow-300" style={{ left: `${(currentTime / duration) * 100}%` }}></div>
                )}
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
            <div className="text-center text-gray-500 dark:text-gray-400">
              <p className="mb-2">No video loaded</p>
              <p className="text-sm">Upload footage to begin building your story</p>
              </div>
            </div>
          </>
      )}
    </div>
  );
}