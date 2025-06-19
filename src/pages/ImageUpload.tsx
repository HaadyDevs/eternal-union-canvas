
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Upload, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import OptimizedBackground from "../components/OptimizedBackground";
import { useToast } from "../hooks/use-toast";

// Google Drive API configuration
const GOOGLE_DRIVE_API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const FOLDER_NAME = "guestimgs";

const ImageUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isGoogleApiLoaded, setIsGoogleApiLoaded] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load Google API
  useEffect(() => {
    const loadGoogleApi = () => {
      if (window.gapi) {
        window.gapi.load('auth2,client', initializeGapi);
      } else {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = () => {
          window.gapi.load('auth2,client', initializeGapi);
        };
        document.body.appendChild(script);
      }
    };

    const initializeGapi = async () => {
      try {
        await window.gapi.client.init({
          apiKey: GOOGLE_DRIVE_API_KEY,
          clientId: GOOGLE_CLIENT_ID,
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
          scope: 'https://www.googleapis.com/auth/drive.file'
        });
        setIsGoogleApiLoaded(true);
      } catch (error) {
        console.error('Error initializing Google API:', error);
        toast({
          title: "API Error",
          description: "Failed to initialize Google Drive API",
          variant: "destructive",
        });
      }
    };

    if (GOOGLE_DRIVE_API_KEY && GOOGLE_CLIENT_ID) {
      loadGoogleApi();
    } else {
      toast({
        title: "Configuration Error",
        description: "Google Drive API keys are not configured",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const createFolder = async () => {
    try {
      const response = await window.gapi.client.drive.files.create({
        resource: {
          name: FOLDER_NAME,
          mimeType: 'application/vnd.google-apps.folder'
        }
      });
      return response.result.id;
    } catch (error) {
      console.error('Error creating folder:', error);
      throw error;
    }
  };

  const findFolder = async () => {
    try {
      const response = await window.gapi.client.drive.files.list({
        q: `name='${FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder'`,
        fields: 'files(id, name)'
      });
      
      if (response.result.files && response.result.files.length > 0) {
        return response.result.files[0].id;
      }
      
      return await createFolder();
    } catch (error) {
      console.error('Error finding folder:', error);
      throw error;
    }
  };

  const uploadFileToGoogleDrive = async (file: File, folderId: string) => {
    const metadata = {
      name: `${Date.now()}_${file.name}`,
      parents: [folderId]
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
    form.append('file', file);

    try {
      const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: new Headers({
          'Authorization': `Bearer ${window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token}`
        }),
        body: form
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    
    if (!isGoogleApiLoaded) {
      toast({
        title: "API Not Ready",
        description: "Google Drive API is not loaded yet. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Check if user is signed in
      const authInstance = window.gapi.auth2.getAuthInstance();
      if (!authInstance.isSignedIn.get()) {
        await authInstance.signIn();
      }

      const folderId = await findFolder();
      console.log('Uploading to folder:', folderId);

      for (const file of selectedFiles) {
        await uploadFileToGoogleDrive(file, folderId);
      }

      toast({
        title: "Upload Successful!",
        description: `${selectedFiles.length} image${selectedFiles.length !== 1 ? 's' : ''} uploaded successfully`,
      });

      setSelectedFiles([]);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
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
              <div className="mx-auto mb-4 p-4">
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
                disabled={selectedFiles.length === 0 || uploading || !isGoogleApiLoaded}
                className="w-full font-sans text-lg uppercase tracking-wider bg-black text-white px-8 py-4 hover:bg-white hover:text-black border border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? "Uploading..." : `Upload ${selectedFiles.length} Photo${selectedFiles.length !== 1 ? 's' : ''}`}
              </button>

              {!isGoogleApiLoaded && (
                <p className="text-sm text-gray-500 text-center">
                  Loading Google Drive API...
                </p>
              )}
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
