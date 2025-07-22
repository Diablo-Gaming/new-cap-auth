import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../config/Axios";

const Readmore = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await http.get(`/post/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        setError("Unable to load this blog.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <p className="p-6 text-center">Loading blog...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;
  if (!blog) return <p className="p-6 text-center">Blog not found.</p>;

  return (
    <div className="flex justify-center items-center bg-[#bcccdc] p-10">
      <div className="max-w-3xl w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

        {blog.images?.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {blog.images.map((url, idx) => (
              <img
                key={idx}
                src={`http://localhost:3000/${url}`}
                alt={`Blog Image ${idx + 1}`}
                className="w-full rounded"
              />
            ))}
          </div>
        )}

        <div
          className="text-gray-800 mt-4 prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {blog.tags?.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold">Tags:</h3>
            <ul className="flex flex-wrap gap-2 mt-1">
              {blog.tags.map((tag, idx) => (
                <li
                  key={idx}
                  className="bg-yellow-300 text-sm px-3 py-1 rounded-full"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Readmore;
