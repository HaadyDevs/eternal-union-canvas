
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Upload, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import OptimizedBackground from "../components/OptimizedBackground";

const ImageUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    
    setUploading(true);
    // TODO: Implement actual upload logic
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate upload
    setUploading(false);
    setSelectedFiles([]);
    alert("Images uploaded successfully!");
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
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
        src="https://img.freepik.com/premium-photo/camera-with-wedding-rings-flowers-table_1048944-29751652.jpg"
        className="min-h-[40vh] lg:min-h-[50vh]"
        overlay={true}
        overlayOpacity={0.7}
        priority={true}
      >
        <div className="flex flex-col items-center justify-center min-h-[40vh] lg:min-h-[50vh] w-full">
          <div className="text-center text-white max-w-4xl px-4">
            <h2 className="font-cinzel text-4xl md:text-6xl lg:text-7xl font-medium mb-6 tracking-widest">
              SHARE YOUR PHOTOS
            </h2>
            <p className="font-sans text-base md:text-xl tracking-wider leading-relaxed">
              HELP US CAPTURE EVERY MOMENT OF OUR SPECIAL DAY
            </p>
          </div>
        </div>
      </OptimizedBackground>

      {/* Form Section */}
      <div className="py-16 lg:py-24 px-4 sm:px-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 border border-black">
                <Camera size={48} strokeWidth={1} />
              </div>
              <CardTitle className="font-cinzel text-3xl md:text-4xl font-bold uppercase tracking-wide">
                Upload Your Images
              </CardTitle>
              <p className="font-sans text-lg text-gray-600 mt-4">
                Share your favorite moments from our wedding celebration
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* File Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="font-sans text-lg mb-2">Click to upload photos</p>
                  <p className="font-sans text-sm text-gray-500">
                    Select multiple images (JPG, PNG, GIF)
                  </p>
                </label>
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-cinzel text-xl font-semibold">Selected Files:</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="font-sans text-sm truncate">{file.name}</span>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 font-sans text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={selectedFiles.length === 0 || uploading}
                className="w-full font-sans text-lg uppercase tracking-wider bg-black text-white px-8 py-4 hover:bg-white hover:text-black border border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? "Uploading..." : `Upload ${selectedFiles.length} Photo${selectedFiles.length !== 1 ? 's' : ''}`}
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

export default ImageUpload;
