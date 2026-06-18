import React from 'react';
import { Play, Pause, Square, Expand, Volume2, Settings2 } from "lucide-react";
import { useState, useEffect, useRef, useImperativeHandle } from "react";

export interface VideoPreviewHandle {
  play: () => Promise<void>;
  pause: () => void;
  togglePlay: () => Promise<void>;
  seek: (time: number) => void;
}

interface VideoPreviewProps {
  videoUrl?: string | null;
  onTimeUpdate?: ((currentTime: number, duration: number) => void) | undefined;
  onEnded?: (() => void) | undefined;
}

export const VideoPreview = React.forwardRef<VideoPreviewHandle, VideoPreviewProps>(({ videoUrl, onTimeUpdate, onEnded }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (onTimeUpdate) {
        onTimeUpdate(video.currentTime, video.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (onEnded) {
        onEnded();
      }
    };

    const handleLoadedMetadata = () => {
      if (onTimeUpdate) {
        onTimeUpdate(video.currentTime, video.duration);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [videoUrl, onTimeUpdate, onEnded]);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (isPlaying) {
        video.pause();
      } else {
        await video.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      // Handle AbortError when play() is interrupted by pause()
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Playback error:', error);
      }
      // If play() fails, ensure isPlaying reflects actual state
      setIsPlaying(!video.paused);
    }
  };

  const play = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      await video.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Playback error:', error);
    }
  };

  const pause = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setIsPlaying(false);
  };

  const seek = (time: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = time;
    setCurrentTime(time);
  };

  // Expose imperative methods
  useImperativeHandle(ref, () => ({
    play,
    pause,
    togglePlay,
    seek
  }));

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = (parseFloat(e.target.value) / 100) * video.duration;
    setCurrentTime(video.currentTime);
  };

  const requestFullscreen = () => {
    const video = videoRef.current;
    if (video) {
      video.requestFullscreen?.();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="space-y-4">
        {/* Video Player Container */}
        <div className="relative w-full h-48 sm:h-52 lg:h-64 bg-gray-900 dark:bg-gray-100 rounded-lg overflow-hidden">
          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            preload="metadata"
            muted
          >
            {videoUrl ? (
              <source src={videoUrl} type="video/mp4" />
            ) : null}
            Your browser does not support the video tag.
          </video>

          {/* Video Placeholder (shown when no video) */}
          {!videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
              <div className="text-center">
                <div className="w-16 h-16 mb-3">
                  <Play className="h-6 w-6" />
                </div>
                <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-2">
                  No video loaded
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Upload footage to begin editing
                </p>
              </div>
            </div>
          )}

          {/* Video Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
            <div className="flex items-center justify-between">
              {/* Left Controls */}
              <div className="flex items-center space-x-3">
                <button className="p-2 rounded-full hover:bg-white/20" onClick={togglePlay}>
                  {isPlaying ? <Pause /> : <Play />}
                </button>
                <button className="p-2 rounded-full hover:bg-white/20" onClick={() => {
                  const video = videoRef.current;
                  if (video) {
                    video.currentTime = 0;
                    setIsPlaying(false);
                    setCurrentTime(0);
                  }
                }}>
                  <Square className="h-4 w-4 text-white" />
                </button>
                <div className="flex items-center space-x-2 text-sm text-white">
                  <span>{formatTime(currentTime)}</span>
                  <span>/</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <input
                  type="range"
                  className="flex-1 h-1 bg-white/20"
                  min="0"
                  max="100"
                  value={duration > 0 ? (currentTime / duration) * 100 : 0}
                  onChange={handleSeek}
                />
              </div>

              {/* Right Controls */}
              <div className="flex items-center space-x-3">
                <button className="p-2 rounded-full hover:bg-white/20">
                  <Volume2 className="h-4 w-4 text-white" />
                </button>
                <button className="p-2 rounded-full hover:bg-white/20">
                  <Settings2 className="h-4 w-4 text-white" />
                </button>
                <button className="p-2 rounded-full hover:bg-white/20" onClick={requestFullscreen}>
                  <Expand className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Info */}
        {videoUrl && (
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 dark:text-gray-400">Resolution:</span>
              <span className="font-medium text-gray-800 dark:text-gray-100">1920x1080</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 dark:text-gray-400">Frame Rate:</span>
              <span className="font-medium text-gray-800 dark:text-gray-100">30fps</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 dark:text-gray-400">Duration:</span>
              <span className="font-medium text-gray-800 dark:text-gray-100">{formatTime(duration)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 dark:text-gray-400">Format:</span>
              <span className="font-medium text-gray-800 dark:text-gray-100">MP4 (H.264)</span>
            </div>
          </div>
        )}

        {/* Timeline Scrubber */}
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
               style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : "0%" }} />
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-0.5 bg-white dark:bg-gray-200" />
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>00:00</span>
          <span>{videoUrl ? formatTime(duration) : "00:00"}</span>
        </div>
      </div>
    </div>
  );
});