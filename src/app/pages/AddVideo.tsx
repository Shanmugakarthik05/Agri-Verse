import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { ArrowLeft, Upload, Youtube, Link as LinkIcon, CheckCircle } from "lucide-react";
import { Badge } from "../components/ui/badge";

export function AddVideo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    category: "",
    tags: "",
  });
  const [urlType, setUrlType] = useState<"youtube" | "other">("youtube");
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    "Hardware Setup",
    "IoT Device Installation",
    "Irrigation System",
    "Nutrient Management",
    "Sensor Calibration",
    "Disease Detection",
    "Crop Management",
    "Farm Best Practices",
    "Troubleshooting",
    "Software Tutorial",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate YouTube URL if selected
    if (urlType === "youtube" && !isValidYouTubeUrl(formData.videoUrl)) {
      alert("Please enter a valid YouTube URL");
      return;
    }

    // In a real app, this would send to backend
    console.log("Submitting video:", formData);
    
    // Store in localStorage for demo
    const existingVideos = JSON.parse(localStorage.getItem("userVideos") || "[]");
    const newVideo = {
      id: Date.now().toString(),
      ...formData,
      uploadedBy: "Current User", // Would be actual user name
      uploadedAt: new Date().toISOString(),
      views: 0,
      likes: 0,
    };
    localStorage.setItem("userVideos", JSON.stringify([...existingVideos, newVideo]));
    
    setSubmitted(true);
    setTimeout(() => {
      navigate("/app/manual");
    }, 2000);
  };

  const isValidYouTubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url);
  };

  const extractYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 lg:p-8">
        <div className="max-w-2xl mx-auto flex items-center justify-center min-h-[60vh]">
          <Card className="border-green-200 shadow-xl text-center">
            <CardContent className="p-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-green-800 mb-3">Video Uploaded Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Your tutorial has been added to the community library. Redirecting you back...
              </p>
              <Button onClick={() => navigate("/app/manual")} className="bg-green-600 hover:bg-green-700 text-white">
                Go to User Manual
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="mb-4 text-green-700 hover:text-green-800 hover:bg-green-100"
            onClick={() => navigate("/app/manual")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to User Manual
          </Button>
          <h1 className="text-3xl font-bold text-green-800 mb-2">Upload Tutorial Video</h1>
          <p className="text-gray-600">Share your farming knowledge with the AgriVerse community</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="border-green-200 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Upload className="w-5 h-5" />
                  Video Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Video URL Type */}
                  <div className="space-y-2">
                    <Label>Video Source</Label>
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant={urlType === "youtube" ? "default" : "outline"}
                        className={urlType === "youtube" ? "bg-red-600 hover:bg-red-700" : ""}
                        onClick={() => setUrlType("youtube")}
                      >
                        <Youtube className="w-4 h-4 mr-2" />
                        YouTube
                      </Button>
                      <Button
                        type="button"
                        variant={urlType === "other" ? "default" : "outline"}
                        className={urlType === "other" ? "bg-blue-600 hover:bg-blue-700" : ""}
                        onClick={() => setUrlType("other")}
                      >
                        <LinkIcon className="w-4 h-4 mr-2" />
                        Other URL
                      </Button>
                    </div>
                  </div>

                  {/* Video URL */}
                  <div className="space-y-2">
                    <Label htmlFor="videoUrl">
                      Video URL <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="videoUrl"
                      type="url"
                      placeholder={
                        urlType === "youtube"
                          ? "https://www.youtube.com/watch?v=..."
                          : "https://vimeo.com/... or any video URL"
                      }
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      required
                      className="border-green-300"
                    />
                    {urlType === "youtube" && (
                      <p className="text-xs text-gray-500">
                        Paste the full YouTube video URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)
                      </p>
                    )}
                  </div>

                  {/* Video Preview */}
                  {formData.videoUrl && urlType === "youtube" && isValidYouTubeUrl(formData.videoUrl) && (
                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                      <iframe
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${extractYouTubeId(formData.videoUrl)}`}
                        title="Video preview"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}

                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Video Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="e.g., How to Install NPK Sensor in Field"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="border-green-300"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Description <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what viewers will learn from this video..."
                      rows={5}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      className="border-green-300"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger className="border-green-300">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (Optional)</Label>
                    <Input
                      id="tags"
                      type="text"
                      placeholder="e.g., sensor, installation, beginner (comma-separated)"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="border-green-300"
                    />
                    <p className="text-xs text-gray-500">Separate tags with commas to help others find your video</p>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Video
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Guidelines Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-green-200 shadow-md sticky top-4">
              <CardHeader>
                <CardTitle className="text-green-800 text-lg">Upload Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">✅ Good Videos</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Clear audio and video quality</li>
                    <li>• Step-by-step instructions</li>
                    <li>• Relevant to farming/IoT</li>
                    <li>• Family-friendly content</li>
                    <li>• Original or properly credited</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">❌ Avoid</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Copyrighted material</li>
                    <li>• Promotional spam</li>
                    <li>• Misleading information</li>
                    <li>• Off-topic content</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-800">
                    <strong>Pro Tip:</strong> Videos under 10 minutes with clear demonstrations get the most engagement!
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-xs text-green-800">
                    <strong>Popular Topics:</strong>
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {["Sensor Setup", "Irrigation", "Calibration", "Troubleshooting"].map((tag) => (
                      <Badge key={tag} className="bg-green-200 text-green-800 text-xs border-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}