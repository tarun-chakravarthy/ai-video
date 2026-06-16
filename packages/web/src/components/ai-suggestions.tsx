import { Sparkles, Type, List, CircleDollarSign, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

export function AISuggestions({
  videoUrl,
  currentTime,
  duration
}: {
  videoUrl?: string | null;
  currentTime: number;
  duration: number;
}) {
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [estimatedLength, setEstimatedLength] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate suggestions when video loads
  useEffect(() => {
    if (videoUrl && duration > 0) {
      generateSuggestions();
    }
  }, [videoUrl, duration]);

  const generateSuggestions = () => {
    setIsGenerating(true);

    // Simulate AI processing delay
    setTimeout(() => {
      // Extract filename from URL (mock)
      const filename = videoUrl?.split('/').pop() || "video.mp4";
      const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");

      // Generate title suggestions based on filename
      const titles = [
        `${nameWithoutExt} - Epic Moment`,
        `Amazing ${nameWithoutExt} Highlights`,
        `${nameWithoutExt}: The Full Experience`,
        `Exploring ${nameWithoutExt}`,
        `${nameWithoutExt} - Behind the Scenes`
      ];

      // Generate description
      const descriptions = [
        `Experience the incredible moments captured in ${nameWithoutExt}. This video showcases the best highlights and key moments from the footage.`,
        `Join us as we explore the fascinating content of ${nameWithoutExt}, featuring stunning visuals and engaging storytelling.`,
        `Discover the excitement of ${nameWithoutExt} in this professionally edited video that captures all the key highlights.`,
        `An incredible journey through ${nameWithoutExt}, showcasing the most memorable moments and breathtaking scenes.`,
        `From start to finish, ${nameWithoutExt} delivers an unforgettable viewing experience that will leave you inspired.`
      ];

      // Generate hashtags
      const allHashtags = [
        "#VideoEditing", "#ContentCreation", "#Filmmaking", "#Videography",
        "#CreativeProcess", "#Storytelling", "#VisualArts", "#MediaProduction",
        "#Cinematography", "#PostProduction", "#VideoStory", "#EditLife",
        "#FilmCommunity", "#CreatorLife", "#VideoProduction"
      ];

      // Select random hashtags
      const shuffled = [...allHashtags].sort(() => 0.5 - Math.random());
      const selectedHashtags = shuffled.slice(0, 8);

      // Estimate ideal length (shorter for social media, longer for cinematic)
      const idealLength = Math.min(Math.max(duration * 0.3, 15), 120); // Between 15s and 2min

      setTitleSuggestions(titles);
      setDescription(descriptions[Math.floor(Math.random() * descriptions.length)]);
      setHashtags(selectedHashtags);
      setEstimatedLength(idealLength);
      setIsGenerating(false);
    }, 1500);
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
          AI Suggestions
        </h3>
        <button
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          onClick={generateSuggestions}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <svg className="h-4 w-4 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <RefreshCw className="h-3 w-3 mr-1" />
              Regenerate
            </>
          )}
        </button>
      </div>

      {videoUrl && duration > 0 ? (
        <>
          {/* Title Suggestions */}
          {titleSuggestions.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Sparkles className="h-4 w-4 mt-1 text-blue-500 dark:text-blue-400" />
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-100">Title Suggestions</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Based on video content analysis
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                {titleSuggestions.map((title, index) => (
                  <div key={index} className="flex items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <input
                      type="radio"
                      name="title"
                      className="h-3 w-3 text-blue-500 dark:text-blue-400"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-200">
                      "{title}"
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description Suggestions */}
          {description && (
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Type className="h-4 w-4 mt-1 text-green-500 dark:text-green-400" />
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-100">Description</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Auto-generated for SEO
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Hashtags */}
          {hashtags.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <List className="h-4 w-4 mt-1 text-purple-500 dark:text-purple-400" />
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-100">Hashtags</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Copy and paste for social media
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {hashtags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-800 dark:text-gray-200 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Estimated Length */}
          {estimatedLength > 0 && (
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <CircleDollarSign className="h-4 w-4 mt-1 text-orange-500 dark:text-orange-400" />
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-100">Estimated Length</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ideal duration for engagement
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  {estimatedLength}s
                </span>
                <div className="flex-1 h-0.5 bg-gray-200 dark:bg-gray-600 rounded-full">
                  <div className="h-full bg-orange-500 dark:bg-orange-400" style={{ width: `${Math.min(estimatedLength / 120 * 100, 100)}%` }}></div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  2min max
                </span>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Empty state */}
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              Upload a video to get AI-powered suggestions
            </p>
          </div>
        </>
      )}
    </div>
  );
}