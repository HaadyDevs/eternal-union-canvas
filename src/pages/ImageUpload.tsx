
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Upload, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const ImageUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="w-full pt-8 pb-4 lg:pt-12 lg:pb-6 px-4 sm:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-70 transition-opacity">
            <ArrowLeft size={24} />
            <span className="font-cinzel text-lg">Back to Wedding</span>
          </Link>
          <h1 className="font-cinzel text-3xl md:text-5xl font-bold tracking-wide">
            Haady & Nizra
          </h1>
          <div className="w-24"></div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 border border-black">
                <Camera size={48} strokeWidth={1} />
              </div>
              <CardTitle className="font-cinzel text-3xl md:text-4xl font-bold uppercase tracking-wide">
                Share Your Photos
              </CardTitle>
              <p className="font-sans text-lg text-gray-600 mt-4">
                Help us capture every moment of our special day by sharing your photos
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
    </div>
  );
};

export default ImageUpload;
