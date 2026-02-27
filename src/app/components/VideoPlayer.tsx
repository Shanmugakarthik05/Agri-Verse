import { X } from "lucide-react";
import { Button } from "./ui/button";

interface VideoPlayerProps {
  video: {
    id: string;
    title: string;
    uploadType?: string;
    videoUrl: string;
    description?: string;
    uploadedBy?: string;
    category?: string;
  };
  onClose: () => void;
}

export function VideoPlayer({ video, onClose }: VideoPlayerProps) {
  const extractYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const isYouTubeUrl = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-green-600">
          <h2 className="text-xl font-bold text-white truncate pr-4">{video.title}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-green-700 hover:text-white shrink-0"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-black">
          {video.uploadType === "youtube" || isYouTubeUrl(video.videoUrl) ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${extractYouTubeId(video.videoUrl)}?autoplay=1`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0"
            />
          ) : (
            <video
              width="100%"
              height="100%"
              src={video.videoUrl}
              controls
              autoPlay
              className="absolute inset-0"
            />
          )}
        </div>

        {/* Video Info */}
        <div className="p-6 space-y-4 max-h-64 overflow-y-auto">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full">
                {video.category || "Tutorial"}
              </span>
              <span className="text-sm text-gray-600">By {video.uploadedBy || "AgriVerse Team"}</span>
            </div>
          </div>

          {video.description && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 text-sm whitespace-pre-wrap">{video.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
