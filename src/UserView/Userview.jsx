import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { therapists } from "../Data/Data"; // List of therapist data
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { HiCalendarDateRange } from "react-icons/hi2";
import { FaStar } from "react-icons/fa"; // For star icons

const Userview = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  // Find the therapist with the matching ID
  const selectedTherapist = therapists.find(
    (therapist) => therapist.id.toString() === id
  );

  // If therapist is not found
  if (!selectedTherapist) {
    return <div className="p-10 text-center">Therapist not found</div>;
  }

  // Navigate to the detailed profile
  const goToProfile = () => {
    navigate(`/userprofile/${selectedTherapist.id}`);
  };

  // Submit rating
  const submitRating = () => {
    alert(`You rated ${selectedTherapist.name} ${selectedRating} stars!`);
    setShowRatingModal(false);
  };

  return (
    <div className="bg-[#d1dbe7] min-h-screen px-4 py-8 flex flex-col items-center mt-[5rem]">
      {/* Profile Info */}
      <div
        onClick={goToProfile}
        className="bg-white rounded-xl shadow-md p-6 mb-8 w-full max-w-4xl cursor-pointer"
      >
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <img
            src={selectedTherapist.imageUrl}
            alt={selectedTherapist.name}
            className="w-32 h-32 lg:w-60 lg:h-60 rounded-full object-cover"
          />
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold">{selectedTherapist.name}</h2>
            <p className="text-sm text-gray-500">Member since January 2020</p>
            <p className="font-semibold mt-2">Mental Health Consultant</p>
            <p className="text-gray-700 mt-2">
              {selectedTherapist.description}
            </p>
          </div>
        </div>
        {/* Rate Button */}
        <div className="flex justify-center lg:justify-end mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering goToProfile
              setShowRatingModal(true);
            }}
            className="bg-yellow-400 text-black px-4 py-2 rounded-full shadow hover:bg-yellow-500 transition"
          >
            Rate Therapist
          </button>
        </div>
      </div>

      {/* Ratings Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 w-full max-w-4xl">
        <h3 className="text-xl font-semibold mb-4">Ratings</h3>
        <div className="space-y-4">
          <div>
            <p className="text-yellow-500 text-lg">★★★★☆</p>
            <p className="text-gray-700">
              "Helped me manage my anxiety!" - Client
            </p>
          </div>
          <div>
            <p className="text-yellow-500 text-lg">★★★☆☆</p>
            <p className="text-gray-700">
              "Very understanding and kind." - Client
            </p>
          </div>
        </div>
      </div>

      {/* Availability Section */}
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-4xl">
        <h3 className="text-xl font-semibold mb-4">Availability & Contact</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <HiCalendarDateRange className="bg-yellow-400 rounded-full h-10 w-10 p-1" />
            <p>
              <strong>Sessions:</strong> Sun, Tue, Thu (8:00 AM - 4:00 PM)
            </p>
          </div>
          <div className="flex items-start gap-3">
            <IoLocationOutline className="bg-yellow-400 rounded-full h-10 w-10 p-1" />
            <p>
              <strong>Location:</strong> Kathmandu
            </p>
          </div>
          <div className="flex items-start gap-3">
            <IoCallOutline className="bg-yellow-400 rounded-full h-10 w-10 p-1" />
            <p>
              <strong>Phone:</strong> 980754858
            </p>
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md text-center">
            <h3 className="text-xl font-semibold mb-4">
              Rate {selectedTherapist.name}
            </h3>
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={30}
                  className={`cursor-pointer ${
                    star <= selectedRating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setSelectedRating(star)}
                />
              ))}
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={submitRating}
                className="bg-yellow-400 text-white px-4 py-2 rounded-full shadow hover:bg-yellow-500 transition"
              >
                Submit
              </button>
              <button
                onClick={() => setShowRatingModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full shadow hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Userview;
