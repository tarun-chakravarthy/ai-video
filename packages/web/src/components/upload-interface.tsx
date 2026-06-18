import { UploadIcon } from "lucide-react";

interface UploadInterfaceProps {
  onFileUpload: (files: File[]) => Promise<void>;
  isUploading?: boolean;
  uploadProgress?: number;
}

export function UploadInterface({ onFileUpload, isUploading = false, uploadProgress = 0 }: UploadInterfaceProps) {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // Filter to video files only
    const videoFiles = files.filter(file => file.type.startsWith('video/'));
    if (videoFiles.length > 0) {
      // Limit to 5 files maximum
      const limitedFiles = videoFiles.slice(0, 5);
      await onFileUpload(limitedFiles);
      // Reset input
      e.target.value = '';
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files || []);
    // Filter to video files only
    const videoFiles = files.filter(file => file.type.startsWith('video/'));
    if (videoFiles.length > 0) {
      // Limit to 5 files maximum
      const limitedFiles = videoFiles.slice(0, 5);
      await onFileUpload(limitedFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 p-6 sm:p-8">
      <div className="text-center">
        <UploadIcon className={`
          h-8 w-8 sm:h-10 w-10
          text-gray-400 dark:text-gray-500 mb-4
        `} />
        <h3 className={`
          font-semibold text-gray-800 dark:text-gray-100 mb-2
          text-sm sm:text-lg
        `}>
          Upload Raw Footage (Max 5 videos)
        </h3>
        <p className={`
          text-sm text-gray-500 dark:text-gray-400
        `}>
          Drag & drop videos here or click to browse
          {isUploading ? (
            <span className="ml-2 animate-pulse">Processing...</span>
          ) : (
            <>
              {(uploadProgress > 0 && uploadProgress < 100) && (
                <span className="ml-2"> ({uploadProgress}%)</span>
              )}
              {(uploadProgress === 100) && (
                <span className="ml-2 text-green-500"> (Complete)</span>
              )}
            </>
          )}
        </p>
        <div className="mt-4">
          <input
            type="file"
            accept="video/*"
            multiple
            className="hidden"
            id="file-input"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-input"
            className={`
              w-full inline-flex justify-center px-4 py-2
              bg-blue-600 text-white font-medium rounded-lg text-sm
              sm:text-base
              hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
            `}
          >
            Browse Files
          </label>
        </div>
      </div>

      {/* Upload Progress Bar */}
      {isUploading && uploadProgress > 0 && uploadProgress < 100 && (
        <div className={`
          mt-4 sm:mt-6
        `}>
          <div className="w-full h-2.5 sm:h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 dark:bg-blue-400" style={{ width: `${uploadProgress}%` }}></div>
          </div>
          <p className={`
            text-xs text-gray-500 dark:text-gray-400 text-center mt-1
            sm:text-sm
          `}>
            Uploading...
          </p>
        </div>
      )}

      {/* Drag & Drop Overlay */}
      {isUploading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="text-center text-white">
            <div className="animate-spin h-8 w-8 sm:h-10 w-10 mr-3"></div>
            <span>Processing upload...</span>
          </div>
        </div>
      )}
    </div>
  );
}