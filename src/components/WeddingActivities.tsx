
import React from "react";
import { Link } from "react-router-dom";
import { Camera, Music, Users } from "lucide-react";
import OptimizedBackground from "./OptimizedBackground";

const WeddingActivities = () => {
  const activities = [
    {
      id: 1,
      title: "Image Upload",
      description: "Share your special moments from our wedding day",
      icon: Camera,
      link: "/image-upload",
      buttonText: "Upload Photos"
    },
    {
      id: 2,
      title: "Playlist Selection",
      description: "Help us choose the perfect songs for our celebration",
      icon: Music,
      link: "/playlist",
      buttonText: "Select Songs"
    },
    {
      id: 3,
      title: "Who's Attending?",
      description: "See who else will be celebrating with us",
      icon: Users,
      link: "/whos-attending",
      buttonText: "View Guests"
    }
  ];

  return (
    <OptimizedBackground
      src="https://img.freepik.com/premium-photo/wedding-ceremony-setup-with-white-chairs-floral-arrangements_1048944-29751651.jpg"
      className="py-24 md:py-32"
      overlay={true}
      overlayOpacity={0.7}
    >
      <section id="activities" className="w-full max-w-[2000px] mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-center font-cinzel text-[55px] md:text-[6vw] font-bold uppercase tracking-wide text-white mb-16 md:mb-24">
          Wedding Activities
        </h2>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
          {activities.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <div
                key={activity.id}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon */}
                <div className="mb-6 p-6 group-hover:bg-white group-hover:text-black transition-colors">
                  <IconComponent size={48} strokeWidth={1} className="text-white group-hover:text-black" />
                </div>

                {/* Title */}
                <h3 className="font-cinzel text-2xl md:text-3xl font-bold uppercase tracking-wide text-white mb-4">
                  {activity.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-sm md:text-lg uppercase tracking-wider text-white mb-8 max-w-xs">
                  {activity.description}
                </p>

                {/* Button */}
                <Link to={activity.link}>
                  <button className="font-sans text-sm md:text-lg uppercase tracking-wider bg-white text-black px-8 py-4 md:px-12 md:py-5 hover:bg-black hover:text-white border border-white transition-colors">
                    {activity.buttonText}
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </OptimizedBackground>
  );
};

export default WeddingActivities;
