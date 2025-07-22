import React, { useEffect, useState } from "react";
import { http } from "../config/Axios"; // Custom Axios instance
import { CiSearch } from "react-icons/ci"; // Search icon
import { therapists } from "../Data/Data"; // Dummy therapist data
import { useNavigate } from "react-router-dom"; // For navigation

export const Therapist = () => {
  // State for search input
  const [value, setValue] = useState("");
  // Debounced value after delay
  const [debouncedValue, setDebouncedValue] = useState("");
  const navigate = useNavigate();

  // When user types in search, update `value`
  const handleChange = (e) => setValue(e.target.value);

  // If a tag is clicked, set that as the input
  const handleTagClick = (tag) => setValue(tag);

  // Navigate to user view page
  const handleView = (id) => navigate(`/userview/${id}`);

  // Add a delay of 3 seconds before updating debounced value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 3000);

    // Cleanup timeout if input changes before 3 seconds
    return () => clearTimeout(timer);
  }, [value]);

  // Make API call when debounced value changes
  useEffect(() => {
    if (debouncedValue) {
      sendApi(debouncedValue);
    }
  }, [debouncedValue]);

  // API request to fetch user data
  const sendApi = async (searchTerm) => {
    try {
      const response = await http.get("/user/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-[#bcccdc] px-4 py-8 lg:px-16">
      {/* Title */}
      <h1 className="text-2xl mt-30 text-center lg:text-white lg:text-5xl">
        Connect with a Therapist
      </h1>

      {/* Search Input */}
      <div className="relative mt-8 w-full max-w-xl">
        <input
          value={value}
          onChange={handleChange}
          placeholder="Search"
          className="w-full bg-gray-100 border-2 border-gray-800 rounded-full pl-10 pr-4 py-2 lg:h-12"
        />
        <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xl" />
      </div>

      {/* Quick Tag Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        {["Anxiety", "Depression", "Lonliness", "Grief", "PTSD"].map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className="bg-[#f6ca56] rounded-[10px] text-black px-4 py-2 hover:bg-amber-300 hover:shadow-lg transition"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Therapists List */}
      <div className="bg-white rounded-[20px] w-full max-w-7xl mt-12 p-6 md:p-8">
        <h2 className="text-2xl font-semibold mb-2">Top Therapists</h2>
        <p className="text-sm text-gray-600 mb-6 hidden md:block">
          You don’t have to go through it alone—connect with a professional
          today.
        </p>

        {/* Therapist Cards */}
        <div className="space-y-6">
          {therapists.map((therapist) => (
            <div
              key={therapist.id}
              className="flex flex-col md:flex-row items-center md:items-start md:justify-between bg-white shadow-md rounded-xl p-4"
            >
              {/* Therapist Info */}
              <div className="flex items-center gap-4">
                <img
                  src={therapist.imageUrl}
                  alt={therapist.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{therapist.name}</h3>
                  <p className="text-gray-600 max-w-md">
                    {therapist.description}
                  </p>
                </div>
              </div>

              {/* Connect Button */}
              <button
                onClick={() => handleView(therapist.id)}
                className="bg-[#f6ca56] mt-4 md:mt-0 h-10 rounded-[10px] text-black px-5 py-2 hover:bg-amber-300 hover:shadow-lg transition"
              >
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Therapist;
