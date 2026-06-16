"use client";

import { useState, useEffect } from "react";
import { UploadInterface } from "@/components/upload-interface";
import { StoryTimeline } from "@/components/story-timeline";
import { EditingTools } from "@/components/editing-tools";
import { AISuggestions } from "@/components/ai-suggestions";
import { ExportControls } from "@/components/export-controls";
import { VideoPreview } from "@/components/video-preview";
import { UploadIcon } from "lucide-react";

export function VideoDashboard() {
  const [videos, setVideos] = useState<Array<{id: number; url: string; duration: number}>>([]);
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  // Get active video object
  const activeVideo = videos.find(v => v.id === activeVideoId) || null;

  // Handle file upload
  const handleFileUpload = async (files: File[]) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => Math.min(prev + 10, 90));
    }, 100);

    try {
      // Create object URLs for all files
      const newVideos = files.map((file, index) => ({
        id: Date.now() + index, // Simple ID generation
        url: URL.createObjectURL(file),
        duration: 0 // Will be updated when video metadata loads
      }));

      // Add new videos to existing list
      setVideos(prev => [...prev, ...newVideos]);

      // Set active video if none is set
      if (activeVideoId === null && newVideos.length > 0) {
        setActiveVideoId(newVideos[0].id);
      }

      // Complete upload simulation
      setTimeout(() => {
        clearInterval(progressInterval);
        setUploadProgress(100);
        setIsUploading(false);
      }, 500);
    } catch (error) {
      clearInterval(progressInterval);
      setIsUploading(false);
      setUploadProgress(0);
      console.error("Error uploading files:", error);
    }
  };

  // Handle video time updates
  const handleTimeUpdate = (current: number, dur: number) => {
    setCurrentTime(current);
    setDuration(dur);
    // Update duration in videos array for active video
    if (activeVideoId !== null) {
      setVideos(prev =>
        prev.map(video =>
          video.id === activeVideoId ? { ...video, duration: dur } : video
        )
      );
    }
  };

  // Handle video ended
  const handleEnded = () => {
    setCurrentTime(0);
  };

  // Clean up object URLs on unmount or when videos change
  useEffect(() => {
    return () => {
      videos.forEach(video => {
        URL.revokeObjectURL(video.url);
      });
    };
  }, [videos]);

  // Update time state when active video changes
  useEffect(() => {
    if (activeVideoId !== null) {
      const activeVideo = videos.find(v => v.id === activeVideoId);
      if (activeVideo) {
        setCurrentTime(0);
        setDuration(activeVideo.duration);
      }
    } else {
      // No active video
      setCurrentTime(0);
      setDuration(0);
    }
  }, [activeVideoId, videos]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <UploadInterface
            onFileUpload={handleFileUpload}
            isUploading={isUploading}
            uploadProgress={uploadProgress}
          />
          {videos.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                  Video Library
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      const firstVideo = videos[0];
                      if (firstVideo) setActiveVideoId(firstVideo.id);
                    }}
                    className={`px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm ${activeVideoId === videos[0]?.id ? "bg-blue-500 text-white" : ""}`}
                  >
                    All Videos
                  </button>
                  {videos.map((video, index) => (
                    <button
                      key={video.id}
                      onClick={() => setActiveVideoId(video.id)}
                      className={`px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm ${activeVideoId === video.id ? "bg-blue-500 text-white" : ""}`}
                    >
                      Video {index + 1}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded overflow-hidden">
                <div className="flex-1 overflow-x-auto space-x-2 p-1">
                  {videos.map((video, index) => (
                    <button
                      key={video.id}
                      onClick={() => setActiveVideoId(video.id)}
                      className={`flex-shrink-0 h-3 w-20 bg-gray-300 dark:bg-gray-600 rounded ${activeVideoId === video.id ? "bg-blue-500" : ""} hover:bg-gray-400 dark:hover:bg-gray-500`}
                    >
                      V{index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeVideo && (
            <StoryTimeline
              videoUrl={activeVideo.url}
              currentTime={currentTime}
              duration={activeVideo.duration}
              onSeek={(time: number) => {
                setCurrentTime(time);
              }}
            />
          )}
        </div>

        <div className="lg:col-span-2">
          {activeVideo && (
            <>
              <VideoPreview
                videoUrl={activeVideo.url}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
              />
              <EditingTools
                videoUrl={activeVideo.url}
                currentTime={currentTime}
                duration={activeVideo.duration}
                onSeek={(time: number) => {
                  setCurrentTime(time);
                }}
              />
              <AISuggestions
                videoUrl={activeVideo.url}
                currentTime={currentTime}
                duration={activeVideo.duration}
              />
              <ExportControls
                videoUrl={activeVideo.url}
              />
            </>
          )}
          {!activeVideo && videos.length > 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                Select a video to begin editing
              </p>
            </div>
          )}
          {!activeVideo && videos.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                Upload videos to begin editing
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}