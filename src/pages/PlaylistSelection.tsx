
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Music, Plus, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import OptimizedBackground from "../components/OptimizedBackground";

const PlaylistSelection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const navigate = useNavigate();

  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock song data
  const mockSongs = [
    { id: "1", title: "Perfect", artist: "Ed Sheeran", duration: "4:23" },
    { id: "2", title: "All of Me", artist: "John Legend", duration: "4:29" },
    { id: "3", title: "Thinking Out Loud", artist: "Ed Sheeran", duration: "4:41" },
    { id: "4", title: "A Thousand Years", artist: "Christina Perri", duration: "4:45" },
    { id: "5", title: "Can't Help Myself", artist: "Four Tops", duration: "2:52" },
    { id: "6", title: "September", artist: "Earth, Wind & Fire", duration: "3:35" },
    { id: "7", title: "I Want It That Way", artist: "Backstreet Boys", duration: "3:33" },
    { id: "8", title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", duration: "4:30" },
  ];

  const filteredSongs = mockSongs.filter(
    song =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSong = (songId: string) => {
    setSelectedSongs(prev =>
      prev.includes(songId)
        ? prev.filter(id => id !== songId)
        : [...prev, songId]
    );
  };

  const handleSubmit = () => {
    if (selectedSongs.length === 0) return;
    // TODO: Submit selected songs
    alert(`Selected ${selectedSongs.length} songs for the playlist!`);
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* Navigation Header */}
      <nav className="w-full py-6 lg:pt-12 px-4 flex justify-between items-center sm:px-8 relative z-50 bg-white">
        <button
          onClick={() => navigate(-1)}
          className="text-black hover:text-gray-600 transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className="flex-1 flex justify-center items-center">
          <h1 className="font-cinzel text-3xl md:text-5xl font-bold tracking-wide">
            Haady & Nizra
          </h1>
        </div>
        <div className="w-8"></div>
      </nav>

      {/* Hero Section with Background */}
      <OptimizedBackground
        src="https://img.freepik.com/premium-photo/dj-mixing-music-wedding-party-celebration_1048944-29751653.jpg"
        className="min-h-[40vh] lg:min-h-[50vh]"
        overlay={true}
        overlayOpacity={0.7}
        priority={true}
      >
        <div className="flex flex-col items-center justify-center min-h-[40vh] lg:min-h-[50vh] w-full">
          <div className="text-center text-white max-w-4xl px-4">
            <h2 className="font-cinzel text-4xl md:text-6xl lg:text-7xl font-medium mb-6 tracking-widest">
              CHOOSE OUR PLAYLIST
            </h2>
            <p className="font-sans text-base md:text-xl tracking-wider leading-relaxed">
              HELP US SELECT THE PERFECT SONGS FOR OUR CELEBRATION
            </p>
          </div>
        </div>
      </OptimizedBackground>

      {/* Form Section */}
      <div className="py-16 lg:py-24 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 border border-black">
                <Music size={48} strokeWidth={1} />
              </div>
              <CardTitle className="font-cinzel text-3xl md:text-4xl font-bold uppercase tracking-wide">
                Help Choose Our Playlist
              </CardTitle>
              <p className="font-sans text-lg text-gray-600 mt-4">
                Select songs you'd love to hear at our wedding celebration
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for songs or artists..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-sans"
                />
              </div>

              {/* Selected Count */}
              {selectedSongs.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-cinzel text-lg">
                    Selected: {selectedSongs.length} song{selectedSongs.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}

              {/* Song List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredSongs.map((song) => {
                  const isSelected = selectedSongs.includes(song.id);
                  return (
                    <div
                      key={song.id}
                      onClick={() => toggleSong(song.id)}
                      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? "border-black bg-black text-white"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex-1">
                        <h4 className="font-cinzel text-lg font-semibold">{song.title}</h4>
                        <p className={`font-sans text-sm ${isSelected ? "text-gray-200" : "text-gray-600"}`}>
                          {song.artist} • {song.duration}
                        </p>
                      </div>
                      <div className="ml-4">
                        {isSelected ? (
                          <Check size={24} />
                        ) : (
                          <Plus size={24} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={selectedSongs.length === 0}
                className="w-full font-sans text-lg uppercase tracking-wider bg-black text-white px-8 py-4 hover:bg-white hover:text-black border border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Playlist Selections
              </button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Wedding Date Reminder */}
      <div className="bg-gray-50 py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="font-cinzel text-5xl md:text-3xl font-medium mb-4 tracking-widest">
            13•07•2025
          </p>
          <p className="font-sans text-lg tracking-wider text-gray-600">
            Save the date and join us for a day of love and celebration
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaylistSelection;
