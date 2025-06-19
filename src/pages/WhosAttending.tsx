
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import OptimizedBackground from "../components/OptimizedBackground";
import { getRsvps, RsvpData } from "../services/rsvpService";
import { useToast } from "../hooks/use-toast";

const WhosAttending = () => {
  const [attendees, setAttendees] = useState<RsvpData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const rsvpData = await getRsvps();
        setAttendees(rsvpData);
      } catch (error) {
        console.error('Error fetching RSVPs:', error);
        toast({
          title: "Error",
          description: "Failed to load guest list. Please try again.",
          variant: "destructive",
        });
        // Fallback to mock data if Firebase fails
        const mockAttendees = [
          { guestName: "Sarah Johnson", plusOnes: 1, submittedAt: { seconds: Date.now() / 1000 } as any, submittedFrom: "web" },
          { guestName: "Michael Chen", plusOnes: 0, submittedAt: { seconds: Date.now() / 1000 } as any, submittedFrom: "web" },
          { guestName: "Emma Williams", plusOnes: 2, submittedAt: { seconds: Date.now() / 1000 } as any, submittedFrom: "web" },
        ];
        setAttendees(mockAttendees);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendees();
  }, [toast]);

  const totalGuests = attendees.reduce((total, attendee) => total + 1 + attendee.plusOnes, 0);

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
        src="https://img.freepik.com/premium-photo/group-happy-wedding-guests-celebrating-together_1048944-29751654.jpg"
        className="min-h-[40vh] lg:min-h-[50vh]"
        overlay={true}
        overlayOpacity={0.7}
        priority={true}
      >
        <div className="flex flex-col items-center justify-center min-h-[40vh] lg:min-h-[50vh] w-full">
          <div className="text-center text-white max-w-4xl px-4">
            <h2 className="font-cinzel text-4xl md:text-6xl lg:text-7xl font-medium mb-6 tracking-widest">
              WHO'S ATTENDING?
            </h2>
            <p className="font-sans text-base md:text-xl tracking-wider leading-relaxed">
              SEE WHO ELSE WILL BE CELEBRATING WITH US
            </p>
          </div>
        </div>
      </OptimizedBackground>

      {/* Content Section */}
      <div className="py-16 lg:py-24 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4">
                <Users size={48} strokeWidth={1} />
              </div>
              <CardTitle className="font-cinzel text-3xl md:text-4xl font-bold uppercase tracking-wide">
                Our Wedding Guests
              </CardTitle>
              <p className="font-sans text-lg text-gray-600 mt-4">
                See who else will be celebrating with us on our special day
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Stats */}
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <h3 className="font-cinzel text-2xl font-bold mb-2">
                  {loading ? "..." : totalGuests} Guests Attending
                </h3>
                <p className="font-sans text-gray-600">
                  {loading ? "..." : attendees.length} Confirmed RSVPs
                </p>
              </div>

              {/* Attendees List */}
              {loading ? (
                <div className="space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-24"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {attendees.map((attendee, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                    >
                      <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                        <User size={24} strokeWidth={1} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-cinzel text-lg font-semibold">{attendee.guestName}</h4>
                        <p className="font-sans text-sm text-gray-600">
                          {attendee.plusOnes > 0 
                            ? `+ ${attendee.plusOnes} guest${attendee.plusOnes !== 1 ? 's' : ''}`
                            : "Solo guest"
                          }
                        </p>
                        {attendee.message && (
                          <p className="font-sans text-xs text-gray-500 mt-1 italic">
                            "{attendee.message}"
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* RSVP Reminder */}
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <p className="font-sans text-lg mb-4">
                  Haven't RSVP'd yet?
                </p>
                <Link to="/rsvp">
                  <button className="font-sans text-lg uppercase tracking-wider bg-black text-white px-8 py-4 hover:bg-white hover:text-black border border-black transition-colors">
                    RSVP Now
                  </button>
                </Link>
              </div>
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

export default WhosAttending;
