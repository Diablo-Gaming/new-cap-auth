import React from "react";
import { useNavigate } from "react-router-dom";
import usefetch from "../hook/usefetch"; // Custom hook to fetch API data

const Blogs = () => {
  const navigate = useNavigate(); // Initialize navigation

  // Custom function to go to the "Read More" page
  const handleReadmore = (id) => {
    navigate(`/readmore/${id}`);
  };

  const gotoCreatePost = () => {
    navigate("/createablog");
  };

  // Use the custom hook to get posts from an API
  const [posts, loading, error] = usefetch("http://localhost:3000/post");

  return (
    <div className="bg-[#cbd5e1] min-h-screen py-20 overflow-x-hidden mt-[56px]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center mb-10">BLOGS</h1>
        <p className="text-xl mb-6 ml-4">Top articles</p>

        {/* Removed Static Blog Cards (Sample Blogs) */}

        {/* API Fetched Blogs */}
        <div className="mt-10 px-2">
          <h2 className="text-black text-2xl font-semibold mb-4">
            Community Blogs
          </h2>

          {/* Show loading or error messages */}
          {loading && <p className="text-blue-600">Loading blogs...</p>}
          {error && (
            <p className="text-red-600">Error loading blogs: {error.message}</p>
          )}

          {/* Display fetched posts */}
          {posts && posts.length > 0
            ? posts.map((post, index) => (
                <div
                  key={post.id || index}
                  className="bg-white text-black rounded-lg shadow-md p-4 mb-6"
                >
                  <p className="font-bold">ID: {post.id}</p>
                  <p className="font-semibold">Title: {post.title}</p>
                  <p className="mb-2">Content: {post.content}</p>

                  {/* Images from API post */}
                  {post.image && post.image.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {post.image.map((img, idx) => (
                        <img
                          key={idx}
                          src={`http://localhost:3000/${img}`}
                          alt={`Post ${post.id}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No Image Available</p>
                  )}
                </div>
              ))
            : !loading && (
                <p className="text-gray-600">No community blogs available.</p>
              )}
        </div>

        {/* Create Blog Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={gotoCreatePost}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm"
          >
            Create a blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
