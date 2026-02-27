import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { PlayCircle, Search, Clock, BookOpen, Upload, Users, Eye, ThumbsUp, Trash2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const videoCategories = [
  { id: "all", name: "All Videos" },
  { id: "Hardware Setup", name: "Hardware Setup" },
  { id: "IoT Device Installation", name: "IoT Device" },
  { id: "Irrigation System", name: "Irrigation" },
  { id: "Nutrient Management", name: "Nutrients" },
  { id: "Sensor Calibration", name: "Calibration" },
  { id: "Disease Detection", name: "Disease" },
  { id: "Crop Management", name: "Crops" },
  { id: "Farm Best Practices", name: "Best Practices" },
  { id: "Troubleshooting", name: "Troubleshooting" },
  { id: "Software Tutorial", name: "Software" },
];

// Official AgriVerse videos
const officialVideos = [
  {
    id: "official-1",
    title: "Installing Your NPK Soil Sensor - Complete Guide",
    category: "Hardware Setup",
    duration: "12:34",
    thumbnail: "https://images.unsplash.com/photo-1738598665806-7ecc32c3594c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMHNlbnNvciUyMGluc3RhbGxhdGlvbiUyMHR1dG9yaWFsfGVufDF8fHx8MTc3MjIxNDQzNHww&ixlib=rb-4.1.0&q=80&w=1080",
    views: 2400,
    uploadedBy: "AgriVerse Team",
    official: true,
  },
  {
    id: "official-2",
    title: "Setting Up Smart Irrigation System with ESP32",
    category: "IoT Device Installation",
    duration: "15:22",
    thumbnail: "https://images.unsplash.com/photo-1738598665698-7fd7af4b5e0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtaW5nJTIwaXJyaWdhdGlvbiUyMHN5c3RlbSUyMHNldHVwfGVufDF8fHx8MTc3MjIxNDQzOHww&ixlib=rb-4.1.0&q=80&w=1080",
    views: 3100,
    uploadedBy: "AgriVerse Team",
    official: true,
  },
  {
    id: "official-3",
    title: "How to Use the AgriVerse Dashboard",
    category: "Software Tutorial",
    duration: "8:45",
    thumbnail: "https://images.unsplash.com/photo-1744230673231-865d54a0aba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwYWdyaWN1bHR1cmUlMjBhcHAlMjB1c2FnZXxlbnwxfHx8fDE3NzIyMTQ0NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    views: 1800,
    uploadedBy: "AgriVerse Team",
    official: true,
  },
  {
    id: "official-4",
    title: "Understanding NPK Ratios for Different Crops",
    category: "Nutrient Management",
    duration: "18:56",
    thumbnail: "https://images.unsplash.com/photo-1680724525083-5c2c734f9a3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbmhvdXNlJTIwZmFybWluZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyMjE0NDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    views: 4200,
    uploadedBy: "AgriVerse Team",
    official: true,
  },
  {
    id: "official-5",
    title: "Calibrating Your Moisture Sensors",
    category: "Sensor Calibration",
    duration: "10:30",
    thumbnail: "https://images.unsplash.com/photo-1759967448986-29274948919a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXJtaW5nJTIwZXF1aXBtZW50fGVufDF8fHx8MTc3MjIxNDQ1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    views: 1900,
    uploadedBy: "AgriVerse Team",
    official: true,
  },
  {
    id: "official-6",
    title: "Troubleshooting Common Sensor Issues",
    category: "Troubleshooting",
    duration: "14:05",
    thumbnail: "https://images.unsplash.com/photo-1738598665806-7ecc32c3594c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMHNlbnNvciUyMGluc3RhbGxhdGlvbiUyMHR1dG9yaWFsfGVufDF8fHx8MTc3MjIxNDQzNHww&ixlib=rb-4.1.0&q=80&w=1080",
    views: 1500,
    uploadedBy: "AgriVerse Team",
    official: true,
  },
];

export function UserManual() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [communityVideos, setCommunityVideos] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Load community videos from localStorage
    const savedVideos = JSON.parse(localStorage.getItem("userVideos") || "[]");
    setCommunityVideos(savedVideos);
  }, []);

  const deleteVideo = (videoId: string) => {
    const updatedVideos = communityVideos.filter((v) => v.id !== videoId);
    setCommunityVideos(updatedVideos);
    localStorage.setItem("userVideos", JSON.stringify(updatedVideos));
  };

  const allVideos = [...officialVideos, ...communityVideos];

  const getFilteredVideos = (videoList: any[]) => {
    return videoList.filter((video) => {
      const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || video.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const filteredAllVideos = getFilteredVideos(allVideos);
  const filteredOfficialVideos = getFilteredVideos(officialVideos);
  const filteredCommunityVideos = getFilteredVideos(communityVideos);

  const VideoCard = ({ video, showDelete = false }: { video: any; showDelete?: boolean }) => (
    <Card className="cursor-pointer hover:shadow-xl transition-all border-green-200 overflow-hidden group">
      <div className="relative aspect-video overflow-hidden bg-gray-200">
        <ImageWithFallback
          src={video.thumbnail || "https://images.unsplash.com/photo-1680724525083-5c2c734f9a3c?w=400"}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <PlayCircle className="w-16 h-16 text-white" />
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {video.duration}
        </div>
        {video.official && (
          <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
            ✓ Official
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-green-700 transition-colors">
          {video.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <Badge variant="outline" className="border-green-300 text-green-700 text-xs">
            {video.category}
          </Badge>
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{typeof video.views === "number" ? video.views.toLocaleString() : video.views}</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {video.uploadedBy}
          </span>
          {showDelete && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={(e) => {
                e.stopPropagation();
                if (confirm("Delete this video?")) {
                  deleteVideo(video.id);
                }
              }}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">User Manual & Tutorials</h1>
          <p className="text-gray-600">
            Learn from official guides and community experts
          </p>
        </div>
        <Button
          onClick={() => navigate("/app/add-video")}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Tutorial
        </Button>
      </div>

      {/* Search & Filter */}
      <Card className="border-green-200 shadow-md">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-green-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {videoCategories.slice(0, 5).map((category) => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-2 ${
                    selectedCategory === category.id
                      ? "bg-green-600 hover:bg-green-700"
                      : "hover:bg-green-50 border-green-300"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-green-100">
          <TabsTrigger value="all" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            All Videos ({filteredAllVideos.length})
          </TabsTrigger>
          <TabsTrigger value="official" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Official ({filteredOfficialVideos.length})
          </TabsTrigger>
          <TabsTrigger value="community" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Community ({filteredCommunityVideos.length})
          </TabsTrigger>
        </TabsList>

        {/* All Videos */}
        <TabsContent value="all" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAllVideos.map((video) => (
              <VideoCard key={video.id} video={video} showDelete={!video.official} />
            ))}
          </div>
          {filteredAllVideos.length === 0 && (
            <Card className="border-gray-200">
              <CardContent className="p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No videos found</h3>
                <p className="text-gray-600">Try adjusting your search or filter</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Official Videos */}
        <TabsContent value="official" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOfficialVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </TabsContent>

        {/* Community Videos */}
        <TabsContent value="community" className="mt-6">
          {filteredCommunityVideos.length === 0 && !searchQuery ? (
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-12 text-center">
                <Users className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-green-800">Be the First!</h3>
                <p className="text-gray-700 mb-6">
                  Share your farming knowledge and help the AgriVerse community grow
                </p>
                <Button
                  onClick={() => navigate("/app/add-video")}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Your First Tutorial
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunityVideos.map((video) => (
                <VideoCard key={video.id} video={video} showDelete />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Help Section */}
      <Card className="border-green-200 shadow-md bg-gradient-to-br from-green-50 to-emerald-50">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-3">Need More Help?</h3>
          <p className="text-gray-700 mb-4">
            Can't find what you're looking for? Our support team is here to help you get the most out of AgriVerse.
          </p>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-green-600 hover:bg-green-700 px-4 py-2 cursor-pointer">
              📧 Contact Support
            </Badge>
            <Badge variant="outline" className="border-green-300 hover:bg-green-50 px-4 py-2 cursor-pointer">
              💬 Join Community
            </Badge>
            <Badge variant="outline" className="border-green-300 hover:bg-green-50 px-4 py-2 cursor-pointer">
              📖 Documentation
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}