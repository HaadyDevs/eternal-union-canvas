
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const WhosAttending = () => {
  const [attendees, setAttendees] = useState<Array<{ name: string; plusOnes: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch actual attendees from Firebase
    // Mock data for now
    const mockAttendees = [
      { name: "Sarah Johnson", plusOnes: 1 },
      { name: "Michael Chen", plusOnes: 0 },
      { name: "Emma Williams", plusOnes: 2 },
      { name: "David Rodriguez", plusOnes: 1 },
      { name: "Lisa Thompson", plusOnes: 0 },
      { name: "James Wilson", plusOnes: 1 },
      { name: "Anna Martinez", plusOnes: 3 },
      { name: "Robert Brown", plusOnes: 0 },
    ];

    setTimeout(() => {
      setAttendees(mockAttendees);
      setLoading(false);
    }, 1000);
  }, []);

  const totalGuests = attendees.reduce((total, attendee) => total + 1 + attendee.plusOnes, 0);

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
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 border border-black">
                <Users size={48} strokeWidth={1} />
              </div>
              <CardTitle className="font-cinzel text-3xl md:text-4xl font-bold uppercase tracking-wide">
                Who's Attending?
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
                        <h4 className="font-cinzel text-lg font-semibold">{attendee.name}</h4>
                        <p className="font-sans text-sm text-gray-600">
                          {attendee.plusOnes > 0 
                            ? `+ ${attendee.plusOnes} guest${attendee.plusOnes !== 1 ? 's' : ''}`
                            : "Solo guest"
                          }
                        </p>
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
    </div>
  );
};

export default WhosAttending;
