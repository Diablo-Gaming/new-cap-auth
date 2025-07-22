import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { therapists } from "../Data/Data";
import { HiCalendarDateRange } from "react-icons/hi2";
import a from "../assets/a1.png";
import b from "../assets/a2.png";

const Userprofile = () => {
  // React Router hooks
  const { id } = useParams();
  const navigate = useNavigate();

  const gotoCreatePost = () => {
    navigate("/createablogs");
  };
  // Find therapist by ID from data
  const therapist = therapists.find((t) => t.id.toString() === id);

  // State to control editing and rescheduling popups
  const [isEditing, setIsEditing] = useState(false);
  const [isRescheduling, setIsRescheduling] = useState(false);

  // States for editable form fields
  const [name, setName] = useState(therapist?.name || "");
  const [email, setEmail] = useState(therapist?.email || "");
  const [username, setUsername] = useState(therapist?.username || "");
  const [dob, setDob] = useState(therapist?.dob || "");

  // Show error if no therapist found
  if (!therapist) {
    return <div className="text-center mt-20 text-red-600">Therapist not found.</div>;
  }

  // Save changes from form
  const handleSave = () => {
    therapist.name = name;
    therapist.email = email;
    therapist.username = username;
    therapist.dob = dob;
    setIsEditing(false);
  };

  return (
    <div className="bg-[#bcccdc] min-h-screen px-4 py-10 flex flex-col items-center mt-[5rem]">

      {/* === Therapist Profile Section === */}
      <div className="bg-white shadow-md rounded-xl p-6 flex flex-col lg:flex-row items-center w-full max-w-5xl">
        <img
          src={therapist.imageUrl}
          alt={therapist.name}
          className="w-40 h-40 lg:w-60 lg:h-60 rounded-full object-cover mb-4 lg:mb-0 lg:mr-10"
        />
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-bold">{therapist.name}</h2>
          <p className="text-sm text-gray-500">Member since January 2020</p>
          <p className="mt-3 font-semibold">Mental Health Consultant</p>
          <p className="mt-2 text-gray-600">
            At Auditor, we believe mental health support should be accessible, compassionate, and personalized.
          </p>
          <div className="mt-5 space-x-4">
            <button onClick={() => setIsEditing(true)} className="bg-yellow-400 px-4 py-2 rounded-md shadow">Edit Profile</button>
            <button onClick={gotoCreatePost} className="bg-yellow-400 px-4 py-2 rounded-md shadow">Write a Blog</button>
          </div>
        </div>
      </div>

      {/* === Edit Profile Modal === */}
      {isEditing && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Your Profile</h3>

            <label className="block text-sm mb-1">Full Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mb-4 p-2 border rounded" />

            <label className="block text-sm mb-1">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-4 p-2 border rounded" />

            <label className="block text-sm mb-1">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full mb-4 p-2 border rounded" />

            <label className="block text-sm mb-1">Date of Birth</label>
            <input value={dob} onChange={(e) => setDob(e.target.value)} className="w-full mb-4 p-2 border rounded" />

            <div className="flex justify-between mt-6">
              <button onClick={handleSave} className="bg-yellow-400 px-4 py-2 rounded">Save</button>
              <button onClick={() => setIsEditing(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* === Upcoming Session === */}
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-5xl mt-10">
        <h3 className="text-xl font-semibold">Upcoming Sessions</h3>
        <div className="mt-4 flex justify-between items-center bg-gray-100 p-4 rounded-md">
          <div className="flex items-center gap-3">
            <HiCalendarDateRange className="text-xl" />
            <div>
              <p className="font-medium">{therapist.name}</p>
              <p className="text-sm text-gray-600">25th March, 8:00 AM</p>
            </div>
          </div>
          <button onClick={() => setIsRescheduling(true)} className="bg-yellow-400 px-4 py-1 rounded">Reschedule</button>
        </div>
      </div>

      {/* === Reschedule Modal === */}
      {isRescheduling && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 px-2">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl text-center overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Upcoming Sessions
            </h2>
            <div className="space-y-4">
              {[
                { name: "Anusha Shrestha", defaultDate: "2025-03-25T08:00" },
                { name: "Bhabana Dangi", defaultDate: "2025-04-01T10:00" },
                { name: "Dipshan Pokharel", defaultDate: "2025-04-02T15:00" },
                { name: "Sneha Shrestha", defaultDate: "2025-04-05T14:00" },
                { name: "Bidhan Shrestha", defaultDate: "2025-04-15T07:00" },
              ].map((session, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <HiCalendarDateRange className="text-black w-5 h-5" />
                    <div>
                      <h4 className="font-semibold text-sm">{session.name}</h4>
                      <input
                        type="datetime-local"
                        defaultValue={session.defaultDate}
                        className="text-xs border px-2 py-1 rounded mt-1"
                      />
                    </div>
                  </div>
                  <button className="mt-2 sm:mt-0 bg-yellow-400 hover:bg-amber-300 text-black px-4 py-1 rounded-md transition shadow">
                    Save
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => setIsRescheduling(false)}
              className="bg-blue-100 hover:bg-blue-200 text-black font-medium py-2 px-4 mt-6 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* === Blogs Section === */}
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-5xl mt-10">
        <h3 className="text-xl font-semibold">My Blogs</h3>
        <div className="flex flex-wrap gap-6 justify-center mt-6">
          {[{ img: a, title: "Codependency and Addiction", author: "Ryan Egan" },
            { img: b, title: "Prioritizing Mental Health", author: "Sarika Thapa" }
          ].map((blog, idx) => (
            <div key={idx} className="w-[300px]">
              <img src={blog.img} alt={blog.title} className="rounded-lg h-[200px] w-full object-cover" />
              <h4 className="font-semibold mt-2">{blog.title}</h4>
              <p className="text-sm text-gray-600">By {blog.author}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Userprofile;
